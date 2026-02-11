-- Create a new storage bucket for leads documentation
-- Run this in your Supabase SQL Editor

-- 1. Create the bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('leads-documentation', 'leads-documentation', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Allow public access to read files (Required for previsualizations and dossiers)
CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
USING ( bucket_id = 'leads-documentation' );

-- 3. Allow authenticated uploads
CREATE POLICY "Allow Uploads" 
ON storage.objects FOR INSERT 
WITH CHECK ( bucket_id = 'leads-documentation' );

-- 4. Allow authenticated updates (for replacing files)
CREATE POLICY "Allow Updates" 
ON storage.objects FOR UPDATE 
USING ( bucket_id = 'leads-documentation' );

-- 5. Allow authenticated deletes (for removing files)
CREATE POLICY "Allow Deletes" 
ON storage.objects FOR DELETE 
USING ( bucket_id = 'leads-documentation' );
