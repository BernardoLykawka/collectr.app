"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { authService } from "@/lib/auth-service";
import type { AuthContextType, AuthState, UserDTO } from "@/types/auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = authService.getStoredToken();
      if (storedToken) {
        try {
          const user = await authService.getCurrentUser();
          setState((prev) => ({
            ...prev,
            user,
            token: storedToken,
            isAuthenticated: true,
            isLoading: false,
          }));
        } catch (error) {
          authService.logout();
          setState((prev) => ({
            ...prev,
            token: null,
            isAuthenticated: false,
            isLoading: false,
          }));
        }
      } else {
        setState((prev) => ({
          ...prev,
          isLoading: false,
        }));
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
    }));

    try {
      const response = await authService.login(email, password);

      setState((prev) => ({
        ...prev,
        user: response.user,
        token: response.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      const message =
        error instanceof Object && "message" in error
          ? (error.message as string)
          : "Login failed";

      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: message,
      }));

      throw error;
    }
  };

  const signup = async (
    email: string,
    password: string,
    nickname: string
  ): Promise<void> => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
    }));

    try {
      const response = await authService.signup(email, password, nickname);

      setState((prev) => ({
        ...prev,
        user: response.user,
        token: response.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      const message =
        error instanceof Object && "message" in error
          ? (error.message as string)
          : "Signup failed";

      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: message,
      }));

      throw error;
    }
  };

  const logout = (): void => {
    authService.logout();
    setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  };

  const clearError = (): void => {
    setState((prev) => ({
      ...prev,
      error: null,
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        signup,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
