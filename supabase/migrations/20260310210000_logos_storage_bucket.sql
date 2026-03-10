-- Create logos storage bucket with public access for logo uploads
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'logos',
  'logos',
  true,
  5242880,
  ARRAY['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'];

-- Allow anyone (including anonymous users) to upload logos
DROP POLICY IF EXISTS "logos_public_upload" ON storage.objects;
CREATE POLICY "logos_public_upload"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (bucket_id = 'logos');

-- Allow anyone to read/view logos (public bucket)
DROP POLICY IF EXISTS "logos_public_read" ON storage.objects;
CREATE POLICY "logos_public_read"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'logos');
