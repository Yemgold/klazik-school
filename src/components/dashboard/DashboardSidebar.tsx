



"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";

import { cn } from "@/lib/utils";

import { studentNavigation } from "./navigation/student-nav";
import { adminNavigation } from "./navigation/admin-nav"; 

export type DashboardRole = "student" | "admin";

interface DashboardSidebarProps {
  role: DashboardRole;
  className?: string;
}

export default function DashboardSidebar({
  role,
  className,
}: DashboardSidebarProps) {
  const pathname = usePathname();

  const navigation =
    role === "admin"
      ? adminNavigation
      : studentNavigation;

  return (
    <aside
      className={cn(
        "hidden lg:flex",
        "w-72 shrink-0",
        "flex-col",
        "border-r",
        "border-slate-200",
        "bg-white",
        className
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-slate-200 px-6">
        <Link
          href="/"
          className="text-2xl font-bold text-blue-600"
        >
          JAMB League
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-6">
  <div className="space-y-8">
    {navigation.map((section) => (
      <div key={section.title}>
        <h3 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
          {section.title}
        </h3>

        <div className="space-y-1">
          {section.items.map((item) => {
            const Icon = item.icon;

            const active =
              pathname === item.href ||
              pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                  active
                    ? "bg-blue-600 text-white"
                    : "text-slate-700 hover:bg-slate-100"
                )}
              >
                <Icon className="h-5 w-5" />

                <span>{item.label}</span>

                {item.badge && (
                  <span className="ml-auto rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
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

      {/* Footer */}
      <div className="border-t border-slate-200 p-4">
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
        >
          <LogOut className="h-5 w-5" />

          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}