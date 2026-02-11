-- Tablas para Gestión de Comisionistas (Vendedores)

-- 1. Crear tabla de comisionistas
CREATE TABLE IF NOT EXISTS comisionistas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    active BOOLEAN DEFAULT true,
    performance_score INTEGER DEFAULT 0 -- 0 a 100
);

-- 2. Añadir columna de asignación a la tabla de leads
ALTER TABLE leads ADD COLUMN IF NOT EXISTS assigned_to UUID REFERENCES comisionistas(id);

-- 3. Insertar comisionistas de ejemplo
INSERT INTO comisionistas (full_name, phone, email, performance_score)
VALUES 
    ('Carlos Rodríguez', '555-0101', 'carlos.vendedor@fibergravity.com', 95),
    ('Ana Martínez', '555-0102', 'ana.ventas@fibergravity.com', 98),
    ('Roberto Gómez', '555-0103', 'roberto.asesor@fibergravity.com', 92)
ON CONFLICT DO NOTHING;

-- 4. Habilitar RLS
ALTER TABLE comisionistas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON comisionistas FOR SELECT TO anon USING (true);
CREATE POLICY "Allow public insert" ON comisionistas FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow public update" ON comisionistas FOR UPDATE TO anon USING (true);
CREATE POLICY "Allow public delete" ON comisionistas FOR DELETE TO anon USING (true);
