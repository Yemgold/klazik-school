



// src/hooks/wallet/useWallet.ts

"use client";

import { useQuery } from "@tanstack/react-query";

import { getWalletByUserId } from "@/lib/api/wallet";
import { useAuthStore } from "@/stores/auth.store";
import { getAccessToken } from "@/lib/auth/token";

/* ============================================================
   QUERY KEY
============================================================ */

export const walletQueryKey = (userId: string) =>
  ["wallet", userId] as const;

/* ============================================================
   USE WALLET
============================================================ */

export function useWallet() {
  const user = useAuthStore((state) => state.user);

  /*
   * Backend MongoDB user ID.
   */
  const userId = user?._id ?? user?.id;

  /*
   * Check whether the access token currently exists.
   */
  const accessToken = getAccessToken();

  /*
   * The wallet request should only run when:
   *
   * 1. We have an authenticated user.
   * 2. We have a user ID.
   * 3. We have an access token.
   */
  const canFetchWallet =
    Boolean(userId) && Boolean(accessToken);

  const query = useQuery({
    queryKey: userId
      ? walletQueryKey(userId)
      : ["wallet", "unauthenticated"],

    queryFn: async () => {
      if (!userId) {
        throw new Error(
          "Cannot fetch wallet: authenticated user ID is missing.",
        );
      }

      const token = getAccessToken();

      if (!token) {
        throw new Error(
          "Cannot fetch wallet: access token is not available.",
        );
      }

      return getWalletByUserId(userId);
    },

    enabled: canFetchWallet,

    staleTime: 30 * 1000,

    refetchOnWindowFocus: false,
  });

  /* ============================================================
     NORMALIZED WALLET DATA
  ============================================================ */

  const wallet = query.data?.data;

  return {
    /* React Query state */

    data: query.data,

    wallet,

    isLoading: query.isLoading,

    isFetching: query.isFetching,

    isError: query.isError,

    error: query.error,

    refetch: query.refetch,

    /* ========================================================
       CONVENIENCE VALUES
    ======================================================== */

    walletId: wallet?._id ?? null,

    userId: wallet?.userId ?? userId ?? null,

    balance: wallet?.balance ?? 0,
  };
}