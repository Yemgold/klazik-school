




// C:\Users\Lara Spellman\Jamb\jamb-league\src\hooks\practice\useCreatePracticeSession.ts

"use client";

import { useMutation } from "@tanstack/react-query";

import { createPracticeSession } from "@/lib/api/practice";
import { savePracticeSession } from "@/lib/storage/practiceDb"; 

/* ============================================================
   TYPES
   ============================================================ */

export type PracticeMode =
  | "quick"
  | "full"
  | "custom";

export interface CreatePracticeSessionInput {
  subjectId: string;
  mode: PracticeMode;
  questionCount: number;
  duration: number;
}

/* ============================================================
   HOOK
   ============================================================ */

export function useCreatePracticeSession() {
  return useMutation({
    mutationFn: async (
      payload: CreatePracticeSessionInput,
    ) => {
      /* ======================================================
         VALIDATION
         ====================================================== */

      if (!payload.subjectId) {
        throw new Error(
          "Subject ID is required.",
        );
      }

      if (
        !Number.isInteger(
          payload.questionCount,
        ) ||
        payload.questionCount <= 0
      ) {
        throw new Error(
          "Question count must be greater than zero.",
        );
      }

      if (
        !Number.isFinite(payload.duration) ||
        payload.duration <= 0
      ) {
        throw new Error(
          "Practice duration must be greater than zero.",
        );
      }

      /* ======================================================
         CREATE SESSION ON BACKEND
         ====================================================== */

      const response =
        await createPracticeSession(
          payload,
        );

      /* ======================================================
         VALIDATE BACKEND RESPONSE
         ====================================================== */

      if (
        !response.success ||
        !response.data
      ) {
        throw new Error(
          response.message ||
            "Failed to create practice session.",
        );
      }

      const session =
        response.data;

      /* ======================================================
         SAVE SESSION TO INDEXEDDB
         
         This is a local copy for:
         - page refresh
         - accidental navigation
         - resuming an active session
         - reducing unnecessary GET requests
         
         Backend remains the source of truth.
         ====================================================== */

      try {
        await savePracticeSession(
          session,
        );

        console.log(
          "Practice session cached in IndexedDB:",
          session.sessionId,
        );
      } catch (storageError) {
        /*
         * IndexedDB failure should NOT prevent the
         * student from starting the practice session.
         */

        console.warn(
          "Practice session created, but IndexedDB caching failed:",
          storageError,
        );
      }

      /* ======================================================
         RETURN SESSION
         ====================================================== */

      return session;
    },

    /* ========================================================
       ERROR HANDLING
       ======================================================== */

    onError: (error) => {
      console.error(
        "========== CREATE PRACTICE SESSION ERROR ==========",
      );

      console.error(
        error,
      );
    },

    /* ========================================================
       SUCCESS
       ======================================================== */

    onSuccess: (session) => {
      console.log(
        "========== PRACTICE SESSION CREATED ==========",
      );

      console.log({
        sessionId:
          session.sessionId,

        subjectId:
          session.subjectId,

        mode:
          session.mode,

        questionCount:
          session.questionCount,

        duration:
          session.duration,

        startedAt:
          session.startedAt,

        expiresAt:
          session.expiresAt,
      });
    },
  });
}
