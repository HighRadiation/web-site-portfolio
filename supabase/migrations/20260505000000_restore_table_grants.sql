-- Restore table-level GRANTs that were dropped during prior security hardening.
-- RLS policies enforce row-level access; tables still need base GRANTs to the
-- anon/authenticated roles or all queries fail with 42501 "permission denied".

-- Schema usage
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- profiles: public read (RLS already restricts writes via policies)
GRANT SELECT ON public.profiles TO anon, authenticated;

-- projects, skills, timeline: public read, write gated by admin RLS
GRANT SELECT ON public.projects, public.skills, public.timeline TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.projects, public.skills, public.timeline TO authenticated;

-- contact_messages: public can submit, only admins read/update/delete (via RLS)
GRANT INSERT ON public.contact_messages TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.contact_messages TO authenticated;
