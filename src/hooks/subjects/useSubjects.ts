






// C:\Users\Lara Spellman\Jamb\jamb-league\src\hooks\subjects\useSubjects.ts

"use client";

import { useQuery } from "@tanstack/react-query";

import { getSubjects } from "@/lib/api/subjects";

/* ============================================================
   QUERY KEY
   ============================================================ */

export const subjectsQueryKey = [
  "subjects",
] as const;

/* ============================================================
   USE SUBJECTS
   ============================================================ */

export function useSubjects() {
  const query = useQuery({
    queryKey: subjectsQueryKey,

    queryFn: getSubjects,

    staleTime: 5 * 60 * 1000,

    gcTime: 30 * 60 * 1000,

    refetchOnWindowFocus: false,

    refetchOnReconnect: true,
  });

  /* ============================================================
     NORMALIZED DATA
     ============================================================ */

  const subjects = query.data?.data ?? [];

  return {
    /* React Query state */

    data: query.data,

    subjects,

    isLoading: query.isLoading,

    isFetching: query.isFetching,

    isError: query.isError,

    error: query.error,

    refetch: query.refetch,

    /* ========================================================
       CONVENIENCE VALUES
       ======================================================== */

    isEmpty:
      !query.isLoading &&
      subjects.length === 0,
  };
}