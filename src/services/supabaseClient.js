
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://vfwkmxsgdsnpdtebeize.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmd2tteHNnZHNucGR0ZWJlaXplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk5NDE4NzQsImV4cCI6MjA0NTUxNzg3NH0.Lz-ufXnEqQ5zOOZQIgTVo_SKJZgNPwL41DlVYxD2X7M'
export const supabase = createClient(supabaseUrl, supabaseKey);