"use client";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Image from "next/image";
import { Label } from "../ui/label";
import { AuthModal } from "../auth/auth-modal";
import { Moon, Sun } from "lucide-react";
import { useHeader } from "./hook";
import { useAuth } from "@/contexts/auth-context";
import { LogoutConfirmModal } from "@/components/auth/logout-confirm-modal";
import { useState } from "react";

export default function Header() {
  const { isModalOpen, openModal, closeModal, theme, toggleTheme } = useHeader();
  const { isAuthenticated, logout } = useAuth();
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  const handleLogout = () => {
    setIsLogoutOpen(true);
  };

  const confirmLogout = () => {
    logout();
    setIsLogoutOpen(false);
  };

  const cancelLogout = () => {
    setIsLogoutOpen(false);
  };
  return (
    <header className="bg-background shadow-xs border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <a className="flex text-chart-2" href="/">
              <span className="sr-only">Home</span>
              <Image src="/icon.svg" alt="Collectr Logo" width={30} height={30} className="inline-block mr-2" />
              <Label className="text-xl font-bold cursor-pointer">COLLECTR</Label>
            </a>
          </div>

          <div className="hidden md:flex justify-center md:items-center md:flex-1 md:mx-8">
            <Input 
              type="search" 
              placeholder="Search..." 
              className="w-full md:max-w-xs"
            />
          </div>

          <div className="flex items-center gap-4">
            {!isAuthenticated ? (
              <div className="sm:flex sm:gap-4">
                <Button
                  variant="default"
                  className="md:inline-flex"
                  onClick={openModal}
                >
                  Login
                </Button>
              </div>
            ) : (
              <div className="sm:flex sm:gap-4">
                <Button
                  variant="default"
                  className="md:inline-flex"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            )}

            <Button
              type="button"
              variant="outline"
              className="inline-flex"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
      <AuthModal isOpen={isModalOpen} onClose={closeModal} />
      <LogoutConfirmModal
        isOpen={isLogoutOpen}
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
      />
    </header>
  );
}