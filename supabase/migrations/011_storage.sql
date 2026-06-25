-- 011_storage.sql
-- Create default storage buckets and define security policies

-- 1. Create standard buckets
INSERT INTO storage.buckets (id, name, public) VALUES
  ('project-images', 'project-images', true),
  ('achievements', 'achievements', true),
  ('avatars', 'avatars', true),
  ('architecture-diagrams', 'architecture-diagrams', true),
  ('cv-exports', 'cv-exports', false),
  ('showcase-videos', 'showcase-videos', true)
ON CONFLICT (id) DO UPDATE SET public = EXCLUDED.public;
-- 3. Define policies for public access (select/read)
CREATE POLICY "Public Read Access"
  ON storage.objects FOR SELECT
  USING (bucket_id IN ('project-images', 'achievements', 'avatars', 'architecture-diagrams', 'showcase-videos'));

-- 4. Define policies for admin/authenticated access (insert/update/delete)
CREATE POLICY "Admin Write Access"
  ON storage.objects FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
