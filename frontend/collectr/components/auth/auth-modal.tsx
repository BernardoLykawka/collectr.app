"use client";

import { useState } from "react";
import { LoginForm } from "./login-form";
import { SignupForm } from "./signup-form";
import { useAuth } from "@/contexts/auth-context";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const { clearError } = useAuth();

  const handleClose = () => {
    clearError();
    onClose();
  };

  const switchToLogin = () => {
    clearError();
    setActiveTab("login");
  };

  const switchToSignup = () => {
    clearError();
    setActiveTab("signup");
  };

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
        <div className="fixed inset-0 flex items-end justify-end z-50 bg-black/60 px-8 py-4 md:px-16" onClick={handleBackdropClick}>
          {activeTab === "login" ? (
            <LoginForm
              onSwitchToSignup={switchToSignup}
              onSuccess={handleClose}
            />
          ) : (
            <SignupForm
              onSwitchToLogin={switchToLogin}
              onSuccess={handleClose}
            />
          )}
        </div>
  );
}
