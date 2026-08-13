



"use client";

import Link from "next/link";
import { GraduationCap, UserPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { useRegisterForm } from "@/hooks/forms";
import type { RegisterFormValues } from "@/lib/validation";
import { useRegisterMutation } from "@/hooks/api/useRegisterMutation";



export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useRegisterForm();

  // ✅ Hook belongs here
  const registerMutation = useRegisterMutation();

const onSubmit = async (data: RegisterFormValues) => {
  console.log("✅ Form submitted");
  console.log(data);

  registerMutation.mutate({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone,
    password: data.password,
  });
};


  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4 py-10">
      <Card
        hoverable
        className="w-full max-w-lg shadow-xl"
      >
        {/* Header */}
        <div className="flex flex-col items-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
            <GraduationCap className="h-10 w-10" />
          </div>

          <h1 className="mt-6 text-3xl font-bold">
            Create Account
          </h1>

          <p className="mt-2 text-center text-sm text-muted-foreground">
            Join thousands of students preparing for JAMB through healthy
            competition.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-5"
          noValidate
        >
          <Input
            label="First Name"
            placeholder="Enter your first name"
            autoComplete="name"
            error={errors.firstName?.message}
            {...register("firstName")}
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            error={errors.email?.message}
            {...register("email")}
          />

          <Input
            label="Phone Number"
            type="tel"
            placeholder="08012345678"
            autoComplete="tel"
            error={errors.phone?.message}
            {...register("phone")}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Create a password"
            autoComplete="new-password"
            error={errors.password?.message}
            {...register("password")}
          />

          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            autoComplete="new-password"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />

          {/* Terms */}
          <div>
            <label className="flex items-start gap-3 text-sm">
              <input
                type="checkbox"
                className="mt-1 rounded border-slate-300"
                {...register("acceptTerms")}
              />

              <span className="text-muted-foreground">
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="font-medium text-primary hover:underline"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="font-medium text-primary hover:underline"
                >
                  Privacy Policy
                </Link>
                .
              </span>
            </label>

            {errors.acceptTerms && (
              <p className="mt-2 text-xs text-red-600">
                {errors.acceptTerms.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            fullWidth
            size="lg"
            loading={isSubmitting}
            leftIcon={<UserPlus className="h-5 w-5" />}
          >
            Create Account
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-primary hover:underline"
          >
            Sign In
          </Link>
        </div>
      </Card>
    </main>
  );
}