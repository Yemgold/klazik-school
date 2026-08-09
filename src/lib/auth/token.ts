



// src/lib/auth/token.ts

let accessToken: string | null = null;

/**
 * Store access token in memory.
 */
export function setAccessToken(token: string | null) {
  accessToken = token;
}

/**
 * Retrieve access token.
 */
export function getAccessToken(): string | null {
  return accessToken;
}

/**
 * Clear access token.
 */
export function clearAccessToken() {
  accessToken = null;
}

/**
 * Check authentication state.
 */
export function hasAccessToken(): boolean {
  return !!accessToken;
}