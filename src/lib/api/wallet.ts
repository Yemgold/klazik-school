

// import { axiosInstance } from "@/lib/api/axios";


// /* ============================================================
//    WALLET
//    ============================================================ */

// export interface Wallet {
//   _id: string;
//   userId: string;
//   balance: number;
//   createdAt: string;
//   updatedAt: string;
//   __v?: number;
// }

// export interface WalletResponse {
//   success: boolean;
//   message: string;
//   data: Wallet;
// }

// /* ============================================================
//    WALLET BALANCE
//    ============================================================ */

// export interface WalletBalanceResponse {
//   success: boolean;
//   message: string;
//   data: number;
// }

// /* ============================================================
//    TRANSACTION
//    ============================================================ */

// export interface WalletTransaction {
//   _id: string;

//   walletId: string;

//   withdrawalId?: string;

//   amount: number;

//   type: "CREDIT" | "DEBIT";

//   description: string;

//   category?: string;

//   referralLevel?: number;

//   referredUserId?: string;

//   referralUserId?: string;

//   createdAt: string;

//   updatedAt: string;

//   __v?: number;
// }

// /* ============================================================
//    TRANSACTIONS RESPONSE
//    ============================================================ */

// export interface TransactionsResponse {
//   success: boolean;
//   message: string;

//   data: {
//     totalCount: number;
//     totalPages: number;
//     transactionObj: WalletTransaction[];
//   };
// }

// /*
//  * Alias used by the transactions hook.
//  *
//  * Keeping this name means the hook can use:
//  *
//  * WalletTransactionsResponse
//  */

// export type WalletTransactionsResponse =
//   TransactionsResponse;

// /* ============================================================
//    WITHDRAWAL
//    ============================================================ */

// export interface WithdrawalRequest {
//   amount: number;
//   walletId: string;
// }

// export interface WithdrawalResponse {
//   success: boolean;
//   message: string;
//   data?: unknown;
// }

// /* ============================================================
//    GET WALLET BY USER ID
//    ============================================================ */

// export async function getWalletByUserId(
//   userId: string,
// ): Promise<WalletResponse> {
//   const response =
//     await axiosInstance.get<WalletResponse>(
//       `/wallets/get-wallet-by-userId/${userId}`,
//     );

//   return response.data;
// }

// /* ============================================================
//    GET WALLET BY WALLET ID
//    ============================================================ */

// export async function getWalletByWalletId(
//   walletId: string,
// ): Promise<WalletResponse> {
//   const response =
//     await axiosInstance.get<WalletResponse>(
//       `/wallets/get-wallet-by-walletId/${walletId}`,
//     );

//   return response.data;
// }

// /* ============================================================
//    GET WALLET BALANCE BY WALLET ID
//    ============================================================ */

// export async function getWalletBalanceByWalletId(
//   walletId: string,
// ): Promise<WalletBalanceResponse> {
//   const response =
//     await axiosInstance.get<WalletBalanceResponse>(
//       `/wallets/get-wallet-balance-by-walletId/${walletId}`,
//     );

//   return response.data;
// }

// /* ============================================================
//    GET USER TRANSACTIONS
//    ============================================================ */

// export async function getWalletTransactions(
//   userId: string,
//   page = 1,
//   limit = 10,
// ): Promise<WalletTransactionsResponse> {
//   const response =
//     await axiosInstance.get<WalletTransactionsResponse>(
//       `/transactions/get-all-transactions-with-userId/${userId}`,
//       {
//         params: {
//           page,
//           limit,
//         },
//       },
//     );

//   return response.data;
// }

// /* ============================================================
//    GET TRANSACTION BY ID
//    ============================================================ */

// export async function getTransactionById(
//   transactionId: string,
// ): Promise<{
//   success: boolean;
//   message: string;
//   data: WalletTransaction;
// }> {
//   const response = await axiosInstance.get<{
//     success: boolean;
//     message: string;
//     data: WalletTransaction;
//   }>(
//     `/transactions/get-transaction-by-id/${transactionId}`,
//   );

//   return response.data;
// }

// /* ============================================================
//    REQUEST WITHDRAWAL
//    ============================================================ */

// export async function requestWithdrawal(
//   payload: WithdrawalRequest,
// ): Promise<WithdrawalResponse> {
//   const response =
//     await axiosInstance.post<WithdrawalResponse>(
//       `/withdrawals/request-withdrawal`,
//       payload,
//     );

//   return response.data;
// }









import { axiosInstance } from "@/lib/api/axios";

/* ============================================================
   WALLET
   ============================================================ */

export interface Wallet {
  _id: string;
  userId: string;
  balance: number;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface WalletResponse {
  success: boolean;
  message: string;
  data: Wallet;
}

/* ============================================================
   WALLET BALANCE
   ============================================================ */

export interface WalletBalanceResponse {
  success: boolean;
  message: string;
  data: number;
}

/* ============================================================
   TRANSACTION
   ============================================================ */

export interface WalletTransaction {
  _id: string;

  walletId: string;

  withdrawalId?: string;

  amount: number;

  type: "CREDIT" | "DEBIT";

  description: string;

  category?: string;

  referralLevel?: number;

  referredUserId?: string;

  referralUserId?: string;

  createdAt: string;

  updatedAt: string;

  __v?: number;
}

/* ============================================================
   TRANSACTIONS RESPONSE
   ============================================================ */

export interface TransactionsData {
  totalCount: number;
  totalPages: number;
  transactionObj: WalletTransaction[];
}

export interface TransactionsResponse {
  success: boolean;
  message: string;
  data: TransactionsData;
}

/*
 * Alias used by the transactions hook.
 */
export type WalletTransactionsResponse =
  TransactionsResponse;

/* ============================================================
   WITHDRAWAL
   ============================================================ */

export interface WithdrawalRequest {
  amount: number;
  walletId: string;
}

export interface WithdrawalResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

/* ============================================================
   GET WALLET BY USER ID
   ============================================================ */

export async function getWalletByUserId(
  userId: string,
): Promise<WalletResponse> {
  const response =
    await axiosInstance.get<WalletResponse>(
      `/wallets/get-wallet-by-userId/${userId}`,
    );

  return response.data;
}

/* ============================================================
   GET WALLET BY WALLET ID
   ============================================================ */

export async function getWalletByWalletId(
  walletId: string,
): Promise<WalletResponse> {
  const response =
    await axiosInstance.get<WalletResponse>(
      `/wallets/get-wallet-by-walletId/${walletId}`,
    );

  return response.data;
}

/* ============================================================
   GET WALLET BALANCE BY WALLET ID
   ============================================================ */

export async function getWalletBalanceByWalletId(
  walletId: string,
): Promise<WalletBalanceResponse> {
  const response =
    await axiosInstance.get<WalletBalanceResponse>(
      `/wallets/get-wallet-balance-by-walletId/${walletId}`,
    );

  return response.data;
}

/* ============================================================
   EMPTY TRANSACTIONS RESPONSE
   ============================================================ */

function createEmptyTransactionsResponse(): WalletTransactionsResponse {
  return {
    success: true,

    message:
      "No transactions found.",

    data: {
      totalCount: 0,

      totalPages: 0,

      transactionObj: [],
    },
  };
}

/* ============================================================
   GET USER TRANSACTIONS
   ============================================================ */

export async function getWalletTransactions(
  userId: string,
  page = 1,
  limit = 10,
): Promise<WalletTransactionsResponse> {
  try {
    const response =
      await axiosInstance.get<WalletTransactionsResponse>(
        `/transactions/get-all-transactions-with-userId/${userId}`,
        {
          params: {
            page,
            limit,
          },
        },
      );

    /*
     * Some backends may return 200 with:
     *
     * {
     *   success: false,
     *   data: ...
     * }
     *
     * Normalize that as well if the transaction
     * array is missing.
     */

    const data = response.data;

    if (
      !data ||
      !data.data ||
      !Array.isArray(
        data.data.transactionObj,
      )
    ) {
      return createEmptyTransactionsResponse();
    }

    return data;
  } catch (error: unknown) {
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
     * For a wallet, this is NOT a fatal error.
     *
     * It simply means the student has never had
     * a transaction.
     */

    if (
      isAxios404TransactionsNotFound(error)
    ) {
      return createEmptyTransactionsResponse();
    }

    /*
     * Any other error is a genuine API failure.
     * Let React Query handle it normally.
     */

    throw error;
  }
}

/* ============================================================
   DETECT EMPTY TRANSACTIONS 404
   ============================================================ */

function isAxios404TransactionsNotFound(
  error: unknown,
): boolean {
  if (
    !error ||
    typeof error !== "object"
  ) {
    return false;
  }

  const axiosError =
    error as {
      response?: {
        status?: number;

        data?: {
          message?: string;

          success?: boolean;

          status?: number;
        };
      };
    };

  const response =
    axiosError.response;

  if (!response) {
    return false;
  }

  /*
   * Must specifically be a 404.
   */

  if (response.status !== 404) {
    return false;
  }

  const message =
    response.data?.message
      ?.toLowerCase()
      .trim();

  /*
   * Accept the backend's current message.
   */

  return (
    message ===
      "transactions not found" ||
    message?.includes(
      "transactions not found",
    ) === true
  );
}

/* ============================================================
   GET TRANSACTION BY ID
   ============================================================ */

export async function getTransactionById(
  transactionId: string,
): Promise<{
  success: boolean;
  message: string;
  data: WalletTransaction;
}> {
  const response =
    await axiosInstance.get<{
      success: boolean;
      message: string;
      data: WalletTransaction;
    }>(
      `/transactions/get-transaction-by-id/${transactionId}`,
    );

  return response.data;
}

/* ============================================================
   REQUEST WITHDRAWAL
   ============================================================ */

export async function requestWithdrawal(
  payload: WithdrawalRequest,
): Promise<WithdrawalResponse> {
  const response =
    await axiosInstance.post<WithdrawalResponse>(
      `/withdrawals/request-withdrawal`,
      payload,
    );

  return response.data;
}