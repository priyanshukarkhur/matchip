"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useState, useEffect } from "react";

export default function ProfileSelect() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  // Check if logged in
  useEffect(() => {
    async function checkAuth() {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.push("/login");
        return;
      }

      setUserId(data.user.id);
      setLoading(false);
    }

    checkAuth();
  }, [router]);

  // Save Profile Selection
  async function saveProfile(type: string) {
    if (!userId) return;

    const { error } = await supabase.from("profiles").insert({
      id: userId,
      role: type,
    });

    if (error) {
      alert("Error saving profile: " + error.message);
      return;
    }

    router.push("/dashboard");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-10 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-6">Choose Your Profile Type</h1>

        <button
          onClick={() => saveProfile("inventor")}
          className="w-full bg-blue-600 text-white py-3 rounded-lg mb-4"
        >
          🚀 I am an Inventor
        </button>

        <button
          onClick={() => saveProfile("attorney")}
          className="w-full bg-green-600 text-white py-3 rounded-lg mb-4"
        >
          ⚖️ I am an Attorney
        </button>

        <button
          onClick={() => saveProfile("company")}
          className="w-full bg-purple-600 text-white py-3 rounded-lg"
        >
          🏢 I am a Company
        </button>
      </div>
    </div>
  );
}
