"use client";

import { useEffect, useState } from "react";
import { getSupabaseBrowser } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const supabase = getSupabaseBrowser();
  const [email, setEmail] = useState("");

  useEffect(() => {
    async function loadUser() {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.push("/login");
        return;
      }
      setEmail(data.user.email ?? "");
    }

    loadUser();
  }, []);

  return (
    <div>
      <h1>Welcome to MatchIP</h1>
      <p>Logged in as: {email}</p>
    </div>
  );
}
