import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://emfurhitphgeyjlhraen.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtZnVyaGl0cGhnZXlqbGhyYWVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYzMDYzNzgsImV4cCI6MjA2MTg4MjM3OH0.G_4zxFmqWjsdcBo-A86tPS-rmtJMxWGXC1JKMqMoNaI'

export const supabase = createClient(supabaseUrl, supabaseKey)