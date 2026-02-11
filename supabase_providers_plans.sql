-- Database schema for FiberGravity Providers and Plans
-- Run this in your Supabase SQL Editor

-- Create providers table
CREATE TABLE IF NOT EXISTS providers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    logo_url TEXT,
    website TEXT,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create plans table
CREATE TABLE IF NOT EXISTS plans (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    provider_id UUID REFERENCES providers(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    type TEXT NOT NULL, -- Gamer, Streamer, Home Office, Empresas, Television
    category_name TEXT, -- Sub-category like "PC / CONSOLA (COMPETITIVO)"
    speed TEXT,
    price TEXT,
    features JSONB DEFAULT '[]'::jsonb,
    recommendation TEXT,
    ranking_score INTEGER DEFAULT 0,
    color_scheme TEXT DEFAULT 'cyan',
    icon_slug TEXT DEFAULT 'zap',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE plans ENABLE ROW LEVEL SECURITY;

-- Creating policies for public read access
CREATE POLICY "Allow public read providers" ON providers FOR SELECT USING (true);
CREATE POLICY "Allow public read plans" ON plans FOR SELECT USING (true);

-- Allow authenticated/anon management (as per current leads setup)
CREATE POLICY "Allow public all providers" ON providers FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow public all plans" ON plans FOR ALL TO anon USING (true) WITH CHECK (true);

-- Insert Initial Providers
INSERT INTO providers (name, logo_url) VALUES 
('Totalplay', '/providers/totalplay.png'),
('Telmex', '/providers/telmex.png'),
('Megacable', '/providers/megacable.png'),
('Impactel', '/providers/impactel.png'),
('Telcel', '/providers/telcel.png')
ON CONFLICT (name) DO NOTHING;
