-- Add user_id to timeline table to fix RLS permissions
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'timeline' AND column_name = 'user_id') THEN
        ALTER TABLE timeline ADD COLUMN user_id UUID REFERENCES profiles(id) ON DELETE CASCADE;
    END IF;
END $$;

-- Update existing items with the owner ID
UPDATE timeline SET user_id = '290b734b-5b96-413a-a469-a72f1ddfdca9' WHERE user_id IS NULL;

-- Enable RLS
ALTER TABLE timeline ENABLE ROW LEVEL SECURITY;

-- Policies
DROP POLICY IF EXISTS "Timeline is viewable by everyone." ON timeline;
CREATE POLICY "Timeline is viewable by everyone." ON timeline
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can manage their own timeline." ON timeline;
CREATE POLICY "Users can manage their own timeline." ON timeline
  FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
