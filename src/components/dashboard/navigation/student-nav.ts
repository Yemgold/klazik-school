




import {
  BookOpen,
  CalendarDays,
  LayoutDashboard,
  Medal,
  Settings,
  Trophy,
  User,
  Play,
  Users,
} from "lucide-react";

import type { NavigationSection } from "./types";

export const studentNavigation: NavigationSection[] = [
  {
    title: "Overview",
    items: [
      {
        label: "Dashboard",
        href: "/student/dashboard",
        icon: LayoutDashboard,
        exact: true,
      },
    ],
  },

  {
    title: "Competition",
    items: [
      {
        label: "Competitions",
        href: "/student/competitions",
        icon: Trophy,
      },
      {
        label: "Leaderboard",
        href: "/leaderboard",
        icon: Medal,
      },
      {
        label: "Competition Calendar",
        href: "/student/calendar",
        icon: CalendarDays,
        disabled: true,
      },
    ],
  },

  {
    title: "Learning CBT",
    items: [
      {
        label: "Practice CBT",
        href: "/student/practice",
        icon: BookOpen,
      },
    ],
  },

  {
    title: "Learning Arena",
    items: [
      {
        label: "Interactive Lessons",
        href: "/student/arena",
        icon: Play,
      },
    ],
  },

  {
    title: "Team",
    items: [
      {
        label: "My Team",
        href: "/student/team",
        icon: Users,
      },
    ],
  },

  {
    title: "Account",
    items: [
      {
        label: "Profile",
        href: "/student/profile",
        icon: User,
      },
      {
        label: "Settings",
        href: "/student/settings",
        icon: Settings,
      },
    ],
  },
];