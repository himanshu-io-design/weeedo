import { createClient } from '@supabase/supabase-js';


// TODO: Replace these with your Supabase project URL and anon key
// You can find these in your Supabase project settings under "API"
const SUPABASE_URL = 'https://yhwsbrszccqyoahxhbkv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlod3NicnN6Y2NxeW9haHhoYmt2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyMjczNDYsImV4cCI6MjA3ODgwMzM0Nn0.Owt6xFfYuMqihemVE_zL4xaQDCGUEPNBhfDYSC4QiNg';

// Create and export the Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

