/**
 * SOSafe - Complete Shared Multilingual Language Engine
 * Supports: English, தமிழ் (Tamil), and Tanglish
 */

const SOSAFE_LANG_KEY = 'sosafe_lang';

const SOSafeTranslations = {
  en: {
    // Navigation & Common
    nav_home: "Home",
    nav_safety: "Safety",
    nav_dashboard: "Dashboard",
    nav_profile: "Profile",
    nav_contacts: "Emergency Contacts",
    nav_location: "Live Location",
    nav_how: "How It Works",
    nav_features: "Emergency",
    nav_settings: "Settings",
    nav_login: "Sign In",
    nav_signup: "Sign Up",
    nav_logout: "Logout",
    nav_get_started: "Get Started",
    btn_get_started: "Get Started",
    disclaimer_text: "⚠️ Frontend Demo Mode: All alerts, GPS tracking & notifications are simulated locally.",

    // ==========================================
    // LANDING PAGE (index.html)
    // ==========================================
    hero_badge: "AI-Powered Personal Safety",
    hero_title_1: "Your Safety.",
    hero_title_2: "One Tap Away.",
    hero_desc: "Instantly alert your trusted contacts, broadcast high-precision live GPS coordinates, and activate rapid emergency response with a single tap.",
    trust_users: "100k+ Protected",
    trust_response: "< 3s Response",
    trust_availability: "24/7 Monitored",
    status_safe: "● You are Safe",

    // Live Safety Dashboard (Landing section)
    dash_title: "Live Safety Dashboard",
    dash_sub: "Real-Time Sensor & Connection Stream",
    dash_live: "System Active",
    dash_status_label: "🛡️ Safety Status",
    dash_status_val: "● You are Safe",
    dash_location_label: "📍 Location",
    dash_location_val: "Ready",
    dash_contacts_label: "👥 Trusted Contacts",
    dash_contacts_val: "4 / 4 Slots",
    dash_alert_label: "⚡ Emergency",
    dash_alert_val: "No Active Alert",

    // How SOSafe Works
    how_badge: "Seamless Workflow",
    how_title: "How SOSafe Works in an Emergency",
    how_subtitle: "Three instantaneous steps to ensure help reaches you wherever you are.",
    step_1_num: "01",
    step_1_title: "Press SOS",
    step_1_desc: "Tap the prominent SOS button on your screen to immediately initiate the 3-second alert sequencer.",
    step_2_num: "02",
    step_2_title: "Alert Activated",
    step_2_desc: "Your designated emergency contacts receive high-priority alerts with an audible alert signal.",
    step_3_num: "03",
    step_3_title: "Location Shared",
    step_3_desc: "Live GPS tracking link and real-time battery status are automatically transmitted to your guardians.",

    // Toolbar & Scroll Views
    scroll_view_btn: "Scroll View",
    grid_view_btn: "Grid View",

    // ==========================================
    // AUTHENTICATION (login.html & signup.html)
    // ==========================================
    auth_tagline: "Your Safety. One Tap Away.",
    auth_welcome_title: "Welcome Back",
    auth_welcome_sub: "Sign in to continue to SOSafe",
    auth_signup_page_title: "Create Your SOSafe Account",
    auth_signup_page_sub: "Start building your personal safety network.",
    auth_signin_title: "Sign In to SOSafe",
    auth_signin_sub: "Enter your credentials to access your safety network",
    auth_signup_title: "Create SOSafe Account",
    auth_signup_sub: "Join SOSafe and safeguard yourself and your inner circle",
    auth_tab_signin: "Sign In",
    auth_tab_signup: "Sign Up",
    auth_label_name: "Full Name",
    auth_label_email: "Email Address",
    auth_label_password: "Password",
    auth_label_confirm_password: "Confirm Password",
    auth_label_phone: "Phone Number",
    auth_ph_name: "e.g. Ramesh Kumar",
    auth_ph_email: "name@example.com",
    auth_ph_password: "••••••••",
    auth_ph_confirm_password: "••••••••",
    auth_ph_phone: "+91 98765 43210",
    auth_btn_signin: "Sign In",
    auth_btn_signin_loading: "Signing in...",
    auth_btn_signup: "Create Account",
    auth_btn_signup_loading: "Creating Account...",
    auth_btn_google: "Continue with Google",
    auth_or_divider: "or continue with email",
    auth_remember_me: "Remember me",
    auth_link_forgot: "Forgot Password?",
    auth_link_no_account: "Don't have an account? Sign Up",
    auth_link_has_account: "Already have an account? Sign In",
    auth_btn_home: "← Home",
    auth_btn_config: "⚙️ Supabase Keys",

    // Password Validation & Strength
    auth_pwd_strength: "Password Strength",
    auth_pwd_weak: "Weak",
    auth_pwd_medium: "Medium",
    auth_pwd_strong: "Strong",
    auth_req_length: "At least 8 characters",
    auth_req_upper: "Uppercase letter",
    auth_req_number: "Number",
    auth_req_special: "Special character",
    auth_show_password: "Show password",
    auth_hide_password: "Hide password",

    // Auth Feature Highlights
    auth_feature_1_title: "Instant SOS Broadcast",
    auth_feature_1_desc: "One tap instantly alerts your trusted guardians.",
    auth_feature_2_title: "Live GPS Telemetry",
    auth_feature_2_desc: "High-precision live location shared securely with contacts.",
    auth_feature_3_title: "End-to-End Safety Mesh",
    auth_feature_3_desc: "Encrypted real-time synchronization and emergency protocols.",

    // Validation & Notifications
    val_email_invalid: "Please enter a valid email address.",
    val_password_short: "Password must be at least 8 characters.",
    val_password_mismatch: "Passwords do not match.",
    val_required_fields: "Please fill in all required fields.",
    val_login_success: "Signed in successfully! Redirecting...",
    val_signup_success: "✓ Account created successfully! Redirecting...",
    val_google_redirect: "Redirecting to Google Authentication...",

    // ==========================================
    // DASHBOARD (dashboard.html)
    // ==========================================
    dash_greeting_morning: "Good morning",
    dash_greeting_afternoon: "Good afternoon",
    dash_greeting_evening: "Good evening",
    dash_safety_status: "Safety Status",
    dash_status_safe: "● You are Safe",
    dash_status_armed: "● Armed & Ready",
    dash_contacts_metric: "Emergency Contacts",
    dash_quick_actions: "Quick Actions",
    dash_action_sos: "🚨 SOS Alert",
    dash_action_contacts: "👥 Contacts",
    dash_action_location: "📍 Live Location",
    dash_action_profile: "👤 Profile",
    dash_recent_activity: "System Activity",
    dash_live_radar: "Live GPS Beacon",

    // ==========================================
    // PROFILE (profile.html)
    // ==========================================
    profile_title: "My Profile",
    profile_sub: "Manage your personal information and guardian credentials",
    profile_btn_edit: "Edit Profile",
    profile_btn_save: "Save Changes",
    profile_btn_cancel: "Cancel",
    profile_updated_success: "✓ Profile updated successfully",
    profile_joined: "Member since",

    // ==========================================
    // EMERGENCY CONTACTS (contacts.html & modal)
    // ==========================================
    contacts_title: "Emergency Contacts",
    contacts_sub: "Add up to 4 trusted emergency contacts who will be instantly alerted during an emergency",
    contacts_btn_add: "Add Contact",
    contacts_empty: "No emergency contacts configured yet. Add your first trusted emergency contact.",
    contacts_limit_warning: "You can add up to 4 emergency contacts.",
    contact_card_title: "Contact",
    contact_field_name: "Name",
    contact_field_phone: "Phone",
    contact_field_relation: "Relationship",
    contact_btn_edit: "Edit",
    contact_btn_delete: "Delete",
    contact_modal_add_title: "Add Emergency Contact",
    contact_modal_edit_title: "Edit Emergency Contact",
    contact_modal_save: "Save Contact",
    contact_saved_success: "✓ Emergency contact saved successfully.",
    contact_deleted_success: "✓ Emergency contact removed successfully.",
    contact_delete_confirm_title: "Remove Contact",
    contact_delete_confirm_msg: "Are you sure you want to remove this emergency contact?",
    contact_modal_cancel: "Cancel",

    // ==========================================
    // LIVE LOCATION (location.html)
    // ==========================================
    loc_page_title: "Live Location Sharing",
    loc_page_sub: "Broadcast high-precision real-time GPS tracking to your trusted emergency circle",
    loc_status_active: "🔴 LIVE LOCATION ACTIVE",
    loc_status_standby: "STANDBY",
    loc_status_requesting: "Detecting Location...",
    loc_btn_start: "Start Live Location",
    loc_btn_stop: "Stop Sharing",
    loc_btn_share_all: "Alert All Emergency Contacts",
    loc_btn_share: "Share Alert",
    loc_btn_copy_link: "Copy Link",
    loc_btn_send_sms: "Send SMS",
    loc_btn_retry: "Try Again",
    loc_contacts_heading: "🚨 Emergency Contacts",
    loc_contacts_desc: "Your live location can be shared with your trusted contacts.",
    loc_ready_alert_msg: "Your emergency message is ready to share with 4 emergency contacts.",
    loc_copied_toast: "✓ Live location link copied to clipboard!",
    loc_stopped_toast: "Live location sharing stopped.",
    loc_shared_view_title: "Live Emergency Tracking",
    loc_shared_view_sub: "Active location stream transmitted from SOSafe user",
    loc_shared_active_badge: "● ACTIVE LIVE STREAM",
    loc_shared_inactive_badge: "● SESSION ENDED / SAFE",
    loc_shared_last_updated: "Last updated",
    loc_shared_accuracy: "Accuracy",

    // User-Friendly Geolocation Errors
    loc_err_permission: "Location permission denied. Please allow location access in your browser.",
    loc_err_unavailable: "Location is currently unavailable. Please check your network or GPS.",
    loc_err_timeout: "Location is taking longer than expected. Please check your device location settings and try again.",

    // ==========================================
    // SOS TRIGGER & COUNTDOWN MODAL
    // ==========================================
    sos_press_prompt: "Press SOS in an emergency",
    modal_title: "🚨 SOS ALERT",
    modal_subtitle: "Sending emergency broadcast in...",
    btn_cancel_sos: "Cancel Alert",
    alert_cancelled_toast: "Emergency alert cancelled.",
    alert_activated_title: "🚨 SOS Alert Activated",
    alert_alerting_label: "Alerting Trusted Circle:",
    step_created: "✓ Alert Created",
    step_location: "✓ Location Detected",
    step_notified: "✓ Trusted Contacts Notified",
    step_tracking: "✓ Location Sharing Activated",
    notif_title: "🚨 SOSafe Emergency Alert",
    notif_body: "Emergency alert received. Location sharing is active.",
    btn_dismiss: "I am Safe Now (Reset)",

    // ==========================================
    // SETTINGS DASHBOARD (settings.html)
    // ==========================================
    settings_main_title: "Settings",
    settings_main_sub: "Manage your SOSafe experience.",
    settings_sec_account: "ACCOUNT",
    settings_sec_safety: "SAFETY",
    settings_sec_preferences: "PREFERENCES",
    settings_sec_privacy: "PRIVACY",
    settings_sec_danger: "ACCOUNT ACTIONS",
    
    settings_item_profile_title: "Profile",
    settings_item_profile_desc: "Manage your personal info and credentials",
    settings_item_password_title: "Change Password",
    settings_item_password_desc: "Update your security credentials and passkeys",
    
    settings_item_contacts_title: "Emergency Contacts",
    settings_item_contacts_desc: "Manage your trusted emergency guardian circle",
    settings_item_contacts_btn: "Manage Contacts",
    settings_item_location_title: "Live Location",
    settings_item_location_desc: "Real-time MapTiler GPS broadcast streaming",
    settings_item_location_btn: "Manage Live Location",
    settings_item_sos_title: "SOS Settings",
    settings_item_sos_desc: "Audio siren tone, countdown duration & trigger gestures",

    settings_item_lang_title: "Language",
    settings_item_lang_desc: "Choose English, தமிழ், or Tanglish",
    settings_item_notif_title: "Notifications",
    settings_item_notif_desc: "Configure emergency alerts and push notifications",
    settings_notif_alerts: "Emergency Alerts",
    settings_notif_location: "Location Sharing",
    settings_notif_system: "System Notifications",
    
    settings_item_theme_title: "Appearance",
    settings_item_theme_desc: "Select Light, Dark, or System mode",
    settings_theme_light: "Light",
    settings_theme_dark: "Dark",
    settings_theme_system: "System",
    
    settings_item_privacy_title: "Location Privacy",
    settings_item_privacy_desc: "Manage location accuracy & active tracking permissions",
    settings_item_data_title: "Data & Privacy",
    settings_item_data_desc: "Review encrypted data storage & policy disclosures",
    
    settings_item_supabase_title: "Cloud Database (Supabase)",
    settings_item_supabase_desc: "Configure live PostgreSQL credentials or use demo mode",

    settings_item_logout_title: "Log Out",
    settings_item_logout_desc: "Sign out of your SOSafe account on this device",
    settings_item_delete_title: "Delete Account",
    settings_item_delete_desc: "Permanently delete your account and all stored emergency data",
    
    settings_modal_delete_title: "Delete Account",
    settings_modal_delete_msg: "Are you sure you want to delete your account? This action cannot be undone.",
    settings_modal_delete_btn: "Delete Account",
    settings_modal_cancel_btn: "Cancel",

    // Footer
    footer_desc: "SOSafe is a next-generation personal safety platform providing instant emergency connectivity and guardian tracking.",
    footer_rights: "© 2026 SOSafe Technologies. All rights reserved. (Frontend Simulation Demonstration)"
  },

  ta: {
    // Navigation & Common
    nav_home: "முகப்பு",
    nav_safety: "பாதுகாப்பு",
    nav_dashboard: "டாஷ்போர்டு",
    nav_profile: "சுயவிவரம்",
    nav_contacts: "அவசர தொடர்புகள்",
    nav_location: "நேரலை இருப்பிடம்",
    nav_how: "செயல்படும் முறை",
    nav_features: "அவசரநிலை",
    nav_settings: "அமைப்புகள்",
    nav_login: "உள்நுழை",
    nav_signup: "பதிவு செய்",
    nav_logout: "வெளியேறு",
    nav_get_started: "தொடங்குங்கள்",
    btn_get_started: "தொடங்குங்கள்",
    disclaimer_text: "⚠️ முன்மாதிரி செயல்முறை: அனைத்து எச்சரிக்கைகளும் இருப்பிடங்களும் உலாவி மூலம் மட்டுமே செயல்படுத்தப்படுகின்றன.",

    // ==========================================
    // LANDING PAGE (index.html)
    // ==========================================
    hero_badge: "AI இயங்கும் தனிநபர் பாதுகாப்பு",
    hero_title_1: "உங்கள் பாதுகாப்பு.",
    hero_title_2: "ஒரே தட்டலில்.",
    hero_desc: "உங்கள் நம்பகமான தொடர்புகளை உடனடியாக எச்சரிக்கவும், துல்லியமான நேரலை GPS இருப்பிடத்தை பகிரவும், ஒரே தட்டலில் விரைவான அவசர நடவடிக்கையை செயல்படுத்தவும்.",
    trust_users: "100k+ பாதுகாப்பில்",
    trust_response: "< 3 வினாடி பதில்",
    trust_availability: "24/7 நேரலை கண்காணிப்பு",
    status_safe: "● நீங்கள் பாதுகாப்பாக இருக்கிறீர்கள்",

    // Live Safety Dashboard (Landing section)
    dash_title: "நேரலை பாதுகாப்பு டாஷ்போர்டு",
    dash_sub: "நிகழ்நேர சென்சார் & இணைப்பு ஸ்ட்ரீம்",
    dash_live: "கணினி செயல்படுகிறது",
    dash_status_label: "🛡️ பாதுகாப்பு நிலை",
    dash_status_val: "● நீங்கள் பாதுகாப்பாக இருக்கிறீர்கள்",
    dash_location_label: "📍 இருப்பிடம்",
    dash_location_val: "தயார்",
    dash_contacts_label: "👥 நம்பகமான தொடர்புகள்",
    dash_contacts_val: "4 / 4 இடங்கள்",
    dash_alert_label: "⚡ அவசரநிலை",
    dash_alert_val: "செயலில் எச்சரிக்கை இல்லை",

    // How SOSafe Works
    how_badge: "எளிய வழிமுறை",
    how_title: "அவசரகாலத்தில் SOSafe எவ்வாறு செயல்படுகிறது",
    how_subtitle: "நீங்கள் எங்கிருந்தாலும் உதவி விரைவாக வந்து சேருவதை உறுதிசெய்யும் மூன்று உடனடி படிகள்.",
    step_1_num: "01",
    step_1_title: "SOS-ஐ அழுத்தவும்",
    step_1_desc: "3 வினாடி அவசர எச்சரிக்கை செயல்முறையை உடனடியாகத் தொடங்க திரையில் உள்ள முக்கிய SOS பொத்தானைத் தட்டவும்.",
    step_2_num: "02",
    step_2_title: "எச்சரிக்கை செயல்படுத்தப்பட்டது",
    step_2_desc: "உங்கள் நியமிக்கப்பட்ட அவசர தொடர்புகள் ஒலி எச்சரிக்கையுடன் கூடிய உயர் முன்னுரிமை எச்சரிக்கையைப் பெறுகின்றன.",
    step_3_num: "03",
    step_3_title: "இருப்பிடம் பகிரப்பட்டது",
    step_3_desc: "நேரலை GPS கண்காணிப்பு இணைப்பு மற்றும் நிகழ்நேர தகவல் உங்கள் பாதுகாவலர்களுக்கு தானாக அனுப்பப்படும்.",

    // Toolbar & Scroll Views
    scroll_view_btn: "ஸ்க்ரோல் பார்வை",
    grid_view_btn: "கிரிட் பார்வை",

    // ==========================================
    // AUTHENTICATION (login.html & signup.html)
    // ==========================================
    auth_tagline: "உங்கள் பாதுகாப்பு. ஒரே தட்டலில்.",
    auth_welcome_title: "மீண்டும் வருக",
    auth_welcome_sub: "SOSafe-ல் தொடர உள்நுழையவும்",
    auth_signup_page_title: "உங்கள் SOSafe கணக்கை உருவாக்கவும்",
    auth_signup_page_sub: "உங்கள் தனிப்பட்ட பாதுகாப்பு வலையமைப்பை இன்றே தொடங்குங்கள்.",
    auth_signin_title: "SOSafe உள்நுழைவு",
    auth_signin_sub: "உங்கள் பாதுகாப்பு கணக்கை அணுக விவரங்களை உள்ளிடவும்",
    auth_signup_title: "SOSafe கணக்கை உருவாக்கவும்",
    auth_signup_sub: "SOSafe-ல் இணைந்து உங்களையும் உங்கள் குடும்பத்தையும் பாதுகாக்கவும்",
    auth_tab_signin: "உள்நுழை",
    auth_tab_signup: "பதிவு செய்",
    auth_label_name: "முழு பெயர்",
    auth_label_email: "மின்னஞ்சல் முகவரி",
    auth_label_password: "கடவுச்சொல்",
    auth_label_confirm_password: "கடவுச்சொல்லை உறுதிப்படுத்தவும்",
    auth_label_phone: "தொலைபேசி எண்",
    auth_ph_name: "எ.கா: ரமேஷ் குமார்",
    auth_ph_email: "name@example.com",
    auth_ph_password: "••••••••",
    auth_ph_confirm_password: "••••••••",
    auth_ph_phone: "+91 98765 43210",
    auth_btn_signin: "உள்நுழை",
    auth_btn_signin_loading: "உள்நுழைகிறது...",
    auth_btn_signup: "கணக்கை உருவாக்கு",
    auth_btn_signup_loading: "கணக்கு உருவாக்கப்படுகிறது...",
    auth_btn_google: "Google மூலம் தொடரவும்",
    auth_or_divider: "அல்லது மின்னஞ்சல் மூலம் தொடரவும்",
    auth_remember_me: "என்னை நினைவில் கொள்",
    auth_link_forgot: "கடவுச்சொல் மறந்துவிட்டதா?",
    auth_link_no_account: "கணக்கு இல்லையா? பதிவு செய்",
    auth_link_has_account: "ஏற்கனவே கணக்கு உள்ளதா? உள்நுழை",
    auth_btn_home: "← முகப்பு",
    auth_btn_config: "⚙️ Supabase Keys",

    // Password Validation & Strength
    auth_pwd_strength: "கடவுச்சொல் வலிமை",
    auth_pwd_weak: "பலவீனமானது",
    auth_pwd_medium: "மிதமான",
    auth_pwd_strong: "வலிமையானது",
    auth_req_length: "குறைந்தது 8 எழுத்துகள்",
    auth_req_upper: "ஒரு பெரிய எழுத்து (A-Z)",
    auth_req_number: "ஒரு எண் (0-9)",
    auth_req_special: "ஒரு சிறப்பு குறியீடு (!@#$)",
    auth_show_password: "கடவுச்சொல்லைக் காட்டு",
    auth_hide_password: "கடவுச்சொல்லை மறை",

    // Auth Feature Highlights
    auth_feature_1_title: "உடனடி SOS எச்சரிக்கை",
    auth_feature_1_desc: "ஒரே தட்டலில் உங்கள் நம்பகமான தொடர்புகளை உடனடியாக எச்சரிக்கிறது.",
    auth_feature_2_title: "நேரலை GPS பகிர்வு",
    auth_feature_2_desc: "துல்லியமான நேரலை இருப்பிடம் நம்பகமானவர்களுடன் பகிரப்படுகிறது.",
    auth_feature_3_title: "பாதுகாப்பான வலையமைப்பு",
    auth_feature_3_desc: "முழுமையாக என்க்ரிப்ட் செய்யப்பட்ட தகவல் தொடர்பு மற்றும் கிளவுட் ஒத்திசைவு.",

    // Validation & Notifications
    val_email_invalid: "சரியான மின்னஞ்சல் முகவரியை உள்ளிடவும்.",
    val_password_short: "கடவுச்சொல் குறைந்தது 8 எழுத்துகள் கொண்டிருக்க வேண்டும்.",
    val_password_mismatch: "கடவுச்சொற்கள் பொருந்தவில்லை.",
    val_required_fields: "தேவையான அனைத்து விவரங்களையும் நிரப்பவும்.",
    val_login_success: "வெற்றிகரமாக உள்நுழைந்தது! திருப்பப்படுகிறது...",
    val_signup_success: "✓ கணக்கு உருவாக்கப்பட்டது! திருப்பப்படுகிறது...",
    val_google_redirect: "Google உள்நுழைவுக்கு திருப்பப்படுகிறது...",

    // ==========================================
    // DASHBOARD (dashboard.html)
    // ==========================================
    dash_greeting_morning: "காலை வணக்கம்",
    dash_greeting_afternoon: "மதிய வணக்கம்",
    dash_greeting_evening: "மாலை வணக்கம்",
    dash_safety_status: "பாதுகாப்பு நிலை",
    dash_status_safe: "● நீங்கள் பாதுகாப்பாக இருக்கிறீர்கள்",
    dash_status_armed: "● தயார் நிலையில் உள்ளது",
    dash_contacts_metric: "அவசர தொடர்புகள்",
    dash_quick_actions: "விரைவு செயல்கள்",
    dash_action_sos: "🚨 SOS எச்சரிக்கை",
    dash_action_contacts: "👥 தொடர்புகள்",
    dash_action_location: "📍 நேரலை இருப்பிடம்",
    dash_action_profile: "👤 சுயவிவரம்",
    dash_recent_activity: "கணினி செயல்பாடு",
    dash_live_radar: "நேரலை GPS ரேடார்",

    // ==========================================
    // PROFILE (profile.html)
    // ==========================================
    profile_title: "எனது சுயவிவரம்",
    profile_sub: "உங்கள் தனிப்பட்ட தகவல் மற்றும் பாதுகாவலர் விவரங்களை நிர்வகிக்கவும்",
    profile_btn_edit: "சுயவிவரத்தை திருத்து",
    profile_btn_save: "மாற்றங்களைச் சேமி",
    profile_btn_cancel: "ரத்து செய்",
    profile_updated_success: "✓ Profile வெற்றிகரமாக புதுப்பிக்கப்பட்டது",
    profile_joined: "இணைந்த நாள்",

    // ==========================================
    // EMERGENCY CONTACTS (contacts.html)
    // ==========================================
    contacts_title: "அவசர தொடர்புகள்",
    contacts_sub: "அவசரகாலத்தில் உடனடியாக எச்சரிக்கப்படும் அதிகபட்சம் 4 நம்பகமான தொடர்புகளைச் சேர்க்கவும்",
    contacts_btn_add: "தொடர்பைச் சேர்",
    contacts_empty: "அவசர தொடர்புகள் ஏதுமில்லை. முதல் தொடர்பைச் சேர்க்கவும்.",
    contacts_limit_warning: "அதிகபட்சம் 4 அவசர தொடர்புகளை மட்டும் சேர்க்கலாம்.",
    contact_card_title: "தொடர்பு",
    contact_field_name: "பெயர்",
    contact_field_phone: "தொலைபேசி",
    contact_field_relation: "உறவுமுறை",
    contact_btn_edit: "திருத்து",
    contact_btn_delete: "நீக்கு",
    contact_modal_add_title: "அவசர தொடர்பை சேர்க்கவும்",
    contact_modal_edit_title: "அவசர தொடர்பை திருத்தவும்",
    contact_modal_save: "தொடர்பைச் சேமி",
    contact_saved_success: "✓ அவசர தொடர்பு வெற்றிகரமாக சேமிக்கப்பட்டது.",
    contact_deleted_success: "✓ அவசர தொடர்பு நீக்கப்பட்டது.",
    contact_delete_confirm_title: "தொடர்பை நீக்கு",
    contact_delete_confirm_msg: "இந்த அவசர தொடர்பை நிச்சயமாக நீக்க விரும்புகிறீர்களா?",
    contact_modal_cancel: "ரத்து செய்",

    // ==========================================
    // LIVE LOCATION (location.html)
    // ==========================================
    loc_page_title: "நேரலை இருப்பிடப் பகிர்வு",
    loc_page_sub: "உங்கள் நம்பகமான அவசர தொடர்புகளுக்கு நிகழ்நேர GPS இருப்பிடத்தை பகிருங்கள்",
    loc_status_active: "🔴 நேரலை இருப்பிடம் செயல்படுகிறது",
    loc_status_standby: "தயார் நிலை",
    loc_status_requesting: "இருப்பிடம் கண்டறியப்படுகிறது...",
    loc_btn_start: "இருப்பிடப் பகிர்வை தொடங்கு",
    loc_btn_stop: "பகிர்வை நிறுத்து",
    loc_btn_share_all: "அனைத்து தொடர்புகளுக்கும் எச்சரி",
    loc_btn_share: "எச்சரிக்கையை பகிர்",
    loc_btn_copy_link: "இணைப்பை நகலெடு",
    loc_btn_send_sms: "SMS அனுப்பு",
    loc_btn_retry: "மீண்டும் முயற்சி செய்",
    loc_contacts_heading: "🚨 அவசர தொடர்புகள்",
    loc_contacts_desc: "உங்கள் நேரலை இருப்பிடம் நம்பகமான தொடர்புகளுடன் பகிரப்படலாம்.",
    loc_ready_alert_msg: "உங்கள் அவசர எச்சரிக்கை செய்தி 4 தொடர்புகளுடன் பகிர தயாராக உள்ளது.",
    loc_copied_toast: "✓ நேரலை இருப்பிட இணைப்பு நகலெடுக்கப்பட்டது!",
    loc_stopped_toast: "நேரலை இருப்பிடப் பகிர்வு நிறுத்தப்பட்டது.",
    loc_shared_view_title: "நேரலை அவசர இருப்பிடம்",
    loc_shared_view_sub: "SOSafe பயனரிடமிருந்து நேரலை GPS பகிர்வு ஸ்ட்ரீம்",
    loc_shared_active_badge: "● நேரலை ஸ்ட்ரீம் செயலில் உள்ளது",
    loc_shared_inactive_badge: "● அமர்வு முடிந்தது / பயனர் பாதுகாப்பாக உள்ளார்",
    loc_shared_last_updated: "கடைசியாக புதுப்பிக்கப்பட்டது",
    loc_shared_accuracy: "துல்லியம்",

    // User-Friendly Geolocation Errors
    loc_err_permission: "Location அனுமதி மறுக்கப்பட்டது. உங்கள் browser-ல் location அனுமதியை இயக்கவும்.",
    loc_err_unavailable: "இருப்பிடம் தற்போது கிடைக்கவில்லை. உங்கள் network அல்லது GPS-ஐ சரிபார்க்கவும்.",
    loc_err_timeout: "Location கிடைக்க கொஞ்சம் நேரம் ஆகிறது. உங்கள் device location settings-ஐ check செய்து மீண்டும் முயற்சி செய்யுங்கள்.",

    // ==========================================
    // SOS TRIGGER & COUNTDOWN MODAL
    // ==========================================
    sos_press_prompt: "அவசரநிலையில் SOS-ஐ அழுத்தவும்",
    modal_title: "🚨 SOS ALERT",
    modal_subtitle: "எச்சரிக்கை அனுப்ப மீதமுள்ள நேரம்...",
    btn_cancel_sos: "ரத்து செய்",
    alert_cancelled_toast: "அவசர எச்சரிக்கை ரத்து செய்யப்பட்டது.",
    alert_activated_title: "🚨 SOS எச்சரிக்கை செயல்படுத்தப்பட்டது",
    alert_alerting_label: "எச்சரிக்கப்படும் தொடர்புகள்:",
    step_created: "✓ அவசர எச்சரிக்கை உருவாக்கப்பட்டது",
    step_location: "✓ இருப்பிடம் கண்டறியப்பட்டது",
    step_notified: "✓ நம்பகமான தொடர்புகளுக்கு தகவல் அனுப்பப்பட்டது",
    step_tracking: "✓ நேரலை இருப்பிடப் பகிர்வு துவங்கியது",
    notif_title: "🚨 SOSafe அவசர எச்சரிக்கை",
    notif_body: "அவசர தகவல் பெறப்பட்டது. Location sharing செயல்பாட்டில் உள்ளது.",
    btn_dismiss: "நான் பாதுகாப்பாக இருக்கிறேன் (Reset)",

    // ==========================================
    // SETTINGS DASHBOARD (settings.html)
    // ==========================================
    settings_main_title: "அமைப்புகள்",
    settings_main_sub: "உங்கள் SOSafe அமைப்புகளை நிர்வகிக்கவும்.",
    settings_sec_account: "கணக்கு",
    settings_sec_safety: "பாதுகாப்பு",
    settings_sec_preferences: "விருப்பங்கள்",
    settings_sec_privacy: "தனியுரிமை",
    settings_sec_danger: "கணக்கு செயல்கள்",
    
    settings_item_profile_title: "சுயவிவரம்",
    settings_item_profile_desc: "உங்கள் தனிப்பட்ட தகவல் மற்றும் விவரங்களை நிர்வகிக்கவும்",
    settings_item_password_title: "கடவுச்சொல்லை மாற்று",
    settings_item_password_desc: "உங்கள் பாதுகாப்பு கடவுச்சொல்லை புதுப்பிக்கவும்",
    
    settings_item_contacts_title: "அவசர தொடர்புகள்",
    settings_item_contacts_desc: "உங்கள் நம்பகமான பாதுகாவலர் குழுவை நிர்வகிக்கவும்",
    settings_item_contacts_btn: "தொடர்புகளை நிர்வகி",
    settings_item_location_title: "நேரலை இருப்பிடம்",
    settings_item_location_desc: "நிகழ்நேர MapTiler GPS நேரலை ஸ்ட்ரீம்",
    settings_item_location_btn: "இருப்பிடத்தை நிர்வகி",
    settings_item_sos_title: "SOS அமைப்புகள்",
    settings_item_sos_desc: "ஒலி எச்சரிக்கை மற்றும் அவசர பொத்தான் அமைப்புகள்",

    settings_item_lang_title: "மொழி",
    settings_item_lang_desc: "ஆங்கிலம், தமிழ், அல்லது Tanglish தேர்வு செய்யவும்",
    settings_item_notif_title: "அறிவிப்புகள்",
    settings_item_notif_desc: "அவசர எச்சரிக்கைகள் மற்றும் அறிவிப்புகளை அமைக்கவும்",
    settings_notif_alerts: "அவசர எச்சரிக்கைகள்",
    settings_notif_location: "இருப்பிடப் பகிர்வு",
    settings_notif_system: "கணினி அறிவிப்புகள்",
    
    settings_item_theme_title: "தோற்றம்",
    settings_item_theme_desc: "வெளிச்சம், இருள், அல்லது கணினி முறையைத் தேர்வு செய்யவும்",
    settings_theme_light: "வெளிச்சம்",
    settings_theme_dark: "இருள்",
    settings_theme_system: "கணினி முறை",
    
    settings_item_privacy_title: "இருப்பிட தனியுரிமை",
    settings_item_privacy_desc: "இருப்பிட துல்லியம் மற்றும் பகிர்வு அனுமதிகளை நிர்வகிக்கவும்",
    settings_item_data_title: "தரவு & தனியுரிமை",
    settings_item_data_desc: "என்க்ரிப்ட் செய்யப்பட்ட தரவு சேமிப்பை மதிப்பாய்வு செய்யவும்",
    
    settings_item_supabase_title: "Supabase கிளவுட் தரவுத்தளம்",
    settings_item_supabase_desc: "PostgreSQL இணைப்பை அமைக்கவும் அல்லது டெமோ முறையைப் பயன்படுத்தவும்",

    settings_item_logout_title: "வெளியேறு",
    settings_item_logout_desc: "இந்த சாதனத்திலிருந்து உங்கள் கணக்கை வெளியேற்றவும்",
    settings_item_delete_title: "கணக்கை நீக்கு",
    settings_item_delete_desc: "உங்கள் கணக்கு மற்றும் அனைத்து அவசர தரவுகளையும் நிரந்தரமாக நீக்கவும்",
    
    settings_modal_delete_title: "கணக்கை நீக்கவா?",
    settings_modal_delete_msg: "உங்கள் கணக்கை நிச்சயமாக நீக்க விரும்புகிறீர்களா? இந்த செயலை மீண்டும் மாற்ற முடியாது.",
    settings_modal_delete_btn: "கணக்கை நீக்கு",
    settings_modal_cancel_btn: "ரத்து செய்",

    // Footer
    footer_desc: "SOSafe என்பது உடனடி அவசர தொடர்பு மற்றும் நிகழ்நேர பாதுகாப்பு கண்காணிப்பை வழங்கும் நவீன தளம்.",
    footer_rights: "© 2026 SOSafe Technologies. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை."
  },

  tanglish: {
    // Navigation & Common
    nav_home: "Home",
    nav_safety: "Safety",
    nav_dashboard: "Dashboard",
    nav_profile: "Profile",
    nav_contacts: "Emergency Contacts",
    nav_location: "Live Location",
    nav_how: "How It Works",
    nav_features: "Emergency",
    nav_settings: "Settings",
    nav_login: "Sign In",
    nav_signup: "Sign Up",
    nav_logout: "Logout",
    nav_get_started: "Start Pannunga",
    btn_get_started: "Start Pannunga",
    disclaimer_text: "⚠️ Demo Mode: Ella alerts, GPS location & notifications-um unga browser-la simulate aaguthu.",

    // ==========================================
    // LANDING PAGE (index.html)
    // ==========================================
    hero_badge: "AI Powered Personal Safety",
    hero_title_1: "Unga Safety.",
    hero_title_2: "Orey Tap-la.",
    hero_desc: "Unga trusted contacts-ai instant-ah alert pannunga, high-precision live GPS location-ai share pannunga, orey tap-la emergency response-ai activate pannunga.",
    trust_users: "100k+ Protected",
    trust_response: "< 3s Response",
    trust_availability: "24/7 Monitored",
    status_safe: "● Neenga Safe-ah irukeenga",

    // Live Safety Dashboard (Landing section)
    dash_title: "Live Safety Dashboard",
    dash_sub: "Real-Time Sensor & Connection Stream",
    dash_live: "System Active",
    dash_status_label: "🛡️ Safety Status",
    dash_status_val: "● Neenga Safe-ah irukeenga",
    dash_location_label: "📍 Location",
    dash_location_val: "Ready",
    dash_contacts_label: "👥 Trusted Contacts",
    dash_contacts_val: "4 / 4 Slots",
    dash_alert_label: "⚡ Emergency",
    dash_alert_val: "No Active Alert",

    // How SOSafe Works
    how_badge: "Simple Workflow",
    how_title: "Emergency Time-la SOSafe Eppadi Work Aagum",
    how_subtitle: "Neenga enga irundhaalum ungalukku udhavi kidaikka 3 simple steps.",
    step_1_num: "01",
    step_1_title: "SOS-ai Press Pannu",
    step_1_desc: "Screen-la irukura SOS button-ai tap panna 3-second countdown alert start aagum.",
    step_2_num: "02",
    step_2_title: "Alert Send Aagudhu",
    step_2_desc: "Unga emergency contacts-ku siren sound-oda high priority alert send aagum.",
    step_3_num: "03",
    step_3_title: "Location Share Aagudhu",
    step_3_desc: "Live GPS tracking link unga guardians-ku automatically share aayidum.",

    // Toolbar & Scroll Views
    scroll_view_btn: "Scroll View",
    grid_view_btn: "Grid View",

    // ==========================================
    // AUTHENTICATION (login.html & signup.html)
    // ==========================================
    auth_tagline: "Unga Safety. Orey Tap-la.",
    auth_welcome_title: "Welcome Back",
    auth_welcome_sub: "SOSafe-la continue panna sign in pannunga",
    auth_signup_page_title: "SOSafe Account Create Pannunga",
    auth_signup_page_sub: "Unga personal safety network-ai start pannunga.",
    auth_signin_title: "SOSafe-la Sign In Pannunga",
    auth_signin_sub: "Unga safety account-ai access panna email & password podunga",
    auth_signup_title: "SOSafe Account Create Pannunga",
    auth_signup_sub: "SOSafe-la join panni unga family-ai safe-ah vechukkonga",
    auth_tab_signin: "Sign In",
    auth_tab_signup: "Sign Up",
    auth_label_name: "Full Name",
    auth_label_email: "Email Address",
    auth_label_password: "Password",
    auth_label_confirm_password: "Confirm Password",
    auth_label_phone: "Phone Number",
    auth_ph_name: "e.g. Ramesh Kumar",
    auth_ph_email: "name@example.com",
    auth_ph_password: "••••••••",
    auth_ph_confirm_password: "••••••••",
    auth_ph_phone: "+91 98765 43210",
    auth_btn_signin: "Sign In",
    auth_btn_signin_loading: "Signing in...",
    auth_btn_signup: "Create Account",
    auth_btn_signup_loading: "Account Create Aagudhu...",
    auth_btn_google: "Continue with Google",
    auth_or_divider: "or continue with email",
    auth_remember_me: "Ennai Remember Pannu",
    auth_link_forgot: "Password Marandhuducha?",
    auth_link_no_account: "Account illaiya? Sign Up pannunga",
    auth_link_has_account: "Already account irukka? Sign In pannunga",
    auth_btn_home: "← Home",
    auth_btn_config: "⚙️ Supabase Keys",

    // Password Validation & Strength
    auth_pwd_strength: "Password Strength",
    auth_pwd_weak: "Weak",
    auth_pwd_medium: "Medium",
    auth_pwd_strong: "Strong",
    auth_req_length: "Minimum 8 characters",
    auth_req_upper: "Oru Uppercase letter (A-Z)",
    auth_req_number: "Oru Number (0-9)",
    auth_req_special: "Oru Special character (!@#$)",
    auth_show_password: "Password-ai Kaattu",
    auth_hide_password: "Password-ai Maraikkavum",

    // Auth Feature Highlights
    auth_feature_1_title: "Instant SOS Broadcast",
    auth_feature_1_desc: "Orey click-la unga trusted guardians-ku emergency alert pogum.",
    auth_feature_2_title: "Live GPS Telemetry",
    auth_feature_2_desc: "High-precision live location unga contacts-oda share aagum.",
    auth_feature_3_title: "End-to-End Safety Mesh",
    auth_feature_3_desc: "Encrypted safe communication mattrum real-time cloud sync.",

    // Validation & Notifications
    val_email_invalid: "Valid-aana email address podunga.",
    val_password_short: "Password minimum 8 characters irukkanum.",
    val_password_mismatch: "Rendu passwords-um match aagala.",
    val_required_fields: "Ella required fields-aiyum fill pannunga.",
    val_login_success: "Signed in successfully! Redirect aagudhu...",
    val_signup_success: "✓ Account create aayiduchu! Redirect aagudhu...",
    val_google_redirect: "Google Login-ku redirect aagudhu...",

    // ==========================================
    // DASHBOARD (dashboard.html)
    // ==========================================
    dash_greeting_morning: "Kaalai Vanakkam",
    dash_greeting_afternoon: "Madiya Vanakkam",
    dash_greeting_evening: "Maalai Vanakkam",
    dash_safety_status: "Safety Status",
    dash_status_safe: "● Neenga Safe-ah irukeenga",
    dash_status_armed: "● Armed & Ready",
    dash_contacts_metric: "Emergency Contacts",
    dash_quick_actions: "Quick Actions",
    dash_action_sos: "🚨 SOS Alert",
    dash_action_contacts: "👥 Contacts",
    dash_action_location: "📍 Live Location",
    dash_action_profile: "👤 Profile",
    dash_recent_activity: "System Activity",
    dash_live_radar: "Live GPS Radar",

    // ==========================================
    // PROFILE (profile.html)
    // ==========================================
    profile_title: "My Profile",
    profile_sub: "Unga personal info & guardian details-ai manage pannunga",
    profile_btn_edit: "Edit Profile",
    profile_btn_save: "Save Changes",
    profile_btn_cancel: "Cancel",
    profile_updated_success: "✓ Profile successful-ah update aayiduchu",
    profile_joined: "Joined Date",

    // ==========================================
    // EMERGENCY CONTACTS (contacts.html)
    // ==========================================
    contacts_title: "Emergency Contacts",
    contacts_sub: "Emergency time-la alert aaga maximum 4 trusted contacts-ai add pannunga",
    contacts_btn_add: "Add Contact",
    contacts_empty: "Contacts edhum illa. Ungal modhal contact-ai add pannunga.",
    contacts_limit_warning: "Maximum 4 emergency contacts mattum add pannalaam.",
    contact_card_title: "Contact",
    contact_field_name: "Name",
    contact_field_phone: "Phone",
    contact_field_relation: "Relationship",
    contact_btn_edit: "Edit",
    contact_btn_delete: "Delete",
    contact_modal_add_title: "Emergency Contact-ai Add Pannunga",
    contact_modal_edit_title: "Contact-ai Edit Pannunga",
    contact_modal_save: "Save Contact",
    contact_saved_success: "✓ Emergency contact save aayiduchu.",
    contact_deleted_success: "✓ Emergency contact remove aayiduchu.",
    contact_delete_confirm_title: "Remove Contact",
    contact_delete_confirm_msg: "Indha contact-ai remove panna confirm-ah?",
    contact_modal_cancel: "Cancel",

    // ==========================================
    // LIVE LOCATION (location.html)
    // ==========================================
    loc_page_title: "Live Location Sharing",
    loc_page_sub: "Real-time GPS tracking-ai unga trusted emergency contacts-kooda share pannunga",
    loc_status_active: "🔴 LIVE LOCATION ACTIVE",
    loc_status_standby: "STANDBY",
    loc_status_requesting: "Location Detect Aagudhu...",
    loc_btn_start: "Live Location Start Pannu",
    loc_btn_stop: "Sharing Stop Pannu",
    loc_btn_share_all: "Ella Contacts-kum Alert Pannu",
    loc_btn_share: "Alert Share Pannu",
    loc_btn_copy_link: "Live Link Copy Pannu",
    loc_btn_send_sms: "SMS Send Pannu",
    loc_btn_retry: "Marubadi Try Pannu",
    loc_contacts_heading: "🚨 Emergency Contacts",
    loc_contacts_desc: "Unga live location-ai trusted contacts-kooda share pannalaam.",
    loc_ready_alert_msg: "Unga emergency message 4 contacts-kooda share panna ready-ah irukku.",
    loc_copied_toast: "✓ Live location link clipboard-la copy aayiduchu!",
    loc_stopped_toast: "Live location sharing stop aayiduchu.",
    loc_shared_view_title: "Live Emergency Tracking",
    loc_shared_view_sub: "SOSafe user-oda live location stream",
    loc_shared_active_badge: "● LIVE STREAM ACTIVE",
    loc_shared_inactive_badge: "● SESSION ENDED / SAFE",
    loc_shared_last_updated: "Last updated",
    loc_shared_accuracy: "Accuracy",

    // User-Friendly Geolocation Errors
    loc_err_permission: "Location permission denied. Browser settings-la location access-ai allow pannunga.",
    loc_err_unavailable: "Location ippo available illa. Unga network or GPS-ai check pannunga.",
    loc_err_timeout: "Location detect aaga konjam time aagudhu. Unga device location settings-ai check pannitu marubadi try pannunga.",

    // ==========================================
    // SOS TRIGGER & COUNTDOWN MODAL
    // ==========================================
    sos_press_prompt: "Emergency-na SOS-ai press pannunga",
    modal_title: "🚨 SOS ALERT",
    modal_subtitle: "Alert send aaga pogudhu...",
    btn_cancel_sos: "Cancel Pannu",
    alert_cancelled_toast: "Emergency alert cancel aayiduchu.",
    alert_activated_title: "🚨 SOS Alert Activated",
    alert_alerting_label: "Alerting Guardians:",
    step_created: "✓ Alert Created",
    step_location: "✓ Location Detected",
    step_notified: "✓ Trusted Contacts Notified",
    step_tracking: "✓ Location Sharing Activated",
    notif_title: "🚨 SOSafe Emergency Alert",
    notif_body: "Emergency alert receive aayiduchu. Location sharing active-la irukku.",
    btn_dismiss: "Naan Safe-ah Iruken (Reset)",

    // ==========================================
    // SETTINGS DASHBOARD (settings.html)
    // ==========================================
    settings_main_title: "Settings",
    settings_main_sub: "Unga SOSafe settings-ai manage pannunga.",
    settings_sec_account: "ACCOUNT",
    settings_sec_safety: "SAFETY",
    settings_sec_preferences: "PREFERENCES",
    settings_sec_privacy: "PRIVACY",
    settings_sec_danger: "ACCOUNT ACTIONS",
    
    settings_item_profile_title: "Profile",
    settings_item_profile_desc: "Unga personal info & credentials-ai manage pannunga",
    settings_item_password_title: "Change Password",
    settings_item_password_desc: "Security credentials & passkey-ai update pannunga",
    
    settings_item_contacts_title: "Emergency Contacts",
    settings_item_contacts_desc: "Unga trusted guardian circle-ai manage pannunga",
    settings_item_contacts_btn: "Manage Contacts",
    settings_item_location_title: "Live Location",
    settings_item_location_desc: "Real-time MapTiler GPS broadcast streaming",
    settings_item_location_btn: "Manage Live Location",
    settings_item_sos_title: "SOS Settings",
    settings_item_sos_desc: "Audio siren tone, countdown time & quick gestures",

    settings_item_lang_title: "Language",
    settings_item_lang_desc: "English, தமிழ், or Tanglish select pannunga",
    settings_item_notif_title: "Notifications",
    settings_item_notif_desc: "Emergency alerts & push notification settings",
    settings_notif_alerts: "Emergency Alerts",
    settings_notif_location: "Location Sharing",
    settings_notif_system: "System Notifications",
    
    settings_item_theme_title: "Appearance",
    settings_item_theme_desc: "Light, Dark, or System mode select pannunga",
    settings_theme_light: "Light",
    settings_theme_dark: "Dark",
    settings_theme_system: "System",
    
    settings_item_privacy_title: "Location Privacy",
    settings_item_privacy_desc: "Location accuracy & active tracking permissions",
    settings_item_data_title: "Data & Privacy",
    settings_item_data_desc: "Encrypted data storage details-ai paarkkavum",
    
    settings_item_supabase_title: "Supabase Cloud Database",
    settings_item_supabase_desc: "PostgreSQL credentials configure pannunga or demo mode use pannunga",

    settings_item_logout_title: "Log Out",
    settings_item_logout_desc: "Indha device-la irundhu logout pannunga",
    settings_item_delete_title: "Delete Account",
    settings_item_delete_desc: "Unga account & data-vai permanently delete pannunga",
    
    settings_modal_delete_title: "Account-ai Delete Panna Confirm-ah?",
    settings_modal_delete_msg: "Unga account-ai delete panna sure-ah? Indha action-ai undo panna mudiyaadhu.",
    settings_modal_delete_btn: "Delete Account",
    settings_modal_cancel_btn: "Cancel",

    // Footer
    footer_desc: "SOSafe - instant emergency alerts mattrum live safety tracking-kaana modern platform.",
    footer_rights: "© 2026 SOSafe Technologies. All rights reserved."
  }
};

class SOSafeLanguageEngine {
  constructor() {
    this.currentLang = localStorage.getItem(SOSAFE_LANG_KEY) || 'en';
  }

  getLang() {
    return this.currentLang;
  }

  setLang(lang) {
    if (!SOSafeTranslations[lang]) lang = 'en';
    this.currentLang = lang;
    localStorage.setItem(SOSAFE_LANG_KEY, lang);
    document.documentElement.setAttribute('lang', lang);
    this.apply();
    window.dispatchEvent(new CustomEvent('sosafe_lang_changed', { detail: { lang } }));
  }

  t(key) {
    const dict = SOSafeTranslations[this.currentLang] || SOSafeTranslations.en;
    return dict[key] || SOSafeTranslations.en[key] || key;
  }

  generateEmergencyMessage(liveUrl, lang = null) {
    const targetLang = lang || this.currentLang || 'en';
    if (targetLang === 'ta') {
      return `🚨 SOSafe அவசர எச்சரிக்கை\nஎனக்கு உதவி தேவை. எனது Live Location உங்களுடன் பகிரப்பட்டுள்ளது.\n📍 Live Location:\n${liveUrl}\nதயவுசெய்து எனது location-ஐ check செய்யவும்.`;
    } else if (targetLang === 'tanglish') {
      return `🚨 SOSafe Emergency Alert\nEnakku help venum. Enoda live location unga kooda share aagudhu.\n📍 Live Location:\n${liveUrl}\nPlease enoda location-ai check pannunga.`;
    } else {
      return `🚨 SOSafe Emergency Alert\nI need help. My live location is being shared with you.\n📍 Live Location:\n${liveUrl}\nPlease check my location and contact me if necessary.`;
    }
  }

  apply() {
    const lang = this.currentLang;
    const dict = SOSafeTranslations[lang] || SOSafeTranslations.en;

    // Update active class on language switcher buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Translate all [data-i18n]
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    // Translate all placeholders [data-i18n-placeholder]
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key]) {
        el.setAttribute('placeholder', dict[key]);
      }
    });
  }

  init() {
    document.documentElement.setAttribute('lang', this.currentLang);
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const selected = btn.getAttribute('data-lang');
        this.setLang(selected);
      });
    });
    this.apply();
  }
}

window.SOSafeLang = new SOSafeLanguageEngine();
