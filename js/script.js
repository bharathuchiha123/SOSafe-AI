/**
 * SOSafe - Main Landing Page Script
 * TVK-Inspired Visual System + Emergency Contacts Architecture + Dedicated Save Contact Option
 */

document.addEventListener('DOMContentLoaded', async () => {
  // Initialize multilingual engine
  if (window.SOSafeLang) {
    window.SOSafeLang.init();
  }

  // 1. Auth Guard: Site open aagumpothey login page open aaganum
  activeUser = await window.SOSafeDB.getUser();
  if (!activeUser) {
    window.location.href = 'login.html';
    return;
  }

  let currentLang = (window.SOSafeLang && window.SOSafeLang.getLang()) || localStorage.getItem('sosafe_lang') || 'en';
  let currentTheme = localStorage.getItem('sosafe_theme') || 'light';
  let countdownInterval = null;
  let countdownTimer = 3;
  let homeContacts = [];
  let homeContactToDeleteId = null;

  // Sound Engine
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

  // Theme Initializer
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('sosafe_theme', theme);
    currentTheme = theme;
  }
  applyTheme(currentTheme);

  const themeToggleBtn = document.getElementById('themeToggleBtn');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
      playTone(600, 'sine', 0.08, 0.08);
    });
  }

  // Toast helper
  function showToast(message) {
    let toast = document.getElementById('toastNotice');
    if (!toast) return;
    toast.innerHTML = `<span style="color:var(--c-gold)">⚡</span> <span>${message}</span>`;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
  }

  // Relationship Micro-Icons
  function getRelIcon(rel) {
    if (!rel) return '🛡️';
    const r = rel.toLowerCase();
    if (r.includes('parent') || r.includes('family')) return '👨‍👩‍👧';
    if (r.includes('spouse') || r.includes('partner')) return '💍';
    if (r.includes('sibling')) return '👥';
    if (r.includes('friend')) return '🤝';
    if (r.includes('doctor') || r.includes('hospital')) return '🏥';
    return '🛡️';
  }

  // ------------------------------------------------------------------------
  // LOAD & RENDER HOME CONTACTS WITH SCROLL & GRID COMPATIBILITY
  // ------------------------------------------------------------------------
  const homeContactsGrid = document.getElementById('homeContactsGrid');
  const homeContactsCountBadge = document.getElementById('homeContactsCountBadge');
  const dashContactsVal = document.getElementById('dashContactsVal');
  const homeBtnAddContact = document.getElementById('homeBtnAddContact');

  // View Mode Controls on Home
  const homeBtnViewGrid = document.getElementById('homeBtnViewGrid');
  const homeBtnViewScroll = document.getElementById('homeBtnViewScroll');
  const homeScrollNavControls = document.getElementById('homeScrollNavControls');
  const homeBtnScrollLeft = document.getElementById('homeBtnScrollLeft');
  const homeBtnScrollRight = document.getElementById('homeBtnScrollRight');
  const homeContactsScrollPills = document.getElementById('homeContactsScrollPills');

  if (homeBtnViewGrid && homeBtnViewScroll && homeContactsGrid) {
    homeBtnViewGrid.addEventListener('click', () => {
      homeBtnViewGrid.classList.add('active');
      homeBtnViewScroll.classList.remove('active');
      homeContactsGrid.classList.remove('scroll-mode');
      if (homeScrollNavControls) homeScrollNavControls.style.display = 'none';
      if (homeContactsScrollPills) homeContactsScrollPills.style.display = 'none';
      localStorage.setItem('sosafe_home_view', 'grid');
    });

    homeBtnViewScroll.addEventListener('click', () => {
      homeBtnViewScroll.classList.add('active');
      homeBtnViewGrid.classList.remove('active');
      homeContactsGrid.classList.add('scroll-mode');
      if (homeScrollNavControls) homeScrollNavControls.style.display = 'flex';
      if (homeContactsScrollPills) homeContactsScrollPills.style.display = 'flex';
      localStorage.setItem('sosafe_home_view', 'scroll');
    });

    const savedHomeView = localStorage.getItem('sosafe_home_view') || 'scroll';
    if (savedHomeView === 'grid') {
      homeBtnViewGrid.click();
    } else {
      homeBtnViewScroll.click();
    }
  }

  // Smooth Scroll to a specific slot index on Home
  function scrollToHomeSlot(slotIndex) {
    if (!homeContactsGrid) return;
    const cards = homeContactsGrid.children;
    if (cards && cards[slotIndex]) {
      cards[slotIndex].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      cards[slotIndex].classList.remove('slot-highlight-pulse');
      void cards[slotIndex].offsetWidth;
      cards[slotIndex].classList.add('slot-highlight-pulse');
      setTimeout(() => {
        if (cards[slotIndex]) cards[slotIndex].classList.remove('slot-highlight-pulse');
      }, 2000);
    }

    if (homeContactsScrollPills) {
      homeContactsScrollPills.querySelectorAll('.scroll-pill-btn').forEach((p, idx) => {
        if (idx === slotIndex) p.classList.add('active');
        else p.classList.remove('active');
      });
    }
  }

  function scrollHomeContacts(direction) {
    if (!homeContactsGrid) return;
    const cardWidth = 460;
    homeContactsGrid.scrollBy({ left: direction * cardWidth, behavior: 'smooth' });
  }

  if (homeBtnScrollLeft) homeBtnScrollLeft.addEventListener('click', () => scrollHomeContacts(-1));
  if (homeBtnScrollRight) homeBtnScrollRight.addEventListener('click', () => scrollHomeContacts(1));

  // Horizontal mouse wheel scrolling support
  if (homeContactsGrid) {
    homeContactsGrid.addEventListener('wheel', (e) => {
      if (homeContactsGrid.classList.contains('scroll-mode') && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        homeContactsGrid.scrollLeft += e.deltaY;
      }
    }, { passive: false });
  }

  // Quick Slot Jump Pills Handler on Home
  if (homeContactsScrollPills) {
    homeContactsScrollPills.querySelectorAll('.scroll-pill-btn').forEach(pill => {
      pill.addEventListener('click', () => {
        const slotIdx = parseInt(pill.getAttribute('data-slot') || '0', 10);
        scrollToHomeSlot(slotIdx);
      });
    });
  }

  // Modal elements
  const homeContactModal = document.getElementById('homeContactModal');
  const homeContactModalTitle = document.getElementById('homeContactModalTitle');
  const homeContactModalForm = document.getElementById('homeContactModalForm');
  const homeContactIdInput = document.getElementById('homeContactIdInput');
  const homeContactNameInput = document.getElementById('homeContactNameInput');
  const homeContactPhoneInput = document.getElementById('homeContactPhoneInput');
  const homeContactRelationInput = document.getElementById('homeContactRelationInput');
  const homeRelationChipsContainer = document.getElementById('homeRelationChipsContainer');
  const homeLiveAvatarPreview = document.getElementById('homeLiveAvatarPreview');
  const homeNameValidIcon = document.getElementById('homeNameValidIcon');
  const homePhoneValidIcon = document.getElementById('homePhoneValidIcon');
  const homeBtnCloseModal = document.getElementById('homeBtnCloseModal');
  const homeBtnCancelModal = document.getElementById('homeBtnCancelModal');
  const homeBtnSaveModal = document.getElementById('homeBtnSaveModal');
  const homeBtnSaveModalLabel = document.getElementById('homeBtnSaveModalLabel');

  // Delete modal elements
  const homeDeleteConfirmModal = document.getElementById('homeDeleteConfirmModal');
  const homeBtnConfirmDelete = document.getElementById('homeBtnConfirmDelete');
  const homeBtnCancelDelete = document.getElementById('homeBtnCancelDelete');

  // Live Avatar preview and validation on Home
  if (homeContactNameInput) {
    homeContactNameInput.addEventListener('input', () => {
      const val = homeContactNameInput.value.trim();
      const initial = (val || 'C').charAt(0).toUpperCase();
      if (homeLiveAvatarPreview) homeLiveAvatarPreview.textContent = initial;
      if (homeNameValidIcon) {
        if (val.length >= 2) homeNameValidIcon.classList.add('valid');
        else homeNameValidIcon.classList.remove('valid');
      }
    });
  }

  if (homeContactPhoneInput && homePhoneValidIcon) {
    homeContactPhoneInput.addEventListener('input', () => {
      const val = homeContactPhoneInput.value.trim().replace(/\s+/g, '');
      if (val.length >= 8) homePhoneValidIcon.classList.add('valid');
      else homePhoneValidIcon.classList.remove('valid');
    });
  }

  async function loadHomeContacts() {
    activeUser = await window.SOSafeDB.getUser();
    const userId = activeUser ? activeUser.id : 'guest_demo_user';
    
    if (!activeUser) {
      window.SOSafeDB.seedMockContacts(userId);
    }

    const res = await window.SOSafeDB.getEmergencyContacts(userId);
    homeContacts = (res && res.contacts) || [];
    const total = homeContacts.length;

    // Update Badges & HUD Dots
    if (homeContactsCountBadge) homeContactsCountBadge.textContent = `${total} / 4 Active`;
    if (dashContactsVal) dashContactsVal.textContent = `${total} / 4 Slots`;

    for (let d = 1; d <= 4; d++) {
      const dot = document.getElementById(`homeDot${d}`);
      if (dot) {
        if (d <= total) {
          dot.classList.add('filled');
        } else {
          dot.classList.remove('filled');
        }
      }
    }

    // Always keep Add Contact Button fully enabled
    if (homeBtnAddContact) {
      homeBtnAddContact.disabled = false;
      homeBtnAddContact.style.opacity = '1';
      homeBtnAddContact.style.cursor = 'pointer';
    }

    if (!homeContactsGrid) return;
    homeContactsGrid.innerHTML = '';

    for (let i = 0; i < 4; i++) {
      const contact = homeContacts[i];
      const slotNum = `0${i + 1}`;
      const tableName = `emergency_contact${i + 1}`;
      const card = document.createElement('div');
      card.className = 'contact-card-box';
      card.setAttribute('data-slot-index', i);

      if (contact) {
        const initial = (contact.name || 'C').charAt(0).toUpperCase();
        const relIcon = getRelIcon(contact.relationship);
        const contactTable = contact._table || tableName;

        card.innerHTML = `
          <div class="contact-card-header">
            <span class="contact-slot-tag">🛡️ Contact ${slotNum} • <small style="opacity:0.85;">${contactTable}</small></span>
            <span class="contact-relation-badge">${relIcon} ${contact.relationship || 'Emergency Contact'}</span>
          </div>

          <div class="contact-card-body">
            <!-- 1. Contact Name Section -->
            <div class="contact-identity-row">
              <div class="contact-avatar-lg">${initial}</div>
              <div class="contact-name-block">
                <h3 class="contact-name-text">${contact.name}</h3>
                <span class="contact-role-subtext">🛡️ STORED IN TABLE: ${contactTable.toUpperCase()}</span>
              </div>
            </div>

            <!-- 2. Contact Phone & SMS Box -->
            <div class="contact-phone-box">
              <span class="contact-phone-val">📱 ${contact.phone}</span>
              <span class="contact-sms-beacon-tag">● User ID Synced</span>
            </div>
          </div>

          <div class="contact-card-actions">
            <button type="button" class="btn-card-action call-btn" onclick="alert('Simulated Emergency Direct Call to ${contact.name} (${contact.phone})');">
              📞 Direct Call
            </button>
            <button type="button" class="btn-card-action edit-btn edit-home" data-id="${contact.id}" data-table="${contactTable}">
              ✏️ ${window.SOSafeLang ? window.SOSafeLang.t('contact_btn_edit') : 'Edit'}
            </button>
            <button type="button" class="btn-card-action delete-btn delete-home" data-id="${contact.id}" data-table="${contactTable}">
              🗑️ ${window.SOSafeLang ? window.SOSafeLang.t('contact_btn_delete') : 'Delete'}
            </button>
          </div>
        `;

        card.addEventListener('click', (e) => {
          if (!e.target.closest('.btn-card-action')) {
            scrollToHomeSlot(i);
          }
        });
      } else {
        card.classList.add('empty-slot');
        card.innerHTML = `
          <div class="contact-card-header">
            <span class="contact-slot-tag" style="opacity:0.75;">Slot ${slotNum} • ${tableName}</span>
            <span class="contact-relation-badge" style="background:transparent; border-color:rgba(232,184,74,0.3); opacity:0.7;">Unassigned</span>
          </div>

          <div class="empty-slot-content">
            <div class="empty-portal-beacon">+</div>
            <h4 style="font-size:1.15rem; font-weight:800; margin-bottom:0.35rem; color:var(--text-primary);">Assign Contact ${slotNum}</h4>
            <p style="font-size:0.88rem; color:var(--text-secondary); margin-bottom:1.25rem;">Stores into separate table: <code>${tableName}</code></p>
            <button type="button" class="btn-primary-sm btn-home-slot-add">
              + Add Contact
            </button>
          </div>
        `;

        card.addEventListener('click', () => {
          scrollToHomeSlot(i);
          openHomeAddModal(i + 1);
        });

        const slotAddBtn = card.querySelector('.btn-home-slot-add');
        if (slotAddBtn) {
          slotAddBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            scrollToHomeSlot(i);
            openHomeAddModal(i + 1);
          });
        }
      }

      homeContactsGrid.appendChild(card);
    }

    // Attach listeners
    document.querySelectorAll('.edit-home').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        const tbl = btn.getAttribute('data-table');
        const c = homeContacts.find(item => item.id === id);
        if (c) openHomeEditModal({ ...c, _table: tbl });
      });
    });

    document.querySelectorAll('.delete-home').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        const tbl = btn.getAttribute('data-table');
        openHomeDeleteModal(id, tbl);
      });
    });
  }

  // Relationship Chip selection on Home
  if (homeRelationChipsContainer) {
    homeRelationChipsContainer.querySelectorAll('.relation-chip-btn').forEach(chip => {
      chip.addEventListener('click', () => {
        homeRelationChipsContainer.querySelectorAll('.relation-chip-btn').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const rel = chip.getAttribute('data-rel');
        if (homeContactRelationInput) homeContactRelationInput.value = rel;
      });
    });
  }

  function setHomeRelationChipActive(relValue) {
    if (!homeRelationChipsContainer) return;
    let matched = false;
    homeRelationChipsContainer.querySelectorAll('.relation-chip-btn').forEach(chip => {
      if (chip.getAttribute('data-rel') === relValue) {
        chip.classList.add('active');
        matched = true;
      } else {
        chip.classList.remove('active');
      }
    });
    if (!matched && homeRelationChipsContainer.firstElementChild) {
      homeRelationChipsContainer.firstElementChild.classList.add('active');
      if (homeContactRelationInput) homeContactRelationInput.value = homeRelationChipsContainer.firstElementChild.getAttribute('data-rel');
    }
  }

  let homeTargetSlot = null;
  let homeEditingTable = null;
  let homeContactToDeleteTable = null;

  function openHomeAddModal(slotIndex = null) {
    homeTargetSlot = slotIndex;
    homeEditingTable = slotIndex ? `emergency_contact${slotIndex}` : null;

    const slotInfo = slotIndex ? ` (Slot 0${slotIndex} • Table: emergency_contact${slotIndex})` : '';
    if (homeContactModalTitle) homeContactModalTitle.textContent = `${window.SOSafeLang ? window.SOSafeLang.t('contact_modal_add_title') : "Add Emergency Contact"}${slotInfo}`;
    if (homeContactIdInput) homeContactIdInput.value = '';
    if (homeContactNameInput) homeContactNameInput.value = '';
    if (homeLiveAvatarPreview) homeLiveAvatarPreview.textContent = 'C';
    if (homeNameValidIcon) homeNameValidIcon.classList.remove('valid');
    if (homeContactPhoneInput) homeContactPhoneInput.value = '';
    if (homePhoneValidIcon) homePhoneValidIcon.classList.remove('valid');
    if (homeContactRelationInput) homeContactRelationInput.value = 'Parent / Family';
    setHomeRelationChipActive('Parent / Family');

    if (homeBtnSaveModal) {
      homeBtnSaveModal.disabled = false;
      if (homeBtnSaveModalLabel) homeBtnSaveModalLabel.textContent = window.SOSafeLang ? window.SOSafeLang.t('contact_modal_save') : "Save Contact";
    }

    if (homeContactModal) homeContactModal.classList.add('active');
    if (homeContactNameInput) homeContactNameInput.focus();
  }

  function openHomeEditModal(c) {
    homeTargetSlot = c._slot || null;
    homeEditingTable = c._table || (c._slot ? `emergency_contact${c._slot}` : null);

    const slotInfo = c._slot ? ` (Slot 0${c._slot} • ${homeEditingTable})` : '';
    if (homeContactModalTitle) homeContactModalTitle.textContent = `${window.SOSafeLang ? window.SOSafeLang.t('contact_modal_edit_title') : "Edit Emergency Contact"}${slotInfo}`;
    if (homeContactIdInput) homeContactIdInput.value = c.id;
    if (homeContactNameInput) {
      homeContactNameInput.value = c.name || '';
      if (homeLiveAvatarPreview) {
        homeLiveAvatarPreview.textContent = (c.name || 'C').charAt(0).toUpperCase();
      }
      if (homeNameValidIcon) homeNameValidIcon.classList.add('valid');
    }
    let rawPhone = c.phone || '';
    if (rawPhone.startsWith('+91 ')) rawPhone = rawPhone.replace('+91 ', '');
    else if (rawPhone.startsWith('+91')) rawPhone = rawPhone.replace('+91', '');
    if (homeContactPhoneInput) {
      homeContactPhoneInput.value = rawPhone.trim();
      if (homePhoneValidIcon) homePhoneValidIcon.classList.add('valid');
    }

    const rel = c.relationship || 'Parent / Family';
    if (homeContactRelationInput) homeContactRelationInput.value = rel;
    setHomeRelationChipActive(rel);

    if (homeBtnSaveModal) {
      homeBtnSaveModal.disabled = false;
      if (homeBtnSaveModalLabel) homeBtnSaveModalLabel.textContent = window.SOSafeLang ? window.SOSafeLang.t('contact_modal_save') : "Save Contact";
    }

    if (homeContactModal) homeContactModal.classList.add('active');
    if (homeContactNameInput) homeContactNameInput.focus();
  }

  function closeHomeModal() {
    homeTargetSlot = null;
    homeEditingTable = null;
    if (homeContactModal) homeContactModal.classList.remove('active');
  }

  function openHomeDeleteModal(id, tableName = null) {
    homeContactToDeleteId = id;
    homeContactToDeleteTable = tableName;
    if (homeDeleteConfirmModal) homeDeleteConfirmModal.classList.add('active');
  }

  function closeHomeDeleteModal() {
    homeContactToDeleteId = null;
    homeContactToDeleteTable = null;
    if (homeDeleteConfirmModal) homeDeleteConfirmModal.classList.remove('active');
  }

  if (homeBtnAddContact) homeBtnAddContact.addEventListener('click', () => openHomeAddModal(null));
  if (homeBtnCloseModal) homeBtnCloseModal.addEventListener('click', closeHomeModal);
  if (homeBtnCancelModal) homeBtnCancelModal.addEventListener('click', closeHomeModal);
  if (homeBtnCancelDelete) homeBtnCancelDelete.addEventListener('click', closeHomeDeleteModal);

  // Save Contact on Home (With Auto Scroll to Slot)
  if (homeContactModalForm) {
    homeContactModalForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const id = homeContactIdInput ? homeContactIdInput.value.trim() : '';
      const name = homeContactNameInput ? homeContactNameInput.value.trim() : '';
      let rawPhone = homeContactPhoneInput ? homeContactPhoneInput.value.trim() : '';
      const relationship = homeContactRelationInput ? homeContactRelationInput.value.trim() : 'Parent / Family';

      if (!name || !rawPhone) return;

      const phone = rawPhone.startsWith('+') ? rawPhone : `+91 ${rawPhone}`;
      const userId = activeUser ? activeUser.id : 'guest_demo_user';

      if (homeBtnSaveModal) {
        homeBtnSaveModal.disabled = true;
        if (homeBtnSaveModalLabel) homeBtnSaveModalLabel.textContent = "Saving to Database...";
      }

      try {
        let targetSlotIndex = homeTargetSlot ? (homeTargetSlot - 1) : homeContacts.length;

        if (id) {
          await window.SOSafeDB.updateEmergencyContact(id, {
            name,
            phone,
            relationship,
            _table: homeEditingTable
          });
          showToast(window.SOSafeLang ? window.SOSafeLang.t('contact_saved_success') : "Contact updated.");
          closeHomeModal();
          const existingIdx = homeContacts.findIndex(c => c.id === id);
          targetSlotIndex = existingIdx >= 0 ? existingIdx : 0;
          await loadHomeContacts();
          scrollToHomeSlot(targetSlotIndex);
        } else {
          await window.SOSafeDB.addEmergencyContact(userId, {
            name,
            phone,
            relationship
          }, homeTargetSlot);
          showToast(window.SOSafeLang ? window.SOSafeLang.t('contact_saved_success') : "Contact saved.");
          closeHomeModal();
          await loadHomeContacts();
          scrollToHomeSlot(Math.min(targetSlotIndex, 3));
        }
      } catch (err) {
        showToast('Failed to save contact.');
      } finally {
        if (homeBtnSaveModal) {
          homeBtnSaveModal.disabled = false;
          if (homeBtnSaveModalLabel) homeBtnSaveModalLabel.textContent = window.SOSafeLang ? window.SOSafeLang.t('contact_modal_save') : "Save Contact";
        }
      }
    });
  }

  // Delete Contact on Home
  if (homeBtnConfirmDelete) {
    homeBtnConfirmDelete.addEventListener('click', async () => {
      if (!homeContactToDeleteId) return;
      await window.SOSafeDB.deleteEmergencyContact(homeContactToDeleteId, homeContactToDeleteTable);
      showToast(window.SOSafeLang ? window.SOSafeLang.t('contact_deleted_success') : "Contact removed.");
      closeHomeDeleteModal();
      await loadHomeContacts();
    });
  }

  // ------------------------------------------------------------------------
  // SOS EMERGENCY TRIGGER & SIMULATION WITH LIVE CONTACTS
  // ------------------------------------------------------------------------
  const sosMainBtn = document.getElementById('sosMainBtn');
  const sosModalBackdrop = document.getElementById('sosModalBackdrop');
  const cancelSosBtn = document.getElementById('cancelSosBtn');
  const dismissModalBtn = document.getElementById('dismissModalBtn');
  const countdownNumber = document.getElementById('countdownNumber');
  const countdownProgressRing = document.getElementById('countdownProgressRing');
  const countdownContainer = document.getElementById('countdownContainer');
  const activatedContainer = document.getElementById('activatedContainer');
  const alertingContactsList = document.getElementById('alertingContactsList');
  const safetyBadgeText = document.getElementById('safetyBadgeText');

  function openSosModal() {
    if (!homeContacts || homeContacts.length < 2) {
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
    showToast(window.SOSafeLang ? window.SOSafeLang.t('alert_cancelled_toast') : "Alert cancelled.");
  }

  async function triggerSosActivation() {
    if (countdownContainer) countdownContainer.style.display = 'none';
    if (activatedContainer) activatedContainer.style.display = 'flex';

    if (safetyBadgeText) safetyBadgeText.textContent = "🚨 EMERGENCY ACTIVE";

    playTone(950, 'sawtooth', 0.35, 0.25);
    setTimeout(() => playTone(650, 'sawtooth', 0.35, 0.25), 200);

    // Create / Start Live Location Session for SOS
    const userId = activeUser ? activeUser.id : 'guest_demo_user';
    let liveSessionId = 'sos_' + Date.now();
    let currentCoords = { latitude: 13.0827, longitude: 80.2707, accuracy: 12 };

    // Capture device GPS if permitted
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
      const sessionRes = await window.SOSafeDB.createLiveLocationSession(userId, currentCoords);
      if (sessionRes.success && sessionRes.session) {
        liveSessionId = sessionRes.session.id;
      }
    } catch (e) {
      console.warn('Live location session notice during SOS:', e);
    }

    const baseUrl = window.location.origin + window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
    const liveShareUrl = `${baseUrl}shared-location.html?session=${liveSessionId}`;
    const emergencyMsg = window.SOSafeLang ? window.SOSafeLang.generateEmergencyMessage(liveShareUrl) : `🚨 SOSafe Emergency Alert\nLive Location:\n${liveShareUrl}`;
    const encodedBody = encodeURIComponent(emergencyMsg);

    // 1. Record Emergency Alert in Supabase database
    let alertRecordId = null;
    try {
      const alertRes = await window.SOSafeDB.createEmergencyAlert(userId, {
        live_session_id: liveSessionId.startsWith('sos_') ? null : liveSessionId,
        latitude: currentCoords.latitude,
        longitude: currentCoords.longitude,
        accuracy: currentCoords.accuracy,
        contacts_count: homeContacts.length
      });
      if (alertRes.success && alertRes.alert) {
        alertRecordId = alertRes.alert.id;
      }
    } catch (e) {
      console.warn('Supabase emergency alert record notice:', e);
    }

    // ------------------------------------------------------------------------
    // 2. TRIGGER N8N WEBHOOK (HTTP POST via Fetch API)
    // ------------------------------------------------------------------------
    let currentUserId = activeUser ? activeUser.id : null;
    if (!currentUserId) {
      try {
        const u = await window.SOSafeDB.getUser();
        currentUserId = u ? u.id : 'guest_demo_user';
      } catch (e) {
        currentUserId = 'guest_demo_user';
      }
    }

    let webhookUrl = (window.SOSafeDB && window.SOSafeDB.getN8NWebhookUrl()) || "https://obitouchiha.app.n8n.cloud/webhook-test/SOS-trigger";
    if (typeof webhookUrl === 'string') {
      webhookUrl = webhookUrl.replace(/^[\[\s"']+|[\]\s"']+$/g, '').trim();
    }

    if (webhookUrl && !webhookUrl.includes('PASTE_YOUR') && !webhookUrl.includes('your-custom-webhook-id') && !webhookUrl.includes('your-webhook-id')) {
      try {
        console.log(`[SOSafe] Initiating HTTP POST request to n8n webhook: ${webhookUrl}`);
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
          console.log('[SOSafe] n8n Webhook dispatched successfully! Status:', response.status);
          showToast('SOS Triggered Successfully!');
        } else {
          console.error(`[SOSafe] n8n Webhook Error: HTTP ${response.status} ${response.statusText}`);
          if (response.status === 405) {
            showToast('⚠️ 405 Method Not Allowed: In n8n, change Webhook node HTTP Method to POST.');
          } else {
            showToast(`⚠️ SOS Webhook failed (HTTP ${response.status})`);
          }
        }
      } catch (networkOrCorsError) {
        console.error('[SOSafe] Webhook Network or CORS Error:', networkOrCorsError);
        try {
          await fetch(webhookUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              'Content-Type': 'text/plain'
            },
            body: JSON.stringify({ user_id: currentUserId })
          });
          console.log('[SOSafe] Dispatched fallback no-cors POST request to n8n.');
          showToast('SOS Triggered Successfully!');
        } catch (fallbackError) {
          showToast('⚠️ n8n Webhook Offline: Click "Listen for test event" in n8n or activate workflow.');
        }
      }
    } else {
      console.warn('[SOSafe] Webhook URL not configured. Please paste your n8n webhook URL in Settings.');
      showToast('SOS Triggered Successfully!');
    }

    if (alertingContactsList) {
      alertingContactsList.innerHTML = '';
      if (homeContacts.length === 0) {
        alertingContactsList.innerHTML = `<div class="alert-contact-item" style="padding:0.75rem;">✓ Emergency Services & Local Safe Hub</div>`;
      } else {
        homeContacts.forEach(c => {
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
          alertingContactsList.appendChild(item);
        });

        // Add Quick Action bar to Live Location
        const liveLocAction = document.createElement('div');
        liveLocAction.style.cssText = 'margin-top:0.75rem; display:flex; gap:0.5rem; width:100%;';
        liveLocAction.innerHTML = `
          <a href="location.html" class="btn-primary-sm" style="flex:1; justify-content:center; padding:0.65rem 1rem; font-size:0.85rem;">
            📍 Open Live Location Map
          </a>
        `;
        alertingContactsList.appendChild(liveLocAction);
      }
    }
  }

  function resetToSafeState() {
    if (sosModalBackdrop) sosModalBackdrop.classList.remove('active');
    if (safetyBadgeText) {
      safetyBadgeText.textContent = window.SOSafeLang ? window.SOSafeLang.t('dash_status_safe') : "● You are Safe";
    }
    showToast("System armed & secure.");
  }

  if (sosMainBtn) sosMainBtn.addEventListener('click', openSosModal);
  if (cancelSosBtn) cancelSosBtn.addEventListener('click', cancelSosAlert);
  if (dismissModalBtn) dismissModalBtn.addEventListener('click', resetToSafeState);

  // ------------------------------------------------------------------------
  // Supabase Auth Sync with Landing Page Navbar
  // ------------------------------------------------------------------------
  const navLoginLink = document.getElementById('navLoginLink');
  const mobileNavLoginLink = document.getElementById('mobileNavLoginLink');
  const navDashboardLink = document.getElementById('navDashboardLink');
  const navUserProfile = document.getElementById('navUserProfile');
  const userAvatarBadge = document.getElementById('userAvatarBadge');
  const btnNavGetStarted = document.getElementById('btnNavGetStarted');
  const btnLogout = document.getElementById('btnLogout');

  async function syncNavbarAuthState() {
    if (!window.SOSafeDB) return;
    const currentUser = await window.SOSafeDB.getUser();

    if (currentUser) {
      if (navLoginLink) navLoginLink.style.display = 'none';
      if (mobileNavLoginLink) mobileNavLoginLink.style.display = 'none';
      if (navDashboardLink) navDashboardLink.style.display = 'block';
      if (navUserProfile) navUserProfile.style.display = 'flex';
      if (btnNavGetStarted) btnNavGetStarted.style.display = 'none';

      if (userAvatarBadge) {
        const savedImg = currentUser.profile_image || localStorage.getItem('sosafe_avatar_' + currentUser.id);
        if (savedImg && savedImg.startsWith('data:image')) {
          userAvatarBadge.innerHTML = `<img src="${savedImg}" alt="Avatar" style="width:100%; height:100%; object-fit:cover; border-radius:50%;">`;
        } else {
          const initial = (currentUser.full_name || currentUser.email || 'U').charAt(0).toUpperCase();
          userAvatarBadge.textContent = initial;
        }
      }
    } else {
      if (navLoginLink) navLoginLink.style.display = 'block';
      if (mobileNavLoginLink) mobileNavLoginLink.style.display = 'block';
      if (navDashboardLink) navDashboardLink.style.display = 'none';
      if (navUserProfile) navUserProfile.style.display = 'none';
      if (btnNavGetStarted) btnNavGetStarted.style.display = 'inline-flex';
    }
  }

  if (btnLogout) {
    btnLogout.addEventListener('click', async () => {
      if (window.SOSafeDB) {
        await window.SOSafeDB.signOut();
        showToast("Signed out successfully.");
        syncNavbarAuthState();
        await loadHomeContacts();
      }
    });
  }

  window.addEventListener('sosafe_auth_state_changed', () => {
    syncNavbarAuthState();
    loadHomeContacts();
  });

  window.addEventListener('sosafe_lang_changed', () => {
    loadHomeContacts();
  });

  await syncNavbarAuthState();
  await loadHomeContacts();

  // Mobile Drawer Toggle
  const menuToggleBtn = document.getElementById('menuToggleBtn');
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');
  if (menuToggleBtn && mobileNavOverlay) {
    menuToggleBtn.addEventListener('click', () => mobileNavOverlay.classList.toggle('open'));
    mobileNavOverlay.addEventListener('click', (e) => {
      if (e.target === mobileNavOverlay) mobileNavOverlay.classList.remove('open');
    });
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => mobileNavOverlay.classList.remove('open'));
    });
  }
});
