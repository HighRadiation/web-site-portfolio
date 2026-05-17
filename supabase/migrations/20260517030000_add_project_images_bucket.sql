-- Public storage bucket for project preview images.
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-images', 'project-images', true)
ON CONFLICT (id) DO NOTHING;

-- Anyone can read uploaded project images (public site needs them).
CREATE POLICY "Public read project images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'project-images');

-- Only authenticated admin can upload / delete.
CREATE POLICY "Admin can upload project images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'project-images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Admin can delete project images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'project-images' AND auth.uid() IS NOT NULL);
