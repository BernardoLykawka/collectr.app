"use client";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Image from "next/image";
import { Label } from "./ui/label";
import { useModal } from "@/contexts/modal-context";
import { AuthModal } from "./auth/auth-modal";

export default function Header() {
  const { isModalOpen, openModal, closeModal } = useModal();
  return (
    <header className="bg-white shadow-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <a className="flex text-teal-600 " href="/">
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
            <div className="sm:flex sm:gap-4">
                <Button 
                  variant="default" 
                  className="md:inline-flex"
                  onClick={openModal}
                >
                  Login
                </Button>
            </div>

            <div className="block md:hidden">
              <button className="rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <AuthModal isOpen={isModalOpen} onClose={closeModal} />
    </header>
  );
}