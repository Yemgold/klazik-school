// src/lib/api/practice.ts

// createPracticeSession()
// getPracticeSession()
// submitPracticeAnswer()
// finishPracticeSession()
// getPracticeSessionResult()




// C:\Users\Lara Spellman\Jamb\jamb-league\src\lib\api\practice.ts

import { axiosInstance } from "@/lib/api/axios";

/* ============================================================
   TYPES
   ============================================================ */

export type PracticeMode =
  | "quick"
  | "full"
  | "custom";

export type PracticeSessionStatus =
  | "in_progress"
  | "completed"
  | "expired"
  | "abandoned";

/* ============================================================
   PRACTICE QUESTION
   ============================================================ */

/*
 * IMPORTANT:
 *
 * The backend must NOT return the correct answer here.
 * The correct answer should only be handled by the backend
 * after the student submits an answer.
 */

export interface PracticeQuestion {
  questionId: string;

  questionNumber: number;

  questionText: string;

  options: string[];
}

/* ============================================================
   CREATE SESSION REQUEST
   ============================================================ */

export interface CreatePracticeSessionRequest {
  subjectId: string;

  mode: PracticeMode;

  questionCount: number;

  duration: number;
}

/* ============================================================
   CREATE SESSION DATA
   ============================================================ */

export interface PracticeSession {
  sessionId: string;

  subjectId: string;

  mode: PracticeMode;

  questionCount: number;

  duration: number;

  startedAt: string;

  expiresAt: string;

  status: PracticeSessionStatus;

  currentQuestionIndex: number;

  questions: PracticeQuestion[];
}

/* ============================================================
   CREATE SESSION RESPONSE
   ============================================================ */

export interface CreatePracticeSessionResponse {
  success: boolean;

  message: string;

  data: PracticeSession;
}

/* ============================================================
   RESUME SESSION QUESTION
   ============================================================ */

export interface PracticeSessionQuestion
  extends PracticeQuestion {
  selectedOption: string | null;

  answered: boolean;
}

/* ============================================================
   GET SESSION DATA
   ============================================================ */

export interface PracticeSessionDetails
  extends Omit<
    PracticeSession,
    "questions"
  > {
  answeredCount: number;

  remainingCount: number;

  questions: PracticeSessionQuestion[];
}

/* ============================================================
   GET SESSION RESPONSE
   ============================================================ */

export interface GetPracticeSessionResponse {
  success: boolean;

  message: string;

  data: PracticeSessionDetails;
}

/* ============================================================
   CREATE PRACTICE SESSION
   ============================================================ */

export async function createPracticeSession(
  payload: CreatePracticeSessionRequest,
): Promise<CreatePracticeSessionResponse> {
  const response =
    await axiosInstance.post<CreatePracticeSessionResponse>(
      "/practice/sessions",
      payload,
    );

  return response.data;
}

/* ============================================================
   GET / RESUME PRACTICE SESSION
   ============================================================ */

export async function getPracticeSession(
  sessionId: string,
): Promise<GetPracticeSessionResponse> {
  const response =
    await axiosInstance.get<GetPracticeSessionResponse>(
      `/practice/sessions/${sessionId}`,
    );

  return response.data;
}
