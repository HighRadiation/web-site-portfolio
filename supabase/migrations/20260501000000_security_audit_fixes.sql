-- Security Audit Fixes - 2026-05-01
-- This migration addresses security vulnerabilities identified in the Supabase Security Advisor.

-- 1. Explicitly enable Row Level Security (RLS) on all public tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.timeline ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- 2. Ensure Public Read Access (SELECT) for portfolio content
DO $$ 
BEGIN
    -- Profiles
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'profiles' AND policyname = 'Public profiles are viewable by everyone.') THEN
        CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR SELECT USING (true);
    END IF;

    -- Projects
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'projects' AND policyname = 'Projects are viewable by everyone.') THEN
        CREATE POLICY "Projects are viewable by everyone." ON public.projects FOR SELECT USING (true);
    END IF;

    -- Skills
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'skills' AND policyname = 'Skills are viewable by everyone.') THEN
        CREATE POLICY "Skills are viewable by everyone." ON public.skills FOR SELECT USING (true);
    END IF;

    -- Timeline
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'timeline' AND policyname = 'Timeline is viewable by everyone.') THEN
        CREATE POLICY "Timeline is viewable by everyone." ON public.timeline FOR SELECT USING (true);
    END IF;
END $$;

-- 3. Ensure Public Insert for Contact Messages (Contact Form)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'contact_messages' AND policyname = 'Anyone can insert a contact message.') THEN
        CREATE POLICY "Anyone can insert a contact message." ON public.contact_messages FOR INSERT WITH CHECK (true);
    END IF;
END $$;

-- 4. Fix SECURITY DEFINER function search path vulnerability
-- This prevents search path hijacking by explicitly setting it to 'public'
ALTER FUNCTION public.handle_new_user() SET search_path = public;

-- 5. Ensure Admin Management Policies (ALL access for admins)
-- These use the is_admin column in the profiles table
DO $$ 
BEGIN
    -- Projects Admin Policy
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'projects' AND policyname = 'Admins can manage projects.') THEN
        CREATE POLICY "Admins can manage projects." ON public.projects 
        FOR ALL TO authenticated 
        USING (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = true));
    END IF;

    -- Skills Admin Policy
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'skills' AND policyname = 'Admins can manage skills.') THEN
        CREATE POLICY "Admins can manage skills." ON public.skills 
        FOR ALL TO authenticated 
        USING (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = true));
    END IF;

    -- Timeline Admin Policy
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'timeline' AND policyname = 'Admins can manage timeline.') THEN
        CREATE POLICY "Admins can manage timeline." ON public.timeline 
        FOR ALL TO authenticated 
        USING (EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = true));
    END IF;
END $$;
