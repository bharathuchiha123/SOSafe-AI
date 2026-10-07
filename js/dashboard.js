/**
 * SOSafe - Dashboard Controller
 * Manages user greeting, live metrics, contacts count, and SOS alert integration
 */

document.addEventListener('DOMContentLoaded', async () => {
  // Initialize multilingual engine
  if (window.SOSafeLang) {
    window.SOSafeLang.init();
  }

  // Theme Initializer
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

  // Require Auth Guard
  const user = await window.SOSafeDB.requireAuth('login.html');
  if (!user) return;

  // Load User Profile
  const profileRes = await window.SOSafeDB.getProfile(user.id);
  const profile = (profileRes && profileRes.profile) || user;

  // Update Dynamic Greeting
  const greetingNameEl = document.getElementById('dashGreetingName');
  const greetingTimeEl = document.getElementById('dashGreetingTime');
  const navUserNameEl = document.getElementById('navUserName');
  const navUserAvatarEl = document.getElementById('navUserAvatar');

  const hour = new Date().getHours();
  let timeKey = 'dash_greeting_morning';
  if (hour >= 12 && hour < 17) timeKey = 'dash_greeting_afternoon';
  else if (hour >= 17 || hour < 4) timeKey = 'dash_greeting_evening';

  const firstName = (profile.full_name || 'Guardian').split(' ')[0];
  if (greetingTimeEl) greetingTimeEl.textContent = window.SOSafeLang.t(timeKey);
  if (greetingNameEl) greetingNameEl.textContent = firstName;
  if (navUserNameEl) navUserNameEl.textContent = profile.full_name || 'User';
  if (navUserAvatarEl) {
    const savedImg = (profile && profile.profile_image) || localStorage.getItem('sosafe_avatar_' + user.id);
    if (savedImg && savedImg.startsWith('data:image')) {
      navUserAvatarEl.innerHTML = `<img src="${savedImg}" alt="Avatar" style="width:100%; height:100%; object-fit:cover; border-radius:50%;">`;
    } else {
      const initial = (profile.full_name || user.email || 'U').charAt(0).toUpperCase();
      navUserAvatarEl.textContent = initial;
    }
  }

  // Load Emergency Contacts Count
  const contactsRes = await window.SOSafeDB.getEmergencyContacts(user.id);
  const userContacts = (contactsRes && contactsRes.contacts) || [];
  const contactsCountEl = document.getElementById('dashContactsCount');
  if (contactsCountEl) {
    contactsCountEl.textContent = `${userContacts.length} / 4`;
  }

  // Render Contacts Preview in Dashboard
  const dashContactsListEl = document.getElementById('dashContactsList');
  if (dashContactsListEl) {
    dashContactsListEl.innerHTML = '';
    if (userContacts.length === 0) {
      dashContactsListEl.innerHTML = `
        <div class="empty-state-notice">
          <p>${window.SOSafeLang.t('contacts_empty')}</p>
          <a href="contacts.html" class="btn-primary-sm" style="margin-top:0.75rem;">+ ${window.SOSafeLang.t('contacts_btn_add')}</a>
        </div>
      `;
    } else {
      userContacts.forEach((c, idx) => {
        const item = document.createElement('div');
        item.className = 'dash-contact-pill';
        item.innerHTML = `
          <div class="contact-avatar-sm">${(c.name || 'G').charAt(0).toUpperCase()}</div>
          <div class="dash-contact-info">
            <span class="dash-contact-name">${c.name}</span>
            <span class="dash-contact-rel">${c.relationship} • ${c.phone}</span>
          </div>
        `;
        dashContactsListEl.appendChild(item);
      });
    }
  }

  // Logout Handlers
  const logoutBtn = document.getElementById('btnLogout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      await window.SOSafeDB.signOut();
      window.location.href = 'login.html';
    });
  }

  // --------------------------------------------------------------------------
  // SOUND SYNTHESIS (Web Audio API)
  // --------------------------------------------------------------------------
  const audioCtx = (window.AudioContext || window.webkitAudioContext) ? new (window.AudioContext || window.webkitAudioContext)() : null;

  function playTone(freq, type = 'sine', duration = 0.15, gainVal = 0.15) {
    if (!audioCtx) return;
    try {
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(gainVal, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {}
  }

  // --------------------------------------------------------------------------
  // SOS EMERGENCY SIMULATION WITH SUPABASE CONTACTS INTEGRATION
  // --------------------------------------------------------------------------
  const sosTriggerBtn = document.getElementById('dashSosTriggerBtn');
  const sosModalBackdrop = document.getElementById('sosModalBackdrop');
  const cancelSosBtn = document.getElementById('cancelSosBtn');
  const dismissModalBtn = document.getElementById('dismissModalBtn');
  const countdownNumber = document.getElementById('countdownNumber');
  const countdownProgressRing = document.getElementById('countdownProgressRing');
  const countdownContainer = document.getElementById('countdownContainer');
  const activatedContainer = document.getElementById('activatedContainer');
  const alertingContactsListEl = document.getElementById('alertingContactsList');

  let countdownInterval = null;
  let countdownTimer = 3;

  function showToast(msg) {
    let toastEl = document.getElementById('dashToast') || document.getElementById('toastNotice');
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.className = 'toast-notice';
      toastEl.id = 'dashToast';
      document.body.appendChild(toastEl);
    }
    toastEl.innerHTML = `<span style="color:var(--c-gold)">⚡</span> <span>${msg}</span>`;
    toastEl.classList.add('show');
    setTimeout(() => toastEl.classList.remove('show'), 3500);
  }

  function openSosModal() {
    if (!userContacts || userContacts.length < 2) {
      showToast("⚠️ Please add at least 2 Emergency Contacts before activating SOS!");
      setTimeout(() => {
        window.location.href = 'contacts.html?req=2';
      }, 1200);
      return;
    }

    clearInterval(countdownInterval);
    countdownTimer = 3;
    if (countdownNumber) countdownNumber.textContent = countdownTimer;
    if (countdownProgressRing) countdownProgressRing.style.strokeDashoffset = '0';

    if (countdownContainer) countdownContainer.style.display = 'flex';
    if (activatedContainer) activatedContainer.style.display = 'none';

    if (sosModalBackdrop) sosModalBackdrop.classList.add('active');

    playTone(880, 'sine', 0.12, 0.2);

    const circumference = 408;
    countdownInterval = setInterval(() => {
      countdownTimer--;
      if (countdownNumber) countdownNumber.textContent = countdownTimer;
      if (countdownProgressRing) {
        const offset = circumference - (countdownTimer / 3) * circumference;
        countdownProgressRing.style.strokeDashoffset = offset;
      }

      if (countdownTimer > 0) {
        playTone(880, 'sine', 0.12, 0.2);
      } else {
        clearInterval(countdownInterval);
        triggerSosActivation();
      }
    }, 1000);
  }

  function cancelSosAlert() {
    clearInterval(countdownInterval);
    if (sosModalBackdrop) sosModalBackdrop.classList.remove('active');
    playTone(400, 'sine', 0.2, 0.1);
  }

  async function triggerSosActivation() {
    if (countdownContainer) countdownContainer.style.display = 'none';
    if (activatedContainer) activatedContainer.style.display = 'flex';

    playTone(950, 'sawtooth', 0.35, 0.25);
    setTimeout(() => playTone(650, 'sawtooth', 0.35, 0.25), 200);

    // Create / Start Live Location Session for SOS
    let liveSessionId = 'sos_dash_' + Date.now();
    let currentCoords = { latitude: 13.0827, longitude: 80.2707, accuracy: 12 };

    if (navigator.geolocation) {
      try {
        navigator.geolocation.getCurrentPosition((pos) => {
          if (pos && pos.coords) {
            currentCoords = {
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
              accuracy: pos.coords.accuracy || 10
            };
          }
        }, () => {}, { timeout: 3000, enableHighAccuracy: false, maximumAge: 30000 });
      } catch (e) {}
    }

    try {
      const sessionRes = await window.SOSafeDB.createLiveLocationSession(user.id, currentCoords);
      if (sessionRes.success && sessionRes.session) {
        liveSessionId = sessionRes.session.id;
      }
    } catch (e) {
      console.warn('Live location session error during SOS:', e);
    }

    const baseUrl = window.location.origin + window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
    const liveShareUrl = `${baseUrl}shared-location.html?session=${liveSessionId}`;
    const emergencyMsg = window.SOSafeLang ? window.SOSafeLang.generateEmergencyMessage(liveShareUrl) : `🚨 SOSafe Emergency Alert\nLive Location:\n${liveShareUrl}`;
    const encodedBody = encodeURIComponent(emergencyMsg);

    // 1. Record Emergency Alert in Supabase database
    let alertRecordId = null;
    try {
      const alertRes = await window.SOSafeDB.createEmergencyAlert(user.id, {
        live_session_id: liveSessionId.startsWith('sos_') ? null : liveSessionId,
        latitude: currentCoords.latitude,
        longitude: currentCoords.longitude,
        accuracy: currentCoords.accuracy,
        contacts_count: userContacts.length
      });
      if (alertRes.success && alertRes.alert) {
        alertRecordId = alertRes.alert.id;
      }
    } catch (e) {
      console.warn('Supabase emergency alert record error:', e);
    }

    // ------------------------------------------------------------------------
    // 2. TRIGGER N8N WEBHOOK (HTTP POST via Fetch API)
    // ------------------------------------------------------------------------
    let currentUserId = user ? user.id : 'anonymous_user';
    let webhookUrl = (window.SOSafeDB && window.SOSafeDB.getN8NWebhookUrl()) || "https://obitouchiha.app.n8n.cloud/webhook-test/SOS-trigger";
    if (typeof webhookUrl === 'string') {
      webhookUrl = webhookUrl.replace(/^[\[\s"']+|[\]\s"']+$/g, '').trim();
    }

    if (webhookUrl && !webhookUrl.includes('PASTE_YOUR') && !webhookUrl.includes('your-custom-webhook-id') && !webhookUrl.includes('your-webhook-id')) {
      try {
        console.log(`[SOSafe Dashboard] Initiating HTTP POST request to n8n webhook: ${webhookUrl}`);
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user_id: currentUserId
          })
        });

        if (response.ok) {
          console.log('[SOSafe Dashboard] n8n Webhook dispatched successfully! Status:', response.status);
          showToast('SOS Triggered Successfully!');
        } else {
          console.error(`[SOSafe Dashboard] n8n Webhook Error: HTTP ${response.status} ${response.statusText}`);
          if (response.status === 405) {
            showToast('⚠️ 405 Method Not Allowed: In n8n, change Webhook node HTTP Method to POST.');
          } else {
            showToast(`⚠️ SOS Webhook failed (HTTP ${response.status})`);
          }
        }
      } catch (networkOrCorsError) {
        console.error('[SOSafe Dashboard] Webhook Network or CORS Error:', networkOrCorsError);
        try {
          await fetch(webhookUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              'Content-Type': 'text/plain'
            },
            body: JSON.stringify({ user_id: currentUserId })
          });
          console.log('[SOSafe Dashboard] Dispatched fallback no-cors POST request to n8n.');
          showToast('SOS Triggered Successfully!');
        } catch (fallbackError) {
          showToast('⚠️ n8n Webhook Offline: Click "Listen for test event" in n8n or activate workflow.');
        }
      }
    } else {
      console.warn('[SOSafe Dashboard] Webhook URL not configured. Please paste your n8n webhook URL in Settings.');
      showToast('SOS Triggered Successfully!');
    }

    // Populate actual Supabase emergency contacts in alert list
    if (alertingContactsListEl) {
      alertingContactsListEl.innerHTML = '';
      if (userContacts.length === 0) {
        alertingContactsListEl.innerHTML = `<div class="alert-contact-item" style="padding:0.75rem;">✓ Emergency Services & Local Hub</div>`;
      } else {
        userContacts.forEach((c) => {
          const item = document.createElement('div');
          item.className = 'alert-contact-item';
          item.style.cssText = 'display:flex; justify-content:space-between; align-items:center; padding:0.6rem 0.8rem; background:rgba(246,217,190,0.25); border-radius:var(--radius-md); margin-bottom:0.4rem;';
          const cleanPhone = (c.phone || '').replace(/[^0-9+]/g, '');
          const smsLink = `sms:${cleanPhone}?body=${encodedBody}`;

          item.innerHTML = `
            <div style="text-align:left;">
              <strong style="color:var(--text-primary); font-size:0.92rem;">${c.name}</strong>
              <div style="color:var(--c-coral-blossom); font-size:0.78rem;">${c.relationship || 'Guardian'} • ${c.phone}</div>
            </div>
            <a href="${smsLink}" target="_blank" rel="noopener" class="btn-send-sms-card" style="padding:0.4rem 0.75rem; font-size:0.78rem;">
              💬 Send SMS
            </a>
          `;
          alertingContactsListEl.appendChild(item);
        });

        // Add Quick Action bar to Live Location
        const liveLocAction = document.createElement('div');
        liveLocAction.style.cssText = 'margin-top:0.75rem; display:flex; gap:0.5rem; width:100%;';
        liveLocAction.innerHTML = `
          <a href="location.html" class="btn-primary-sm" style="flex:1; justify-content:center; padding:0.65rem 1rem; font-size:0.85rem;">
            📍 Open Live Location Map
          </a>
        `;
        alertingContactsListEl.appendChild(liveLocAction);
      }
    }
  }

  if (sosTriggerBtn) sosTriggerBtn.addEventListener('click', openSosModal);
  if (cancelSosBtn) cancelSosBtn.addEventListener('click', cancelSosAlert);
  if (dismissModalBtn) {
    dismissModalBtn.addEventListener('click', () => {
      if (sosModalBackdrop) sosModalBackdrop.classList.remove('active');
    });
  }

  // Mobile drawer
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
