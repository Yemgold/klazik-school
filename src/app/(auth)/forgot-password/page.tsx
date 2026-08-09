





"use client";

import Link from "next/link";
import { ArrowLeft, KeyRound, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { useForgotPasswordForm } from "@/hooks/forms";
import type { ForgotPasswordFormValues } from "@/lib/validation";

export default function ForgotPasswordPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForgotPasswordForm();

  const onSubmit = async (
    data: ForgotPasswordFormValues
  ) => {
    console.log("Forgot Password:", data);

    // Next step:
    // forgotPasswordMutation.mutate(data);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4 py-10">
      <Card
        hoverable
        className="w-full max-w-md shadow-xl"
      >
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-amber-100 text-amber-600 shadow">
            <KeyRound className="h-10 w-10" />
          </div>

          <h1 className="mt-6 text-3xl font-bold">
            Forgot Password?
          </h1>

          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Enter the email address associated with your account.
            We'll send you a secure link to reset your password.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-6"
          noValidate
        >
          <Input
            label="Email Address"
            type="email"
            placeholder="Enter your email address"
            autoComplete="email"
            leftIcon={<Mail className="h-4 w-4" />}
            error={errors.email?.message}
            {...register("email")}
          />

          <Button
            type="submit"
            fullWidth
            size="lg"
            loading={isSubmitting}
          >
            Send Reset Link
          </Button>
        </form>

        {/* Back to Login */}
        <div className="mt-8 border-t pt-6">
          <Link
            href="/login"
            className="flex items-center justify-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Login
          </Link>
        </div>

        {/* Help */}
        <div className="mt-6 rounded-xl bg-slate-50 p-4 text-center">
          <p className="text-sm text-muted-foreground">
            If you don't receive an email within a few minutes,
            check your spam folder or make sure you entered the
            correct email address.
          </p>
        </div>
      </Card>
    </main>
  );
}