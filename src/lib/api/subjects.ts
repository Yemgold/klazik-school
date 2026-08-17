





import { axiosInstance } from "@/lib/api/axios";

/* ============================================================
   SUBJECT
   ============================================================ */

export interface Subject {
  id: string;
  name: string;
  version?: number;
}

/* ============================================================
   SUBJECTS RESPONSE
   ============================================================ */

export interface SubjectsResponse {
  success: boolean;
  message?: string;
  data: Subject[];
}

/* ============================================================
   GET ALL SUBJECTS
   ============================================================ */

export async function getSubjects(): Promise<SubjectsResponse> {
  const response =
    await axiosInstance.get<SubjectsResponse>(
      "/subjects",
    );

  return response.data;
}