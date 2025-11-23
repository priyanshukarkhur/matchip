"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getSupabaseBrowser } from "@/lib/supabaseClient";

export default function Callback() {
  const router = useRouter();
  const params = useSearchParams();
  const supabase = getSupabaseBrowser();

  useEffect(() => {
    async function finish() {
      const code = params.get("code");

      if (!code) return router.push("/login");

      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) return router.push("/login");

      router.push("/dashboard");
    }
    finish();
  }, []);

  return <p>Completing sign-in...</p>;
}
