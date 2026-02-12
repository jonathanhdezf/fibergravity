-- =============================================
-- TABLA DE USUARIOS ADMINISTRADORES
-- Ejecuta este SQL en el SQL Editor de Supabase
-- =============================================

-- 1. Crear tabla de admins
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT DEFAULT 'ADMIN' NOT NULL,
    active BOOLEAN DEFAULT true
);

-- 2. Habilitar RLS (seguridad a nivel de filas)
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- 3. Política: solo lectura con la clave anon (para verificar login)
DO $$ 
BEGIN
    CREATE POLICY "Allow read for auth" ON admin_users 
        FOR SELECT USING (true);
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

-- 4. Función para hashear contraseñas con pgcrypto
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 5. Insertar el usuario admin con contraseña hasheada
-- La contraseña será: fiberadmin2026
INSERT INTO admin_users (username, password_hash, full_name, email, role)
VALUES (
    'admin',
    crypt('fiberadmin2026', gen_salt('bf')),
    'Admin FiberGravity',
    'admin@fibergravity.mx',
    'ADMIN'
) ON CONFLICT (username) DO NOTHING;

-- 6. Función para verificar contraseña (se llama desde la app)
CREATE OR REPLACE FUNCTION verify_admin_login(p_username TEXT, p_password TEXT)
RETURNS TABLE (
    id UUID,
    username TEXT,
    full_name TEXT,
    email TEXT,
    role TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        au.id, 
        au.username, 
        au.full_name, 
        au.email, 
        au.role
    FROM admin_users au
    WHERE au.username = p_username
      AND au.password_hash = crypt(p_password, au.password_hash)
      AND au.active = true;
END;
$$;

-- Para verificar que se creó correctamente:
SELECT username, full_name, email, role, active FROM admin_users;
