





// // C:\Users\Lara Spellman\Jamb\jamb-league\src\hooks\practice\usePracticeSession.ts

// "use client";

// import { useQuery } from "@tanstack/react-query";

// import {
//   getPracticeSession,
//   type PracticeSessionDetails,
// } from "@/lib/api/practice";

// import {
//   getPracticeSessionFromDb,
//   savePracticeSession,
//   type StoredPracticeSession,
// } from "@/lib/storage/practiceDb";

// /* ============================================================
//    QUERY KEY
//    ============================================================ */

// export const practiceSessionQueryKey = (
//   sessionId: string,
// ) =>
//   [
//     "practice-session",
//     sessionId,
//   ] as const;

// /* ============================================================
//    HOOK OPTIONS
//    ============================================================ */

// interface UsePracticeSessionOptions {
//   /*
//    * When true, IndexedDB is checked first.
//    *
//    * Default: true
//    */
//   useLocalCache?: boolean;
// }

// /* ============================================================
//    NORMALIZED SESSION
//    ============================================================ */

// export type PracticeSessionData =
//   | PracticeSessionDetails
//   | StoredPracticeSession;

// /* ============================================================
//    USE PRACTICE SESSION
//    ============================================================ */

// export function usePracticeSession(
//   sessionId: string | null | undefined,
//   options: UsePracticeSessionOptions = {},
// ) {
//   const {
//     useLocalCache = true,
//   } = options;

//   const query =
//     useQuery<PracticeSessionData>({
//       queryKey: sessionId
//         ? practiceSessionQueryKey(
//             sessionId,
//           )
//         : [
//             "practice-session",
//             "none",
//           ],

//       enabled:
//         Boolean(sessionId),

//       staleTime: 30 * 1000,

//       refetchOnWindowFocus: false,

//       queryFn: async () => {
//         if (!sessionId) {
//           throw new Error(
//             "Practice session ID is required.",
//           );
//         }

//         /* ====================================================
//            STEP 1
//            CHECK INDEXEDDB
//            ==================================================== */

//         if (useLocalCache) {
//           try {
//             const cachedSession =
//               await getPracticeSessionFromDb(
//                 sessionId,
//               );

//             if (
//               cachedSession &&
//               cachedSession.status ===
//                 "in_progress"
//             ) {
//               console.log(
//                 "========== PRACTICE SESSION FROM INDEXEDDB ==========",
//               );

//               console.log({
//                 sessionId:
//                   cachedSession.sessionId,

//                 subjectId:
//                   cachedSession.subjectId,

//                 currentQuestionIndex:
//                   cachedSession.currentQuestionIndex,

//                 answeredCount:
//                   cachedSession.questions.filter(
//                     (question) =>
//                       question.answered ===
//                       true,
//                   ).length,

//                 cachedAt:
//                   cachedSession.cachedAt,
//               });

//               /*
//                * IMPORTANT:
//                *
//                * We return the cached session directly.
//                *
//                * selectedOption and answered are
//                * preserved inside IndexedDB.
//                */

//               return cachedSession;
//             }
//           } catch (storageError) {
//             /*
//              * IndexedDB failure must never prevent
//              * backend loading.
//              */

//             console.warn(
//               "IndexedDB lookup failed. Falling back to backend.",
//               storageError,
//             );
//           }
//         }

//         /* ====================================================
//            STEP 2
//            FETCH FROM BACKEND
//            ==================================================== */

//         console.log(
//           "========== FETCHING PRACTICE SESSION ==========",
//         );

//         console.log({
//           sessionId,
//         });

//         const response =
//           await getPracticeSession(
//             sessionId,
//           );

//         /* ====================================================
//            STEP 3
//            VALIDATE RESPONSE
//            ==================================================== */

//         if (
//           !response.success ||
//           !response.data
//         ) {
//           throw new Error(
//             response.message ||
//               "Failed to retrieve practice session.",
//           );
//         }

//         const session =
//           response.data;

//         /* ====================================================
//            STEP 4
//            CACHE ACTIVE SESSION
//            ==================================================== */

//         if (
//           useLocalCache &&
//           session.status ===
//             "in_progress"
//         ) {
//           try {
//             /*
//              * IMPORTANT:
//              *
//              * Save selectedOption and answered.
//              *
//              * This allows the student to leave the page
//              * and return without losing their answers.
//              */

//             await savePracticeSession({
//               sessionId:
//                 session.sessionId,

//               subjectId:
//                 session.subjectId,

//               mode:
//                 session.mode,

//               questionCount:
//                 session.questionCount,

//               duration:
//                 session.duration,

//               startedAt:
//                 session.startedAt,

//               expiresAt:
//                 session.expiresAt,

//               status:
//                 session.status,

//               currentQuestionIndex:
//                 session.currentQuestionIndex,

//               questions:
//                 session.questions.map(
//                   (question) => ({
//                     questionId:
//                       question.questionId,

//                     questionNumber:
//                       question.questionNumber,

//                     questionText:
//                       question.questionText,

//                     options:
//                       question.options,

//                     /*
//                      * PRESERVE ANSWER STATE
//                      */

//                     selectedOption:
//                       question.selectedOption ??
//                       null,

//                     answered:
//                       question.answered ??
//                       false,
//                   }),
//                 ),
//             });

//             console.log(
//               "========== PRACTICE SESSION CACHED ==========",
//             );

//             console.log({
//               sessionId:
//                 session.sessionId,

//               answeredCount:
//                 session.questions.filter(
//                   (question) =>
//                     question.answered ===
//                     true,
//                 ).length,

//               questionCount:
//                 session.questions.length,
//             });
//           } catch (storageError) {
//             /*
//              * Storage failure should not break
//              * the practice session.
//              */

//             console.warn(
//               "Failed to cache practice session in IndexedDB.",
//               storageError,
//             );
//           }
//         }

//         return session;
//       },
//     });

//   /* ============================================================
//      CONVENIENCE VALUES
//      ============================================================ */

//   const session =
//     query.data ?? null;

//   /* ============================================================
//      CALCULATE ANSWER PROGRESS
//      ============================================================ */

//   const answeredCount =
//     session?.questions?.filter(
//       (question) =>
//         question.answered === true ||
//         (
//           "selectedOption" in question &&
//           question.selectedOption !==
//             null &&
//           question.selectedOption !==
//             undefined
//         ),
//     ).length ?? 0;

//   const questionCount =
//     session?.questionCount ??
//     session?.questions?.length ??
//     0;

//   const remainingCount =
//     Math.max(
//       questionCount -
//         answeredCount,
//       0,
//     );

//   /* ============================================================
//      RETURN
//      ============================================================ */

//   return {
//     /* ========================================================
//        REACT QUERY
//        ======================================================== */

//     data:
//       query.data,

//     session,

//     isLoading:
//       query.isLoading,

//     isFetching:
//       query.isFetching,

//     isError:
//       query.isError,

//     error:
//       query.error,

//     refetch:
//       query.refetch,

//     /* ========================================================
//        SESSION INFORMATION
//        ======================================================== */

//     sessionId:
//       session?.sessionId ??
//       sessionId ??
//       null,

//     subjectId:
//       session?.subjectId ??
//       null,

//     mode:
//       session?.mode ??
//       null,

//     questionCount,

//     duration:
//       session?.duration ??
//       0,

//     startedAt:
//       session?.startedAt ??
//       null,

//     expiresAt:
//       session?.expiresAt ??
//       null,

//     status:
//       session?.status ??
//       null,

//     currentQuestionIndex:
//       session?.currentQuestionIndex ??
//       0,

//     questions:
//       session?.questions ??
//       [],

//     /* ========================================================
//        PROGRESS
//        ======================================================== */

//     answeredCount,

//     remainingCount,

//     progressPercentage:
//       questionCount > 0
//         ? Math.round(
//             (
//               answeredCount /
//               questionCount
//             ) * 100,
//           )
//         : 0,

//     /* ========================================================
//        CACHE STATE
//        ======================================================== */

//     isCached:
//       session !== null &&
//       "cachedAt" in session,
//   };
// }










// C:\Users\Lara Spellman\Jamb\jamb-league\src\hooks\practice\usePracticeSession.ts

"use client";

import { useQuery } from "@tanstack/react-query";

import {
  getPracticeSession,
  type PracticeSessionDetails,
} from "@/lib/api/practice";

import {
  getPracticeSessionFromDb,
  savePracticeSession,
  type StoredPracticeSession,
} from "@/lib/storage/practiceDb";

/* ============================================================
   TEST SESSION
   ============================================================ */

const TEST_SESSION_ID = "test-session-001";

/*
 * This mock is ONLY for temporary frontend testing.
 *
 * It does not affect real sessions.
 *
 * Open:
 *
 * /student/practice/session/test-session-001
 *
 * When a real session ID is used, the hook continues to use
 * IndexedDB first and then the backend exactly as before.
 */

const TEST_SESSION: PracticeSessionDetails = {
  sessionId: TEST_SESSION_ID,

  subjectId: "Commerce",

  mode: "quick",

  questionCount: 5,

  duration: 10,

  startedAt: new Date().toISOString(),

  expiresAt: new Date(
    Date.now() + 10 * 60 * 1000,
  ).toISOString(),

  status: "in_progress",

  currentQuestionIndex: 0,

  answeredCount: 0,

  remainingCount: 5,

  questions: [
    {
      questionId: "test-q-001",

      questionNumber: 1,

      questionText:
        "Which of the following is a function of a wholesaler?",

      options: [
        "Selling goods directly to final consumers",
        "Breaking bulk for retailers",
        "Producing goods for manufacturers",
        "Providing personal services to consumers",
      ],

      selectedOption: null,

      answered: false,
    },

    {
      questionId: "test-q-002",

      questionNumber: 2,

      questionText:
        "A trader who buys goods in large quantities and sells them to retailers is known as a",

      options: [
        "Consumer",
        "Retailer",
        "Wholesaler",
        "Producer",
      ],

      selectedOption: null,

      answered: false,
    },

    {
      questionId: "test-q-003",

      questionNumber: 3,

      questionText:
        "Which of the following is an example of a fixed cost?",

      options: [
        "Cost of raw materials",
        "Sales commission",
        "Factory rent",
        "Packaging cost",
      ],

      selectedOption: null,

      answered: false,
    },

    {
      questionId: "test-q-004",

      questionNumber: 4,

      questionText:
        "The main purpose of advertising is to",

      options: [
        "Reduce production",
        "Create awareness of a product",
        "Increase taxation",
        "Eliminate competition",
      ],

      selectedOption: null,

      answered: false,
    },

    {
      questionId: "test-q-005",

      questionNumber: 5,

      questionText:
        "Which of the following is a characteristic of retail trade?",

      options: [
        "Selling mainly to manufacturers",
        "Selling goods in very large quantities to wholesalers",
        "Selling goods to final consumers",
        "Buying only from consumers",
      ],

      selectedOption: null,

      answered: false,
    },
  ],
};

/* ============================================================
   QUERY KEY
   ============================================================ */

export const practiceSessionQueryKey = (
  sessionId: string,
) =>
  [
    "practice-session",
    sessionId,
  ] as const;

/* ============================================================
   HOOK OPTIONS
   ============================================================ */

interface UsePracticeSessionOptions {
  /*
   * When true, IndexedDB is checked first.
   *
   * Default: true.
   */
  useLocalCache?: boolean;
}

/* ============================================================
   NORMALIZED SESSION
   ============================================================ */

export type PracticeSessionData =
  | PracticeSessionDetails
  | StoredPracticeSession;

/* ============================================================
   USE PRACTICE SESSION
   ============================================================ */

export function usePracticeSession(
  sessionId: string | null | undefined,
  options: UsePracticeSessionOptions = {},
) {
  const {
    useLocalCache = true,
  } = options;

  const query = useQuery<PracticeSessionData>({
    queryKey: sessionId
      ? practiceSessionQueryKey(sessionId)
      : [
          "practice-session",
          "none",
        ],

    enabled: Boolean(sessionId),

    staleTime: 30 * 1000,

    refetchOnWindowFocus: false,

    queryFn: async () => {
      if (!sessionId) {
        throw new Error(
          "Practice session ID is required.",
        );
      }

      /* ========================================================
         TEST SESSION
         ======================================================== */

      /*
       * IMPORTANT:
       *
       * The test session bypasses IndexedDB and the backend.
       *
       * This means:
       *
       * /student/practice/session/test-session-001
       *
       * can always be opened while developing the frontend.
       */

      if (sessionId === TEST_SESSION_ID) {
        console.log(
          "========== USING TEST PRACTICE SESSION ==========",
        );

        console.log({
          sessionId: TEST_SESSION_ID,
          subjectId: TEST_SESSION.subjectId,
          questionCount:
            TEST_SESSION.questionCount,
          mode: TEST_SESSION.mode,
        });

        return {
          ...TEST_SESSION,

          /*
           * Clone the questions so React Query/component
           * modifications do not mutate the constant mock.
           */

          questions:
            TEST_SESSION.questions.map(
              (question) => ({
                ...question,

                options: [
                  ...question.options,
                ],
              }),
            ),
        };
      }

      /* ========================================================
         STEP 1
         CHECK INDEXEDDB
         ======================================================== */

      if (useLocalCache) {
        try {
          const cachedSession =
            await getPracticeSessionFromDb(
              sessionId,
            );

          if (
            cachedSession &&
            cachedSession.status ===
              "in_progress"
          ) {
            console.log(
              "========== PRACTICE SESSION FROM INDEXEDDB ==========",
            );

            console.log({
              sessionId:
                cachedSession.sessionId,

              subjectId:
                cachedSession.subjectId,

              currentQuestionIndex:
                cachedSession.currentQuestionIndex,

              answeredCount:
                cachedSession.questions.filter(
                  (question) =>
                    question.answered ===
                    true,
                ).length,

              cachedAt:
                cachedSession.cachedAt,
            });

            /*
             * Return cached session directly.
             *
             * selectedOption and answered are
             * preserved inside IndexedDB.
             */

            return cachedSession;
          }
        } catch (storageError) {
          /*
           * IndexedDB failure must never prevent
           * backend loading.
           */

          console.warn(
            "IndexedDB lookup failed. Falling back to backend.",
            storageError,
          );
        }
      }

      /* ========================================================
         STEP 2
         FETCH FROM BACKEND
         ======================================================== */

      console.log(
        "========== FETCHING PRACTICE SESSION ==========",
      );

      console.log({
        sessionId,
      });

      const response =
        await getPracticeSession(
          sessionId,
        );

      /* ========================================================
         STEP 3
         VALIDATE RESPONSE
         ======================================================== */

      if (
        !response.success ||
        !response.data
      ) {
        throw new Error(
          response.message ||
            "Failed to retrieve practice session.",
        );
      }

      const session =
        response.data;

      /* ========================================================
         STEP 4
         CACHE ACTIVE SESSION
         ======================================================== */

      if (
        useLocalCache &&
        session.status ===
          "in_progress"
      ) {
        try {
          /*
           * Save selectedOption and answered.
           *
           * This allows the student to leave the page
           * and return without losing their answers.
           */

          await savePracticeSession({
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

            status:
              session.status,

            currentQuestionIndex:
              session.currentQuestionIndex,

            questions:
              session.questions.map(
                (question) => ({
                  questionId:
                    question.questionId,

                  questionNumber:
                    question.questionNumber,

                  questionText:
                    question.questionText,

                  options:
                    question.options,

                  /*
                   * PRESERVE ANSWER STATE
                   */

                  selectedOption:
                    question.selectedOption ??
                    null,

                  answered:
                    question.answered ??
                    false,
                }),
              ),
          });

          console.log(
            "========== PRACTICE SESSION CACHED ==========",
          );

          console.log({
            sessionId:
              session.sessionId,

            answeredCount:
              session.questions.filter(
                (question) =>
                  question.answered ===
                  true,
              ).length,

            questionCount:
              session.questions.length,
          });
        } catch (storageError) {
          /*
           * Storage failure should not break
           * the practice session.
           */

          console.warn(
            "Failed to cache practice session in IndexedDB.",
            storageError,
          );
        }
      }

      return session;
    },
  });

  /* ============================================================
     CONVENIENCE VALUES
     ============================================================ */

  const session =
    query.data ?? null;

  /* ============================================================
     CALCULATE ANSWER PROGRESS
     ============================================================ */

  const answeredCount =
    session?.questions?.filter(
      (question) =>
        question.answered === true ||
        (
          "selectedOption" in question &&
          question.selectedOption !==
            null &&
          question.selectedOption !==
            undefined
        ),
    ).length ?? 0;

  const questionCount =
    session?.questionCount ??
    session?.questions?.length ??
    0;

  const remainingCount =
    Math.max(
      questionCount -
        answeredCount,
      0,
    );

  /* ============================================================
     RETURN
     ============================================================ */

  return {
    /* ========================================================
       REACT QUERY
       ======================================================== */

    data:
      query.data,

    session,

    isLoading:
      query.isLoading,

    isFetching:
      query.isFetching,

    isError:
      query.isError,

    error:
      query.error,

    refetch:
      query.refetch,

    /* ========================================================
       SESSION INFORMATION
       ======================================================== */

    sessionId:
      session?.sessionId ??
      sessionId ??
      null,

    subjectId:
      session?.subjectId ??
      null,

    mode:
      session?.mode ??
      null,

    questionCount,

    duration:
      session?.duration ??
      0,

    startedAt:
      session?.startedAt ??
      null,

    expiresAt:
      session?.expiresAt ??
      null,

    status:
      session?.status ??
      null,

    currentQuestionIndex:
      session?.currentQuestionIndex ??
      0,

    questions:
      session?.questions ??
      [],

    /* ========================================================
       PROGRESS
       ======================================================== */

    answeredCount,

    remainingCount,

    progressPercentage:
      questionCount > 0
        ? Math.round(
            (
              answeredCount /
              questionCount
            ) * 100,
          )
        : 0,

    /* ========================================================
       CACHE STATE
       ======================================================== */

    isCached:
      session !== null &&
      "cachedAt" in session,

    /* ========================================================
       TEST SESSION
       ======================================================== */

    isTestSession:
      sessionId ===
      TEST_SESSION_ID,
  };
}
