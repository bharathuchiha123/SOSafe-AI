/**
 * ============================================================================
 * SOSafe - Live Location & Emergency Contact Sharing Controller
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Initialize Multilingual Engine
  if (window.SOSafeLang) {
    window.SOSafeLang.init();
  }

  // 2. Initialize Theme
  const savedTheme = localStorage.getItem('sosafe_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  const themeToggleBtn = document.getElementById('themeToggleBtn');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('sosafe_theme', next);
    });
  }

  // 3. Authenticate User Guard
  const user = await window.SOSafeDB.requireAuth('login.html');
  if (!user) return;

  // Set Nav User Profile
  const navUserName = document.getElementById('navUserName');
  const navUserAvatar = document.getElementById('navUserAvatar');
  if (navUserName) navUserName.textContent = user.full_name || 'User';
  if (navUserAvatar) {
    const savedImg = (user.profile_image) || localStorage.getItem('sosafe_avatar_' + user.id);
    if (savedImg && savedImg.startsWith('data:image')) {
      navUserAvatar.innerHTML = `<img src="${savedImg}" alt="Avatar" style="width:100%; height:100%; object-fit:cover; border-radius:50%;">`;
    } else {
      navUserAvatar.textContent = (user.full_name || user.email || 'U').charAt(0).toUpperCase();
    }
  }

  // Logout Handler
  const logoutBtn = document.getElementById('btnLogout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      stopSharing();
      await window.SOSafeDB.signOut();
      window.location.href = 'login.html';
    });
  }

  // 4. State Variables
  let activeSession = null;
  let watchId = null;
  let map = null;
  let userMarker = null;
  let accuracyCircle = null;
  let currentCoords = null; // Stays null until a valid location is received
  let userContacts = [];
  let isWatching = false;
  let hasReceivedValidLocation = false;
  let lastErrorCode = null;

  // DOM Elements
  const statusBadge = document.getElementById('liveStatusBadge');
  const statusText = document.getElementById('liveStatusText');
  const contactsContainer = document.getElementById('sharingContactsList');
  const telemetryLat = document.getElementById('telemetryLat');
  const telemetryLng = document.getElementById('telemetryLng');
  const telemetryAcc = document.getElementById('telemetryAcc');
  const telemetryTime = document.getElementById('telemetryTime');
  const btnAlertAll = document.getElementById('btnAlertAll');
  const btnCopyLink = document.getElementById('btnCopyLink');
  const btnStopSharing = document.getElementById('btnStopSharing');
  const toastEl = document.getElementById('locToast');
  const geoNoticeBanner = document.getElementById('geoNoticeBanner');
  const geoNoticeText = document.getElementById('geoNoticeText');
  const btnRetryLocation = document.getElementById('btnRetryLocation');

  // Phone Masking Utility for Privacy
  function maskPhoneNumber(phone) {
    if (!phone) return '•••• ••••';
    const clean = phone.trim();
    if (clean.length <= 6) return '••••••';
    const visibleStart = clean.slice(0, 5);
    const visibleEnd = clean.slice(-2);
    return `${visibleStart} ••••• ${visibleEnd}`;
  }

  // Toast Notification
  function showToast(msg) {
    if (!toastEl) return;
    toastEl.innerHTML = `<span>${msg}</span>`;
    toastEl.classList.add('show');
    setTimeout(() => toastEl.classList.remove('show'), 3500);
  }

  // Show User-Friendly Location Error
  function showGeoNotice(errorCode) {
    lastErrorCode = errorCode;
    if (!geoNoticeBanner || !geoNoticeText) return;

    let msg = window.SOSafeLang.t('loc_err_timeout');
    if (errorCode === 1) {
      msg = window.SOSafeLang.t('loc_err_permission');
    } else if (errorCode === 2) {
      msg = window.SOSafeLang.t('loc_err_unavailable');
    } else if (errorCode === 3) {
      msg = window.SOSafeLang.t('loc_err_timeout');
    }

    geoNoticeText.textContent = msg;
    geoNoticeBanner.style.display = 'flex';
  }

  function hideGeoNotice() {
    lastErrorCode = null;
    if (geoNoticeBanner) {
      geoNoticeBanner.style.display = 'none';
    }
  }

  // 5. Fetch User's Emergency Contacts (Filtered by authenticated user_id)
  async function loadEmergencyContacts() {
    const res = await window.SOSafeDB.getEmergencyContacts(user.id);
    userContacts = (res && res.contacts) || [];
    renderContactsList();
  }

  // 6. Generate Shareable Live Location URL
  function getLiveLocationUrl(sessionId) {
    const baseUrl = window.location.origin + window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
    return `${baseUrl}shared-location.html?session=${sessionId}`;
  }

  // 7. Render Emergency Contacts Preview List
  function renderContactsList() {
    if (!contactsContainer) return;
    contactsContainer.innerHTML = '';

    if (userContacts.length === 0) {
      contactsContainer.innerHTML = `
        <div style="padding:1.5rem; text-align:center; background:rgba(246,217,190,0.2); border-radius:var(--radius-md); border:1px dashed var(--border-subtle);">
          <p style="font-size:0.9rem; color:var(--text-secondary); margin-bottom:0.75rem;">${window.SOSafeLang.t('contacts_empty')}</p>
          <a href="contacts.html" class="btn-send-sms-card" style="display:inline-flex;">+ ${window.SOSafeLang.t('contacts_btn_add')}</a>
        </div>
      `;
      return;
    }

    const shareUrl = activeSession ? getLiveLocationUrl(activeSession.id) : window.location.href;
    const emergencyMsg = window.SOSafeLang.generateEmergencyMessage(shareUrl);
    const encodedBody = encodeURIComponent(emergencyMsg);

    userContacts.slice(0, 4).forEach((contact) => {
      const card = document.createElement('div');
      card.className = 'sharing-contact-card';

      const initial = (contact.name || 'G').charAt(0).toUpperCase();
      const maskedPhone = maskPhoneNumber(contact.phone);
      const cleanPhone = (contact.phone || '').replace(/[^0-9+]/g, '');

      // Create SMS deep link: sms:[PHONE]?body=[ENCODED_MESSAGE]
      const smsHref = `sms:${cleanPhone}?body=${encodedBody}`;

      card.innerHTML = `
        <div class="contact-meta-left">
          <div class="contact-mini-badge">${initial}</div>
          <div class="contact-text-info">
            <span class="contact-name-title">${contact.name}</span>
            <span class="contact-rel-tag">${contact.relationship || 'Guardian'}</span>
            <span class="contact-masked-phone">${maskedPhone}</span>
          </div>
        </div>
        <div>
          <a href="${smsHref}" class="btn-send-sms-card" title="Open SMS with pre-filled live location message" target="_blank" rel="noopener">
            <span>💬</span> <span>${window.SOSafeLang.t('loc_btn_send_sms')}</span>
          </a>
        </div>
      `;
      contactsContainer.appendChild(card);
    });
  }

  // 8. Initialize MapTiler / OpenStreetMap Map View
  // Responsible ONLY for displaying the map and marker after valid coordinates arrive
  function initMap(lat, lng) {
    if (map) return;
    const mapElement = document.getElementById('liveMap');
    if (!mapElement || !window.L) return;

    map = L.map('liveMap', {
      center: [lat, lng],
      zoom: 16,
      zoomControl: true
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors | SOSafe Guardian Tracking'
    }).addTo(map);

    const pulseIcon = L.divIcon({
      className: 'gps-pulse-marker-wrapper',
      html: '<div class="gps-pulse-marker"></div>',
      iconSize: [22, 22],
      iconAnchor: [11, 11]
    });

    userMarker = L.marker([lat, lng], { icon: pulseIcon }).addTo(map);
    accuracyCircle = L.circle([lat, lng], {
      radius: (currentCoords && currentCoords.accuracy) || 15,
      color: '#D03F74',
      fillColor: '#F3949A',
      fillOpacity: 0.18,
      weight: 1.5
    }).addTo(map);

    if (telemetryLat) telemetryLat.textContent = lat.toFixed(5);
    if (telemetryLng) telemetryLng.textContent = lng.toFixed(5);
    if (telemetryAcc) telemetryAcc.textContent = `±${Math.round((currentCoords && currentCoords.accuracy) || 10)}m`;
    if (telemetryTime) telemetryTime.textContent = new Date().toLocaleTimeString();
  }

  // Update Map Marker only when valid coordinates are received
  function updateMapPosition(lat, lng, accuracy) {
    if (typeof lat !== 'number' || typeof lng !== 'number' || isNaN(lat) || isNaN(lng)) {
      return;
    }

    if (!map) {
      initMap(lat, lng);
      return;
    }

    if (userMarker) userMarker.setLatLng([lat, lng]);
    if (accuracyCircle) {
      accuracyCircle.setLatLng([lat, lng]);
      accuracyCircle.setRadius(accuracy || 15);
    }
    map.panTo([lat, lng], { animate: true, duration: 1.0 });

    if (telemetryLat) telemetryLat.textContent = lat.toFixed(5);
    if (telemetryLng) telemetryLng.textContent = lng.toFixed(5);
    if (telemetryAcc) telemetryAcc.textContent = `±${Math.round(accuracy || 10)}m`;
    if (telemetryTime) telemetryTime.textContent = new Date().toLocaleTimeString();
  }

  // 9. Geolocation Handling with watchPosition, 30000ms timeout & single listener
  function startWatchingPosition() {
    if (!('geolocation' in navigator)) {
      console.log('Location unavailable');
      showGeoNotice(2);
      return;
    }

    // Guard: Prevent repeatedly creating multiple watchPosition listeners
    if (isWatching && watchId !== null) {
      return;
    }

    // Clear any previous stale listener before starting a new one
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      watchId = null;
    }

    isWatching = true;
    console.log('Requesting user location...');

    if (statusText && !hasReceivedValidLocation) {
      statusText.textContent = window.SOSafeLang.t('loc_status_requesting');
    }

    const geoOptions = {
      enableHighAccuracy: false, // Initial low accuracy for desktop/laptop compatibility
      timeout: 30000,            // At least 30000 milliseconds
      maximumAge: 10000          // 10000 milliseconds
    };

    watchId = navigator.geolocation.watchPosition(
      async (pos) => {
        if (!pos || !pos.coords) return;

        const { latitude, longitude, accuracy } = pos.coords;
        if (typeof latitude !== 'number' || typeof longitude !== 'number' || isNaN(latitude) || isNaN(longitude)) {
          return;
        }

        console.log('Location received:', { latitude, longitude, accuracy });
        hideGeoNotice();
        hasReceivedValidLocation = true;

        currentCoords = {
          latitude,
          longitude,
          accuracy: accuracy || 10
        };

        // Initialize / update MapTiler marker after valid coordinates are received
        updateMapPosition(currentCoords.latitude, currentCoords.longitude, currentCoords.accuracy);

        // Start / update live-location session ONLY after valid location is obtained
        if (!activeSession) {
          await createSession();
        } else {
          await window.SOSafeDB.updateLiveLocationSession(activeSession.id, currentCoords);
        }
      },
      (err) => {
        if (!err) return;

        // Separate and clean error handling without exposing technical details
        switch (err.code) {
          case 1:
            console.log('Location permission denied');
            showGeoNotice(1);
            break;
          case 2:
            console.log('Location unavailable');
            showGeoNotice(2);
            break;
          case 3:
            console.log('Location request timed out');
            showGeoNotice(3);
            break;
          default:
            console.log('Location unavailable');
            showGeoNotice(2);
            break;
        }

        // Graceful retry on timeout if no valid location has been received yet
        if (!hasReceivedValidLocation && err.code === 3) {
          if (watchId !== null) {
            navigator.geolocation.clearWatch(watchId);
            watchId = null;
          }
          isWatching = false;
        }
      },
      geoOptions
    );
  }

  // Create Live Location Session in Supabase only after valid location is obtained
  async function createSession() {
    if (!currentCoords) return;

    const sessionRes = await window.SOSafeDB.createLiveLocationSession(user.id, currentCoords);
    if (sessionRes.success && sessionRes.session) {
      activeSession = sessionRes.session;
      updateUIActiveState(true);
      renderContactsList();
      showToast('🔴 ' + window.SOSafeLang.t('loc_status_active'));
    }
  }

  function updateUIActiveState(isActive) {
    if (isActive) {
      if (statusBadge) {
        statusBadge.className = 'live-status-badge active';
      }
      if (statusText) {
        statusText.textContent = window.SOSafeLang.t('loc_status_active');
      }
      if (btnStopSharing) btnStopSharing.style.display = 'inline-flex';
    } else {
      if (statusBadge) {
        statusBadge.className = 'live-status-badge standby';
      }
      if (statusText) {
        statusText.textContent = window.SOSafeLang.t('loc_status_standby');
      }
    }
  }

  // 10. Stop Sharing Handler
  async function stopSharing() {
    // Clear watch ID properly
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      watchId = null;
    }
    isWatching = false;

    if (activeSession) {
      await window.SOSafeDB.stopLiveLocationSession(activeSession.id);
      activeSession = null;
    }

    updateUIActiveState(false);
    showToast(window.SOSafeLang.t('loc_stopped_toast'));
  }

  if (btnStopSharing) {
    btnStopSharing.addEventListener('click', stopSharing);
  }

  // 11. "Try Again" Button Handler for Location Retry
  if (btnRetryLocation) {
    btnRetryLocation.addEventListener('click', () => {
      hideGeoNotice();
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
      }
      isWatching = false;
      startWatchingPosition();
    });
  }

  // 12. "Alert All Emergency Contacts" / "Share Emergency Alert" Action
  if (btnAlertAll) {
    btnAlertAll.addEventListener('click', async () => {
      if (!activeSession) {
        if (!hasReceivedValidLocation) {
          showGeoNotice(lastErrorCode || 3);
          return;
        }
        await createSession();
      }

      const shareUrl = activeSession ? getLiveLocationUrl(activeSession.id) : window.location.href;
      const emergencyMsg = window.SOSafeLang.generateEmergencyMessage(shareUrl);

      // Native Web Share API
      if (navigator.share) {
        try {
          await navigator.share({
            title: 'SOSafe Emergency Alert',
            text: emergencyMsg,
            url: shareUrl
          });
          showToast('✓ Alert shared via device sharing manager.');
          return;
        } catch (shareErr) {
          if (shareErr.name !== 'AbortError') {
            // Cancelled or ignored
          }
        }
      }

      // Fallback: Copy link and prompt user
      try {
        await navigator.clipboard.writeText(emergencyMsg);
        showToast(window.SOSafeLang.t('loc_ready_alert_msg') + ' ' + window.SOSafeLang.t('loc_copied_toast'));
      } catch (clipErr) {
        showToast(window.SOSafeLang.t('loc_ready_alert_msg'));
      }
    });
  }

  // 13. Copy Link Action
  if (btnCopyLink) {
    btnCopyLink.addEventListener('click', async () => {
      if (!activeSession) {
        if (!hasReceivedValidLocation) {
          showGeoNotice(lastErrorCode || 3);
          return;
        }
        await createSession();
      }

      const shareUrl = activeSession ? getLiveLocationUrl(activeSession.id) : window.location.href;
      try {
        await navigator.clipboard.writeText(shareUrl);
        showToast(window.SOSafeLang.t('loc_copied_toast'));
      } catch (err) {
        showToast('Link: ' + shareUrl);
      }
    });
  }

  // 14. Re-render on language change
  window.addEventListener('sosafe_lang_changed', () => {
    renderContactsList();
    if (activeSession) {
      updateUIActiveState(true);
    }
    if (lastErrorCode) {
      showGeoNotice(lastErrorCode);
    }
  });

  // 15. Initial Load: Load contacts & initiate single watchPosition
  await loadEmergencyContacts();
  startWatchingPosition();

  // Mobile Drawer
  const menuToggleBtn = document.getElementById('menuToggleBtn');
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');
  if (menuToggleBtn && mobileNavOverlay) {
    menuToggleBtn.addEventListener('click', () => {
      mobileNavOverlay.classList.toggle('open');
    });
    mobileNavOverlay.addEventListener('click', (e) => {
      if (e.target === mobileNavOverlay) mobileNavOverlay.classList.remove('open');
    });
  }
});
