"use client";

import { useState } from "react";
import { getSupabaseBrowser } from "@/lib/supabaseClient";

export default function SignupPage() {
  const supabase = getSupabaseBrowser();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignup() {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    });

    if (error) return alert(error.message);

    alert("Check your email for confirmation.");
  }

  return (
    <div>
      <h1>Signup</h1>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
}
