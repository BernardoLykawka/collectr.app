"use client";

import { useState } from "react";
import { LoginForm } from "./login-form";
import { SignupForm } from "./signup-form";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
        <div className="fixed inset-0 flex items-end justify-end z-50 px-8 py-4 md:px-16" onClick={handleBackdropClick}>
          {activeTab === "login" ? (
            <LoginForm onSwitchToSignup={() => setActiveTab("signup")} />
          ) : (
            <SignupForm onSwitchToLogin={() => setActiveTab("login")} />
          )}
        </div>
  );
}
