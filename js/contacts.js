/**
 * SOSafe - Emergency Contacts Controller
 * Next-Gen Contacts Architecture & Dedicated Save Contact Submit Option
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

  // Auth Guard
  const user = await window.SOSafeDB.requireAuth('login.html');
  if (!user) return;

  // Set Profile initial / PNG image in Navbar
  const navUserAvatar = document.getElementById('navUserAvatar');
  if (navUserAvatar) {
    const profile = await window.SOSafeDB.getProfile(user.id);
    const savedImg = (profile.profile && profile.profile.profile_image) || localStorage.getItem('sosafe_avatar_' + user.id);
    if (savedImg && savedImg.startsWith('data:image')) {
      navUserAvatar.innerHTML = `<img src="${savedImg}" alt="Avatar" style="width:100%; height:100%; object-fit:cover; border-radius:50%;">`;
    } else {
      const initial = ((profile.profile && profile.profile.full_name) || user.full_name || user.email || 'U').charAt(0).toUpperCase();
      navUserAvatar.textContent = initial;
    }
  }

  // DOM Elements
  const contactsGrid = document.getElementById('contactsGrid');
  const contactsCountBadge = document.getElementById('contactsCountBadge');
  const limitWarningBanner = document.getElementById('limitWarningBanner');
  const btnOpenAddModal = document.getElementById('btnOpenAddModal');

  // View Mode & Scrolling Controls
  const btnViewGrid = document.getElementById('btnViewGrid');
  const btnViewScroll = document.getElementById('btnViewScroll');
  const scrollNavControls = document.getElementById('scrollNavControls');
  const btnScrollLeft = document.getElementById('btnScrollLeft');
  const btnScrollRight = document.getElementById('btnScrollRight');
  const contactsScrollPills = document.getElementById('contactsScrollPills');

  // Add / Edit Modal Elements
  const contactModal = document.getElementById('contactModal');
  const contactModalTitle = document.getElementById('contactModalTitle');
  const contactModalForm = document.getElementById('contactModalForm');
  const contactIdInput = document.getElementById('contactIdInput');
  const contactNameInput = document.getElementById('contactNameInput');
  const contactPhoneInput = document.getElementById('contactPhoneInput');
  const contactRelationInput = document.getElementById('contactRelationInput');
  const relationChipsContainer = document.getElementById('relationChipsContainer');
  const modalLiveAvatarPreview = document.getElementById('modalLiveAvatarPreview');
  const nameValidIcon = document.getElementById('nameValidIcon');
  const phoneValidIcon = document.getElementById('phoneValidIcon');
  const btnCloseModal = document.getElementById('btnCloseModal');
  const btnCancelModal = document.getElementById('btnCancelModal');
  const btnSaveModal = document.getElementById('btnSaveModal');
  const btnSaveModalLabel = document.getElementById('btnSaveModalLabel');

  // Delete Modal Elements
  const deleteConfirmModal = document.getElementById('deleteConfirmModal');
  const btnConfirmDelete = document.getElementById('btnConfirmDelete');
  const btnCancelDelete = document.getElementById('btnCancelDelete');

  // Toast
  const toast = document.getElementById('contactsToast');

  let currentContacts = [];
  let contactToDeleteId = null;

  // View Mode Toggle logic (Default: Scroll View)
  if (btnViewGrid && btnViewScroll && contactsGrid) {
    btnViewGrid.addEventListener('click', () => {
      btnViewGrid.classList.add('active');
      btnViewScroll.classList.remove('active');
      contactsGrid.classList.remove('scroll-mode');
      if (scrollNavControls) scrollNavControls.style.display = 'none';
      if (contactsScrollPills) contactsScrollPills.style.display = 'none';
      localStorage.setItem('sosafe_contacts_view', 'grid');
    });

    btnViewScroll.addEventListener('click', () => {
      btnViewScroll.classList.add('active');
      btnViewGrid.classList.remove('active');
      contactsGrid.classList.add('scroll-mode');
      if (scrollNavControls) scrollNavControls.style.display = 'flex';
      if (contactsScrollPills) contactsScrollPills.style.display = 'flex';
      localStorage.setItem('sosafe_contacts_view', 'scroll');
    });

    const savedView = localStorage.getItem('sosafe_contacts_view') || 'scroll';
    if (savedView === 'grid') {
      btnViewGrid.click();
    } else {
      btnViewScroll.click();
    }
  }

  // Smooth Scroll to a specific slot index
  function scrollToSlot(slotIndex) {
    if (!contactsGrid) return;
    const cards = contactsGrid.children;
    if (cards && cards[slotIndex]) {
      cards[slotIndex].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      cards[slotIndex].classList.remove('slot-highlight-pulse');
      void cards[slotIndex].offsetWidth;
      cards[slotIndex].classList.add('slot-highlight-pulse');
      setTimeout(() => {
        if (cards[slotIndex]) cards[slotIndex].classList.remove('slot-highlight-pulse');
      }, 2000);
    }

    if (contactsScrollPills) {
      contactsScrollPills.querySelectorAll('.scroll-pill-btn').forEach((p, idx) => {
        if (idx === slotIndex) p.classList.add('active');
        else p.classList.remove('active');
      });
    }
  }

  function scrollContacts(direction) {
    if (!contactsGrid) return;
    const cardWidth = 460;
    contactsGrid.scrollBy({ left: direction * cardWidth, behavior: 'smooth' });
  }

  if (btnScrollLeft) btnScrollLeft.addEventListener('click', () => scrollContacts(-1));
  if (btnScrollRight) btnScrollRight.addEventListener('click', () => scrollContacts(1));

  // Horizontal mouse wheel scrolling support
  if (contactsGrid) {
    contactsGrid.addEventListener('wheel', (e) => {
      if (contactsGrid.classList.contains('scroll-mode') && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        contactsGrid.scrollLeft += e.deltaY;
      }
    }, { passive: false });
  }

  // Quick Slot Jump Pills Handler
  if (contactsScrollPills) {
    contactsScrollPills.querySelectorAll('.scroll-pill-btn').forEach(pill => {
      pill.addEventListener('click', () => {
        const slotIdx = parseInt(pill.getAttribute('data-slot') || '0', 10);
        scrollToSlot(slotIdx);
      });
    });
  }

  // Toast Notice Helper
  function showToast(msg, type = 'success') {
    if (!toast) return;
    toast.innerHTML = `<span style="color:var(--c-gold)">${type === 'success' ? '✓' : '⚠️'}</span> <span>${msg}</span>`;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
  }

  // Live Avatar preview and validation indicator for Name
  if (contactNameInput) {
    contactNameInput.addEventListener('input', () => {
      const val = contactNameInput.value.trim();
      const initial = (val || 'C').charAt(0).toUpperCase();
      if (modalLiveAvatarPreview) modalLiveAvatarPreview.textContent = initial;
      if (nameValidIcon) {
        if (val.length >= 2) nameValidIcon.classList.add('valid');
        else nameValidIcon.classList.remove('valid');
      }
    });
  }

  // Live validation indicator for Phone
  if (contactPhoneInput && phoneValidIcon) {
    contactPhoneInput.addEventListener('input', () => {
      const val = contactPhoneInput.value.trim().replace(/\s+/g, '');
      if (val.length >= 8) phoneValidIcon.classList.add('valid');
      else phoneValidIcon.classList.remove('valid');
    });
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

  // --------------------------------------------------------------------------
  // RENDER 4 CONTACT CARDS WITH GUARANTEED ACCESSIBILITY
  // --------------------------------------------------------------------------
  async function renderContacts() {
    const res = await window.SOSafeDB.getEmergencyContacts(user.id);
    currentContacts = res.contacts || [];

    const total = currentContacts.length;

    // Update Badges & HUD Dots
    if (contactsCountBadge) {
      contactsCountBadge.textContent = `${total} / 4 Active`;
    }

    // Update Minimum 2 Contacts Requirement Banner
    const minContactsBanner = document.getElementById('minContactsAlertBanner');
    const minBannerIcon = document.getElementById('minContactsBannerIcon');
    const minBannerTitle = document.getElementById('minContactsBannerTitle');
    const minBannerDesc = document.getElementById('minContactsBannerDesc');
    const btnProceed = document.getElementById('btnProceedToDashboard');

    if (minContactsBanner) {
      if (total >= 2) {
        minContactsBanner.style.background = 'rgba(76, 175, 80, 0.12)';
        minContactsBanner.style.borderColor = '#4CAF50';
        if (minBannerIcon) minBannerIcon.textContent = '✅';
        if (minBannerTitle) minBannerTitle.textContent = `${total} / 4 Emergency Contacts Active (Ready for SOS)`;
        if (minBannerDesc) minBannerDesc.textContent = 'Minimum 2 contacts requirement fulfilled! Your SOS emergency protection is active and connected to Make.com automation.';
        if (btnProceed) {
          btnProceed.style.display = 'inline-flex';
          btnProceed.textContent = '🚀 Proceed to SOS Dashboard ➔';
        }
      } else {
        minContactsBanner.style.background = 'rgba(208, 63, 116, 0.12)';
        minContactsBanner.style.borderColor = 'var(--c-berry-rose)';
        if (minBannerIcon) minBannerIcon.textContent = '⚠️';
        if (minBannerTitle) minBannerTitle.textContent = `At least 2 Emergency Contacts Required (${total} / 2 added)`;
        if (minBannerDesc) minBannerDesc.textContent = `Please add at least ${2 - total} more contact(s) so that guardians can receive immediate SMS alerts when SOS is pressed.`;
        if (btnProceed) {
          btnProceed.style.display = 'none';
        }
      }
    }

    // Capacity Dots
    for (let d = 1; d <= 4; d++) {
      const dot = document.getElementById(`dot${d}`);
      if (dot) {
        if (d <= total) {
          dot.classList.add('filled');
        } else {
          dot.classList.remove('filled');
        }
      }
    }

    // Always keep Add Contact Button fully enabled
    if (btnOpenAddModal) {
      btnOpenAddModal.disabled = false;
      btnOpenAddModal.style.opacity = '1';
      btnOpenAddModal.style.cursor = 'pointer';
    }

    if (!contactsGrid) return;
    contactsGrid.innerHTML = '';

    // Render 4 Slots
    for (let i = 0; i < 4; i++) {
      const contact = currentContacts[i];
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
            <button type="button" class="btn-card-action edit-btn" data-id="${contact.id}" data-table="${contactTable}">
              ✏️ ${window.SOSafeLang.t('contact_btn_edit')}
            </button>
            <button type="button" class="btn-card-action delete-btn" data-id="${contact.id}" data-table="${contactTable}">
              🗑️ ${window.SOSafeLang.t('contact_btn_delete')}
            </button>
          </div>
        `;

        card.addEventListener('click', (e) => {
          if (!e.target.closest('.btn-card-action')) {
            scrollToSlot(i);
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
            <button type="button" class="btn-primary-sm btn-slot-add">
              + Add Contact
            </button>
          </div>
        `;

        // Direct click on the empty slot card
        card.addEventListener('click', () => {
          scrollToSlot(i);
          openAddModal(i + 1);
        });

        const slotAddBtn = card.querySelector('.btn-slot-add');
        if (slotAddBtn) {
          slotAddBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            scrollToSlot(i);
            openAddModal(i + 1);
          });
        }
      }

      contactsGrid.appendChild(card);
    }

    // Attach Action Listeners
    document.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        const tbl = btn.getAttribute('data-table');
        const c = currentContacts.find(item => item.id === id);
        if (c) openEditModal({ ...c, _table: tbl });
      });
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        const tbl = btn.getAttribute('data-table');
        openDeleteModal(id, tbl);
      });
    });
  }

  // --------------------------------------------------------------------------
  // RELATIONSHIP CHIPS SELECTOR HANDLER
  // --------------------------------------------------------------------------
  if (relationChipsContainer) {
    relationChipsContainer.querySelectorAll('.relation-chip-btn').forEach(chip => {
      chip.addEventListener('click', () => {
        relationChipsContainer.querySelectorAll('.relation-chip-btn').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const rel = chip.getAttribute('data-rel');
        if (contactRelationInput) contactRelationInput.value = rel;
      });
    });
  }

  function setRelationChipActive(relValue) {
    if (!relationChipsContainer) return;
    let matched = false;
    relationChipsContainer.querySelectorAll('.relation-chip-btn').forEach(chip => {
      if (chip.getAttribute('data-rel') === relValue) {
        chip.classList.add('active');
        matched = true;
      } else {
        chip.classList.remove('active');
      }
    });
    if (!matched && relationChipsContainer.firstElementChild) {
      relationChipsContainer.firstElementChild.classList.add('active');
      if (contactRelationInput) contactRelationInput.value = relationChipsContainer.firstElementChild.getAttribute('data-rel');
    }
  }

  let currentTargetSlot = null;
  let currentEditingTable = null;
  let contactToDeleteTable = null;

  // --------------------------------------------------------------------------
  // MODAL HANDLERS
  // --------------------------------------------------------------------------
  function openAddModal(slotIndex = null) {
    currentTargetSlot = slotIndex;
    currentEditingTable = slotIndex ? `emergency_contact${slotIndex}` : null;

    const slotInfo = slotIndex ? ` (Slot 0${slotIndex} • Table: emergency_contact${slotIndex})` : '';
    if (contactModalTitle) contactModalTitle.textContent = `${window.SOSafeLang.t('contact_modal_add_title')}${slotInfo}`;
    if (contactIdInput) contactIdInput.value = '';
    if (contactNameInput) contactNameInput.value = '';
    if (modalLiveAvatarPreview) modalLiveAvatarPreview.textContent = 'C';
    if (nameValidIcon) nameValidIcon.classList.remove('valid');
    if (contactPhoneInput) contactPhoneInput.value = '';
    if (phoneValidIcon) phoneValidIcon.classList.remove('valid');
    if (contactRelationInput) contactRelationInput.value = 'Parent / Family';
    setRelationChipActive('Parent / Family');

    // Reset Save Button text & state
    if (btnSaveModal) {
      btnSaveModal.disabled = false;
      if (btnSaveModalLabel) btnSaveModalLabel.textContent = window.SOSafeLang.t('contact_modal_save');
    }

    if (contactModal) contactModal.classList.add('active');
    if (contactNameInput) contactNameInput.focus();
  }

  function openEditModal(c) {
    currentTargetSlot = c._slot || null;
    currentEditingTable = c._table || (c._slot ? `emergency_contact${c._slot}` : null);

    const slotInfo = c._slot ? ` (Slot 0${c._slot} • ${currentEditingTable})` : '';
    if (contactModalTitle) contactModalTitle.textContent = `${window.SOSafeLang.t('contact_modal_edit_title')}${slotInfo}`;
    if (contactIdInput) contactIdInput.value = c.id;
    if (contactNameInput) {
      contactNameInput.value = c.name || '';
      if (modalLiveAvatarPreview) {
        modalLiveAvatarPreview.textContent = (c.name || 'C').charAt(0).toUpperCase();
      }
      if (nameValidIcon) nameValidIcon.classList.add('valid');
    }
    let rawPhone = c.phone || '';
    if (rawPhone.startsWith('+91 ')) rawPhone = rawPhone.replace('+91 ', '');
    else if (rawPhone.startsWith('+91')) rawPhone = rawPhone.replace('+91', '');
    if (contactPhoneInput) {
      contactPhoneInput.value = rawPhone.trim();
      if (phoneValidIcon) phoneValidIcon.classList.add('valid');
    }

    const rel = c.relationship || 'Parent / Family';
    if (contactRelationInput) contactRelationInput.value = rel;
    setRelationChipActive(rel);

    if (btnSaveModal) {
      btnSaveModal.disabled = false;
      if (btnSaveModalLabel) btnSaveModalLabel.textContent = window.SOSafeLang.t('contact_modal_save');
    }

    if (contactModal) contactModal.classList.add('active');
    if (contactNameInput) contactNameInput.focus();
  }

  function closeModal() {
    currentTargetSlot = null;
    currentEditingTable = null;
    if (contactModal) contactModal.classList.remove('active');
  }

  function openDeleteModal(id, tableName = null) {
    contactToDeleteId = id;
    contactToDeleteTable = tableName;
    if (deleteConfirmModal) deleteConfirmModal.classList.add('active');
  }

  function closeDeleteModal() {
    contactToDeleteId = null;
    contactToDeleteTable = null;
    if (deleteConfirmModal) deleteConfirmModal.classList.remove('active');
  }

  if (btnOpenAddModal) btnOpenAddModal.addEventListener('click', () => openAddModal(null));
  const btnDrawerAddContact = document.getElementById('btnDrawerAddContact');
  if (btnDrawerAddContact) btnDrawerAddContact.addEventListener('click', () => openAddModal(null));
  if (btnCloseModal) btnCloseModal.addEventListener('click', closeModal);
  if (btnCancelModal) btnCancelModal.addEventListener('click', closeModal);
  if (btnCancelDelete) btnCancelDelete.addEventListener('click', closeDeleteModal);

  // --------------------------------------------------------------------------
  // FORM SUBMISSION (SAVE & SUBMIT CONTACT TO SUPABASE)
  // --------------------------------------------------------------------------
  if (contactModalForm) {
    contactModalForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const id = contactIdInput ? contactIdInput.value.trim() : '';
      const name = contactNameInput ? contactNameInput.value.trim() : '';
      let rawPhone = contactPhoneInput ? contactPhoneInput.value.trim() : '';
      const relationship = contactRelationInput ? contactRelationInput.value.trim() : 'Parent / Family';

      if (!name || !rawPhone) {
        showToast(window.SOSafeLang.t('val_required_fields'), 'error');
        return;
      }

      // Prepend country code +91 if not included
      const phone = rawPhone.startsWith('+') ? rawPhone : `+91 ${rawPhone}`;

      if (btnSaveModal) {
        btnSaveModal.disabled = true;
        if (btnSaveModalLabel) btnSaveModalLabel.textContent = "Saving to Database...";
      }

      try {
        let targetSlotIndex = currentTargetSlot ? (currentTargetSlot - 1) : currentContacts.length;

        if (id) {
          // UPDATE
          const res = await window.SOSafeDB.updateEmergencyContact(id, {
            name,
            phone,
            relationship,
            _table: currentEditingTable
          });
          if (res.success) {
            showToast(window.SOSafeLang.t('contact_saved_success'));
            closeModal();
            const existingIdx = currentContacts.findIndex(c => c.id === id);
            targetSlotIndex = existingIdx >= 0 ? existingIdx : 0;
            await renderContacts();
            scrollToSlot(targetSlotIndex);
          } else {
            showToast(res.error || 'Failed to update contact.', 'error');
          }
        } else {
          // INSERT INTO DESIGNATED SEPARATE TABLE
          const res = await window.SOSafeDB.addEmergencyContact(user.id, {
            name,
            phone,
            relationship
          }, currentTargetSlot);

          if (res.success) {
            showToast(window.SOSafeLang.t('contact_saved_success'));
            closeModal();
            await renderContacts();
            scrollToSlot(Math.min(targetSlotIndex, 3));
          } else {
            showToast(res.error || 'Failed to add contact.', 'error');
          }
        }
      } catch (err) {
        showToast('Database error occurred.', 'error');
      } finally {
        if (btnSaveModal) {
          btnSaveModal.disabled = false;
          if (btnSaveModalLabel) btnSaveModalLabel.textContent = window.SOSafeLang.t('contact_modal_save');
        }
      }
    });
  }

  // --------------------------------------------------------------------------
  // DELETE CONTACT SUBMISSION
  // --------------------------------------------------------------------------
  if (btnConfirmDelete) {
    btnConfirmDelete.addEventListener('click', async () => {
      if (!contactToDeleteId) return;

      btnConfirmDelete.disabled = true;
      btnConfirmDelete.textContent = "Deleting...";

      try {
        const res = await window.SOSafeDB.deleteEmergencyContact(contactToDeleteId, contactToDeleteTable);
        if (res.success) {
          showToast(window.SOSafeLang.t('contact_deleted_success'));
          closeDeleteModal();
          await renderContacts();
        } else {
          showToast(res.error || 'Failed to remove contact.', 'error');
        }
      } catch (err) {
        showToast('Error removing contact.', 'error');
      } finally {
        btnConfirmDelete.disabled = false;
        btnConfirmDelete.textContent = window.SOSafeLang.t('contact_btn_delete');
      }
    });
  }

  // Logout Handler
  const logoutBtn = document.getElementById('btnLogout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      await window.SOSafeDB.signOut();
      window.location.href = 'login.html';
    });
  }

  // Initial Load
  await renderContacts();
});
