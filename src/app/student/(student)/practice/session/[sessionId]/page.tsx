



// C:\Users\Lara Spellman\Jamb\jamb-league\src\app\student\(student)\practice\session\[sessionId]\page.tsx

"use client";

import { useParams, useRouter } from "next/navigation";

import { usePracticeSession } from "@/hooks/practice/usePracticeSession";

/* ============================================================
   LOADING
   ============================================================ */

function LoadingState() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="text-center">
        <div className="mx-auto mb-6 h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />

        <h1 className="text-2xl font-bold text-slate-900">
          Loading Practice Session...
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Preparing your questions.
        </p>
      </div>
    </main>
  );
}

/* ============================================================
   ERROR
   ============================================================ */

function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-md rounded-2xl border bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-2xl">
          !
        </div>

        <h1 className="text-2xl font-bold text-slate-900">
          Unable to Load Session
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          {message}
        </p>

        <button
          type="button"
          onClick={onRetry}
          className="mt-6 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}

/* ============================================================
   EMPTY SESSION
   ============================================================ */

function EmptySessionState() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-slate-900">
          No Questions Available
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          This practice session does not contain any questions.
        </p>
      </div>
    </main>
  );
}

/* ============================================================
   SESSION PAGE
   ============================================================ */

export default function PracticeSessionPage() {
  const params = useParams();
  const router = useRouter();

  const sessionId =
    typeof params.sessionId === "string"
      ? params.sessionId
      : null;

  const {
    session,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,

    subjectId,
    mode,
    questionCount,
    duration,
    startedAt,
    expiresAt,
    status,
    currentQuestionIndex,
    questions,

    answeredCount,
    remainingCount,
    isCached,
  } = usePracticeSession(sessionId);

  /* ==========================================================
     LOADING
     ========================================================== */

  if (isLoading) {
    return <LoadingState />;
  }

  /* ==========================================================
     ERROR
     ========================================================== */

  if (isError || !session) {
    return (
      <ErrorState
        message={
          error instanceof Error
            ? error.message
            : "We could not load this practice session."
        }
        onRetry={() => {
          void refetch();
        }}
      />
    );
  }

  /* ==========================================================
     EMPTY
     ========================================================== */

  if (!questions.length) {
    return <EmptySessionState />;
  }

  /* ==========================================================
     SESSION EXPIRED
     ========================================================== */

  if (status === "expired") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <div className="w-full max-w-md rounded-2xl border bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">
            Session Expired
          </h1>

          <p className="mt-3 text-sm text-slate-500">
            Your practice session has expired.
          </p>

          <button
            type="button"
            onClick={() =>
              router.push("/student/practice")
            }
            className="mt-6 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white"
          >
            Start New Practice
          </button>
        </div>
      </main>
    );
  }

  /* ==========================================================
     FINISHED
     ========================================================== */

  if (status === "completed") {
    router.push(
      `/student/practice/session/${sessionId}/result`,
    );

    return <LoadingState />;
  }

  /* ==========================================================
     CURRENT QUESTION
     ========================================================== */

  const currentQuestion =
    questions[currentQuestionIndex] ??
    questions[0];

  const progress =
    questionCount > 0
      ? Math.min(
          ((currentQuestionIndex + 1) /
            questionCount) *
            100,
          100,
        )
      : 0;

  /* ==========================================================
     RENDER
     ========================================================== */

  return (
    <main className="min-h-screen bg-slate-50">
      {/* ======================================================
          HEADER
         ====================================================== */}

      <header className="sticky top-0 z-20 border-b bg-white">
        <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Practice Session
              </p>

              <h1 className="text-lg font-bold text-slate-900">
                {subjectId}
              </h1>
            </div>

            <div className="text-right">
              <p className="text-xs text-slate-400">
                Question
              </p>

              <p className="font-bold text-slate-900">
                {currentQuestionIndex + 1} /{" "}
                {questionCount}
              </p>
            </div>
          </div>

          {/* Progress */}

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-blue-600 transition-all duration-300"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>
      </header>

      {/* ======================================================
          CONTENT
         ====================================================== */}

      <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="mb-6 flex flex-wrap items-center gap-3 text-sm">
          <span className="rounded-full bg-blue-50 px-3 py-1 font-medium text-blue-700">
            {mode}
          </span>

          <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">
            {answeredCount} answered
          </span>

          <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">
            {remainingCount} remaining
          </span>

          {isCached && (
            <span className="rounded-full bg-green-50 px-3 py-1 font-medium text-green-700">
              Saved locally
            </span>
          )}

          {isFetching && !isLoading && (
            <span className="text-xs text-slate-400">
              Syncing...
            </span>
          )}
        </div>

        {/* ====================================================
            QUESTION CARD
           ==================================================== */}

        <article className="rounded-3xl border bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6">
            <span className="text-sm font-semibold text-blue-600">
              Question {currentQuestion.questionNumber}
            </span>

            <h2 className="mt-4 text-xl font-semibold leading-8 text-slate-900 sm:text-2xl">
              {currentQuestion.questionText}
            </h2>
          </div>

          {/* ==================================================
              OPTIONS
             ================================================== */}

          <div className="space-y-3">
            {currentQuestion.options.map(
              (option, index) => (
                <button
                  key={`${currentQuestion.questionId}-${index}`}
                  type="button"
                  className="w-full rounded-2xl border border-slate-200 p-4 text-left transition hover:border-blue-400 hover:bg-blue-50"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-600">
                      {String.fromCharCode(
                        65 + index,
                      )}
                    </span>

                    <span className="pt-1 text-sm leading-6 text-slate-700">
                      {option}
                    </span>
                  </div>
                </button>
              ),
            )}
          </div>
        </article>

        {/* ====================================================
            NAVIGATION
           ==================================================== */}

        <div className="mt-6 flex items-center justify-between gap-4">
          <button
            type="button"
            disabled={
              currentQuestionIndex === 0
            }
            onClick={() => {
              /*
               * Question navigation will be connected
               * to the answer/session state.
               */
            }}
            className="rounded-xl border bg-white px-5 py-3 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>

          <button
            type="button"
            onClick={() => {
              /*
               * Answer submission will be handled by
               * useSubmitPracticeAnswer.
               */
            }}
            className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            {currentQuestionIndex ===
            questions.length - 1
              ? "Finish"
              : "Next"}
          </button>
        </div>

        {/* ====================================================
            SESSION INFO
           ==================================================== */}

        <div className="mt-8 rounded-2xl border bg-white p-5">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <p className="text-xs text-slate-400">
                Duration
              </p>

              <p className="mt-1 font-semibold text-slate-800">
                {duration} minutes
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-400">
                Started
              </p>

             <div>
  <p className="text-xs text-slate-400">
    Started
  </p>

  <p className="mt-1 font-semibold text-slate-800">
    {startedAt
      ? new Date(
          startedAt,
        ).toLocaleTimeString()
      : "—"}
  </p>
</div>

<div>
  <p className="text-xs text-slate-400">
    Expires
  </p>

  <p className="mt-1 font-semibold text-slate-800">
    {expiresAt
      ? new Date(
          expiresAt,
        ).toLocaleTimeString()
      : "—"}
  </p>
</div>

            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
