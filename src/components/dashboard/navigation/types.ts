




import type { LucideIcon } from "lucide-react";

export interface NavigationItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string | number;
  disabled?: boolean;
  exact?: boolean;
}

export interface NavigationSection {
  title: string;
  items: NavigationItem[];
}