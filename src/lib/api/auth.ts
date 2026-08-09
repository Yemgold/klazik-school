



// // src/lib/auth/auth.ts

// import { apiClient } from "@/lib/api";
// import {
//   clearAccessToken,
//   getAccessToken,
//   setAccessToken,
// } from "./token";

// interface LoginPayload {
//   email: string;
//   password: string;
// }

// interface RefreshResponse {
//   accessToken: string;
// }

// export const auth = {
//   async login(payload: LoginPayload) {
//     const response = await apiClient.post<RefreshResponse>(
//       "/auth/login",
//       payload
//     );

//     setAccessToken(response.accessToken);

//     return response;
//   },

//   async logout() {
//     try {
//       await apiClient.post("/auth/logout");
//     } finally {
//       clearAccessToken();
//     }
//   },

//   async refreshToken() {
//     const response = await apiClient.post<RefreshResponse>(
//       "/auth/refresh"
//     );

//     setAccessToken(response.accessToken);

//     return response.accessToken;
//   },

//   getAccessToken,

//   isAuthenticated() {
//     return !!getAccessToken();
//   },
// };









import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,

  withCredentials: true,

  headers: {
    "Content-Type": "application/json",
  },
});

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
}

export const registerUser = async (
  data: RegisterRequest,
) => {
  const response = await api.post(
    "/auth/register",
    data,
  );

  return response.data;
};