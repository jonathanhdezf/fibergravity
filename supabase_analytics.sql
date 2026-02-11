-- Analytics Schema for FiberGravity
CREATE TABLE IF NOT EXISTS site_visits (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    page_path TEXT NOT NULL,
    user_agent TEXT,
    device_type TEXT, -- mobile, desktop, tablet
    browser TEXT,
    os TEXT,
    screen_resolution TEXT,
    session_id UUID
);

-- Enable RLS
ALTER TABLE site_visits ENABLE ROW LEVEL SECURITY;

-- Allow public insert (anonymous tracking)
CREATE POLICY "Enable insert for anonymous tracking" 
ON site_visits FOR INSERT 
WITH CHECK (true);

-- Allow public read for our simple admin dashboard
CREATE POLICY "Allow public read site_visits"
ON site_visits FOR SELECT
TO anon
USING (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_visits_created_at ON site_visits(created_at);
CREATE INDEX IF NOT EXISTS idx_visits_device_type ON site_visits(device_type);
