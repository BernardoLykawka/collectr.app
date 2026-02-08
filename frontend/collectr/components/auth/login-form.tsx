"use client";

import { cn } from "@/lib/utils";
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
import { useLoginForm } from "@/components/auth/hooks";

interface LoginFormProps extends React.ComponentProps<"div"> {
  onSwitchToSignup?: () => void;
  onSuccess?: () => void;
}

export function LoginForm({
  className,
  onSwitchToSignup,
  onSuccess,
  ...props
}: LoginFormProps) {
  const {
    formData,
    isLoading,
    error,
    fieldError,
    handleChange,
    handleSubmit,
  } = useLoginForm({ onSuccess });

  return (
    <div className="w-full max-w-sm animate-in slide-in-from-right-8 fade-in duration-500">
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
            <CardHeader>
              <CardTitle>Login to your account</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <FieldGroup>
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
                  </Field>
                  <Field>
                    <div className="flex items-center">
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                      <a
                        href="#"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline hover:cursor-pointer"
                      >
                        Forgot your password?
                      </a>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      disabled={isLoading}
                      required
                    />
                  </Field>

                  {(fieldError || error) && (
                    <div className="text-sm text-red-500 p-2 bg-red-50 rounded border border-red-200">
                      {fieldError || error}
                    </div>
                  )}

                  <Field>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Logging in..." : "Login"}
                    </Button>
                    <FieldDescription className="text-center">
                      Don&apos;t have an account?{" "}
                      <button
                        type="button"
                        onClick={onSwitchToSignup}
                        disabled={isLoading}
                        className="font-medium text-primary hover:text-primary/80 underline-offset-4 hover:underline hover:cursor-pointer disabled:opacity-50"
                      >
                        Sign up
                      </button>
                    </FieldDescription>
                  </Field>
                </FieldGroup>
              </form>
            </CardContent>
          </Card>
        </div>
    </div>
  );
}
