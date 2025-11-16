"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    async function getUser() {
      const { data } = await supabase.auth.getUser();
      if (!data?.user) {
        router.push("/login");
        return;
      }
      setUserEmail(data.user?.email ?? null);
    }
    getUser();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-xl w-full text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to MatchIP 🚀</h1>

        <p className="text-xl mb-6">
          Logged in as: <b>{userEmail}</b>
        </p>
      </div>
    </div>
  );
}
