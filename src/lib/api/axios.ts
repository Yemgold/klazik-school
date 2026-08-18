





// // src/lib/api/axios.ts

// import axios, {
//   type AxiosError,
//   type InternalAxiosRequestConfig,
// } from "axios";

// import { env } from "@/config";
// import { API } from "@/constants";

// import { getAccessToken } from "@/lib/auth/token";
// import { getDeviceId } from "@/lib/auth/device";

// /* ============================================================
//    AXIOS INSTANCE
//    ============================================================ */

// export const axiosInstance = axios.create({
//   baseURL: env.API_URL,

//   timeout: API.TIMEOUT,

//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//   },

//   withCredentials: true,
// });

// /* ============================================================
//    HELPERS
//    ============================================================ */

// /**
//  * Determines whether the failed request is the wallet
//  * transaction-history endpoint returning the expected
//  * "no transactions" 404 response.
//  *
//  * This prevents an empty transaction history from appearing
//  * as a serious API error in the browser console.
//  */
// function isEmptyTransactionsResponse(
//   error: AxiosError,
// ): boolean {
//   const status = error.response?.status;

//   const url = error.config?.url ?? "";

//   const responseData = error.response?.data as
//     | {
//         message?: string;
//         success?: boolean;
//         status?: number;
//       }
//     | undefined;

//   const message =
//     typeof responseData?.message === "string"
//       ? responseData.message.toLowerCase()
//       : "";

//   const isTransactionEndpoint =
//     url.includes(
//       "/transactions/get-all-transactions-with-userId/",
//     );

//   const isNotFound =
//     status === 404;

//   const isTransactionsNotFound =
//     message.includes("transactions not found");

//   return (
//     isTransactionEndpoint &&
//     isNotFound &&
//     isTransactionsNotFound
//   );
// }

// /* ============================================================
//    REQUEST INTERCEPTOR
//    ============================================================ */

// axiosInstance.interceptors.request.use(
//   (config: InternalAxiosRequestConfig) => {
//     const token = getAccessToken();
//     const deviceId = getDeviceId();

//     console.log("========== API REQUEST ==========");

//     console.log(
//       "URL:",
//       config.url,
//     );

//     console.log(
//       "Full URL:",
//       `${config.baseURL ?? ""}${config.url ?? ""}`,
//     );

//     console.log(
//       "Method:",
//       config.method?.toUpperCase(),
//     );

//     console.log(
//       "Has access token:",
//       Boolean(token),
//     );

//     /*
//      * Do not print the actual token.
//      * Only show a short preview for debugging.
//      */
//     console.log(
//       "Token preview:",
//       token
//         ? `${token.substring(0, 20)}...`
//         : null,
//     );

//     /* ========================================================
//        AUTHORIZATION
//        ======================================================== */

//     if (token) {
//       config.headers.set(
//         "Authorization",
//         `Bearer ${token}`,
//       );

//       console.log(
//         "Authorization attached:",
//         Boolean(
//           config.headers.get(
//             "Authorization",
//           ),
//         ),
//       );
//     } else {
//       console.log(
//         "No access token — public request.",
//       );
//     }

//     /* ========================================================
//        DEVICE ID
//        ======================================================== */

//     if (deviceId) {
//       config.headers.set(
//         "X-Device-Id",
//         deviceId,
//       );

//       console.log(
//         "Device ID attached:",
//         true,
//       );
//     } else {
//       console.warn(
//         "⚠️ NO DEVICE ID AVAILABLE",
//       );
//     }

//     /* ========================================================
//        FINAL REQUEST HEADERS
//        ======================================================== */

//     console.log(
//       "Authorization header:",
//       config.headers.get(
//         "Authorization",
//       ),
//     );

//     console.log(
//       "X-Device-Id header:",
//       config.headers.get(
//         "X-Device-Id",
//       ),
//     );

//     return config;
//   },

//   (error) => {
//     console.error(
//       "========== REQUEST INTERCEPTOR ERROR ==========",
//     );

//     console.error(error);

//     return Promise.reject(error);
//   },
// );

// /* ============================================================
//    RESPONSE INTERCEPTOR
//    ============================================================ */

// axiosInstance.interceptors.response.use(
//   (response) => {
//     console.log(
//       "========== API RESPONSE ==========",
//     );

//     console.log(
//       "Status:",
//       response.status,
//     );

//     console.log(
//       "URL:",
//       response.config.url,
//     );

//     console.log(
//       "Response:",
//       response.data,
//     );

//     return response;
//   },

//   (error: AxiosError) => {
//     /* ========================================================
//        EXPECTED EMPTY TRANSACTION RESPONSE
//        ======================================================== */

//     if (isEmptyTransactionsResponse(error)) {
//       /*
//        * This is not treated as a serious API failure.
//        *
//        * The wallet has simply never had a transaction.
//        * The wallet transaction hook will convert this into:
//        *
//        * transactions = []
//        * totalCount = 0
//        * totalPages = 0
//        * isEmpty = true
//        *
//        * Keep the log lightweight so development is still
//        * understandable without flooding the console.
//        */

//       console.info(
//         "No wallet transactions found. Showing empty transaction state.",
//       );

//       return Promise.reject(error);
//     }

//     /* ========================================================
//        REAL API ERROR
//        ======================================================== */

//     console.error(
//       "========== API ERROR ==========",
//     );

//     console.error(
//       "Message:",
//       error.message,
//     );

//     console.error(
//       "Code:",
//       error.code,
//     );

//     console.error(
//       "URL:",
//       error.config?.url,
//     );

//     console.error(
//       "Full URL:",
//       `${error.config?.baseURL ?? ""}${
//         error.config?.url ?? ""
//       }`,
//     );

//     console.error(
//       "Method:",
//       error.config?.method?.toUpperCase(),
//     );

//     console.error(
//       "Status:",
//       error.response?.status,
//     );

//     console.error(
//       "Response:",
//       error.response?.data,
//     );

//     console.error(
//       "Request headers:",
//       error.config?.headers,
//     );

//     console.error(
//       "Response headers:",
//       error.response?.headers,
//     );

//     return Promise.reject(error);
//   },
// );

// /* ============================================================
//    API ALIAS
//    ============================================================ */

// export const api = axiosInstance;





// src/lib/api/axios.ts

import axios, {
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";

import { env } from "@/config";
import { API } from "@/constants";

import { getAccessToken } from "@/lib/auth/token";
import { getDeviceId } from "@/lib/auth/device";

import { useAuthStore } from "@/stores";

/* ============================================================
   AXIOS INSTANCE
   ============================================================ */

export const axiosInstance = axios.create({
  baseURL: env.API_URL,

  timeout: API.TIMEOUT,

  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },

  withCredentials: true,
});

/* ============================================================
   HELPERS
   ============================================================ */

/**
 * Determines whether the failed request is the wallet
 * transaction-history endpoint returning the expected
 * "no transactions" 404 response.
 */
function isEmptyTransactionsResponse(
  error: AxiosError,
): boolean {
  const status = error.response?.status;

  const url = error.config?.url ?? "";

  const responseData = error.response?.data as
    | {
        message?: string;
        success?: boolean;
        status?: number;
      }
    | undefined;

  const message =
    typeof responseData?.message === "string"
      ? responseData.message.toLowerCase()
      : "";

  const isTransactionEndpoint =
    url.includes(
      "/transactions/get-all-transactions-with-userId/",
    );

  const isNotFound =
    status === 404;

  const isTransactionsNotFound =
    message.includes("transactions not found");

  return (
    isTransactionEndpoint &&
    isNotFound &&
    isTransactionsNotFound
  );
}

/* ============================================================
   REQUEST INTERCEPTOR
   ============================================================ */

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    /* ========================================================
       GET AUTH INFORMATION
       ======================================================== */

    const accessToken =
      getAccessToken();

    const deviceId =
      getDeviceId();

    /*
     * Refresh token is stored inside the Zustand auth store.
     *
     * We read the current state without using the React hook,
     * because Axios interceptors run outside React components.
     */

    const refreshToken =
      useAuthStore.getState().refreshToken;

    console.log(
      "========== API REQUEST ==========",
    );

    console.log(
      "URL:",
      config.url,
    );

    console.log(
      "Full URL:",
      `${config.baseURL ?? ""}${config.url ?? ""}`,
    );

    console.log(
      "Method:",
      config.method?.toUpperCase(),
    );

    console.log(
      "Has access token:",
      Boolean(accessToken),
    );

    console.log(
      "Has refresh token:",
      Boolean(refreshToken),
    );

    /*
     * Do not print the actual access token.
     */

    console.log(
      "Access token preview:",
      accessToken
        ? `${accessToken.substring(0, 20)}...`
        : null,
    );

    /*
     * Do not print the actual refresh token.
     */

    console.log(
      "Refresh token available:",
      Boolean(refreshToken),
    );

    /* ========================================================
       ACCESS TOKEN
       ======================================================== */

    if (accessToken) {
      config.headers.set(
        "Authorization",
        `Bearer ${accessToken}`,
      );

      console.log(
        "Authorization attached:",
        Boolean(
          config.headers.get(
            "Authorization",
          ),
        ),
      );
    } else {
      console.log(
        "No access token — public request.",
      );
    }

    /* ========================================================
       DEVICE ID
       ======================================================== */

    if (deviceId) {
      config.headers.set(
        "X-Device-Id",
        deviceId,
      );

      console.log(
        "Device ID attached:",
        true,
      );
    } else {
      console.warn(
        "⚠️ NO DEVICE ID AVAILABLE",
      );
    }

    /* ========================================================
       REFRESH TOKEN
       ======================================================== */

    if (refreshToken) {
      config.headers.set(
        "X-Refresh-Token",
        refreshToken,
      );

      console.log(
        "Refresh token attached:",
        true,
      );
    } else {
      console.warn(
        "⚠️ NO REFRESH TOKEN AVAILABLE",
      );
    }

    /* ========================================================
       FINAL REQUEST HEADERS
       ======================================================== */

    console.log(
      "Authorization header:",
      config.headers.get(
        "Authorization",
      ),
    );

    console.log(
      "X-Device-Id header:",
      config.headers.get(
        "X-Device-Id",
      ),
    );

    console.log(
      "X-Refresh-Token attached:",
      Boolean(
        config.headers.get(
          "X-Refresh-Token",
        ),
      ),
    );

    return config;
  },

  (error) => {
    console.error(
      "========== REQUEST INTERCEPTOR ERROR ==========",
    );

    console.error(error);

    return Promise.reject(error);
  },
);

/* ============================================================
   RESPONSE INTERCEPTOR
   ============================================================ */

axiosInstance.interceptors.response.use(
  (response) => {
    console.log(
      "========== API RESPONSE ==========",
    );

    console.log(
      "Status:",
      response.status,
    );

    console.log(
      "URL:",
      response.config.url,
    );

    console.log(
      "Response:",
      response.data,
    );

    return response;
  },

  (error: AxiosError) => {
    /* ========================================================
       EXPECTED EMPTY TRANSACTION RESPONSE
       ======================================================== */

    if (
      isEmptyTransactionsResponse(
        error,
      )
    ) {
      console.info(
        "No wallet transactions found. Showing empty transaction state.",
      );

      return Promise.reject(error);
    }

    /* ========================================================
       REAL API ERROR
       ======================================================== */

    console.error(
      "========== API ERROR ==========",
    );

    console.error(
      "Message:",
      error.message,
    );

    console.error(
      "Code:",
      error.code,
    );

    console.error(
      "URL:",
      error.config?.url,
    );

    console.error(
      "Full URL:",
      `${error.config?.baseURL ?? ""}${
        error.config?.url ?? ""
      }`,
    );

    console.error(
      "Method:",
      error.config?.method?.toUpperCase(),
    );

    console.error(
      "Status:",
      error.response?.status,
    );

    console.error(
      "Response:",
      error.response?.data,
    );

    console.error(
      "Request headers:",
      error.config?.headers,
    );

    console.error(
      "Response headers:",
      error.response?.headers,
    );

    return Promise.reject(error);
  },
);

/* ============================================================
   API ALIAS
   ============================================================ */

export const api =
  axiosInstance;