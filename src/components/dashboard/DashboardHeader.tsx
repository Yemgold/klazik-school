



"use client";

import { Bell, Menu, Search } from "lucide-react";

import { cn } from "@/lib/utils";

export type DashboardRole = "student" | "admin";

interface DashboardHeaderProps {
  role: DashboardRole;
  pageTitle?: string;
  userName?: string;
  className?: string;
  onMenuClick?: () => void;
}

export default function DashboardHeader({
  role,
  pageTitle,
  userName = "John Doe",
  className,
  onMenuClick,
}: DashboardHeaderProps) {
  const title =
    pageTitle ??
    (role === "admin"
      ? "Admin Dashboard"
      : "Student Dashboard");

  return (
    <header
      className={cn(
  "sticky top-0 z-30",
  "flex h-16 shrink-0 items-center justify-between",
  "border-b border-slate-200",
  "bg-white/95 backdrop-blur",
  "px-4 sm:px-6 lg:px-8",
  className
)}
    >
      {/* Left */}
      <div className="flex items-center gap-3">
        {/* Mobile Sidebar Toggle */}
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"
          aria-label="Open navigation"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div>
          <h1 className="text-lg font-semibold text-slate-900">
            {title}
          </h1>

          <p className="text-sm text-slate-500">
            Welcome back, {userName}
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <button
          type="button"
          className="rounded-lg border border-slate-200 p-2 hover:bg-slate-50"
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </button>

        {/* Notifications */}
        <button
          type="button"
          className="relative rounded-lg border border-slate-200 p-2 hover:bg-slate-50"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />

          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* User Avatar */}
        <button
          type="button"
          className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 hover:bg-slate-50"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
            {userName
              .split(" ")
              .map((name) => name[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()}
          </div>

          <div className="hidden text-left md:block">
            <p className="text-sm font-semibold text-slate-900">
              {userName}
            </p>

            <p className="text-xs capitalize text-slate-500">
              {role}
            </p>
          </div>
        </button>
      </div>
    </header>
  );
}