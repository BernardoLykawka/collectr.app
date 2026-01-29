"use client";

import { useState, useEffect, useCallback } from "react";
import { X, CheckCircle, AlertCircle } from "lucide-react";

export type ToastType = "success" | "error" | "info";

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastProps extends Toast {
  onClose: (id: string) => void;
}

function ToastItem({ id, message, type, duration = 5000, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(id), duration);
    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const bgColor =
    type === "success" ? "bg-green-50" : type === "error" ? "bg-red-50" : "bg-blue-50";
  const borderColor =
    type === "success"
      ? "border-green-200"
      : type === "error"
        ? "border-red-200"
        : "border-blue-200";
  const textColor =
    type === "success"
      ? "text-green-800"
      : type === "error"
        ? "text-red-800"
        : "text-blue-800";
  const Icon = type === "success" ? CheckCircle : type === "error" ? AlertCircle : AlertCircle;
  const iconColor =
    type === "success" ? "text-green-500" : type === "error" ? "text-red-500" : "text-blue-500";

  return (
    <div
      className={`${bgColor} ${borderColor} ${textColor} border rounded-lg p-4 flex items-start gap-3 animate-in slide-in-from-top fade-in duration-300`}
      role="alert"
    >
      <Icon className={`${iconColor} shrink-0 w-5 h-5 mt-0.5`} />
      <div className="flex-1">
        <p className="text-sm font-medium">{message}</p>
      </div>
      <button
        onClick={() => onClose(id)}
        className="shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Close toast"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback(
    (message: string, type: ToastType = "info", duration?: number) => {
      const id = Math.random().toString(36).substring(7);
      const newToast: Toast = { id, message, type, duration };
      setToasts((prev) => [...prev, newToast]);
      return id;
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  useEffect(() => {
    (window as any).toast = {
      success: (message: string, duration?: number) => addToast(message, "success", duration),
      error: (message: string, duration?: number) => addToast(message, "error", duration),
      info: (message: string, duration?: number) => addToast(message, "info", duration),
    };
  }, [addToast]);

  return (
    <div className="fixed top-4 right-4 z-50 max-w-md space-y-2 pointer-events-auto">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} {...toast} onClose={removeToast} />
      ))}
    </div>
  );
}

export function showToast(message: string, type: ToastType = "info", duration?: number) {
  if (typeof window !== "undefined" && (window as any).toast) {
    (window as any).toast[type](message, duration);
  }
}
