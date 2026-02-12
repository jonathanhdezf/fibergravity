-- FIBERGRAVITY MASTER SETUP SQL
-- run this in your Supabase SQL Editor to prepare the entire database

-- 1. CLEANUP (Optional - Uncomment if you want to start fresh)
-- DROP TABLE IF EXISTS support_tickets;
-- DROP TABLE IF EXISTS site_visits;
-- DROP TABLE IF EXISTS system_logs;
-- DROP TABLE IF EXISTS leads;
-- DROP TABLE IF EXISTS plans;
-- DROP TABLE IF EXISTS providers;
-- DROP TABLE IF EXISTS technicians;
-- DROP TABLE IF EXISTS comisionistas;

-- 2. PROVIDERS TABLE
CREATE TABLE IF NOT EXISTS providers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    logo_url TEXT,
    website TEXT,
    description TEXT
);

-- 3. PLANS TABLE
CREATE TABLE IF NOT EXISTS plans (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    provider_id UUID REFERENCES providers(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    type TEXT, -- Gamer, Streamer, Home Office, Empresas, Television
    category_name TEXT,
    speed TEXT,
    price TEXT,
    features TEXT[] DEFAULT '{}',
    recommendation TEXT,
    ranking_score INTEGER DEFAULT 0,
    color_scheme TEXT,
    icon_slug TEXT,
    is_active BOOLEAN DEFAULT true
);

-- 4. COMISIONISTAS (Sales Agents)
CREATE TABLE IF NOT EXISTS comisionistas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    active BOOLEAN DEFAULT true,
    performance_score INTEGER DEFAULT 0
);

-- 5. LEADS TABLE
CREATE TABLE IF NOT EXISTS leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    location TEXT NOT NULL,
    category TEXT NOT NULL,
    provider TEXT NOT NULL,
    plan_name TEXT NOT NULL,
    speed TEXT,
    price TEXT,
    status TEXT DEFAULT 'pending', -- pending, contacting, completed, rejected
    rejection_reason TEXT,
    ine_anverso TEXT, -- URL to storage
    ine_reverso TEXT, -- URL to storage
    comprobante_domicilio TEXT, -- URL to storage
    referencias_hogar TEXT,
    assigned_to UUID REFERENCES comisionistas(id) ON DELETE SET NULL
);

-- 6. TECHNICIANS TABLE
CREATE TABLE IF NOT EXISTS technicians (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT,
    specialty TEXT DEFAULT 'Fibra Óptica',
    active BOOLEAN DEFAULT true
);

-- 7. SUPPORT TICKETS TABLE
CREATE TABLE IF NOT EXISTS support_tickets (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    type TEXT NOT NULL, -- Instalación, Falla Técnica, Cambio de Domicilio, Otros
    description TEXT,
    status TEXT DEFAULT 'pending', -- pending, in_progress, resolved, closed
    assigned_to UUID REFERENCES comisionistas(id) ON DELETE SET NULL, -- Keeping for compatibility
    technician_id UUID REFERENCES technicians(id) ON DELETE SET NULL,
    technical_notes TEXT,
    evidence_photo TEXT,
    speed_test_photo TEXT,
    client_signature TEXT
);

-- 8. SYSTEM LOGS (Auditory)
CREATE TABLE IF NOT EXISTS system_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT,
    details TEXT,
    severity TEXT DEFAULT 'info',
    admin_name TEXT DEFAULT 'System Admin'
);

-- 9. SITE VISITS (Analytics)
CREATE TABLE IF NOT EXISTS site_visits (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    device_type TEXT, -- mobile, desktop, tablet
    browser TEXT,
    os TEXT,
    page_path TEXT DEFAULT '/'
);

-- 10. SECURITY (RLS)
ALTER TABLE providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE comisionistas ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE technicians ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_visits ENABLE ROW LEVEL SECURITY;

-- Simple Policies (Allowing public read/write for development, adjust for production)
DO $$ 
BEGIN
    -- Providers
    CREATE POLICY "Public Read Providers" ON providers FOR SELECT USING (true);
    CREATE POLICY "Public All Providers" ON providers FOR ALL USING (true) WITH CHECK (true);
    
    -- Plans
    CREATE POLICY "Public Read Plans" ON plans FOR SELECT USING (true);
    CREATE POLICY "Public All Plans" ON plans FOR ALL USING (true) WITH CHECK (true);
    
    -- Comisionistas
    CREATE POLICY "Public All Comisionistas" ON comisionistas FOR ALL USING (true) WITH CHECK (true);
    
    -- Leads
    CREATE POLICY "Public All Leads" ON leads FOR ALL USING (true) WITH CHECK (true);
    
    -- Technicians
    CREATE POLICY "Public All Technicians" ON technicians FOR ALL USING (true) WITH CHECK (true);
    
    -- Support Tickets
    CREATE POLICY "Public All Tickets" ON support_tickets FOR ALL USING (true) WITH CHECK (true);
    
    -- Logs
    CREATE POLICY "Public All Logs" ON system_logs FOR ALL USING (true) WITH CHECK (true);
    
    -- Visits
    CREATE POLICY "Public All Visits" ON site_visits FOR ALL USING (true) WITH CHECK (true);
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

-- 11. INITIAL DATA
INSERT INTO providers (name, logo_url) VALUES 
('Totalplay', 'https://www.totalplay.com.mx/assets/img/logos/logo-totalplay.png'),
('Telmex', 'https://telmex.com/o/telmex-concept-theme/images/telmex/logo-telmex.png'),
('Izzi', 'https://www.izzi.mx/assets/img/logos/izzi-logo.png')
ON CONFLICT DO NOTHING;

INSERT INTO technicians (full_name, phone, specialty) VALUES 
('Juan Pérez', '555-0201', 'Instalaciones FTTH'),
('Miguel Ángel', '555-0202', 'Fusiones de Fibra'),
('Sofía Torres', '555-0203', 'Configuración de Nodos')
ON CONFLICT DO NOTHING;

INSERT INTO comisionistas (full_name, phone, email, performance_score) VALUES 
('Carlos Rodríguez', '555-0101', 'carlos.vendedor@fibergravity.com', 95),
('Ana Martínez', '555-0102', 'ana.ventas@fibergravity.com', 98)
ON CONFLICT DO NOTHING;


