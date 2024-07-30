// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Replace with your Supabase URL and public API key
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;