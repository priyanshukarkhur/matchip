"use client";

import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { SupabaseClient } from "@supabase/supabase-js";

// `any` schema avoids the annoying "GenericSchema is not assignable" TS error
let client: SupabaseClient<any> | null = null;

export function getSupabaseBrowser(): SupabaseClient<any> {
  if (!client) {
    client = createBrowserSupabaseClient<any>();
  }
  return client;
}
