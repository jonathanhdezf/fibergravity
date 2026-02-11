import { createClient } from '@supabase/supabase-js';

// Provide fallback values to prevent crash during module evaluation if env vars are missing
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ||
    'placeholder';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY && !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY)) {
    if (typeof window !== 'undefined') {
        console.warn('⚠️ Supabase credentials missing! Please create .env.local and add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.');
    }
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
