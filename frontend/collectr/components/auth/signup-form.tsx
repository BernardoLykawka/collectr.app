"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useSignupForm } from "@/components/auth/hooks";

interface SignupFormProps extends React.ComponentProps<typeof Card> {
  onSwitchToLogin?: () => void;
  onSuccess?: () => void;
}

export function SignupForm({ onSwitchToLogin, onSuccess, ...props }: SignupFormProps) {
  const {
    formData,
    isLoading,
    error,
    fieldErrors,
    passwordValidation,
    handleChange,
    handleSubmit,
  } = useSignupForm({ onSuccess });

  return (
    <div className="w-full max-w-sm animate-in slide-in-from-right-8 fade-in duration-500">
      <Card {...props}>
          <CardHeader>
            <CardTitle>Create an account</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="nickname">Nickname</FieldLabel>
                  <Input
                    id="nickname"
                    type="text"
                    placeholder="Your Nickname"
                    value={formData.nickname}
                    onChange={handleChange}
                    disabled={isLoading}
                    required
                  />
                  {fieldErrors.nickname && (
                    <p className="text-xs text-red-500 mt-1">{fieldErrors.nickname}</p>
                  )}
                </Field>

                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isLoading}
                    required
                  />
                  {fieldErrors.email && (
                    <p className="text-xs text-red-500 mt-1">{fieldErrors.email}</p>
                  )}
                </Field>

                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    id="password"
                    type="password"
                    placeholder="At least 8 characters"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isLoading}
                    required
                  />
                  {formData.password && (
                    <div className="mt-2 space-y-1">
                      {passwordValidation.errors.map((error, idx) => (
                        <p key={idx} className="text-xs text-red-500">
                          • {error}
                        </p>
                      ))}
                    </div>
                  )}
                  {formData.password && passwordValidation.isValid && (
                    <p className="text-xs text-green-600 mt-1">✓ Password is valid</p>
                  )}
                </Field>

                <Field>
                  <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    disabled={isLoading}
                    required
                  />
                  {formData.confirmPassword &&
                    formData.password !== formData.confirmPassword && (
                      <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
                    )}
                  {formData.confirmPassword && formData.password === formData.confirmPassword && (
                    <p className="text-xs text-green-600 mt-1">✓ Passwords match</p>
                  )}
                </Field>

                {fieldErrors.password && (
                  <p className="text-xs text-red-500">{fieldErrors.password}</p>
                )}
                {fieldErrors.confirmPassword && (
                  <p className="text-xs text-red-500">{fieldErrors.confirmPassword}</p>
                )}
                {error && (
                  <div className="text-sm text-red-500 p-2 bg-red-50 rounded border border-red-200">
                    {error}
                  </div>
                )}

                <FieldGroup>
                  <Field>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Creating Account..." : "Create Account"}
                    </Button>
                    <FieldDescription className="px-6 text-center">
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={onSwitchToLogin}
                        disabled={isLoading}
                        className="hover:cursor-pointer font-medium text-primary hover:text-primary/80 underline-offset-4 hover:underline disabled:opacity-50"
                      >
                        Log in
                      </button>
                    </FieldDescription>
                  </Field>
                </FieldGroup>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
    </div>
  );
}
