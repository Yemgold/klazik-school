


"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  Lock,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function ResetPasswordPage() {
  const [loading, setLoading] = useState(false);

  async function onSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);

    // TODO:
    // Call reset password API

    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4 py-10">
      <Card
        hoverable
        className="w-full max-w-md shadow-xl"
      >
        {/* Header */}
        <div className="flex flex-col items-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-green-100 text-green-600 shadow">
            <ShieldCheck className="h-10 w-10" />
          </div>

          <h1 className="mt-6 text-3xl font-bold">
            Reset Password
          </h1>

          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Create a new secure password for your JAMB League
            account. Make sure it is strong and easy for you to
            remember.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={onSubmit}
          className="mt-8 space-y-6"
        >
          <Input
            label="New Password"
            name="password"
            type="password"
            placeholder="Enter new password"
            required
            autoComplete="new-password"
            leftIcon={<Lock className="h-4 w-4" />}
          />

          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="Confirm new password"
            required
            autoComplete="new-password"
            leftIcon={<Lock className="h-4 w-4" />}
          />

          <Button
            type="submit"
            fullWidth
            size="lg"
            loading={loading}
          >
            Reset Password
          </Button>
        </form>

        {/* Back */}
        <div className="mt-8 border-t pt-6">
          <Link
            href="/login"
            className="flex items-center justify-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Login
          </Link>
        </div>

        {/* Password Tips */}
        <div className="mt-6 rounded-xl bg-slate-50 p-5">
          <h3 className="font-semibold">
            Password Tips
          </h3>

          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>• Use at least 8 characters.</li>
            <li>• Include uppercase and lowercase letters.</li>
            <li>• Add numbers and special characters.</li>
            <li>• Avoid using your name or date of birth.</li>
          </ul>
        </div>
      </Card>
    </main>
  );
}