-- 1. Drop trigger and function that populate profiles
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- 2. Drop policies that depend on profiles.is_admin
DROP POLICY IF EXISTS "Admins can insert projects." ON projects;
DROP POLICY IF EXISTS "Admins can update projects." ON projects;
DROP POLICY IF EXISTS "Admins can delete projects." ON projects;

DROP POLICY IF EXISTS "Admins can insert skills." ON skills;
DROP POLICY IF EXISTS "Admins can update skills." ON skills;
DROP POLICY IF EXISTS "Admins can delete skills." ON skills;

DROP POLICY IF EXISTS "Admins can insert timeline." ON timeline;
DROP POLICY IF EXISTS "Admins can update timeline." ON timeline;
DROP POLICY IF EXISTS "Admins can delete timeline." ON timeline;

DROP POLICY IF EXISTS "Admins can view contact messages." ON contact_messages;
DROP POLICY IF EXISTS "Admins can update contact messages." ON contact_messages;
DROP POLICY IF EXISTS "Admins can delete contact messages." ON contact_messages;

-- 3. Change foreign keys from profiles(id) to auth.users(id)
ALTER TABLE projects DROP CONSTRAINT IF EXISTS projects_user_id_fkey;
ALTER TABLE projects ADD CONSTRAINT projects_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE skills DROP CONSTRAINT IF EXISTS skills_user_id_fkey;
ALTER TABLE skills ADD CONSTRAINT skills_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE timeline DROP CONSTRAINT IF EXISTS timeline_user_id_fkey;
ALTER TABLE timeline ADD CONSTRAINT timeline_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- 4. Recreate policies based purely on authentication
-- Projects
CREATE POLICY "Users can insert their own projects." ON projects FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own projects." ON projects FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own projects." ON projects FOR DELETE USING (auth.uid() = user_id);

-- Skills
CREATE POLICY "Users can insert their own skills." ON skills FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own skills." ON skills FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own skills." ON skills FOR DELETE USING (auth.uid() = user_id);

-- Timeline
CREATE POLICY "Users can insert their own timeline." ON timeline FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own timeline." ON timeline FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own timeline." ON timeline FOR DELETE USING (auth.uid() = user_id);

-- Contact Messages
CREATE POLICY "Authenticated users can view messages." ON contact_messages FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can update messages." ON contact_messages FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can delete messages." ON contact_messages FOR DELETE USING (auth.uid() IS NOT NULL);

-- 5. Drop the profiles table
DROP TABLE IF EXISTS profiles;
