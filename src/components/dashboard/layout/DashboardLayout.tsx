



// "use client";

// import { useEffect, useState, type ReactNode } from "react";

// import DashboardSidebar from "../DashboardSidebar";
// import DashboardHeader from "../DashboardHeader";

// import { cn } from "@/lib/utils";

// export type DashboardRole = "student" | "admin";

// interface DashboardLayoutProps {
//   children: ReactNode;
//   role: DashboardRole;
//   className?: string;
// }

// export default function DashboardLayout({
//   children,
//   role,
//   className,
// }: DashboardLayoutProps) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const openSidebar = () => {
//     setSidebarOpen(true);
//   };

//   const closeSidebar = () => {
//     setSidebarOpen(false);
//   };

//   /*
//    * Close mobile sidebar when the user presses Escape.
//    */
//   useEffect(() => {
//     const handleKeyDown = (event: KeyboardEvent) => {
//       if (event.key === "Escape") {
//         setSidebarOpen(false);
//       }
//     };

//     window.addEventListener("keydown", handleKeyDown);

//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   }, []);

//   /*
//    * Prevent the page from scrolling behind the mobile sidebar.
//    */
//   useEffect(() => {
//     if (sidebarOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "";
//     }

//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [sidebarOpen]);

//   return (
//     <div className="min-h-screen bg-slate-50">
//       <div className="flex min-h-screen">
//         {/* ============================================================
//             SIDEBAR
//         ============================================================ */}

//         <DashboardSidebar
//           role={role}
//           open={sidebarOpen}
//           onClose={closeSidebar}
//         />

//         {/* ============================================================
//             MAIN AREA
//         ============================================================ */}

//         <div className="flex min-h-screen min-w-0 flex-1 flex-col">
//           <DashboardHeader
//             role={role}
//             onMenuClick={openSidebar}
//           />

//           <main
//             className={cn(
//               "flex-1 overflow-y-auto",
//               "p-4 sm:p-6 lg:p-8",
//               className
//             )}
//           >
//             {children}
//           </main>
//         </div>
//       </div>
//     </div>
//   );
// }















"use client";

import { useState, type ReactNode } from "react";

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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen((previous) => !previous);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex min-h-screen">

        {/* ============================================================ */}
        {/* DESKTOP SIDEBAR                                              */}
        {/* ============================================================ */}

        <DashboardSidebar
          role={role}
          open={sidebarOpen}
          onClose={closeSidebar}
        />

        {/* ============================================================ */}
        {/* MAIN AREA                                                     */}
        {/* ============================================================ */}

        <div className="flex min-w-0 flex-1 flex-col">

          {/* Header */}

          <DashboardHeader
            role={role}
            onMenuClick={toggleSidebar}
          />

          {/* Page Content */}

          <main
            className={cn(
              "min-w-0 flex-1",
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