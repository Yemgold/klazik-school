

"use client";

import LoginForm from "@/components/auth/LoginForm/LoginForm";

export default function LoginPage() {
  return <LoginForm />;
}






// "use client";

// import Link from "next/link";
// import { GraduationCap, LogIn } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";

// import { useLoginForm } from "@/hooks/forms";
// import type { LoginFormValues } from "@/lib/validation";
// import { useLoginMutation } from "@/hooks/api/useLoginMutation";

// export default function LoginPage() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useLoginForm();

//   const loginMutation = useLoginMutation();

//   const onSubmit = (data: LoginFormValues) => {
//     console.log("🔐 Login submitted:", data);

//     loginMutation.mutate(data);
//   };

//   const isLoading = loginMutation.isPending;

//   return (
//     <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4 py-10">
//       <Card
//         hoverable
//         className="w-full max-w-md shadow-xl"
//       >
//         {/* Header */}
//         <div className="flex flex-col items-center">
//           <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
//             <GraduationCap className="h-10 w-10" />
//           </div>

//           <h1 className="mt-6 text-3xl font-bold">
//             Welcome Back
//           </h1>

//           <p className="mt-2 text-center text-sm text-muted-foreground">
//             Sign in to continue your JAMB League journey.
//           </p>
//         </div>

//         {/* Error */}
//         {loginMutation.isError && (
//           <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
//             Unable to sign in. Please check your email and password and try
//             again.
//           </div>
//         )}

//         {/* Form */}
//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="mt-8 space-y-5"
//           noValidate
//         >
//           <Input
//             label="Email Address"
//             type="email"
//             autoComplete="email"
//             placeholder="Enter your email"
//             error={errors.email?.message}
//             {...register("email")}
//           />

//           <Input
//             label="Password"
//             type="password"
//             autoComplete="current-password"
//             placeholder="Enter your password"
//             error={errors.password?.message}
//             {...register("password")}
//           />

//           <div className="flex items-center justify-between">
//             <label className="flex items-center gap-2 text-sm">
//               <input
//                 type="checkbox"
//                 className="rounded border-slate-300"
//               />

//               <span className="text-muted-foreground">
//                 Remember me
//               </span>
//             </label>

//             <Link
//               href="/forgot-password"
//               className="text-sm font-medium text-primary hover:underline"
//             >
//               Forgot Password?
//             </Link>
//           </div>

//           <Button
//             type="submit"
//             fullWidth
//             size="lg"
//             loading={isLoading}
//             disabled={isLoading}
//             leftIcon={<LogIn className="h-5 w-5" />}
//           >
//             {isLoading ? "Signing In..." : "Sign In"}
//           </Button>
//         </form>

//         {/* Footer */}
//         <div className="mt-8 text-center text-sm text-muted-foreground">
//           Don't have an account?{" "}
//           <Link
//             href="/auth/register"
//             className="font-semibold text-primary hover:underline"
//           >
//             Create one
//           </Link>
//         </div>
//       </Card>
//     </main>
//   );
// }