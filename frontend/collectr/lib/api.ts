const API_BASE_URL = "/api";

export interface FetchOptions extends RequestInit {
  skipAuth?: boolean;
}

export class ApiError extends Error {
  status: number;
  data?: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

export async function apiFetch<T = unknown>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { skipAuth = false, ...fetchOptions } = options;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (fetchOptions.headers && typeof fetchOptions.headers === "object") {
    Object.entries(fetchOptions.headers).forEach(([key, value]) => {
      headers[key] = String(value);
    });
  }

  if (!skipAuth) {
    const token = getToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers,
    });

    const contentType = response.headers.get("content-type");
    const isJson = contentType?.includes("application/json");

    let data: unknown;
    if (isJson) {
      data = await response.json();
    }

    if (!response.ok) {
      const error = new ApiError("An error occurred", response.status, data);

      if (isJson && typeof data === "object" && data !== null) {
        if ("message" in data) {
          error.message = (data as Record<string, unknown>).message as string;
        } else if ("error" in data) {
          error.message = (data as Record<string, unknown>).error as string;
        }
      }

      throw error;
    }

    return data as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof TypeError) {
      throw new ApiError("Network error. Please check your connection.", 0);
    }

    throw new ApiError("An unexpected error occurred", 500, error);
  }
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("authToken");
}

export function setToken(token: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("authToken", token);
}

export function removeToken(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("authToken");
}

export function getApiBaseUrl(): string {
  return API_BASE_URL;
}
