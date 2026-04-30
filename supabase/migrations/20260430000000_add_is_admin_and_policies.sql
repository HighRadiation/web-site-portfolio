-- Add is_admin column to profiles
ALTER TABLE profiles ADD COLUMN is_admin BOOLEAN DEFAULT false;

-- Make existing user(s) admin (assuming the owner is the only user currently)
UPDATE profiles SET is_admin = true;

-- Update contact_messages policies
DROP POLICY IF EXISTS "Only authenticated users can view messages." ON contact_messages;

CREATE POLICY "Admins can view contact messages." ON contact_messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.is_admin = true
    )
  );

CREATE POLICY "Admins can update contact messages." ON contact_messages
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.is_admin = true
    )
  );

CREATE POLICY "Admins can delete contact messages." ON contact_messages
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.is_admin = true
    )
  );
