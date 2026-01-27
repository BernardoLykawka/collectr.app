import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

interface SignupFormProps extends React.ComponentProps<typeof Card> {
  onSwitchToLogin?: () => void;
}

export function SignupForm({ onSwitchToLogin, ...props }: SignupFormProps) {
  return (
    <div className="flex w-full justify-end animate-in slide-in-from-right-8 fade-in duration-500">
      <div className="w-full max-w-sm">
        <Card {...props}>
          <CardHeader>
            <CardTitle>Create an account</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="nickname">Nickname</FieldLabel>
                  <Input id="nickname" type="text" placeholder="Your Nickname" required />
                </Field>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input id="password" type="password" required />
                </Field>
                <FieldGroup>
                  <Field>
                    <Button type="submit">Create Account</Button>
                    <FieldDescription className="px-6 text-center">
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={onSwitchToLogin}
                        className="hover:cursor-pointer font-medium text-primary hover:text-primary/80 underline-offset-4 hover:underline"
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
    </div>
  )
}
