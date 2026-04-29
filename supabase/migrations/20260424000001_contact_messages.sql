-- Create contact_messages table
CREATE TABLE contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Policies for contact_messages
-- 1. Allow anyone to insert (since it's a public contact form)
CREATE POLICY "Anyone can insert a contact message." ON contact_messages
  FOR INSERT WITH CHECK (true);

-- 2. Allow only authenticated users to read messages (admins)
CREATE POLICY "Only authenticated users can view messages." ON contact_messages
  FOR SELECT USING ((select auth.uid()) is not null);
