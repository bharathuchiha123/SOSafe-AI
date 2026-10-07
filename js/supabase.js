/**
 * ============================================================================
 * SOSafe - Supabase Client & Database Integration Service
 * ============================================================================
 * 
 * IMPORTANT SECURITY NOTICE:
 * - Only use the Supabase Publishable / Anon Key in browser frontend code.
 * - NEVER place the Supabase Service Role Key or private database secrets here.
 * 
 * REPLACE THE TWO VALUES BELOW WITH YOUR SUPABASE PROJECT CREDENTIALS:
 * (Available in your Supabase Dashboard -> Project Settings -> API)
 */

const SUPABASE_URL = "https://vhiwvwfygqxgmzmisjvv.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_wZ_UC89oMlmhKmctSVioRA_Y7oe7frl";

// n8n Automation Webhook URL (Can be set in code or customized via localStorage)
const N8N_WEBHOOK_URL = "https://obitouchiha.app.n8n.cloud/webhook-test/SOS-trigger";
const MAKE_WEBHOOK_URL = N8N_WEBHOOK_URL; // Backwards compatibility alias

// Local storage keys for persistent offline/demo fallback and custom key configuration
const SOSAFE_CUSTOM_CONFIG_KEY = 'sosafe_supabase_custom_config';
const SOSAFE_N8N_WEBHOOK_KEY = 'sosafe_n8n_webhook_url';
const SOSAFE_MAKE_WEBHOOK_KEY = 'sosafe_make_webhook_url';
const SOSAFE_SESSION_USER_KEY = 'sosafe_auth_session_user';
const SOSAFE_MOCK_PROFILES_KEY = 'sosafe_mock_profiles';
const SOSAFE_MOCK_CONTACTS_KEY = 'sosafe_mock_contacts';
const SOSAFE_MOCK_SESSIONS_KEY = 'sosafe_mock_live_sessions';
const SOSAFE_MOCK_ALERTS_KEY = 'sosafe_mock_emergency_alerts';

class SupabaseService {
  constructor() {
    this.client = null;
    this.url = SUPABASE_URL;
    this.anonKey = SUPABASE_ANON_KEY;
    this.loadActiveConfig();
    this.initClient();
  }

  loadActiveConfig() {
    try {
      const customConfig = localStorage.getItem(SOSAFE_CUSTOM_CONFIG_KEY);
      if (customConfig) {
        const parsed = JSON.parse(customConfig);
        if (parsed.url && parsed.anonKey) {
          this.url = parsed.url;
          this.anonKey = parsed.anonKey;
          return;
        }
      }
    } catch (e) {
      console.warn('Error reading custom Supabase config:', e);
    }
    this.url = SUPABASE_URL;
    this.anonKey = SUPABASE_ANON_KEY;
  }

  saveCustomConfig(url, anonKey) {
    this.url = url.trim();
    this.anonKey = anonKey.trim();
    localStorage.setItem(SOSAFE_CUSTOM_CONFIG_KEY, JSON.stringify({ url: this.url, anonKey: this.anonKey }));
    this.initClient();
  }

  resetCustomConfig() {
    localStorage.removeItem(SOSAFE_CUSTOM_CONFIG_KEY);
    this.url = SUPABASE_URL;
    this.anonKey = SUPABASE_ANON_KEY;
    this.initClient();
  }

  isLiveConfigured() {
    return (
      this.url &&
      this.url.startsWith('https://') &&
      !this.url.includes('https://hfrtlesdetdcesnlewya.supabase.co') &&
      this.anonKey &&
      this.anonKey.length > 25 &&
      !this.anonKey.includes('sb_publishable_W0Gd7dj4u498gWDLmiEVLQ_yudwsJIp')
    );
  }

  initClient() {
    if (window.supabase && typeof window.supabase.createClient === 'function') {
      if (this.isLiveConfigured()) {
        try {
          this.client = window.supabase.createClient(this.url, this.anonKey, {
            auth: {
              persistSession: true,
              autoRefreshToken: true,
              detectSessionInUrl: true
            }
          });

          this.client.auth.onAuthStateChange((event, session) => {
            if (session && session.user) {
              const u = {
                id: session.user.id,
                email: session.user.email,
                full_name: (session.user.user_metadata && session.user.user_metadata.full_name) || session.user.email.split('@')[0],
                phone: (session.user.user_metadata && session.user.user_metadata.phone) || '',
                created_at: session.user.created_at
              };
              localStorage.setItem(SOSAFE_SESSION_USER_KEY, JSON.stringify(u));
            } else if (event === 'SIGNED_OUT') {
              localStorage.removeItem(SOSAFE_SESSION_USER_KEY);
            }
            window.dispatchEvent(new CustomEvent('sosafe_auth_state_changed', { detail: { event, session } }));
          });
          return;
        } catch (err) {
          console.warn('Failed to initialize live Supabase client:', err);
        }
      }
    }
    this.client = null;
  }

  // --------------------------------------------------------------------------
  // AUTHENTICATION METHODS
  // --------------------------------------------------------------------------

  async signUp(email, password, fullName = '', phone = '') {
    if (this.client && this.isLiveConfigured()) {
      try {
        const { data, error } = await this.client.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              phone: phone
            }
          }
        });

        if (error) {
          console.error('Supabase signup error:', error);
          throw error;
        }

        if (data && data.user) {
          const userObj = {
            id: data.user.id,
            email: data.user.email,
            full_name: fullName || (data.user.user_metadata && data.user.user_metadata.full_name) || data.user.email.split('@')[0],
            phone: phone || (data.user.user_metadata && data.user.user_metadata.phone) || '',
            created_at: data.user.created_at
          };
          localStorage.setItem(SOSAFE_SESSION_USER_KEY, JSON.stringify(userObj));

          // Try updating profile safely if session exists
          if (data.session) {
            try {
              await this.updateProfile(data.user.id, {
                full_name: fullName,
                email: email,
                phone: phone
              });
            } catch (pErr) {
              console.warn('Could not auto-insert profile immediately:', pErr);
            }
          }

          return { success: true, user: userObj, session: data.session };
        }
      } catch (err) {
        return { success: false, error: err.message || 'Signup failed with Supabase.' };
      }
    }

    // Demo/Fallback Mode Signup
    const mockId = 'user_' + Math.random().toString(36).substr(2, 9);
    const userObj = {
      id: mockId,
      email: email.trim(),
      full_name: fullName.trim() || email.split('@')[0],
      phone: phone.trim(),
      created_at: new Date().toISOString()
    };

    const profiles = this.getMockProfiles();
    profiles[mockId] = {
      id: mockId,
      full_name: userObj.full_name,
      email: userObj.email,
      phone: userObj.phone,
      created_at: userObj.created_at,
      updated_at: userObj.created_at
    };
    this.saveMockProfiles(profiles);

    // Auto-seed demo emergency contacts for new user
    this.seedMockContacts(mockId);

    localStorage.setItem(SOSAFE_SESSION_USER_KEY, JSON.stringify(userObj));
    return { success: true, user: userObj, session: null };
  }

  async signIn(email, password) {
    if (this.client && this.isLiveConfigured()) {
      try {
        const { data, error } = await this.client.auth.signInWithPassword({
          email,
          password
        });

        if (error) throw error;

        if (data && data.user) {
          const userObj = {
            id: data.user.id,
            email: data.user.email,
            full_name: (data.user.user_metadata && data.user.user_metadata.full_name) || data.user.email.split('@')[0],
            phone: (data.user.user_metadata && data.user.user_metadata.phone) || '',
            created_at: data.user.created_at
          };
          localStorage.setItem(SOSAFE_SESSION_USER_KEY, JSON.stringify(userObj));
          return { success: true, user: userObj, session: data.session };
        }
      } catch (err) {
        return { success: false, error: err.message || 'Invalid credentials or user not found.' };
      }
    }

    // Demo/Fallback Mode SignIn
    const profiles = this.getMockProfiles();
    let matchedUser = Object.values(profiles).find(p => p.email.toLowerCase() === email.toLowerCase());

    if (!matchedUser) {
      const mockId = 'user_' + Math.random().toString(36).substr(2, 9);
      matchedUser = {
        id: mockId,
        email: email.trim(),
        full_name: email.split('@')[0],
        phone: '+91 98765 43210',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      profiles[mockId] = matchedUser;
      this.saveMockProfiles(profiles);
      this.seedMockContacts(mockId);
    }

    localStorage.setItem(SOSAFE_SESSION_USER_KEY, JSON.stringify(matchedUser));
    return { success: true, user: matchedUser, session: null };
  }

  async signInWithPassword(email, password) {
    return this.signIn(email, password);
  }

  async signInWithOAuth(provider = 'google') {
    if (provider === 'google') return this.signInWithGoogle();
    return { success: false, error: `Provider ${provider} is not configured.` };
  }

  async signInWithGoogle() {
    if (this.client && this.isLiveConfigured()) {
      try {
        const { data, error } = await this.client.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: window.location.origin + window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1) + 'dashboard.html'
          }
        });
        if (error) throw error;
        return { success: true, data };
      } catch (err) {
        return { success: false, error: err.message || 'Google OAuth failed.' };
      }
    }

    // Demo/Fallback Google SignIn
    const mockId = 'user_google_' + Math.random().toString(36).substr(2, 9);
    const googleUser = {
      id: mockId,
      email: 'alex.guardian@gmail.com',
      full_name: 'Alex Guardian',
      phone: '+91 98765 43210',
      created_at: new Date().toISOString()
    };
    const profiles = this.getMockProfiles();
    profiles[mockId] = {
      id: mockId,
      full_name: googleUser.full_name,
      email: googleUser.email,
      phone: googleUser.phone,
      created_at: googleUser.created_at,
      updated_at: googleUser.created_at
    };
    this.saveMockProfiles(profiles);
    this.seedMockContacts(mockId);
    localStorage.setItem(SOSAFE_SESSION_USER_KEY, JSON.stringify(googleUser));
    return { success: true, user: googleUser };
  }

  async signOut() {
    if (this.client && this.isLiveConfigured()) {
      try {
        await this.client.auth.signOut();
      } catch (err) {
        console.warn('Supabase signout notice:', err);
      }
    }
    localStorage.removeItem(SOSAFE_SESSION_USER_KEY);
    window.dispatchEvent(new CustomEvent('sosafe_auth_state_changed', { detail: { event: 'SIGNED_OUT', session: null } }));
    return { success: true };
  }

  async getUser() {
    if (this.client && this.isLiveConfigured()) {
      try {
        const { data: { session } } = await this.client.auth.getSession();
        if (session && session.user) {
          return {
            id: session.user.id,
            email: session.user.email,
            full_name: (session.user.user_metadata && session.user.user_metadata.full_name) || session.user.email.split('@')[0],
            phone: (session.user.user_metadata && session.user.user_metadata.phone) || '',
            created_at: session.user.created_at
          };
        }
      } catch (e) {
        console.warn('Error reading active session from Supabase:', e);
      }
    }

    try {
      const stored = localStorage.getItem(SOSAFE_SESSION_USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  }

  // --------------------------------------------------------------------------
  // USER PROFILE DATABASE CRUD
  // --------------------------------------------------------------------------

  async getProfile(userId) {
    if (!userId) return { success: false, error: 'User ID is required' };

    if (this.client && this.isLiveConfigured()) {
      try {
        const { data, error } = await this.client
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();

        if (error && error.code !== 'PGRST116') {
          throw error;
        }

        if (data) {
          return { success: true, profile: data };
        }
      } catch (err) {
        console.warn('Supabase getProfile notice:', err);
      }
    }

    // Demo/Fallback Profile
    const profiles = this.getMockProfiles();
    let profile = profiles[userId];
    if (!profile) {
      const activeUser = await this.getUser();
      profile = {
        id: userId,
        full_name: (activeUser && activeUser.full_name) || 'Safety Defender',
        email: (activeUser && activeUser.email) || 'user@example.com',
        phone: (activeUser && activeUser.phone) || '+91 98765 43210',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      profiles[userId] = profile;
      this.saveMockProfiles(profiles);
    }
    return { success: true, profile };
  }

  async updateProfile(userId, profileData) {
    if (!userId) return { success: false, error: 'User ID is required' };

    const updatePayload = {
      full_name: profileData.full_name ? profileData.full_name.trim() : undefined,
      phone: profileData.phone ? profileData.phone.trim() : undefined,
      updated_at: new Date().toISOString()
    };

    if (this.client && this.isLiveConfigured()) {
      try {
        const { data, error } = await this.client
          .from('profiles')
          .upsert({
            id: userId,
            ...updatePayload
          })
          .select()
          .single();

        if (error) throw error;
        return { success: true, profile: data };
      } catch (err) {
        return { success: false, error: err.message || 'Failed to update profile.' };
      }
    }

    // Demo/Fallback Profile Update
    const profiles = this.getMockProfiles();
    profiles[userId] = {
      ...(profiles[userId] || {}),
      id: userId,
      ...updatePayload
    };
    this.saveMockProfiles(profiles);

    // Update active session snapshot
    const active = await this.getUser();
    if (active && active.id === userId) {
      const current = { ...active };
      if (updatePayload.full_name) current.full_name = updatePayload.full_name;
      if (updatePayload.phone) current.phone = updatePayload.phone;
      localStorage.setItem(SOSAFE_SESSION_USER_KEY, JSON.stringify(current));
    }

    return { success: true, profile: profiles[userId] };
  }

  // --------------------------------------------------------------------------
  // 4 SEPARATE EMERGENCY CONTACT TABLES CRUD (emergency_contact1 .. 4)
  // All tables store contacts with the same user_id
  // --------------------------------------------------------------------------

  getContactTableNames() {
    return ['emergency_contact1', 'emergency_contact2', 'emergency_contact3', 'emergency_contact4'];
  }

  /**
   * Retrieves all emergency contacts across the 4 separate tables for the same user_id
   * @param {string} userId - Current user's unique ID
   * @returns {Promise<{success: boolean, contacts: Array}>}
   */
  async getEmergencyContacts(userId) {
    if (!userId) return { success: false, contacts: [] };

    const tables = this.getContactTableNames();
    let separateContacts = [];
    let queryFailures = 0;

    // 1. Supabase Query across the 4 separate tables in parallel
    if (this.client && this.isLiveConfigured()) {
      try {
        const queryPromises = tables.map((tbl, index) =>
          this.client
            .from(tbl)
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: true })
            .then(res => ({
              table: tbl,
              slot: index + 1,
              data: res.data || [],
              error: res.error
            }))
            .catch(err => ({
              table: tbl,
              slot: index + 1,
              data: [],
              error: err
            }))
        );

        const results = await Promise.all(queryPromises);

        results.forEach(r => {
          if (r.error) {
            queryFailures++;
          }
          if (r.data && r.data.length > 0) {
            r.data.forEach(item => {
              separateContacts.push({
                ...item,
                _table: r.table,
                _slot: r.slot
              });
            });
          }
        });

        // Return contacts sorted by slot
        if (separateContacts.length > 0) {
          separateContacts.sort((a, b) => (a._slot || 1) - (b._slot || 1));
          return { success: true, contacts: separateContacts };
        }

        if (queryFailures < tables.length) {
          return { success: true, contacts: [] };
        }
      } catch (err) {
        console.warn('Supabase getEmergencyContacts separate tables notice:', err);
      }
    }

    // 2. Fallback Local Storage
    const allContacts = this.getMockContacts();
    const userContacts = allContacts.filter(c => c.user_id === userId);
    userContacts.forEach((c, idx) => {
      if (!c._slot) c._slot = idx + 1;
      if (!c._table) c._table = tables[idx] || 'emergency_contact1';
    });
    userContacts.sort((a, b) => (a._slot || 1) - (b._slot || 1));
    return { success: true, contacts: userContacts.slice(0, 4) };
  }

  /**
   * Adds an emergency contact into the designated separate table (emergency_contact1 .. 4)
   * All contacts are strictly bound to the same userId
   * @param {string} userId - Current logged in user ID
   * @param {Object} contactData - { name, phone, relationship }
   * @param {number|null} preferredSlot - Optional slot number (1, 2, 3, or 4)
   */
  async addEmergencyContact(userId, contactData, preferredSlot = null) {
    if (!userId) return { success: false, error: 'User ID is required' };

    const tables = this.getContactTableNames();
    const existingRes = await this.getEmergencyContacts(userId);
    const existingContacts = existingRes.contacts || [];

    if (existingContacts.length >= 4) {
      return { success: false, error: 'Maximum limit of 4 emergency contacts reached.' };
    }

    // Determine target slot (1 to 4)
    let targetSlot = preferredSlot ? parseInt(preferredSlot, 10) : null;
    const occupiedSlots = new Set();
    existingContacts.forEach(c => {
      if (c._slot) occupiedSlots.add(c._slot);
    });

    if (!targetSlot || targetSlot < 1 || targetSlot > 4 || occupiedSlots.has(targetSlot)) {
      for (let s = 1; s <= 4; s++) {
        if (!occupiedSlots.has(s)) {
          targetSlot = s;
          break;
        }
      }
    }
    if (!targetSlot) targetSlot = Math.min(existingContacts.length + 1, 4);

    const targetTable = tables[targetSlot - 1] || 'emergency_contact1';

    const newContact = {
      user_id: userId,
      name: contactData.name.trim(),
      phone: contactData.phone.trim(),
      relationship: contactData.relationship || 'Guardian',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // 1. Supabase Insert into the specific separate table (e.g. emergency_contact1)
    if (this.client && this.isLiveConfigured()) {
      try {
        console.log(`Inserting contact into separate table '${targetTable}' for user_id: ${userId}`);
        const { data, error } = await this.client
          .from(targetTable)
          .insert([newContact])
          .select()
          .single();

        if (error) {
          console.error(`Insert into ${targetTable} failed:`, error);
          throw error;
        }

        return {
          success: true,
          contact: {
            ...data,
            _table: targetTable,
            _slot: targetSlot
          }
        };
      } catch (err) {
        return { success: false, error: err.message || `Failed to add emergency contact into ${targetTable}.` };
      }
    }

    // 2. Fallback Local Storage
    const allContacts = this.getMockContacts();
    const contactObj = {
      id: 'contact_' + Math.random().toString(36).substr(2, 9),
      _table: targetTable,
      _slot: targetSlot,
      ...newContact
    };
    allContacts.push(contactObj);
    this.saveMockContacts(allContacts);
    return { success: true, contact: contactObj };
  }

  /**
   * Updates an existing emergency contact in its separate table
   * @param {string} contactId - Contact UUID
   * @param {Object} contactData - { name, phone, relationship, _table }
   */
  async updateEmergencyContact(contactId, contactData) {
    if (!contactId) return { success: false, error: 'Contact ID is required' };

    const updatePayload = {
      name: contactData.name.trim(),
      phone: contactData.phone.trim(),
      relationship: contactData.relationship || 'Guardian',
      updated_at: new Date().toISOString()
    };

    const tables = this.getContactTableNames();
    const preferredTable = contactData._table;

    // 1. Supabase Update
    if (this.client && this.isLiveConfigured()) {
      try {
        if (preferredTable && tables.includes(preferredTable)) {
          const { data, error } = await this.client
            .from(preferredTable)
            .update(updatePayload)
            .eq('id', contactId)
            .select()
            .single();

          if (!error && data) {
            return { success: true, contact: { ...data, _table: preferredTable } };
          }
        }

        // If preferred table not provided or failed, search across all 4 separate tables
        for (const tbl of tables) {
          const { data, error } = await this.client
            .from(tbl)
            .update(updatePayload)
            .eq('id', contactId)
            .select()
            .maybeSingle();

          if (!error && data) {
            return { success: true, contact: { ...data, _table: tbl } };
          }
        }
      } catch (err) {
        return { success: false, error: err.message || 'Failed to update emergency contact.' };
      }
    }

    // 2. Fallback Local Storage
    const allContacts = this.getMockContacts();
    const idx = allContacts.findIndex(c => c.id === contactId);
    if (idx !== -1) {
      allContacts[idx] = { ...allContacts[idx], ...updatePayload };
      this.saveMockContacts(allContacts);
      return { success: true, contact: allContacts[idx] };
    }
    return { success: false, error: 'Contact not found.' };
  }

  /**
   * Deletes an emergency contact from its separate table
   * @param {string} contactId - Contact UUID
   * @param {string|null} targetTable - Name of table (e.g. emergency_contact1)
   */
  async deleteEmergencyContact(contactId, targetTable = null) {
    if (!contactId) return { success: false, error: 'Contact ID is required' };

    const tables = targetTable ? [targetTable] : this.getContactTableNames();

    // 1. Supabase Delete
    if (this.client && this.isLiveConfigured()) {
      try {
        let deleted = false;
        for (const tbl of tables) {
          const { error } = await this.client
            .from(tbl)
            .delete()
            .eq('id', contactId);

          if (!error) deleted = true;
        }
        return { success: true };
      } catch (err) {
        return { success: false, error: err.message || 'Failed to delete contact.' };
      }
    }

    // 2. Fallback Local Storage
    const allContacts = this.getMockContacts().filter(c => c.id !== contactId);
    this.saveMockContacts(allContacts);
    return { success: true };
  }

  // --------------------------------------------------------------------------
  // N8N AUTOMATION WEBHOOK CONFIGURATION & DISPATCH
  // --------------------------------------------------------------------------

  getN8NWebhookUrl() {
    try {
      let customUrl = localStorage.getItem(SOSAFE_N8N_WEBHOOK_KEY) || localStorage.getItem(SOSAFE_MAKE_WEBHOOK_KEY);
      if (!customUrl || !customUrl.trim() || customUrl.includes('itachiuchiha123')) {
        customUrl = N8N_WEBHOOK_URL;
        localStorage.setItem(SOSAFE_N8N_WEBHOOK_KEY, N8N_WEBHOOK_URL);
      }
      if (typeof customUrl === 'string') {
        customUrl = customUrl.trim().replace(/^[\[\s"']+|[\]\s"']+$/g, '').trim();
      }
      return customUrl;
    } catch (e) {
      return (N8N_WEBHOOK_URL || '').replace(/^[\[\s"']+|[\]\s"']+$/g, '').trim();
    }
  }

  setN8NWebhookUrl(url) {
    if (!url || !url.trim()) {
      localStorage.removeItem(SOSAFE_N8N_WEBHOOK_KEY);
      localStorage.removeItem(SOSAFE_MAKE_WEBHOOK_KEY);
    } else {
      const cleanUrl = url.trim().replace(/^[\[\s"']+|[\]\s"']+$/g, '').trim();
      localStorage.setItem(SOSAFE_N8N_WEBHOOK_KEY, cleanUrl);
    }
  }

  // Backwards compatibility aliases
  getMakeWebhookUrl() {
    return this.getN8NWebhookUrl();
  }

  setMakeWebhookUrl(url) {
    this.setN8NWebhookUrl(url);
  }

  /**
   * Triggers the n8n webhook with the current user ID and emergency payload
   * @param {string|Object} payloadOrUserId - user_id string or alert details object
   */
  async triggerN8NSOSAutomation(payloadOrUserId) {
    const webhookUrl = this.getN8NWebhookUrl();

    // Extract current user_id
    let currentUserId = 'anonymous_user';
    if (typeof payloadOrUserId === 'string' && payloadOrUserId.trim()) {
      currentUserId = payloadOrUserId.trim();
    } else if (payloadOrUserId && typeof payloadOrUserId === 'object') {
      currentUserId = payloadOrUserId.user_id || payloadOrUserId.id || 'anonymous_user';
    }

    if (!currentUserId || currentUserId === 'anonymous_user') {
      const activeUser = await this.getUser();
      if (activeUser && activeUser.id) {
        currentUserId = activeUser.id;
      }
    }

    const bodyPayload = {
      user_id: currentUserId
    };

    if (!webhookUrl || webhookUrl.includes('PASTE_YOUR') || webhookUrl.includes('your-custom-webhook-id') || webhookUrl.includes('your-webhook-id')) {
      console.warn('n8n Webhook URL is pending user configuration. Please configure in Settings or js/supabase.js.');
      return { success: false, reason: 'n8n webhook URL unconfigured' };
    }

    try {
      console.log('Dispatching HTTP POST to n8n Webhook:', webhookUrl, bodyPayload);
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyPayload)
      });

      if (!response.ok) {
        throw new Error(`n8n Webhook HTTP response status: ${response.status} ${response.statusText}`);
      }

      let resData = null;
      try {
        resData = await response.json();
      } catch (e) {
        resData = { status: response.status, statusText: response.statusText };
      }

      console.log('n8n Webhook response success:', resData);
      return { success: true, status: response.status, data: resData };
    } catch (err) {
      console.error('Error triggering n8n SOS webhook:', err);
      return { success: false, error: err.message || err };
    }
  }

  // Alias for backwards compatibility
  async triggerMakeSOSAutomation(payloadOrUserId) {
    return this.triggerN8NSOSAutomation(payloadOrUserId);
  }

  // --------------------------------------------------------------------------
  // EMERGENCY ALERTS DATABASE (SUPABASE)
  // --------------------------------------------------------------------------

  async createEmergencyAlert(userId, alertData) {
    if (!userId) return { success: false, error: 'User ID is required' };

    const alertPayload = {
      user_id: userId,
      live_session_id: alertData.live_session_id || null,
      latitude: alertData.latitude || 13.0827,
      longitude: alertData.longitude || 80.2707,
      accuracy: alertData.accuracy || 10.0,
      status: 'pending',
      contacts_count: alertData.contacts_count || 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // 1. Supabase Insert
    if (this.client && this.isLiveConfigured()) {
      try {
        const { data, error } = await this.client
          .from('emergency_alerts')
          .insert([alertPayload])
          .select()
          .single();

        if (error) throw error;
        return { success: true, alert: data };
      } catch (err) {
        console.warn('Supabase createEmergencyAlert notice:', err);
      }
    }

    // 2. Fallback Local Storage
    const allAlerts = this.getMockAlerts();
    const mockAlert = {
      id: 'alert_' + Math.random().toString(36).substr(2, 9),
      ...alertPayload
    };
    allAlerts.push(mockAlert);
    this.saveMockAlerts(allAlerts);
    return { success: true, alert: mockAlert };
  }

  async updateEmergencyAlertStatus(alertId, status, errorMessage = null) {
    if (!alertId) return { success: false, error: 'Alert ID is required' };

    const updatePayload = {
      status: status,
      error_message: errorMessage,
      updated_at: new Date().toISOString()
    };

    // 1. Supabase Update
    if (this.client && this.isLiveConfigured()) {
      try {
        const { data, error } = await this.client
          .from('emergency_alerts')
          .update(updatePayload)
          .eq('id', alertId)
          .select()
          .single();

        if (error) throw error;
        return { success: true, alert: data };
      } catch (err) {
        console.warn('Supabase updateEmergencyAlertStatus notice:', err);
      }
    }

    // 2. Fallback Local Storage
    const allAlerts = this.getMockAlerts();
    const idx = allAlerts.findIndex(a => a.id === alertId);
    if (idx !== -1) {
      allAlerts[idx] = { ...allAlerts[idx], ...updatePayload };
      this.saveMockAlerts(allAlerts);
      return { success: true, alert: allAlerts[idx] };
    }
    return { success: false, error: 'Alert record not found' };
  }

  getMockAlerts() {
    try {
      const a = localStorage.getItem(SOSAFE_MOCK_ALERTS_KEY);
      return a ? JSON.parse(a) : [];
    } catch (e) {
      return [];
    }
  }

  saveMockAlerts(alerts) {
    localStorage.setItem(SOSAFE_MOCK_ALERTS_KEY, JSON.stringify(alerts));
  }

  // --------------------------------------------------------------------------
  // LIVE LOCATION SESSIONS DATABASE & REALTIME METHODS
  // --------------------------------------------------------------------------

  async createLiveLocationSession(userId, coords) {
    if (!userId) return { success: false, error: 'User ID is required' };

    const sessionPayload = {
      user_id: userId,
      latitude: coords.latitude || 13.0827,
      longitude: coords.longitude || 80.2707,
      accuracy: coords.accuracy || 10.0,
      is_active: true,
      started_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    };

    if (this.client && this.isLiveConfigured()) {
      try {
        const { data, error } = await this.client
          .from('live_location_sessions')
          .insert([sessionPayload])
          .select()
          .single();

        if (error) throw error;
        return { success: true, session: data };
      } catch (err) {
        console.warn('Supabase createLiveLocationSession error, using fallback:', err);
      }
    }

    // Demo/Fallback Session Creation
    const mockSessionId = 'loc_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
    const sessionObj = {
      id: mockSessionId,
      ...sessionPayload
    };

    const allSessions = this.getMockLiveSessions();
    allSessions[mockSessionId] = sessionObj;
    this.saveMockLiveSessions(allSessions);

    return { success: true, session: sessionObj };
  }

  async updateLiveLocationSession(sessionId, coords) {
    if (!sessionId) return { success: false, error: 'Session ID is required' };

    const updatePayload = {
      latitude: coords.latitude,
      longitude: coords.longitude,
      accuracy: coords.accuracy || 10.0,
      updated_at: new Date().toISOString()
    };

    if (this.client && this.isLiveConfigured()) {
      try {
        const { data, error } = await this.client
          .from('live_location_sessions')
          .update(updatePayload)
          .eq('id', sessionId)
          .select()
          .single();

        if (error) throw error;
        return { success: true, session: data };
      } catch (err) {
        console.warn('Supabase updateLiveLocationSession notice:', err);
      }
    }

    // Demo/Fallback Session Update
    const allSessions = this.getMockLiveSessions();
    if (allSessions[sessionId]) {
      allSessions[sessionId] = {
        ...allSessions[sessionId],
        ...updatePayload
      };
      this.saveMockLiveSessions(allSessions);
      window.dispatchEvent(new CustomEvent('sosafe_live_loc_updated', { detail: allSessions[sessionId] }));
      return { success: true, session: allSessions[sessionId] };
    }

    return { success: false, error: 'Live location session not found.' };
  }

  async getLiveLocationSession(sessionId) {
    if (!sessionId) return { success: false, error: 'Session ID is required' };

    if (this.client && this.isLiveConfigured()) {
      try {
        const { data, error } = await this.client
          .from('live_location_sessions')
          .select('*')
          .eq('id', sessionId)
          .single();

        if (error) throw error;
        return { success: true, session: data };
      } catch (err) {
        console.warn('Supabase getLiveLocationSession notice:', err);
      }
    }

    // Demo/Fallback Session Lookup
    const allSessions = this.getMockLiveSessions();
    const session = allSessions[sessionId];
    if (session) {
      return { success: true, session };
    }
    return { success: false, error: 'Live location session not found.' };
  }

  async stopLiveLocationSession(sessionId) {
    if (!sessionId) return { success: false, error: 'Session ID is required' };

    const updatePayload = {
      is_active: false,
      updated_at: new Date().toISOString()
    };

    if (this.client && this.isLiveConfigured()) {
      try {
        const { data, error } = await this.client
          .from('live_location_sessions')
          .update(updatePayload)
          .eq('id', sessionId)
          .select()
          .single();

        if (error) throw error;
        return { success: true, session: data };
      } catch (err) {
        console.warn('Supabase stopLiveLocationSession notice:', err);
      }
    }

    // Demo/Fallback Stop
    const allSessions = this.getMockLiveSessions();
    if (allSessions[sessionId]) {
      allSessions[sessionId].is_active = false;
      allSessions[sessionId].updated_at = new Date().toISOString();
      this.saveMockLiveSessions(allSessions);
      window.dispatchEvent(new CustomEvent('sosafe_live_loc_updated', { detail: allSessions[sessionId] }));
      return { success: true, session: allSessions[sessionId] };
    }

    return { success: false, error: 'Session not found.' };
  }

  subscribeToLiveLocation(sessionId, onUpdate) {
    if (!sessionId || typeof onUpdate !== 'function') return () => { };

    if (this.client && this.isLiveConfigured()) {
      try {
        const channel = this.client
          .channel(`live_location_${sessionId}`)
          .on(
            'postgres_changes',
            {
              event: 'UPDATE',
              schema: 'public',
              table: 'live_location_sessions',
              filter: `id=eq.${sessionId}`
            },
            (payload) => {
              if (payload && payload.new) {
                onUpdate(payload.new);
              }
            }
          )
          .subscribe();

        return () => {
          this.client.removeChannel(channel);
        };
      } catch (err) {
        console.warn('Realtime subscription fallback:', err);
      }
    }

    // Fallback event listener & interval check
    const eventHandler = (e) => {
      if (e.detail && e.detail.id === sessionId) {
        onUpdate(e.detail);
      }
    };
    window.addEventListener('sosafe_live_loc_updated', eventHandler);

    const intervalId = setInterval(async () => {
      const res = await this.getLiveLocationSession(sessionId);
      if (res.success && res.session) {
        onUpdate(res.session);
      }
    }, 3000);

    return () => {
      window.removeEventListener('sosafe_live_loc_updated', eventHandler);
      clearInterval(intervalId);
    };
  }

  // --------------------------------------------------------------------------
  // AUTH GUARD HELPERS
  // --------------------------------------------------------------------------

  async requireAuth(redirectUrl = 'login.html') {
    const user = await this.getUser();
    if (!user) {
      window.location.href = redirectUrl;
      return null;
    }
    return user;
  }

  async redirectIfAuthenticated(redirectUrl = 'dashboard.html') {
    const user = await this.getUser();
    if (user) {
      window.location.href = redirectUrl;
      return user;
    }
    return null;
  }

  // --------------------------------------------------------------------------
  // MOCK DATA UTILITIES (For Seamless Out-of-the-Box Operation)
  // --------------------------------------------------------------------------

  getMockProfiles() {
    try {
      const p = localStorage.getItem(SOSAFE_MOCK_PROFILES_KEY);
      return p ? JSON.parse(p) : {};
    } catch (e) {
      return {};
    }
  }

  saveMockProfiles(profiles) {
    localStorage.setItem(SOSAFE_MOCK_PROFILES_KEY, JSON.stringify(profiles));
  }

  getMockContacts() {
    try {
      const c = localStorage.getItem(SOSAFE_MOCK_CONTACTS_KEY);
      return c ? JSON.parse(c) : [];
    } catch (e) {
      return [];
    }
  }

  saveMockContacts(contacts) {
    localStorage.setItem(SOSAFE_MOCK_CONTACTS_KEY, JSON.stringify(contacts));
  }

  getMockLiveSessions() {
    try {
      const s = localStorage.getItem(SOSAFE_MOCK_SESSIONS_KEY);
      return s ? JSON.parse(s) : {};
    } catch (e) {
      return {};
    }
  }

  saveMockLiveSessions(sessions) {
    localStorage.setItem(SOSAFE_MOCK_SESSIONS_KEY, JSON.stringify(sessions));
  }

  seedMockContacts(userId) {
    const allContacts = this.getMockContacts();
    const existing = allContacts.filter(c => c.user_id === userId);
    if (existing.length === 0) {
      const defaults = [
        {
          id: 'contact_' + Math.random().toString(36).substr(2, 9),
          user_id: userId,
          name: 'Amma (Mother)',
          phone: '+91 98765 43210',
          relationship: 'Parent / Family',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 'contact_' + Math.random().toString(36).substr(2, 9),
          user_id: userId,
          name: 'Appa (Father)',
          phone: '+91 98765 43211',
          relationship: 'Parent / Family',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 'contact_' + Math.random().toString(36).substr(2, 9),
          user_id: userId,
          name: 'Karthik S.',
          phone: '+91 98765 43212',
          relationship: 'Friend / Guardian',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];
      allContacts.push(...defaults);
      this.saveMockContacts(allContacts);
    }
  }
}

// Instantiate global service
window.SOSafeDB = new SupabaseService();
