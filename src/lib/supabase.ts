import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lxwhdrrxtyrteqtauhph.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4d2hkcnJ4dHlydGVxdGF1aHBoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUwMjkxNDIsImV4cCI6MjA1MDYwNTE0Mn0.3HJ2nLY1PwWYWhnv1s2Gashml38Xt-pGkS4WR7GZSrw';

export const supabase = createClient(supabaseUrl, supabaseKey);