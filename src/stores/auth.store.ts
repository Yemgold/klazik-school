



import { create } from "zustand";

import type { User } from "@/types";

interface AuthState {
  user: User | null;

  accessToken: string | null;

  isAuthenticated: boolean;

  login: (
    user: User,
    accessToken: string
  ) => void;

  updateUser: (user: User) => void;

  updateAccessToken: (
    token: string
  ) => void;

  logout: () => void;

  clear: () => void;
}

export const useAuthStore =
  create<AuthState>((set) => ({
    user: null,

    accessToken: null,

    isAuthenticated: false,

    login: (user, accessToken) =>
      set({
        user,
        accessToken,
        isAuthenticated: true,
      }),

    updateUser: (user) =>
      set({
        user,
      }),

    updateAccessToken: (
      accessToken
    ) =>
      set({
        accessToken,
      }),

    logout: () =>
      set({
        user: null,
        accessToken: null,
        isAuthenticated: false,
      }),

    clear: () =>
      set({
        user: null,
        accessToken: null,
        isAuthenticated: false,
      }),
  }));