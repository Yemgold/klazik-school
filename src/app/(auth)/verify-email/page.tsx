



"use client";

import Link from "next/link";
import { CheckCircle2, Mail, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button"; 
import { Card } from "@/components/ui/card"; 

export default function VerifyEmailPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4 py-10">
      <Card
        hoverable
        className="w-full max-w-md shadow-xl"
      >
        <div className="flex flex-col items-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-green-100 text-green-600">
            <Mail className="h-10 w-10" />
          </div>

          <h1 className="mt-6 text-3xl font-bold text-slate-900">
            Verify Your Email
          </h1>

          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            We've sent a verification link to your email address.
            Please open your inbox and click the link to activate
            your account before signing in.
          </p>

          <div className="mt-8 w-full rounded-xl border border-blue-200 bg-blue-50 p-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-blue-600" />

              <div className="text-left">
                <p className="font-medium text-slate-900">
                  Didn't receive the email?
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  Check your spam or junk folder. If you still can't
                  find it, you can request another verification email.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex w-full flex-col gap-3">
            <Button
              fullWidth
              size="lg"
              leftIcon={<RefreshCw className="h-5 w-5" />}
            >
              Resend Verification Email
            </Button>

            <Link href="/login" className="w-full">
              <Button
                fullWidth
                variant="outline"
                size="lg"
              >
                Back to Login
              </Button>
            </Link>
          </div>

          <p className="mt-8 text-xs text-muted-foreground">
            After verifying your email, return to the login page to
            access your dashboard.
          </p>
        </div>
      </Card>
    </main>
  );
}