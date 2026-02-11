-- SQL Schema for FiberGravity Leads
-- Run this in your Supabase SQL Editor to prepare the database

CREATE TABLE IF NOT EXISTS leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    location TEXT NOT NULL,
    category TEXT NOT NULL, -- Gamer, Streamer, HomeOffice, Enterprise, TV
    provider TEXT NOT NULL,
    plan_name TEXT NOT NULL,
    speed TEXT,
    price TEXT,
    status TEXT DEFAULT 'pending' -- pending, contacting, completed, rejected
);

-- Enable Row Level Security (Isolation & Security)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous inserts (Security)
CREATE POLICY "Enable insert for anonymous users" 
ON leads FOR INSERT 
WITH CHECK (true);

-- Create policy to allow authenticated users to view/edit (Aislemiento)
-- (Update 'service_role' or specific user ids as needed)
CREATE POLICY "Enable read for service role only" 
ON leads FOR SELECT 
TO authenticated 
USING (true);
