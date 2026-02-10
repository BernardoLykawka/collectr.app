"use client";

import { Button } from "../ui/button";
import Image from "next/image";
import { Label } from "../ui/label";
import { AuthModal } from "../auth/auth-modal";
import { Moon, Plus, Sun } from "lucide-react";
import { useHeader } from "./hook";
import { useAuth } from "@/contexts/auth-context";
import { LogoutConfirmModal } from "@/components/auth/logout-confirm-modal";
import { useState } from "react";
import Link from "next/link";
import { NewCollectionModal } from "@/components/collection/newCollection/newCollectionModal";

export default function Header() {
  const { isModalOpen, openModal, closeModal, theme, toggleTheme } = useHeader();
  const { isAuthenticated, logout } = useAuth();
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

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
            <Link className="flex text-chart-2" href="/">
              <span className="sr-only">Home</span>
              <Image src="/icon.svg" alt="Collectr Logo" width={30} height={30} className="inline-block mr-2" />
              <Label className="text-xl font-bold cursor-pointer">COLLECTR</Label>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="default"
              className="gap-2"
              onClick={() => isAuthenticated ? setIsCreateModalOpen(true) : openModal()}
            >
              <Plus className="h-4 w-4" />
            </Button>
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
      <NewCollectionModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </header>
  );
}