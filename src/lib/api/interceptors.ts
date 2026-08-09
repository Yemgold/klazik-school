



// src/lib/api/interceptors.ts

import type { AxiosError, InternalAxiosRequestConfig } from "axios";

import { axiosInstance } from "./axios";
import { getAccessToken } from "@/lib/auth";

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const status = error.response?.status;

    switch (status) {
      case 401:
        console.warn("Unauthorized request");
        break;

      case 403:
        console.warn("Forbidden request");
        break;

      case 404:
        console.warn("Resource not found");
        break;

      case 500:
        console.error("Internal server error");
        break;

      default:
        break;
    }

    return Promise.reject(error);
  }
);

export {};