// Arquivo de configuração do Supabase
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sxovykigzlfwnxgfdfrd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4b3Z5a2lnemxmd254Z2ZkZnJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA0MjY1NTUsImV4cCI6MjAyNjAwMjU1NX0.Q9hqKCbnsRTR2YAFy9RJ5PRzrxVu3ZFD22OZWQhf_lY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
