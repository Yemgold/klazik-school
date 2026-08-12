"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, X } from "lucide-react";

import { cn } from "@/lib/utils";

import { studentNavigation } from "./navigation/student-nav";
import { adminNavigation } from "./navigation/admin-nav";

export type DashboardRole = "student" | "admin";

interface DashboardSidebarProps {
  role: DashboardRole;
  open?: boolean;
  onClose?: () => void;
  className?: string;
}

export default function DashboardSidebar({
  role,
  open = false,
  onClose,
  className,
}: DashboardSidebarProps) {
  const pathname = usePathname();

  const navigation =
    role === "admin"
      ? adminNavigation
      : studentNavigation;

  return (
    <>
      {/* ============================================================ */}
      {/* MOBILE BACKDROP                                               */}
      {/* ============================================================ */}

      <div
        className={cn(
          "fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm",
          "transition-opacity duration-300 lg:hidden",
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* ============================================================ */}
      {/* SIDEBAR                                                        */}
      {/* ============================================================ */}

      <aside
        className={cn(
          /*
           * DESKTOP
           */
          "hidden lg:flex",
          "sticky top-0 h-screen",
          "w-72 shrink-0",
          "flex-col",

          /*
           * DESIGN
           */
          "border-r border-slate-200",
          "bg-white",

          className
        )}
      >
        {/* ========================================================== */}
        {/* LOGO                                                        */}
        {/* ========================================================== */}

        <div className="flex h-16 shrink-0 items-center border-b border-slate-200 px-6">
          <Link
            href="/"
            className="text-2xl font-black tracking-tight text-blue-600"
          >
            JAMB League
          </Link>
        </div>

        {/* ========================================================== */}
        {/* NAVIGATION                                                  */}
        {/* ========================================================== */}

        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <div className="space-y-8">
            {navigation.map((section) => (
              <div key={section.title}>
                <h3 className="mb-2 px-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                  {section.title}
                </h3>

                <div className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;

                    const active =
                      pathname === item.href ||
                      pathname.startsWith(
                        `${item.href}/`
                      );

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          "flex items-center gap-3",
                          "rounded-xl px-4 py-3",
                          "text-sm font-semibold",
                          "transition-all duration-200",

                          active
                            ? "bg-blue-600 text-white shadow-sm"
                            : "text-slate-700 hover:bg-slate-100"
                        )}
                      >
                        <Icon className="h-5 w-5 shrink-0" />

                        <span>
                          {item.label}
                        </span>

                        {item.badge && (
                          <span
                            className={cn(
                              "ml-auto rounded-full px-2 py-0.5",
                              "text-xs font-bold",

                              active
                                ? "bg-white/20 text-white"
                                : "bg-blue-100 text-blue-700"
                            )}
                          >
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </nav>

        {/* ========================================================== */}
        {/* LOGOUT                                                       */}
        {/* ========================================================== */}

        <div className="shrink-0 border-t border-slate-200 p-4">
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
          >
            <LogOut className="h-5 w-5" />

            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ============================================================ */}
      {/* MOBILE SIDEBAR                                                */}
      {/* ============================================================ */}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50",
          "flex w-72 flex-col",
          "border-r border-slate-200",
          "bg-white shadow-2xl",
          "transition-transform duration-300",
          "lg:hidden",

          open
            ? "translate-x-0"
            : "-translate-x-full"
        )}
      >
        {/* Mobile Header */}

        <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 px-5">
          <Link
            href="/"
            onClick={onClose}
            className="text-xl font-black tracking-tight text-blue-600"
          >
            JAMB League
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            aria-label="Close navigation"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Mobile Navigation */}

        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <div className="space-y-8">
            {navigation.map((section) => (
              <div key={section.title}>
                <h3 className="mb-2 px-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                  {section.title}
                </h3>

                <div className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;

                    const active =
                      pathname === item.href ||
                      pathname.startsWith(
                        `${item.href}/`
                      );

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          "flex items-center gap-3",
                          "rounded-xl px-4 py-3",
                          "text-sm font-semibold",
                          "transition-all duration-200",

                          active
                            ? "bg-blue-600 text-white"
                            : "text-slate-700 hover:bg-slate-100"
                        )}
                      >
                        <Icon className="h-5 w-5 shrink-0" />

                        <span>
                          {item.label}
                        </span>

                        {item.badge && (
                          <span className="ml-auto rounded-full bg-blue-100 px-2 py-0.5 text-xs font-bold text-blue-700">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </nav>

        {/* Mobile Logout */}

        <div className="shrink-0 border-t border-slate-200 p-4">
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50"
          >
            <LogOut className="h-5 w-5" />

            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}


// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { LogOut, X } from "lucide-react";

// import { cn } from "@/lib/utils";

// import { studentNavigation } from "./navigation/student-nav";
// import { adminNavigation } from "./navigation/admin-nav";

// export type DashboardRole = "student" | "admin";

// interface DashboardSidebarProps {
//   role: DashboardRole;
//   open?: boolean;
//   onClose?: () => void;
//   className?: string;
// }

// export default function DashboardSidebar({
//   role,
//   open = false,
//   onClose,
//   className,
// }: DashboardSidebarProps) {
//   const pathname = usePathname();

//   const navigation =
//     role === "admin"
//       ? adminNavigation
//       : studentNavigation;

//   return (
//     <>
//       {/* ============================================================
//           MOBILE OVERLAY
//       ============================================================ */}

//       <div
//         onClick={onClose}
//         className={cn(
//           "fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm",
//           "lg:hidden",
//           open
//             ? "pointer-events-auto opacity-100"
//             : "pointer-events-none opacity-0",
//           "transition-opacity duration-300"
//         )}
//       />

//       {/* ============================================================
//           SIDEBAR
//       ============================================================ */}

//       <aside
//         className={cn(
//           /*
//            * DESKTOP
//            */
//           "w-72 shrink-0 flex-col",
//           "border-r border-slate-200",
//           "bg-white",

//           /*
//            * DESKTOP: always visible
//            */
//           "lg:relative lg:flex lg:min-h-screen",

//           /*
//            * MOBILE: fixed drawer
//            */
//           "fixed inset-y-0 left-0 z-50",

//           /*
//            * MOBILE OPEN/CLOSED
//            */
//           open
//             ? "flex translate-x-0 shadow-2xl"
//             : "hidden -translate-x-full",

//           /*
//            * Animation
//            */
//           "transition-transform duration-300 ease-out",

//           className
//         )}
//       >
//         {/* ==========================================================
//             HEADER
//         ========================================================== */}

//         <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 px-5 sm:px-6">
//           <Link
//             href="/"
//             onClick={onClose}
//             className="text-2xl font-black tracking-tight text-blue-600"
//           >
//             JAMB League
//           </Link>

//           {/* Mobile close */}

//           <button
//             type="button"
//             onClick={onClose}
//             className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 lg:hidden"
//             aria-label="Close navigation"
//           >
//             <X className="h-5 w-5" />
//           </button>
//         </div>

//         {/* ==========================================================
//             NAVIGATION
//         ========================================================== */}

//         <nav className="flex-1 overflow-y-auto px-4 py-6">
//           <div className="space-y-8">
//             {navigation.map((section) => (
//               <div key={section.title}>
//                 <h3 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
//                   {section.title}
//                 </h3>

//                 <div className="space-y-1">
//                   {section.items.map((item) => {
//                     const Icon = item.icon;

//                     const active =
//                       pathname === item.href ||
//                       pathname.startsWith(
//                         `${item.href}/`
//                       );

//                     return (
//                       <Link
//                         key={item.href}
//                         href={item.href}
//                         onClick={onClose}
//                         className={cn(
//                           "flex items-center gap-3 rounded-xl px-4 py-3",
//                           "text-sm font-medium",
//                           "transition-colors",

//                           active
//                             ? "bg-blue-600 text-white"
//                             : "text-slate-700 hover:bg-slate-100"
//                         )}
//                       >
//                         <Icon className="h-5 w-5 shrink-0" />

//                         <span>{item.label}</span>

//                         {item.badge && (
//                           <span
//                             className={cn(
//                               "ml-auto rounded-full px-2 py-0.5",
//                               "text-xs font-semibold",
//                               active
//                                 ? "bg-white/20 text-white"
//                                 : "bg-blue-100 text-blue-700"
//                             )}
//                           >
//                             {item.badge}
//                           </span>
//                         )}
//                       </Link>
//                     );
//                   })}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </nav>

//         {/* ==========================================================
//             FOOTER
//         ========================================================== */}

//         <div className="shrink-0 border-t border-slate-200 p-4">
//           <button
//             type="button"
//             className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
//           >
//             <LogOut className="h-5 w-5" />

//             <span>Logout</span>
//           </button>
//         </div>
//       </aside>
//     </>
//   );
// }














// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { LogOut } from "lucide-react";

// import { cn } from "@/lib/utils";

// import { studentNavigation } from "./navigation/student-nav";
// import { adminNavigation } from "./navigation/admin-nav"; 

// export type DashboardRole = "student" | "admin";

// interface DashboardSidebarProps {
//   role: DashboardRole;
//   open?: boolean;
//   onClose?: () => void;
//   className?: string;
// }

// export default function DashboardSidebar({
//   role,
//   open = false,
//   onClose,
//   className,
// }: DashboardSidebarProps) {


//   const pathname = usePathname();

//   const navigation =
//     role === "admin"
//       ? adminNavigation
//       : studentNavigation;

//   return (
//     <aside
//       className={cn(
//         "hidden lg:flex",
//         "w-72 shrink-0",
//         "flex-col",
//         "border-r",
//         "border-slate-200",
//         "bg-white",
//         className
//       )}
//     >
//       {/* Logo */}
//       <div className="flex h-16 items-center border-b border-slate-200 px-6">
//         <Link
//           href="/"
//           className="text-2xl font-bold text-blue-600"
//         >
//           JAMB League
//         </Link>
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 overflow-y-auto px-4 py-6">
//   <div className="space-y-8">
//     {navigation.map((section) => (
//       <div key={section.title}>
//         <h3 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
//           {section.title}
//         </h3>

//         <div className="space-y-1">
//           {section.items.map((item) => {
//             const Icon = item.icon;

//             const active =
//               pathname === item.href ||
//               pathname.startsWith(`${item.href}/`);

//             return (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 className={cn(
//                   "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors",
//                   active
//                     ? "bg-blue-600 text-white"
//                     : "text-slate-700 hover:bg-slate-100"
//                 )}
//               >
//                 <Icon className="h-5 w-5" />

//                 <span>{item.label}</span>

//                 {item.badge && (
//                   <span className="ml-auto rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
//                     {item.badge}
//                   </span>
//                 )}
//               </Link>
//             );
//           })}
//         </div>
//       </div>
//     ))}
//   </div>
// </nav>

//       {/* Footer */}
//       <div className="border-t border-slate-200 p-4">
//         <button
//           type="button"
//           className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
//         >
//           <LogOut className="h-5 w-5" />

//           <span>Logout</span>
//         </button>
//       </div>
//     </aside>
//   );
// }