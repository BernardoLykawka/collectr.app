import { apiFetch, setToken, removeToken } from "./api";
import type { AuthResponse, LoginRequest, CreateUserRequest, UserDTO } from "@/types/auth";

export const authService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    const request: LoginRequest = { email, password };

    const response = await apiFetch<AuthResponse>("/users/login", {
      method: "POST",
      body: JSON.stringify(request),
      skipAuth: true,
    });
    
    setToken(response.token);
    
    return response;
  },

  async signup(
    email: string,
    password: string,
    nickname: string
  ): Promise<AuthResponse> {
    const request: CreateUserRequest = {
      email,
      password,
      nickname,
      role: "USER",
    };

    await apiFetch<UserDTO>("/users", {
      method: "POST",
      body: JSON.stringify(request),
      skipAuth: true,
    });
    
    const loginResponse = await this.login(email, password);
    
    return loginResponse;
  },

  logout(): void {
    removeToken();
  },

  getStoredToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("authToken");
  },
};
