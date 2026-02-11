-- Add rejection_reason to leads table
ALTER TABLE leads ADD COLUMN IF NOT EXISTS rejection_reason TEXT;

-- Update RLS for delete operations if needed (assuming anon for now as per previous setup)
CREATE POLICY "Allow public delete access"
ON leads FOR DELETE
TO anon
USING (true);
