
// C:\Users\Lara Spellman\Jamb\jamb-league\src\hooks\wallet\useWalletTransactions.ts

"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import {
  getWalletTransactions,
  type WalletTransactionsResponse,
} from "@/lib/api/wallet";

import { useAuthStore } from "@/stores/auth.store";

/* ============================================================
   QUERY KEY
   ============================================================ */

export const walletTransactionsQueryKey = (
  userId?: string,
  page: number = 1,
  limit: number = 10,
) =>
  [
    "wallet",
    "transactions",
    userId,
    page,
    limit,
  ] as const;

/* ============================================================
   EMPTY TRANSACTIONS RESPONSE
   ============================================================ */

/*
 * The backend currently returns:
 *
 * 404
 * {
 *   "message": "transactions not found",
 *   "success": false,
 *   "status": 404
 * }
 *
 * A user having no transactions is not really an
 * application error for the wallet UI.
 *
 * We therefore normalize that response into an
 * empty transactions result.
 */

function createEmptyTransactionsResponse(): WalletTransactionsResponse {
  return {
    success: true,
    message: "No transactions found.",
    data: {
      transactionObj: [],
      totalCount: 0,
      totalPages: 0,
    },
  };
}

/* ============================================================
   CHECK WHETHER ERROR MEANS "NO TRANSACTIONS"
   ============================================================ */

function isTransactionsNotFoundError(
  error: unknown,
): boolean {
  if (!axios.isAxiosError(error)) {
    return false;
  }

  const status =
    error.response?.status;

  const responseData =
    error.response?.data;

  /*
   * Backend may return the status either as the
   * HTTP status or inside the response body.
   */

  const backendStatus =
    responseData?.status;

  const message =
    typeof responseData?.message ===
    "string"
      ? responseData.message.toLowerCase()
      : "";

  return (
    status === 404 &&
    (
      backendStatus === 404 ||
      message.includes(
        "transactions not found",
      ) ||
      message.includes(
        "transaction not found",
      )
    )
  );
}

/* ============================================================
   USE WALLET TRANSACTIONS
   ============================================================ */

export function useWalletTransactions(
  page: number = 1,
  limit: number = 10,
) {
  const user =
    useAuthStore(
      (state) => state.user,
    );

  /*
   * Your authentication mapping supports:
   *
   * user._id
   * user.id
   *
   * Prefer MongoDB's _id when available.
   */

  const userId =
    user?._id ??
    user?.id;

  /* ==========================================================
     REACT QUERY
     ========================================================== */

  const query =
    useQuery<WalletTransactionsResponse>({
      queryKey:
        walletTransactionsQueryKey(
          userId,
          page,
          limit,
        ),

      queryFn:
        async () => {
          if (!userId) {
            throw new Error(
              "Cannot fetch wallet transactions: user ID is missing.",
            );
          }

          try {
            return await getWalletTransactions(
              userId,
              page,
              limit,
            );
          } catch (error) {
            /*
             * ==================================================
             * EMPTY WALLET
             * ==================================================
             *
             * Backend currently uses HTTP 404 when the user
             * has no transactions.
             *
             * Treat that specific response as an empty
             * transaction history rather than an error.
             */

            if (
              isTransactionsNotFoundError(
                error,
              )
            ) {
              console.info(
                "No wallet transactions found. Using empty transaction state.",
              );

              return createEmptyTransactionsResponse();
            }

            /*
             * ==================================================
             * REAL API ERROR
             * ==================================================
             *
             * Authentication failures, server errors,
             * network errors, etc. should still reach
             * React Query as errors.
             */

            throw error;
          }
        },

      /*
       * Do not request transactions until we have
       * an authenticated user's ID.
       */

      enabled:
        Boolean(userId),

      /*
       * Keep the previous page visible while loading
       * the next page.
       */

      placeholderData:
        (previousData) =>
          previousData,

      /*
       * Wallet transactions don't need aggressive
       * refetching.
       */

      staleTime:
        30_000,

      /*
       * Refresh wallet activity when the student
       * returns to the page.
       */

      refetchOnWindowFocus:
        true,

      /*
       * Since a 404 "transactions not found" is
       * normalized into a successful empty response,
       * React Query will not retry it.
       */

      retry:
        (failureCount, error) => {
          /*
           * Never retry the special empty-wallet
           * response.
           */

          if (
            isTransactionsNotFoundError(
              error,
            )
          ) {
            return false;
          }

          /*
           * Retry genuine transient errors
           * up to two times.
           */

          return failureCount < 2;
        },
    });

  /* ==========================================================
     NORMALIZED DATA
     ========================================================== */

  const transactions =
    query.data?.data
      ?.transactionObj ?? [];

  const totalCount =
    query.data?.data
      ?.totalCount ?? 0;

  const totalPages =
    query.data?.data
      ?.totalPages ?? 0;

  /* ==========================================================
     EMPTY STATE
     ========================================================== */

  const isEmpty =
    !query.isLoading &&
    !query.isFetching &&
    !query.isError &&
    transactions.length === 0;

  /* ==========================================================
     PAGINATION
     ========================================================== */

  const hasNextPage =
    page < totalPages;

  const hasPreviousPage =
    page > 1;

  /* ==========================================================
     RETURN
     ========================================================== */

  return {
    /* ========================================================
       RAW REACT QUERY
       ======================================================== */

    ...query,

    /* ========================================================
       USER
       ======================================================== */

    userId,

    /* ========================================================
       TRANSACTIONS
       ======================================================== */

    transactions,

    totalCount,

    totalPages,

    currentPage:
      page,

    limit,

    /* ========================================================
       STATES
       ======================================================== */

    isLoading:
      query.isLoading,

    isFetching:
      query.isFetching,

    isError:
      query.isError,

    error:
      query.error,

    /* ========================================================
       EMPTY STATE
       ======================================================== */

    isEmpty,

    /* ========================================================
       PAGINATION
       ======================================================== */

    hasNextPage,

    hasPreviousPage,
  };
}




// "use client";

// import { useQuery } from "@tanstack/react-query";

// import {
//   getWalletTransactions,
//   type WalletTransactionsResponse,
// } from "@/lib/api/wallet";



// import { useAuthStore } from "@/stores/auth.store";

// /* ============================================================
//    QUERY KEY
//    ============================================================ */

// export const walletTransactionsQueryKey = (
//   userId?: string,
//   page: number = 1,
//   limit: number = 10,
// ) => ["wallet", "transactions", userId, page, limit] as const;

// /* ============================================================
//    USE WALLET TRANSACTIONS
//    ============================================================ */

// export function useWalletTransactions(
//   page: number = 1,
//   limit: number = 10,
// ) {
//   const user = useAuthStore((state) => state.user);

//   /*
//    * Your login mapping stores:
//    *
//    * user.id
//    * user._id
//    *
//    * We prefer _id because that is the MongoDB/backend user ID.
//    */

//   const userId = user?._id ?? user?.id;

//   const query = useQuery<WalletTransactionsResponse>({
//     queryKey: walletTransactionsQueryKey(
//       userId,
//       page,
//       limit,
//     ),

//     queryFn: async () => {
//       if (!userId) {
//         throw new Error(
//           "Cannot fetch wallet transactions: user ID is missing.",
//         );
//       }

//       return getWalletTransactions(
//         userId,
//         page,
//         limit,
//       );
//     },

//     /*
//      * Do not make the request until authentication
//      * has supplied a user ID.
//      */
//     enabled: Boolean(userId),

//     /*
//      * Keep previously loaded transactions visible
//      * while changing pages.
//      */
//     placeholderData: (previousData) =>
//       previousData,

//     /*
//      * Wallet transactions don't normally need
//      * aggressive refetching.
//      */
//     staleTime: 30_000,

//     /*
//      * Refetch when the student returns to the page.
//      */
//     refetchOnWindowFocus: true,
//   });

//   const transactions =
//     query.data?.data?.transactionObj ?? [];

//   const totalCount =
//     query.data?.data?.totalCount ?? 0;

//   const totalPages =
//     query.data?.data?.totalPages ?? 0;

//   return {
//     /* ==========================================================
//        RAW QUERY
//        ========================================================== */

//     ...query,

//     /* ==========================================================
//        USER
//        ========================================================== */

//     userId,

//     /* ==========================================================
//        TRANSACTIONS
//        ========================================================== */

//     transactions,

//     totalCount,

//     totalPages,

//     currentPage: page,

//     limit,

//     /* ==========================================================
//        STATES
//        ========================================================== */

//     isLoading:
//       query.isLoading,

//     isFetching:
//       query.isFetching,

//     isError:
//       query.isError,

//     error:
//       query.error,

//     /* ==========================================================
//        EMPTY STATE
//        ========================================================== */

//     isEmpty:
//       !query.isLoading &&
//       transactions.length === 0,

//     /* ==========================================================
//        PAGINATION
//        ========================================================== */

//     hasNextPage:
//       page < totalPages,

//     hasPreviousPage:
//       page > 1,
//   };
// }