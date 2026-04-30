-- supabase/migrations/20260424000002_timeline.sql
CREATE TABLE timeline (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  date TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL CHECK (type IN ('experience', 'education')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
