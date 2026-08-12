




"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { loginUser } from "@/lib/api/auth";

export function useLoginMutation() {
  const router = useRouter();

  return useMutation({
    mutationFn: loginUser,

    onSuccess: (data) => {
      console.log("✅ Login successful");
      console.log("User:", data.user);

      // Temporary:
      // We will replace this with proper auth storage.
      console.log("Access Token:", data.accessToken);
      console.log("Refresh Token:", data.refreshToken);

      router.push("/student/dashboard");
    },

    onError: (error) => {
      console.error("❌ Login failed:", error);
    },
  });
}