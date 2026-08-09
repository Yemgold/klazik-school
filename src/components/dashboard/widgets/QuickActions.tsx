






"use client";

import Link from "next/link";
import {
  ArrowRight,
  Trophy,
  Medal,
  Users,
  BookOpen,
  Settings,
  Bell,
  User,
  Play,
  Home,
  CreditCard,
} from "lucide-react";

import { cn } from "@/lib/utils";

const icons = {
  trophy: Trophy,
  medal: Medal,
  users: Users,
  book: BookOpen,
  settings: Settings,
  bell: Bell,
  user: User,
  play: Play,
  home: Home,
  payment: CreditCard,
};

export interface QuickAction {
  title: string;
  description?: string;
  href: string;
  icon: keyof typeof icons;
  disabled?: boolean;
}

export interface QuickActionsProps {
  title?: string;
  actions: QuickAction[];
  className?: string;
}

export default function QuickActions({
  title = "Quick Actions",
  actions,
  className,
}: QuickActionsProps) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm",
        className
      )}
    >
      <div className="mb-6">
        <h2 className="text-lg font-semibold">
          {title}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Frequently used shortcuts.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {actions.map((action) => {
          const Icon = icons[action.icon] ?? Trophy;

          const content = (
            <div
              className={cn(
                "group rounded-xl border border-slate-200 p-5 transition-all",
                action.disabled
                  ? "cursor-not-allowed opacity-50"
                  : "hover:border-blue-200 hover:bg-blue-50 hover:shadow-sm"
              )}
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="rounded-lg bg-blue-100 p-3">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>

                {!action.disabled && (
                  <ArrowRight className="h-5 w-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                )}
              </div>

              <h3 className="font-semibold">
                {action.title}
              </h3>

              {action.description && (
                <p className="mt-2 text-sm text-slate-500">
                  {action.description}
                </p>
              )}
            </div>
          );

          if (action.disabled) {
            return <div key={action.title}>{content}</div>;
          }

          return (
            <Link
              key={action.title}
              href={action.href}
            >
              {content}
            </Link>
          );
        })}
      </div>
    </section>
  );
}