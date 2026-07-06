/* eslint-disable @next/next/no-html-link-for-pages, @next/next/no-img-element */
"use client"

import { useState } from "react"
import { useForm } from "@tanstack/react-form"
import { ArrowLeft, CheckCircle, Mail } from "lucide-react"
import { z } from "zod"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Spinner } from "@/components/ui/spinner"

const forgotPasswordSchema = z.object({
  email: z.email("Please enter a valid email"),
})

export function ForgotPasswordForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const form = useForm({
    defaultValues: {
      email: "",
    },
    validators: {
      onChange: forgotPasswordSchema,
    },
    onSubmit: async ({ value }) => {
      // Simulate API call - replace with your auth logic
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("Reset password request for:", value.email)
      setIsSubmitted(true)
    },
  })

  return (
    <div className="bg-muted/50 flex min-h-screen w-full flex-col items-center justify-center p-4">
      {/* Logo */}
      <div className="mb-8">
        <a href="/" className="flex items-center gap-2">
          <div className="bg-primary size-14 rounded-xl" />
        </a>
      </div>

      {/* Card */}
      {isSubmitted ? (
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Check your email</CardTitle>
            <CardDescription>
              We&apos;ve sent you a password reset link
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert variant="success">
              <CheckCircle className="size-4" />
              <AlertDescription>
                If an account exists with this email, you will receive a
                password reset link shortly.
              </AlertDescription>
            </Alert>

            <Button variant="outline" className="mt-6 w-full" asChild>
              <a href="/sign-in">
                <ArrowLeft className="size-4" />
                Back to sign in
              </a>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Forgot password?</CardTitle>
            <CardDescription>
              Enter your email and we&apos;ll send you a reset link
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                form.handleSubmit()
              }}
            >
              <FieldGroup>
                <form.Field name="email">
                  {(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                        <InputGroup>
                          <InputGroupAddon>
                            <Mail className="size-4" />
                          </InputGroupAddon>
                          <InputGroupInput
                            id={field.name}
                            name={field.name}
                            type="email"
                            placeholder="you@example.com"
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            aria-invalid={isInvalid}
                          />
                        </InputGroup>
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    )
                  }}
                </form.Field>

                <form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting]}>
                  {([canSubmit, isSubmitting]) => (
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={!canSubmit || isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Spinner />
                          Sending...
                        </>
                      ) : (
                        "Send reset link"
                      )}
                    </Button>
                  )}
                </form.Subscribe>

                <p className="text-muted-foreground text-center text-sm">
                  Remember your password?{" "}
                  <a
                    href="/sign-in"
                    className="text-primary font-medium underline-offset-4 hover:underline"
                  >
                    Sign in
                  </a>
                </p>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Footer */}
      <p className="text-muted-foreground mt-8 text-center text-xs">© 2026</p>
    </div>
  )
}
