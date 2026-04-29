-- Add user_id to timeline table to fix RLS permissions
DO $$
BEGIN
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.columns
      WHERE table_name = 'timeline'
        AND column_name = 'user_id'
    ) THEN
        ALTER TABLE timeline
          ADD COLUMN user_id UUID
          REFERENCES profiles(id) ON DELETE CASCADE;
    END IF;
END $$;

-- Dynamically assign existing items to the first profile
UPDATE timeline
  SET user_id = (SELECT id FROM profiles LIMIT 1)
  WHERE user_id IS NULL;

-- Enable RLS
ALTER TABLE timeline ENABLE ROW LEVEL SECURITY;

-- Policies
DROP POLICY IF EXISTS "Timeline is viewable by everyone."
  ON timeline;
CREATE POLICY "Timeline is viewable by everyone."
  ON timeline FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can manage their own timeline."
  ON timeline;
CREATE POLICY "Users can manage their own timeline."
  ON timeline FOR ALL TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
