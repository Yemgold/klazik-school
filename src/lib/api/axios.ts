


// src/lib/api/axios.ts

import axios from "axios";
import { env } from "@/config";
import { API } from "@/constants";

export const axiosInstance = axios.create({
  baseURL: env.API_URL,
  timeout: API.TIMEOUT,

  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },

  withCredentials: true,
});