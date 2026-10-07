-- ============================================================================
-- SOSafe Emergency Safety Platform - Supabase PostgreSQL Schema & RLS Policies
-- ============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ----------------------------------------------------------------------------
-- TABLE 1: profiles
-- Stores personal user details linked directly to Supabase Auth auth.users.id
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL DEFAULT '',
    email TEXT NOT NULL DEFAULT '',
    phone TEXT DEFAULT '',
    profile_image TEXT DEFAULT '',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ----------------------------------------------------------------------------
-- REMOVE LEGACY emergency_contacts AND ANY TEMPORARY TABLES
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS public.emergency_contacts CASCADE;
DROP TABLE IF EXISTS public.emergency_contact_1 CASCADE;
DROP TABLE IF EXISTS public.emergency_contact_2 CASCADE;
DROP TABLE IF EXISTS public.emergency_contact_3 CASCADE;
DROP TABLE IF EXISTS public.emergency_contact_4 CASCADE;

-- ----------------------------------------------------------------------------
-- 4 SEPARATE TABLES FOR 4 EMERGENCY CONTACTS (ALL WITH SAME user_id)
-- ----------------------------------------------------------------------------

-- Table 2A: emergency_contact1 (Stores Contact 1 for each user)
CREATE TABLE IF NOT EXISTS public.emergency_contact1 (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    relationship TEXT NOT NULL DEFAULT 'Guardian',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id)
);
CREATE INDEX IF NOT EXISTS idx_emergency_contact1_user_id ON public.emergency_contact1(user_id);

-- Table 2B: emergency_contact2 (Stores Contact 2 for each user)
CREATE TABLE IF NOT EXISTS public.emergency_contact2 (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    relationship TEXT NOT NULL DEFAULT 'Guardian',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id)
);
CREATE INDEX IF NOT EXISTS idx_emergency_contact2_user_id ON public.emergency_contact2(user_id);

-- Table 2C: emergency_contact3 (Stores Contact 3 for each user)
CREATE TABLE IF NOT EXISTS public.emergency_contact3 (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    relationship TEXT NOT NULL DEFAULT 'Guardian',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id)
);
CREATE INDEX IF NOT EXISTS idx_emergency_contact3_user_id ON public.emergency_contact3(user_id);

-- Table 2D: emergency_contact4 (Stores Contact 4 for each user)
CREATE TABLE IF NOT EXISTS public.emergency_contact4 (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    relationship TEXT NOT NULL DEFAULT 'Guardian',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id)
);
CREATE INDEX IF NOT EXISTS idx_emergency_contact4_user_id ON public.emergency_contact4(user_id);

-- ----------------------------------------------------------------------------
-- TABLE 3: live_location_sessions
-- Stores active live-location tracking sessions with coordinates and status
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.live_location_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    accuracy DOUBLE PRECISION DEFAULT 10.0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE DEFAULT (timezone('utc'::text, now()) + INTERVAL '24 hours') NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_live_location_sessions_user_id ON public.live_location_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_live_location_sessions_active ON public.live_location_sessions(is_active);

-- ----------------------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ----------------------------------------------------------------------------

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.live_location_sessions ENABLE ROW LEVEL SECURITY;

-- Profiles Policies: User can only read, insert, and update their own profile
CREATE POLICY "Users can view own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
    ON public.profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- ----------------------------------------------------------------------------
-- RLS POLICIES FOR 4 SEPARATE EMERGENCY CONTACT TABLES (emergency_contact1 .. 4)
-- ----------------------------------------------------------------------------
ALTER TABLE public.emergency_contact1 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emergency_contact2 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emergency_contact3 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emergency_contact4 ENABLE ROW LEVEL SECURITY;

-- Policies for emergency_contact1
CREATE POLICY "Users can view emergency_contact1"
    ON public.emergency_contact1 FOR SELECT
    TO authenticated, anon
    USING (auth.uid() = user_id OR user_id IS NOT NULL);

CREATE POLICY "Users can insert emergency_contact1"
    ON public.emergency_contact1 FOR INSERT
    TO authenticated, anon
    WITH CHECK (auth.uid() = user_id OR user_id IS NOT NULL);

CREATE POLICY "Users can update emergency_contact1"
    ON public.emergency_contact1 FOR UPDATE
    TO authenticated, anon
    USING (auth.uid() = user_id OR user_id IS NOT NULL)
    WITH CHECK (auth.uid() = user_id OR user_id IS NOT NULL);

CREATE POLICY "Users can delete emergency_contact1"
    ON public.emergency_contact1 FOR DELETE
    TO authenticated, anon
    USING (auth.uid() = user_id OR user_id IS NOT NULL);

-- Policies for emergency_contact2
CREATE POLICY "Users can view emergency_contact2"
    ON public.emergency_contact2 FOR SELECT
    TO authenticated, anon
    USING (auth.uid() = user_id OR user_id IS NOT NULL);

CREATE POLICY "Users can insert emergency_contact2"
    ON public.emergency_contact2 FOR INSERT
    TO authenticated, anon
    WITH CHECK (auth.uid() = user_id OR user_id IS NOT NULL);

CREATE POLICY "Users can update emergency_contact2"
    ON public.emergency_contact2 FOR UPDATE
    TO authenticated, anon
    USING (auth.uid() = user_id OR user_id IS NOT NULL)
    WITH CHECK (auth.uid() = user_id OR user_id IS NOT NULL);

CREATE POLICY "Users can delete emergency_contact2"
    ON public.emergency_contact2 FOR DELETE
    TO authenticated, anon
    USING (auth.uid() = user_id OR user_id IS NOT NULL);

-- Policies for emergency_contact3
CREATE POLICY "Users can view emergency_contact3"
    ON public.emergency_contact3 FOR SELECT
    TO authenticated, anon
    USING (auth.uid() = user_id OR user_id IS NOT NULL);

CREATE POLICY "Users can insert emergency_contact3"
    ON public.emergency_contact3 FOR INSERT
    TO authenticated, anon
    WITH CHECK (auth.uid() = user_id OR user_id IS NOT NULL);

CREATE POLICY "Users can update emergency_contact3"
    ON public.emergency_contact3 FOR UPDATE
    TO authenticated, anon
    USING (auth.uid() = user_id OR user_id IS NOT NULL)
    WITH CHECK (auth.uid() = user_id OR user_id IS NOT NULL);

CREATE POLICY "Users can delete emergency_contact3"
    ON public.emergency_contact3 FOR DELETE
    TO authenticated, anon
    USING (auth.uid() = user_id OR user_id IS NOT NULL);

-- Policies for emergency_contact4
CREATE POLICY "Users can view emergency_contact4"
    ON public.emergency_contact4 FOR SELECT
    TO authenticated, anon
    USING (auth.uid() = user_id OR user_id IS NOT NULL);

CREATE POLICY "Users can insert emergency_contact4"
    ON public.emergency_contact4 FOR INSERT
    TO authenticated, anon
    WITH CHECK (auth.uid() = user_id OR user_id IS NOT NULL);

CREATE POLICY "Users can update emergency_contact4"
    ON public.emergency_contact4 FOR UPDATE
    TO authenticated, anon
    USING (auth.uid() = user_id OR user_id IS NOT NULL)
    WITH CHECK (auth.uid() = user_id OR user_id IS NOT NULL);

CREATE POLICY "Users can delete emergency_contact4"
    ON public.emergency_contact4 FOR DELETE
    TO authenticated, anon
    USING (auth.uid() = user_id OR user_id IS NOT NULL);

-- Live Location Sessions Policies
CREATE POLICY "Users can view own live location sessions"
    ON public.live_location_sessions FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own live location sessions"
    ON public.live_location_sessions FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own live location sessions"
    ON public.live_location_sessions FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Public / Emergency contact access policy: anyone with session link can read active session
CREATE POLICY "Anyone with active session link can view live location"
    ON public.live_location_sessions FOR SELECT
    USING (is_active = TRUE);

-- Enable Supabase Realtime for live_location_sessions
ALTER PUBLICATION supabase_realtime ADD TABLE public.live_location_sessions;

-- ----------------------------------------------------------------------------
-- AUTOMATIC PROFILE CREATION TRIGGER ON SIGNUP
-- Automatically creates a profile record in public.profiles when a user signs up
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, email, phone, created_at, updated_at)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'phone', ''),
        NOW(),
        NOW()
    )
    ON CONFLICT (id) DO UPDATE SET
        full_name = EXCLUDED.full_name,
        email = EXCLUDED.email,
        updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Note: Each emergency_contact1..4 table has UNIQUE(user_id) constraint,
-- naturally ensuring each user has at most 1 contact per table (maximum 4 contacts total).

-- ----------------------------------------------------------------------------
-- TABLE 4: emergency_alerts
-- Stores emergency SOS trigger logs, location, and Make.com SMS dispatch status
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.emergency_alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    live_session_id UUID REFERENCES public.live_location_sessions(id) ON DELETE SET NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    accuracy DOUBLE PRECISION DEFAULT 10.0,
    status TEXT NOT NULL DEFAULT 'pending', -- pending, processing, sent, partial_success, failed, no_contacts
    contacts_count INTEGER DEFAULT 0,
    error_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_emergency_alerts_user_id ON public.emergency_alerts(user_id);
CREATE INDEX IF NOT EXISTS idx_emergency_alerts_status ON public.emergency_alerts(status);

ALTER TABLE public.emergency_alerts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own emergency alerts"
    ON public.emergency_alerts FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own emergency alerts"
    ON public.emergency_alerts FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own emergency alerts"
    ON public.emergency_alerts FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

