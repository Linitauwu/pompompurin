import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hoxurscvrfcnlfzfksos.supabase.co';
const supabasePublishableKey = 'sb_publishable_7tzl4K6ridyGkfJpPkeOow_ZdUDfGWs';

export const supabase = createClient(
  supabaseUrl,
  supabasePublishableKey,
);
