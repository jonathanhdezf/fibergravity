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

-- 12. BLOG SYSTEM
CREATE TABLE IF NOT EXISTS blog_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS blog_tags (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    cover_image TEXT,
    published BOOLEAN DEFAULT false,
    views INTEGER DEFAULT 0,
    category_id UUID REFERENCES blog_categories(id) ON DELETE SET NULL,
    author_name TEXT DEFAULT 'Admin FiberGravity'
);

CREATE TABLE IF NOT EXISTS blog_post_tags (
    post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES blog_tags(id) ON DELETE CASCADE,
    PRIMARY KEY (post_id, tag_id)
);

-- RLS for Blog
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_tags ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
    CREATE POLICY "Public Read Blog" ON blog_posts FOR SELECT USING (true);
    CREATE POLICY "Admin All Blog" ON blog_posts FOR ALL USING (true) WITH CHECK (true);
    
    CREATE POLICY "Public Read Categories" ON blog_categories FOR SELECT USING (true);
    CREATE POLICY "Admin All Categories" ON blog_categories FOR ALL USING (true) WITH CHECK (true);
    
    CREATE POLICY "Public Read Tags" ON blog_tags FOR SELECT USING (true);
    CREATE POLICY "Admin All Tags" ON blog_tags FOR ALL USING (true) WITH CHECK (true);
    
    CREATE POLICY "Public Read Post Tags" ON blog_post_tags FOR SELECT USING (true);
    CREATE POLICY "Admin All Post Tags" ON blog_post_tags FOR ALL USING (true) WITH CHECK (true);
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

-- INITIAL BLOG DATA (Seed)
INSERT INTO blog_categories (name, slug) VALUES ('Servicios de Internet', 'servicios-de-internet') ON CONFLICT DO NOTHING;

INSERT INTO blog_posts (title, slug, excerpt, content, cover_image, published, category_id)
SELECT 
    '¿Qué es la velocidad de internet y cómo se mide?', 
    'que-es-la-velocidad-de-internet',
    'Aprende qué significan realmente los Mbps, la diferencia entre descarga y subida, y por qué la latencia es clave.',
    '# ¿Qué es la velocidad de internet?

La velocidad de internet se refiere a la rapidez con la que los datos viajan desde la red global a tu dispositivo. Se mide comúnmente en **Megabits por segundo (Mbps)**.

### Mbps: La unidad de medida
Un Megabit no es lo mismo que un Megabyte. 8 bits equivalen a 1 byte. Por lo tanto, una conexión de 100 Mbps descargará archivos a una velocidad máxima de 12.5 MB/s.

### Descarga vs. Subida
- **Descarga:** Es la velocidad para bajar información (ver Netflix, abrir webs).
- **Subida:** Es la velocidad para enviar información (subir videos, videollamadas).

### Latencia y Jitter
La latencia (o PING) es el tiempo que tarda un paquete de datos en ir y volver. Para gaming, una latencia menor a 20ms es ideal.',
    'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800',
    true,
    (SELECT id FROM blog_categories WHERE slug = 'servicios-de-internet' LIMIT 1)
ON CONFLICT DO NOTHING;

INSERT INTO blog_posts (title, slug, excerpt, content, cover_image, published, category_id)
SELECT 
    'Cómo mejorar la señal WiFi en tu hogar', 
    'como-mejorar-la-senal-wifi',
    'Trucos prácticos para posicionar tu router, evitar interferencias y elegir la banda correcta para cada dispositivo.',
    '# Optimiza tu WiFi

¿Sientes que el internet va lento en algunas habitaciones? Aquí te decimos cómo solucionarlo sin gastar más.

### 1. Ubicación del Router
El router debe estar en el centro de la casa, en un lugar elevado y sin obstáculos metálicos alrededor.

### 2. Bandas 2.4GHz vs 5GHz
- **2.4GHz:** Más alcance, pero menos velocidad y más interferencias.
- **5GHz:** Velocidad máxima, pero poco alcance. Úsala si estás cerca del router.

### 3. Evita Interferencias
Microondas, teléfonos inalámbricos y espejos pueden bloquear o degradar la señal inalámbrica.',
    'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800',
    true,
    (SELECT id FROM blog_categories WHERE slug = 'servicios-de-internet' LIMIT 1)
ON CONFLICT DO NOTHING;

INSERT INTO blog_posts (title, slug, excerpt, content, cover_image, published, category_id)
SELECT 
    'Dispositivos WiFi modernos: Router, Mesh y Access Point', 
    'dispositivos-wifi-modernos',
    'Diferencias claras entre repetidores, extensores y sistemas Mesh. Descubre cuál es mejor para tu casa.',
    '# ¿Router, Mesh o Access Point?

No todos los dispositivos WiFi son iguales. Aquí te explicamos cuándo usar cada uno.

### Router WiFi
Es el cerebro. Gestiona la conexión de internet que entra a tu casa. Los routers modernos suelen ser de doble o triple banda.

### Access Point (Punto de Acceso)
Se conecta al router por cable y crea una nueva zona WiFi. Es la opción más estable para oficinas o plantas altas.

### Sistema Mesh
Varios nodos que trabajan como una sola red. Es la mejor opción para casas grandes donde quieres moverte sin perder señal.',
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=800',
    true,
    (SELECT id FROM blog_categories WHERE slug = 'servicios-de-internet' LIMIT 1)
ON CONFLICT DO NOTHING;

INSERT INTO blog_posts (title, slug, excerpt, content, cover_image, published, category_id)
SELECT 
    '¿Cuánta velocidad de internet necesitas según tu uso?', 
    'cuanta-velocidad-necesitas',
    'Guía definitiva para elegir el plan ideal: desde streaming 4K hasta teletrabajo y sesiones intensas de gaming.',
    '# El Plan Ideal para ti

¿Estás pagando de más o te falta velocidad? Depende de lo que hagas online.

### Streaming y Ocio
- **HD:** 5-10 Mbps
- **4K UHD:** 25-50 Mbps por dispositivo.

### Trabajo Remoto (Home Office)
Para videollamadas fluidas en Zoom o Teams, necesitas al menos 10 Mbps de **subida**.

### Gaming
Más que la velocidad, importa la latencia. Una conexión de fibra óptica es superior para juegos competitivos.',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
    true,
    (SELECT id FROM blog_categories WHERE slug = 'servicios-de-internet' LIMIT 1)
ON CONFLICT DO NOTHING;

-- FUNCTION TO INCREMENT VIEWS
CREATE OR REPLACE FUNCTION increment_post_views(post_slug TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE blog_posts
  SET views = views + 1
  WHERE slug = post_slug;
END;
$$;
