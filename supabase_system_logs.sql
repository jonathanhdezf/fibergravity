-- Create system_logs table for auditing actions
CREATE TABLE IF NOT EXISTS public.system_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    action TEXT NOT NULL,          -- e.g., 'CREATE', 'UPDATE', 'DELETE', 'STATUS_CHANGE', 'EXPORT'
    entity_type TEXT NOT NULL,     -- e.g., 'LEADS', 'PROVIDERS', 'PLANS', 'SYSTEM'
    entity_id TEXT,                -- ID of the modified entity
    details TEXT,                  -- Human readable description
    severity TEXT DEFAULT 'info',  -- 'info', 'warning', 'critical'
    admin_name TEXT DEFAULT 'System Admin'
);

-- Enable RLS
ALTER TABLE public.system_logs ENABLE ROW LEVEL SECURITY;

-- Allow public read/write for now (adjust as needed for production)
CREATE POLICY "Allow public read access" ON public.system_logs FOR SELECT USING (true);
CREATE POLICY "Allow public insert access" ON public.system_logs FOR INSERT WITH CHECK (true);

-- Index for performance on large logs
CREATE INDEX IF NOT EXISTS idx_logs_created_at ON public.system_logs(created_at DESC);
