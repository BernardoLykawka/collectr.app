"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { validatePassword } from "@/lib/password-validation";
import { showToast } from "@/components/ui/toast";

interface UseLoginFormOptions {
  onSuccess?: () => void;
}

export function useLoginForm({ onSuccess }: UseLoginFormOptions = {}) {
  const { login, isLoading, error } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [fieldError, setFieldError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setFieldError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFieldError(null);

    if (!formData.email || !formData.password) {
      setFieldError("Please fill in all fields");
      return;
    }

    try {
      await login(formData.email, formData.password);
      showToast("Login successful!", "success");
    
      await new Promise(resolve => setTimeout(resolve, 150));
      
      onSuccess?.();
    } catch (err) {
      const errorMessage =
        err instanceof Object && "message" in err
          ? (err.message as string)
          : "Login failed. Please try again.";
      setFieldError(errorMessage);
      showToast(errorMessage, "error");
    }
  };

  return {
    formData,
    isLoading,
    error,
    fieldError,
    handleChange,
    handleSubmit,
  };
}

interface UseSignupFormOptions {
  onSuccess?: () => void;
}

export function useSignupForm({ onSuccess }: UseSignupFormOptions = {}) {
  const { signup, isLoading, error } = useAuth();
  const [formData, setFormData] = useState({
    nickname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [passwordValidation, setPasswordValidation] = useState({
    isValid: false,
    errors: [] as string[],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    setFieldErrors((prev) => ({
      ...prev,
      [id]: "",
    }));

    if (id === "password") {
      const validation = validatePassword(value);
      setPasswordValidation(validation);
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.nickname.trim()) {
      errors.nickname = "Nickname is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (!passwordValidation.isValid) {
      errors.password =
        passwordValidation.errors[0] || "Password does not meet requirements";
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      showToast("Please fix the errors in the form", "error");
      return;
    }

    try {
      await signup(formData.email, formData.password, formData.nickname);
      showToast("Account created successfully!", "success");
      
      await new Promise(resolve => setTimeout(resolve, 150));
      
      onSuccess?.();
    } catch (err) {
      const errorMessage =
        err instanceof Object && "message" in err
          ? (err.message as string)
          : "Signup failed. Please try again.";
      showToast(errorMessage, "error");
    }
  };

  return {
    formData,
    isLoading,
    error,
    fieldErrors,
    passwordValidation,
    handleChange,
    handleSubmit,
  };
}
