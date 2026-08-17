

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  AuthCard,
  AuthHeader,
  AuthFooter,
  Divider,
  PasswordInput,
  SocialLogin,
} from "@/components/auth";

import { useLogin } from "@/hooks/auth/useLogin";

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Enter a valid email address"),

  password: z
    .string()
    .min(
      8,
      "Password must contain at least 8 characters"
    ),
});

type LoginFormData = z.infer<
  typeof loginSchema
>;

interface LoginFormProps {
  adminOnly?: boolean;
}

export default function LoginForm({
  adminOnly = false,
}: LoginFormProps) {
  const router = useRouter();

  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (
    data: LoginFormData
  ) => {
    try {
      const response =
        await loginMutation.mutateAsync(
          data
        );

      const role =
        response.data.user.role;

      /**
       * Admin Login Page
       */

      if (adminOnly) {
        if (role !== "ADMIN") {
          alert(
            "You are not authorized to access the Admin Dashboard."
          );

          return;
        }

        router.push("/admin/dashboard");
        return;
      }

/* ============================================================ 

                NORMAL LOGIN REDIRECT 
============================================================ */

 switch (role) { 
  case "ADMIN": 
  router.push("/admin/dashboard"); break;

   case "ORGANIZER":
     router.push("/organizer/dashboard"); break; 

   case "STUDENT": 
   case "USER": 
   router.push("/student/dashboard"); break;

    default: 
    console.warn( "Unknown user role:", role, );
     router.push("/"); break;
    }

  } catch (error) {
    console.error("Login failed:", error);
  }
};

  return (
    <AuthCard>
      <AuthHeader
        title={
          adminOnly
            ? "Administrator Login"
            : "Welcome Back"
        }
        subtitle={
  adminOnly
    ? "Sign in to manage competitions, students, questions, results, and the JAMB League platform."
    : "Sign in to continue your JAMB preparation, compete with others, and climb the leaderboard."
}
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <Input
          label="Email Address"
          type="email"
          placeholder="example@email.com"
          autoComplete="email"
          {...register("email")}
          error={errors.email?.message}
        />

        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          autoComplete="current-password"
          {...register("password")}
          error={
            errors.password?.message
          }
        />

        <div className="flex justify-end">
          <Link
            href="/auth/forgot-password"
            className="text-sm font-medium text-primary transition hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {loginMutation.isError && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-medium text-red-600">
              {loginMutation.error
                ?.message ??
                "Login failed. Please check your credentials and try again."}
            </p>
          </div>
        )}

        {loginMutation.isSuccess && (
          <div className="rounded-xl border border-green-200 bg-green-50 p-4">
            <p className="text-sm font-medium text-green-700">
              {
                loginMutation.data
                  ?.message
              }
            </p>
          </div>
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={
            loginMutation.isPending
          }
        >
          {loginMutation.isPending
            ? adminOnly
              ? "Signing in..."
              : "Logging in..."
            : adminOnly
            ? "Admin Login"
            : "Login"}
        </Button>
      </form>

      {!adminOnly && (
        <>
          <Divider />

          <SocialLogin />
        </>
      )}

      {!adminOnly ? (
        <AuthFooter
          text="Don't have an account?"
          linkText="Create Account"
          href="/auth/register"
        />
      ) : (
        <AuthFooter
          text="Return to website?"
          linkText="Go Home"
          href="/"
        />
      )}
    </AuthCard>
  );
}