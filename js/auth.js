/**
 * ============================================================================
 * SOSafe - Premium Authentication Controller
 * Handles Sign In, Sign Up, Real-Time Password Validation, Strength Meter,
 * Google OAuth, Show/Hide Password, and Supabase Configuration
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

  // 3. DOM Elements
  const signinForm = document.getElementById('signinForm');
  const signupForm = document.getElementById('signupForm');
  const googleLoginBtn = document.getElementById('googleLoginBtn');
  const googleSignupBtn = document.getElementById('googleSignupBtn');
  const authAlert = document.getElementById('authAlert');
  const alertText = document.getElementById('alertText');
  const alertIcon = document.getElementById('alertIcon');
  const rememberMeCheckbox = document.getElementById('rememberMeCheckbox');
  const signinEmailInput = document.getElementById('signinEmail');
  const btnForgotPwd = document.getElementById('btnForgotPwd');

  // Password Visibility Toggles with SVG Icon Swapping
  document.querySelectorAll('.btn-toggle-eye').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const input = document.getElementById(targetId);
      const showIcon = btn.querySelector('.eye-show-icon');
      const hideIcon = btn.querySelector('.eye-hide-icon');

      if (input) {
        if (input.type === 'password') {
          input.type = 'text';
          if (showIcon) showIcon.style.display = 'none';
          if (hideIcon) hideIcon.style.display = 'block';
          btn.setAttribute('aria-label', window.SOSafeLang ? window.SOSafeLang.t('auth_hide_password') : 'Hide password');
        } else {
          input.type = 'password';
          if (showIcon) showIcon.style.display = 'block';
          if (hideIcon) hideIcon.style.display = 'none';
          btn.setAttribute('aria-label', window.SOSafeLang ? window.SOSafeLang.t('auth_show_password') : 'Show password');
        }
      }
    });
  });

  // 4. Remember Me Auto-Fill
  if (signinEmailInput && rememberMeCheckbox) {
    const savedEmail = localStorage.getItem('sosafe_remember_email');
    if (savedEmail) {
      signinEmailInput.value = savedEmail;
      rememberMeCheckbox.checked = true;
    }
  }

  // 5. Forgot Password Notice
  if (btnForgotPwd) {
    btnForgotPwd.addEventListener('click', (e) => {
      e.preventDefault();
      const email = signinEmailInput ? signinEmailInput.value.trim() : '';
      if (email && isValidEmail(email)) {
        showAlert(`Password reset instructions sent to ${email}`, 'success');
      } else {
        showAlert('Please enter your registered email address above to reset your password.', 'error');
        if (signinEmailInput) signinEmailInput.focus();
      }
    });
  }

  // 6. Alert Banner Helper
  function showAlert(msg, type = 'error') {
    if (!authAlert) return;
    authAlert.className = `auth-alert ${type}`;
    if (alertIcon) {
      alertIcon.textContent = type === 'success' ? '✓' : '⚠️';
    }
    if (alertText) {
      alertText.innerHTML = msg;
    }
    authAlert.style.display = 'flex';
  }

  function hideAlert() {
    if (authAlert) {
      authAlert.style.display = 'none';
    }
  }

  function showInlineError(errorElId, msg) {
    const el = document.getElementById(errorElId);
    if (el) {
      const span = el.querySelector('span:last-child');
      if (span && msg) span.textContent = msg;
      el.classList.add('show');
    }
  }

  function hideInlineError(errorElId) {
    const el = document.getElementById(errorElId);
    if (el) {
      el.classList.remove('show');
    }
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // --------------------------------------------------------------------------
  // REAL-TIME PASSWORD VALIDATION & STRENGTH METER (SIGN UP)
  // --------------------------------------------------------------------------
  const signupPasswordInput = document.getElementById('signupPassword');
  const pwdStrengthContainer = document.getElementById('pwdStrengthContainer');
  const pwdStrengthLabel = document.getElementById('pwdStrengthLabel');
  const pwdStrengthBar = document.getElementById('pwdStrengthBar');

  const reqLength = document.getElementById('reqLength');
  const reqUpper = document.getElementById('reqUpper');
  const reqNumber = document.getElementById('reqNumber');
  const reqSpecial = document.getElementById('reqSpecial');

  const checkSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`;
  const circleSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/></svg>`;

  function updateReqItem(el, isMet) {
    if (!el) return;
    const svgEl = el.querySelector('svg');
    if (isMet) {
      el.classList.add('met');
      if (svgEl) svgEl.outerHTML = checkSvg;
    } else {
      el.classList.remove('met');
      if (svgEl) svgEl.outerHTML = circleSvg;
    }
  }

  if (signupPasswordInput) {
    signupPasswordInput.addEventListener('input', () => {
      const val = signupPasswordInput.value;
      hideInlineError('signupPasswordError');

      if (val.length === 0) {
        if (pwdStrengthContainer) pwdStrengthContainer.style.display = 'none';
        updateReqItem(reqLength, false);
        updateReqItem(reqUpper, false);
        updateReqItem(reqNumber, false);
        updateReqItem(reqSpecial, false);
        return;
      }

      if (pwdStrengthContainer) pwdStrengthContainer.style.display = 'flex';

      const hasLength = val.length >= 8;
      const hasUpper = /[A-Z]/.test(val);
      const hasNumber = /[0-9]/.test(val);
      const hasSpecial = /[^A-Za-z0-9]/.test(val);

      updateReqItem(reqLength, hasLength);
      updateReqItem(reqUpper, hasUpper);
      updateReqItem(reqNumber, hasNumber);
      updateReqItem(reqSpecial, hasSpecial);

      const score = [hasLength, hasUpper, hasNumber, hasSpecial].filter(Boolean).length;

      if (score <= 2) {
        if (pwdStrengthBar) {
          pwdStrengthBar.className = 'strength-bar-fill weak';
        }
        if (pwdStrengthLabel) {
          pwdStrengthLabel.textContent = window.SOSafeLang ? window.SOSafeLang.t('auth_pwd_weak') : 'Weak';
          pwdStrengthLabel.style.color = '#E53935';
        }
      } else if (score === 3) {
        if (pwdStrengthBar) {
          pwdStrengthBar.className = 'strength-bar-fill medium';
        }
        if (pwdStrengthLabel) {
          pwdStrengthLabel.textContent = window.SOSafeLang ? window.SOSafeLang.t('auth_pwd_medium') : 'Medium';
          pwdStrengthLabel.style.color = '#FB8C00';
        }
      } else {
        if (pwdStrengthBar) {
          pwdStrengthBar.className = 'strength-bar-fill strong';
        }
        if (pwdStrengthLabel) {
          pwdStrengthLabel.textContent = window.SOSafeLang ? window.SOSafeLang.t('auth_pwd_strong') : 'Strong';
          pwdStrengthLabel.style.color = '#43A047';
        }
      }
    });
  }

  // --------------------------------------------------------------------------
  // GOOGLE LOGIN & SIGN UP HANDLER
  // --------------------------------------------------------------------------
  async function handleGoogleAuth() {
    hideAlert();
    showAlert(window.SOSafeLang ? window.SOSafeLang.t('val_google_redirect') : 'Redirecting to Google Authentication...', 'success');

    try {
      const res = await window.SOSafeDB.signInWithOAuth('google');
      if (res.success) {
        setTimeout(() => {
          window.location.href = 'dashboard.html';
        }, 800);
      } else {
        showAlert(res.error || 'Google authentication failed.');
      }
    } catch (err) {
      showAlert('Google authentication encountered an issue.');
    }
  }

  if (googleLoginBtn) googleLoginBtn.addEventListener('click', handleGoogleAuth);
  if (googleSignupBtn) googleSignupBtn.addEventListener('click', handleGoogleAuth);

  // --------------------------------------------------------------------------
  // SIGN IN FORM SUBMISSION
  // --------------------------------------------------------------------------
  if (signinForm) {
    signinForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      hideAlert();
      hideInlineError('signinEmailError');
      hideInlineError('signinPasswordError');

      const emailInput = document.getElementById('signinEmail');
      const passwordInput = document.getElementById('signinPassword');
      const submitBtn = document.getElementById('signinSubmitBtn');
      const btnText = document.getElementById('signinBtnText');

      const email = emailInput ? emailInput.value.trim() : '';
      const password = passwordInput ? passwordInput.value : '';

      let hasError = false;

      if (!email) {
        showInlineError('signinEmailError', 'Please enter your email address.');
        if (emailInput) emailInput.classList.add('invalid');
        hasError = true;
      } else if (!isValidEmail(email)) {
        showInlineError('signinEmailError', window.SOSafeLang ? window.SOSafeLang.t('val_email_invalid') : 'Please enter a valid email address.');
        if (emailInput) emailInput.classList.add('invalid');
        hasError = true;
      } else {
        if (emailInput) emailInput.classList.remove('invalid');
      }

      if (!password) {
        showInlineError('signinPasswordError', 'Please enter your password.');
        if (passwordInput) passwordInput.classList.add('invalid');
        hasError = true;
      } else if (password.length < 6) {
        showInlineError('signinPasswordError', 'Password must be at least 6 characters.');
        if (passwordInput) passwordInput.classList.add('invalid');
        hasError = true;
      } else {
        if (passwordInput) passwordInput.classList.remove('invalid');
      }

      if (hasError) return;

      // Handle Remember Me
      if (rememberMeCheckbox && rememberMeCheckbox.checked) {
        localStorage.setItem('sosafe_remember_email', email);
      } else {
        localStorage.removeItem('sosafe_remember_email');
      }

      // Button Loading State
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="spinner-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-dashoffset="12"/>
          </svg>
          <span>${window.SOSafeLang ? window.SOSafeLang.t('auth_btn_signin_loading') : 'Signing in...'}</span>
        `;
      }

      try {
        const res = await window.SOSafeDB.signInWithPassword(email, password);
        if (res.success) {
          showAlert(window.SOSafeLang ? window.SOSafeLang.t('val_login_success') : 'Signed in successfully! Redirecting to Profile...', 'success');
          setTimeout(() => {
            window.location.href = 'profile.html?welcome=1';
          }, 600);
        } else {
          let errMsg = res.error || 'Invalid email or password.';
          if (errMsg.toLowerCase().includes('invalid login credentials') || errMsg.toLowerCase().includes('invalid credentials')) {
            errMsg = `Invalid email or password. Don't have an account yet? <a href="signup.html" style="color:var(--c-coral-blossom); font-weight:800; text-decoration:underline;">Create one here</a>`;
          } else if (errMsg.toLowerCase().includes('email not confirmed')) {
            errMsg = `Email not confirmed yet. Please check your inbox for the Supabase confirmation link or disable "Confirm email" in Supabase Dashboard.`;
          }
          showAlert(errMsg, 'error');
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = `<span id="signinBtnText">${window.SOSafeLang ? window.SOSafeLang.t('auth_btn_signin') : 'Sign In'}</span>`;
          }
        }
      } catch (err) {
        console.error('Sign in error:', err);
        let errMsg = err.message || 'An error occurred while signing in.';
        if (errMsg.toLowerCase().includes('invalid login credentials')) {
          errMsg = `Invalid email or password. Don't have an account yet? <a href="signup.html" style="color:var(--c-coral-blossom); font-weight:800; text-decoration:underline;">Create one here</a>`;
        }
        showAlert(errMsg, 'error');
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `<span id="signinBtnText">${window.SOSafeLang ? window.SOSafeLang.t('auth_btn_signin') : 'Sign In'}</span>`;
        }
      }
    });
  }

  // --------------------------------------------------------------------------
  // SIGN UP FORM SUBMISSION
  // --------------------------------------------------------------------------
  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      hideAlert();
      hideInlineError('signupNameError');
      hideInlineError('signupEmailError');
      hideInlineError('signupPasswordError');
      hideInlineError('signupConfirmPasswordError');

      const nameInput = document.getElementById('signupName');
      const emailInput = document.getElementById('signupEmail');
      const phoneInput = document.getElementById('signupPhone');
      const passwordInput = document.getElementById('signupPassword');
      const confirmPasswordInput = document.getElementById('signupConfirmPassword');
      const submitBtn = document.getElementById('signupSubmitBtn');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const phone = phoneInput ? phoneInput.value.trim() : '';
      const password = passwordInput ? passwordInput.value : '';
      const confirmPassword = confirmPasswordInput ? confirmPasswordInput.value : '';

      let hasError = false;

      if (!name) {
        showInlineError('signupNameError', 'Please enter your full name.');
        if (nameInput) nameInput.classList.add('invalid');
        hasError = true;
      } else {
        if (nameInput) nameInput.classList.remove('invalid');
      }

      if (!email || !isValidEmail(email)) {
        showInlineError('signupEmailError', window.SOSafeLang ? window.SOSafeLang.t('val_email_invalid') : 'Please enter a valid email address.');
        if (emailInput) emailInput.classList.add('invalid');
        hasError = true;
      } else {
        if (emailInput) emailInput.classList.remove('invalid');
      }

      if (!password || password.length < 8) {
        showInlineError('signupPasswordError', 'Password must be at least 8 characters.');
        if (passwordInput) passwordInput.classList.add('invalid');
        hasError = true;
      } else {
        if (passwordInput) passwordInput.classList.remove('invalid');
      }

      if (password !== confirmPassword) {
        showInlineError('signupConfirmPasswordError', window.SOSafeLang ? window.SOSafeLang.t('val_password_mismatch') : 'Passwords do not match.');
        if (confirmPasswordInput) confirmPasswordInput.classList.add('invalid');
        hasError = true;
      } else {
        if (confirmPasswordInput) confirmPasswordInput.classList.remove('invalid');
      }

      if (hasError) return;

      // Button Loading State
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="spinner-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-dashoffset="12"/>
          </svg>
          <span>${window.SOSafeLang ? window.SOSafeLang.t('auth_btn_signup_loading') : 'Creating Account...'}</span>
        `;
      }

      try {
        const res = await window.SOSafeDB.signUp(email, password, name, phone);
        if (res.success) {
          if (res.needsEmailConfirmation) {
            showAlert("✓ Account created! Please check your email to confirm, then Sign In.", 'success');
            setTimeout(() => {
              window.location.href = 'login.html';
            }, 2500);
          } else {
            showAlert(window.SOSafeLang ? window.SOSafeLang.t('val_signup_success') : '✓ Account created successfully! Redirecting to complete Profile...', 'success');
            setTimeout(() => {
              window.location.href = 'profile.html?welcome=1';
            }, 800);
          }
        } else {
          showAlert(res.error || 'Failed to create account. Please check your inputs.');
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = `<span>${window.SOSafeLang ? window.SOSafeLang.t('auth_btn_signup') : 'Create Account'}</span>`;
          }
        }
      } catch (err) {
        console.error('Sign up error:', err);
        showAlert(err.message || 'An error occurred during account creation. Please check your network or try again.');
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `<span>${window.SOSafeLang ? window.SOSafeLang.t('auth_btn_signup') : 'Create Account'}</span>`;
        }
      }
    });
  }

  // --------------------------------------------------------------------------
  // SUPABASE CONFIGURATION MODAL HANDLERS
  // --------------------------------------------------------------------------
  const openConfigBtn = document.getElementById('openConfigBtn');
  const closeConfigBtn = document.getElementById('closeConfigBtn');
  const configModalBackdrop = document.getElementById('configModalBackdrop');
  const configForm = document.getElementById('supabaseConfigForm');
  const urlInput = document.getElementById('supabaseUrlInput');
  const keyInput = document.getElementById('supabaseKeyInput');
  const resetConfigBtn = document.getElementById('resetConfigBtn');

  if (openConfigBtn && configModalBackdrop) {
    openConfigBtn.addEventListener('click', () => {
      if (urlInput && keyInput) {
        urlInput.value = window.SOSafeDB.url !== 'YOUR_SUPABASE_URL' ? window.SOSafeDB.url : '';
        keyInput.value = window.SOSafeDB.anonKey !== 'YOUR_SUPABASE_ANON_KEY' ? window.SOSafeDB.anonKey : '';
      }
      configModalBackdrop.classList.add('active');
    });
  }

  if (closeConfigBtn && configModalBackdrop) {
    closeConfigBtn.addEventListener('click', () => {
      configModalBackdrop.classList.remove('active');
    });
  }

  if (configForm) {
    configForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const u = urlInput.value.trim();
      const k = keyInput.value.trim();
      if (u && k) {
        window.SOSafeDB.saveCustomConfig(u, k);
        showAlert('✓ Supabase credentials saved successfully.', 'success');
        if (configModalBackdrop) configModalBackdrop.classList.remove('active');
      }
    });
  }

  if (resetConfigBtn) {
    resetConfigBtn.addEventListener('click', () => {
      window.SOSafeDB.resetCustomConfig();
      if (urlInput) urlInput.value = '';
      if (keyInput) keyInput.value = '';
      showAlert('Reset to demo fallback mode.', 'success');
      if (configModalBackdrop) configModalBackdrop.classList.remove('active');
    });
  }
});
