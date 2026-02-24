import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./theme.css";
import "./globals.css";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import { ModalProvider } from "@/contexts/modal-context";
import { AuthProvider } from "@/contexts/auth-context";
import { ToastContainer } from "@/components/ui/toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Collectr",
  description: "Your ultimate collection management app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <AuthProvider>
          <ModalProvider>
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </ModalProvider>
          <ToastContainer />
        </AuthProvider>
      </body>
    </html>
  );
}
