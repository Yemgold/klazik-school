

// C:\Users\Lara Spellman\Jamb\jamb-league\src\lib\api\auth.ts



import { axiosInstance as api } from "./axios";
import { getDeviceId } from "@/lib/auth/device";

import { setAccessToken } from "@/lib/auth/token";

/* ============================================================
   REGISTER
   ============================================================ */

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
}

export const registerUser = async (
  data: RegisterRequest
) => {
  const response = await api.post(
    "/auth/register",
    data
  );

  return response.data;
};






/* ============================================================
   LOGIN
   ============================================================ */

export type BackendUserRole =
  | "USER"
  | "STUDENT"
  | "ADMIN"
  | "ORGANIZER";

export interface LoginRequest {
  email: string;
  password: string;
  deviceId: string;
  deviceName: string;
}

/* ============================================================
   USER WALLET
   ============================================================ */

export interface UserWallet {
  _id: string;
  userId: string;
  balance: number;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

/* ============================================================
   LOGIN USER
   ============================================================ */

export interface LoginUser {
  _id: string;

  email: string;

  role: BackendUserRole;

  firstName: string;

  lastName: string;

  phoneNumber?: string;

  referralCode?: string;

  referredBy?: string | null;

  referralChain?: string[];

  isVerified: boolean;

  hasPaid: boolean;

  plans: unknown[];

  device?: unknown | null;

  userWallet?: UserWallet;

  createdAt: string;

  updatedAt: string;

  __v?: number;
}

/* ============================================================
   LOGIN SESSION
   ============================================================ */

export interface LoginSession {
  userId: string;

  deviceId: string;

  deviceName: string;

  isActive: boolean;

  lastActiveAt: string;

  _id: string;

  createdAt: string;

  updatedAt: string;

  __v?: number;
}

/* ============================================================
   LOGIN RESPONSE
   ============================================================ */

export interface LoginResponse {
  success: boolean;

  message: string;

  data: {
    refreshToken: string;

    accessToken: string;

    session: LoginSession;

    user: LoginUser;
  };
}



/* ============================================================
   DEVICE NAME
   ============================================================ */

function getDeviceName(): string {
  if (typeof navigator === "undefined") {
    return "Web Browser";
  }

  const userAgent =
    navigator.userAgent.toLowerCase();

  /*
   * IMPORTANT:
   *
   * Edge contains "Chrome" in its user agent,
   * therefore Edge must be checked first.
   */

  if (userAgent.includes("edg")) {
    return "Microsoft Edge";
  }

  if (userAgent.includes("chrome")) {
    return "Google Chrome";
  }

  if (userAgent.includes("firefox")) {
    return "Mozilla Firefox";
  }

  if (userAgent.includes("safari")) {
    return "Safari";
  }

  if (
    userAgent.includes("opera") ||
    userAgent.includes("opr")
  ) {
    return "Opera";
  }

  return "Web Browser";
}

/* ============================================================
   LOGIN PAYLOAD BUILDER
   ============================================================ */

export function buildLoginRequest(
  email: string,
  password: string,
): LoginRequest {
  return {
    email: email.trim().toLowerCase(),

    password,

    deviceId: getDeviceId(),

    deviceName: getDeviceName(),
  };
}

/* ============================================================
   LOGIN API
   ============================================================ */

export const loginUser = async (
  data: LoginRequest,
): Promise<LoginResponse> => {
  try {
    /* ========================================================
       BUILD FINAL PAYLOAD
       ======================================================== */

    const payload: LoginRequest = {
      email: data.email.trim().toLowerCase(),

      password: data.password,

      deviceId:
        data.deviceId || getDeviceId(),

      deviceName:
        data.deviceName || getDeviceName(),
    };

    /* ========================================================
       LOGIN REQUEST LOG
       ======================================================== */

    console.log(
      "========== LOGIN REQUEST ==========",
    );

    console.log({
      email: payload.email,

      password: payload.password
        ? "[PROVIDED]"
        : "[MISSING]",

      deviceId: payload.deviceId,

      deviceName: payload.deviceName,
    });

    /* ========================================================
       API REQUEST
       ======================================================== */

    const response =
      await api.post<LoginResponse>(
        "/auth/login",
        payload,
      );
/* ========================================================
   LOGIN SUCCESS
   ======================================================== */

console.log(
  "========== LOGIN SUCCESS ==========",
);

const loginData = response.data.data;

console.log({
  success: response.data.success,

  message: response.data.message,

  user: loginData?.user,

  session: loginData?.session,

  hasAccessToken: !!loginData?.accessToken,

  hasRefreshToken: !!loginData?.refreshToken,
});

/* ========================================================
   STORE ACCESS TOKEN
   ======================================================== */

if (loginData?.accessToken) {
  setAccessToken(loginData.accessToken);

  console.log(
    "✅ ACCESS TOKEN STORED:",
    true,
  );
} else {
  console.error(
    "❌ LOGIN SUCCEEDED BUT NO ACCESS TOKEN WAS RETURNED",
  );
}

return response.data;

  } catch (error: unknown) {

    /* ========================================================
       LOGIN ERROR
       ======================================================== */

    console.error(
      "========== LOGIN ERROR ==========",
    );

    console.error(
      "RAW ERROR:",
      error,
    );

    /*
     * Axios errors have a response/config object.
     * We avoid axios.isAxiosError() here so you don't need
     * another axios import in this file.
     */

    if (
      typeof error === "object" &&
      error !== null &&
      "response" in error
    ) {
      const axiosError = error as {
        response?: {
          status?: number;
          data?: unknown;
        };
        config?: {
          url?: string;
          baseURL?: string;
          method?: string;
          data?: unknown;
        };
        code?: string;
        message?: string;
      };

      console.error(
        "Status:",
        axiosError.response?.status,
      );

      console.error(
        "Backend response:",
        axiosError.response?.data,
      );

      console.error(
        "Request URL:",
        axiosError.config?.url,
      );

      console.error(
        "Base URL:",
        axiosError.config?.baseURL,
      );

      console.error(
        "Full URL:",
        `${axiosError.config?.baseURL ?? ""}${
          axiosError.config?.url ?? ""
        }`,
      );

      console.error(
        "Method:",
        axiosError.config?.method,
      );

      console.error(
        "Error code:",
        axiosError.code,
      );

      console.error(
        "Error message:",
        axiosError.message,
      );

      /* ======================================================
         REQUEST PAYLOAD DEBUG
         ====================================================== */

      const requestData =
        axiosError.config?.data;

      if (requestData) {
        try {
          const parsed =
            typeof requestData === "string"
              ? JSON.parse(requestData)
              : requestData;

          console.error(
            "Request payload:",
            {
              email: parsed?.email,

              password:
                parsed?.password
                  ? "[PROVIDED]"
                  : "[MISSING]",

              deviceId:
                parsed?.deviceId,

              deviceName:
                parsed?.deviceName,
            },
          );
        } catch {
          console.error(
            "Request payload could not be parsed.",
          );
        }
      }

    } else if (error instanceof Error) {

      console.error(
        "Non-Axios error:",
        error.message,
      );

      console.error(
        "Stack:",
        error.stack,
      );

    } else {

      console.error(
        "Unknown error:",
        error,
      );
    }

    throw error;
  }
};





