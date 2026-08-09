



"use client";

import type { ReactNode } from "react";

import DashboardSidebar from "../DashboardSidebar";
import DashboardHeader from "../DashboardHeader";

import { cn } from "@/lib/utils";

export type DashboardRole = "student" | "admin";

interface DashboardLayoutProps {
  children: ReactNode;
  role: DashboardRole;
  className?: string;
}

export default function DashboardLayout({
  children,
  role,
  className,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        {/* Sidebar */}
        <DashboardSidebar role={role} />

        {/* Content */}
        <div className="flex min-h-screen flex-1 flex-col">
          <DashboardHeader role={role} />

          <main
            className={cn(
              "flex-1 overflow-y-auto",
              "p-4 sm:p-6 lg:p-8",
              className
            )}
          >
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}