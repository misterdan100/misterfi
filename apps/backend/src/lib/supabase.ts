/**
 * Supabase Client Configuration
 *
 * Provides a type-safe, singleton instance of Supabase client.
 * Configured with environment variables and proper error handling.
 *
 * Usage:
 * import { supabase } from '@/lib/supabase'
 * const { data, error } = await supabase.from('transactions').select()
 */

import { createClient } from '@supabase/supabase-js';
import { config } from '../config/env.js';
import type { Database } from '../types/database.js';

// Create a single instance of Supabase client
export const supabase = createClient<Database>(
  config.supabase.url,
  config.supabase.serviceRoleKey,
  {
    auth: {
      persistSession: false, // We're using Clerk for auth
      autoRefreshToken: false,
    },
    // Global error handler for database operations
    global: {
      headers: {
        'Content-Type': 'application/json',
        apikey: config.supabase.serviceRoleKey,
      },
      fetch: async (url, options = {}) => {

        const headers = new Headers(options.headers);
        headers.set('Authorization', `Bearer ${config.supabase.serviceRoleKey}`);
        headers.set('Content-Type', 'application/json');
        headers.set('apikey', config.supabase.serviceRoleKey);

        const response = await fetch(url, {
          ...options,
          headers,
        });

        // Log failed requests in development
        if (!response.ok && config.nodeEnv === 'development') {
          console.error(`Supabase request failed: ${url}`, {
            status: response.status,
            statusText: response.statusText,
          });
        }

        return response;
      },
    },
  },
);
