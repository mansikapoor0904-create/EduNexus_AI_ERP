const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

let accessToken = null;

/**
 * Store the short-lived access token only in memory.
 */
export const setAccessToken = (token) => {
  accessToken = token;
};

/**
 * Get the current access token.
 */
export const getAccessToken = () => {
  return accessToken;
};

/**
 * Clear the current access token.
 */
export const clearAccessToken = () => {
  accessToken = null;
};

/**
 * Login user.
 *
 * Backend expects:
 * {
 *   identifier,
 *   password,
 *   role,
 *   rememberMe
 * }
 */
export const loginUser = async ({
  email,
  password,
  role,
  rememberMe = false,
}) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    credentials: "include",

    body: JSON.stringify({
      identifier: email,
      password,
      role,
      rememberMe,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(
      data.message || "Login failed."
    );

    error.response = {
      status: response.status,
      data,
    };

    throw error;
  }

  if (data.accessToken) {
    setAccessToken(data.accessToken);
  }

  return data;
};

/**
 * Refresh the session.
 *
 * The refresh token is stored by the backend
 * in an HttpOnly cookie, so JavaScript cannot read it.
 */
export const refreshSession = async () => {
  const response = await fetch(
    `${API_BASE_URL}/auth/refresh`,
    {
      method: "POST",
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    clearAccessToken();
    return null;
  }

  if (data.accessToken) {
    setAccessToken(data.accessToken);
  }

  return data;
};

/**
 * Get currently authenticated user.
 */
export const getCurrentUser = async () => {
  if (!accessToken) {
    return null;
  }

  const response = await fetch(
    `${API_BASE_URL}/auth/me`,
    {
      method: "GET",

      headers: {
        Authorization: `Bearer ${accessToken}`,
      },

      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    if (response.status === 401) {
      clearAccessToken();
    }

    throw new Error(
      data.message || "Unable to fetch current user."
    );
  }

  return data;
};

/**
 * Logout current session.
 */
export const logoutUser = async () => {
  try {
    await fetch(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",

      headers: accessToken
        ? {
            Authorization: `Bearer ${accessToken}`,
          }
        : {},
    });
  } finally {
    clearAccessToken();
  }
};

/**
 * Logout all sessions/devices.
 */
export const logoutAllSessions = async () => {
  try {
    await fetch(`${API_BASE_URL}/auth/logout-all`, {
      method: "POST",
      credentials: "include",

      headers: accessToken
        ? {
            Authorization: `Bearer ${accessToken}`,
          }
        : {},
    });
  } finally {
    clearAccessToken();
  }
};