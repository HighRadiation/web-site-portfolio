-- Drop old project policies
DROP POLICY IF EXISTS "Users can insert their own projects." ON projects;
DROP POLICY IF EXISTS "Users can update their own projects." ON projects;
DROP POLICY IF EXISTS "Users can delete their own projects." ON projects;

-- Drop old skills policies
DROP POLICY IF EXISTS "Users can insert their own skills." ON skills;
DROP POLICY IF EXISTS "Users can update their own skills." ON skills;
DROP POLICY IF EXISTS "Users can delete their own skills." ON skills;

-- Drop old timeline policies
DROP POLICY IF EXISTS "Users can manage their own timeline." ON timeline;

-- Create new project policies
CREATE POLICY "Admins can insert projects." ON projects FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = true));
CREATE POLICY "Admins can update projects." ON projects FOR UPDATE USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = true));
CREATE POLICY "Admins can delete projects." ON projects FOR DELETE USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = true));

-- Create new skills policies
CREATE POLICY "Admins can insert skills." ON skills FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = true));
CREATE POLICY "Admins can update skills." ON skills FOR UPDATE USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = true));
CREATE POLICY "Admins can delete skills." ON skills FOR DELETE USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = true));

-- Create new timeline policies
CREATE POLICY "Admins can insert timeline." ON timeline FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = true));
CREATE POLICY "Admins can update timeline." ON timeline FOR UPDATE USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = true));
CREATE POLICY "Admins can delete timeline." ON timeline FOR DELETE USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.is_admin = true));
