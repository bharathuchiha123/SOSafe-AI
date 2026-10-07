/**
 * ============================================================================
 * SOSafe - Profile Page Controller with PNG / JPG Image & Icon Support
 * Handles loading, editing, and saving user profile & avatar images
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Initialize multilingual engine
  if (window.SOSafeLang) {
    window.SOSafeLang.init();
  }

  // 2. Theme Initializer
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

  // 3. Require Auth
  const user = await window.SOSafeDB.requireAuth('login.html');
  if (!user) return;

  // 4. DOM Elements
  const profileAvatarLarge = document.getElementById('profileAvatarLarge');
  const profileAvatarInitial = document.getElementById('profileAvatarInitial');
  const profileAvatarImg = document.getElementById('profileAvatarImg');
  const profileAvatarFileInput = document.getElementById('profileAvatarFileInput');
  const btnUploadAvatar = document.getElementById('btnUploadAvatar');
  const btnRemoveAvatar = document.getElementById('btnRemoveAvatar');

  const profileNameDisplay = document.getElementById('profileNameDisplay');
  const profileEmailDisplay = document.getElementById('profileEmailDisplay');
  const profileFullName = document.getElementById('profileFullName');
  const profilePhone = document.getElementById('profilePhone');
  const profileMedical = document.getElementById('profileMedical');
  const profileForm = document.getElementById('profileForm');
  const btnSaveProfile = document.getElementById('btnSaveProfile');
  const profileToast = document.getElementById('profileToast');
  const navUserAvatar = document.getElementById('navUserAvatar');

  let currentProfile = null;
  let activeAvatarBase64 = null;

  function showToast(msg) {
    if (!profileToast) return;
    profileToast.innerHTML = `<span style="color:var(--c-coral-blossom)">✓</span> <span>${msg}</span>`;
    profileToast.classList.add('show');
    setTimeout(() => {
      profileToast.classList.remove('show');
    }, 3500);
  }

  // Render Avatar Helper (Supports PNG, JPG, JPEG, or Initial letter fallback)
  function renderAvatar(imageUrl, fallbackName) {
    const initial = (fallbackName || 'U').charAt(0).toUpperCase();

    if (imageUrl && imageUrl.startsWith('data:image')) {
      if (profileAvatarImg) {
        profileAvatarImg.src = imageUrl;
        profileAvatarImg.style.display = 'block';
      }
      if (profileAvatarInitial) profileAvatarInitial.style.display = 'none';
      if (btnRemoveAvatar) btnRemoveAvatar.style.display = 'inline-flex';

      if (navUserAvatar) {
        navUserAvatar.innerHTML = `<img src="${imageUrl}" alt="User Avatar" style="width:100%; height:100%; object-fit:cover; border-radius:50%;">`;
      }
    } else {
      if (profileAvatarImg) profileAvatarImg.style.display = 'none';
      if (profileAvatarInitial) {
        profileAvatarInitial.textContent = initial;
        profileAvatarInitial.style.display = 'block';
      }
      if (btnRemoveAvatar) btnRemoveAvatar.style.display = 'none';

      if (navUserAvatar) {
        navUserAvatar.textContent = initial;
      }
    }
  }

  // 5. Load Profile Data
  async function loadProfile() {
    const res = await window.SOSafeDB.getProfile(user.id);
    currentProfile = (res && res.profile) || user;

    const name = currentProfile.full_name || 'Safety User';
    const email = currentProfile.email || user.email;
    const phone = currentProfile.phone || '';
    const medical = currentProfile.medical_notes || localStorage.getItem(`sosafe_med_${user.id}`) || '';
    const savedImage = currentProfile.profile_image || localStorage.getItem(`sosafe_avatar_${user.id}`) || '';

    if (profileNameDisplay) profileNameDisplay.textContent = name;
    if (profileEmailDisplay) profileEmailDisplay.textContent = email;
    if (profileFullName) profileFullName.value = name !== 'Safety User' ? name : '';
    if (profilePhone) profilePhone.value = phone;
    if (profileMedical) profileMedical.value = medical;

    activeAvatarBase64 = savedImage;
    renderAvatar(savedImage, name);
  }

  // 6. Handle Image File Selection (PNG, JPG, JPEG, WebP)
  function handleImageFile(file) {
    if (!file) return;

    // Check file type
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    if (!validTypes.includes(file.type.toLowerCase())) {
      showToast("Please upload a valid .PNG, .JPG, or .JPEG image file.");
      return;
    }

    // Check size (Max 3MB)
    if (file.size > 3 * 1024 * 1024) {
      showToast("Image size must be under 3MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      activeAvatarBase64 = e.target.result;
      renderAvatar(activeAvatarBase64, profileFullName.value || 'U');
      localStorage.setItem(`sosafe_avatar_${user.id}`, activeAvatarBase64);
      showToast("Profile icon preview updated! Click Save Profile to persist.");
    };
    reader.readAsDataURL(file);
  }

  if (profileAvatarLarge) {
    profileAvatarLarge.addEventListener('click', () => {
      if (profileAvatarFileInput) profileAvatarFileInput.click();
    });
  }

  if (btnUploadAvatar) {
    btnUploadAvatar.addEventListener('click', () => {
      if (profileAvatarFileInput) profileAvatarFileInput.click();
    });
  }

  if (profileAvatarFileInput) {
    profileAvatarFileInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (file) handleImageFile(file);
    });
  }

  if (btnRemoveAvatar) {
    btnRemoveAvatar.addEventListener('click', () => {
      activeAvatarBase64 = '';
      localStorage.removeItem(`sosafe_avatar_${user.id}`);
      renderAvatar('', profileFullName.value || 'U');
      showToast("Profile icon removed.");
    });
  }

  // 7. Save Profile Form
  if (profileForm) {
    profileForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const fullName = profileFullName ? profileFullName.value.trim() : '';
      const phone = profilePhone ? profilePhone.value.trim() : '';
      const medical = profileMedical ? profileMedical.value.trim() : '';

      if (!fullName) {
        showToast("Please enter your full name.");
        return;
      }

      if (btnSaveProfile) {
        btnSaveProfile.disabled = true;
        btnSaveProfile.innerHTML = '<span>Saving...</span>';
      }

      try {
        // Save medical notes locally
        if (medical) {
          localStorage.setItem(`sosafe_med_${user.id}`, medical);
        } else {
          localStorage.removeItem(`sosafe_med_${user.id}`);
        }

        // Save profile image
        if (activeAvatarBase64) {
          localStorage.setItem(`sosafe_avatar_${user.id}`, activeAvatarBase64);
        }

        const updateRes = await window.SOSafeDB.updateProfile(user.id, {
          full_name: fullName,
          phone: phone,
          profile_image: activeAvatarBase64 || ''
        });

        if (updateRes.success) {
          showToast('✓ Profile details saved! Next: Add at least 2 Emergency Contacts ➔');
          await loadProfile();
          setTimeout(() => {
            window.location.href = 'contacts.html?onboarding=1';
          }, 1000);
        } else {
          showToast(updateRes.error || "Profile update failed.");
        }
      } catch (err) {
        showToast("Error updating profile.");
      } finally {
        if (btnSaveProfile) {
          btnSaveProfile.disabled = false;
          btnSaveProfile.innerHTML = '<span>💾 Save Profile</span>';
        }
      }
    });
  }

  // 8. Logout Handlers
  const logoutBtn = document.getElementById('btnLogout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      await window.SOSafeDB.signOut();
      window.location.href = 'login.html';
    });
  }

  // 9. Mobile navigation
  const menuToggleBtn = document.getElementById('menuToggleBtn');
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');
  if (menuToggleBtn && mobileNavOverlay) {
    menuToggleBtn.addEventListener('click', () => mobileNavOverlay.classList.toggle('open'));
    mobileNavOverlay.addEventListener('click', (e) => {
      if (e.target === mobileNavOverlay) mobileNavOverlay.classList.remove('open');
    });
  }

  await loadProfile();
});
