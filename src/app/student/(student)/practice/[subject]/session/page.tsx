




"use client";

import { useMemo, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import {
  Clock3,
  Flag,
  ChevronLeft,
  ChevronRight,
  Grid3X3,
  CheckCircle2,
} from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
}

const SAMPLE_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "If 2x + 5 = 17, what is the value of x?",
    options: ["4", "5", "6", "7"],
  },
  {
    id: 2,
    question: "What is the value of 15% of 200?",
    options: ["20", "25", "30", "35"],
  },
  {
    id: 3,
    question: "Simplify: 3(2x + 4).",
    options: ["6x + 4", "6x + 12", "5x + 12", "6x + 8"],
  },
];

export default function PracticeSessionPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const subject = String(params.subject ?? "subject");

  const mode = searchParams.get("mode") ?? "full";
  const questionCount = Number(
    searchParams.get("questions") ?? 40
  );
  const durationMinutes = Number(
    searchParams.get("duration") ?? 60
  );

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [flagged, setFlagged] = useState<number[]>([]);
  const [showQuestionGrid, setShowQuestionGrid] =
    useState(false);

  const [timeLeft, setTimeLeft] = useState(
    durationMinutes * 60
  );

  /*
   * Temporary questions.
   *
   * Later this will come from your Question Bank / API.
   */
  const questions = useMemo(() => {
    return Array.from(
      { length: questionCount },
      (_, index) =>
        SAMPLE_QUESTIONS[index % SAMPLE_QUESTIONS.length]
    ).map((question, index) => ({
      ...question,
      id: index + 1,
    }));
  }, [questionCount]);

  const question = questions[currentQuestion];

  const answeredCount = Object.keys(answers).length;

  const progress =
    questionCount > 0
      ? Math.round(
          ((currentQuestion + 1) / questionCount) * 100
        )
      : 0;

  const formattedTime = `${String(
    Math.floor(timeLeft / 60)
  ).padStart(2, "0")}:${String(timeLeft % 60).padStart(
    2,
    "0"
  )}`;

  const handleAnswer = (answer: string) => {
    setAnswers((previous) => ({
      ...previous,
      [question.id]: answer,
    }));
  };

  const toggleFlag = () => {
    setFlagged((previous) =>
      previous.includes(question.id)
        ? previous.filter((id) => id !== question.id)
        : [...previous, question.id]
    );
  };

  const goNext = () => {
    if (currentQuestion < questionCount - 1) {
      setCurrentQuestion((previous) => previous + 1);
    }
  };

  const goPrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((previous) => previous - 1);
    }
  };

  const jumpToQuestion = (index: number) => {
    setCurrentQuestion(index);
    setShowQuestionGrid(false);
  };

  return (
    <main className="min-h-screen bg-slate-100">
      {/* ============================================================
          HEADER
      ============================================================ */}

      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          {/* Subject */}

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              JAMB CBT Practice
            </p>

            <h1 className="text-lg font-black capitalize text-slate-900">
              {subject.replace("-", " ")}
            </h1>
          </div>

          {/* Timer */}

          <div
            className={[
              "flex items-center gap-2 rounded-xl px-4 py-2 font-black",
              timeLeft <= 300
                ? "bg-red-100 text-red-600"
                : "bg-slate-100 text-slate-900",
            ].join(" ")}
          >
            <Clock3 className="h-5 w-5" />

            <span>{formattedTime}</span>
          </div>
        </div>

        {/* Progress */}

        <div className="h-1 bg-slate-100">
          <div
            className="h-full bg-blue-600 transition-all"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </header>

      {/* ============================================================
          MAIN
      ============================================================ */}

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Top information */}

        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold text-slate-500">
              Question {currentQuestion + 1} of{" "}
              {questionCount}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              {answeredCount} answered
            </p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() =>
                setShowQuestionGrid((previous) => !previous)
              }
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
            >
              <Grid3X3 className="h-4 w-4" />
              Questions
            </button>

            <button
              type="button"
              onClick={toggleFlag}
              className={[
                "inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition",
                flagged.includes(question.id)
                  ? "border-amber-200 bg-amber-50 text-amber-600"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
              ].join(" ")}
            >
              <Flag className="h-4 w-4" />

              {flagged.includes(question.id)
                ? "Flagged"
                : "Flag"}
            </button>
          </div>
        </div>

        {/* ============================================================
            QUESTION GRID
        ============================================================ */}

        {showQuestionGrid && (
          <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-black text-slate-900">
                Question Navigator
              </h2>

              <p className="text-xs text-slate-500">
                {answeredCount}/{questionCount} answered
              </p>
            </div>

            <div className="grid grid-cols-5 gap-2 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12">
              {questions.map((item, index) => {
                const answered =
                  answers[item.id] !== undefined;

                const isCurrent =
                  index === currentQuestion;

                const isFlagged =
                  flagged.includes(item.id);

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => jumpToQuestion(index)}
                    className={[
                      "relative flex h-10 items-center justify-center rounded-lg text-sm font-bold transition",
                      isCurrent
                        ? "bg-blue-600 text-white"
                        : answered
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200",
                    ].join(" ")}
                  >
                    {item.id}

                    {isFlagged && (
                      <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-amber-500" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ============================================================
            QUESTION CARD
        ============================================================ */}

        <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
          <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="mb-8 flex items-start justify-between gap-4">
                <div>
                  <span className="inline-flex rounded-lg bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600">
                    QUESTION {question.id}
                  </span>

                  <h2 className="mt-5 text-xl font-bold leading-8 text-slate-900 sm:text-2xl">
                    {question.question}
                  </h2>
                </div>

                {flagged.includes(question.id) && (
                  <Flag className="h-5 w-5 shrink-0 text-amber-500" />
                )}
              </div>

              {/* Options */}

              <div className="space-y-3">
                {question.options.map((option, index) => {
                  const letter =
                    String.fromCharCode(65 + index);

                  const selected =
                    answers[question.id] === option;

                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleAnswer(option)}
                      className={[
                        "flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all sm:p-5",
                        selected
                          ? "border-blue-500 bg-blue-50 ring-2 ring-blue-500/10"
                          : "border-slate-200 hover:border-blue-300 hover:bg-slate-50",
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-black",
                          selected
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-600",
                        ].join(" ")}
                      >
                        {letter}
                      </span>

                      <span className="font-medium text-slate-800">
                        {option}
                      </span>

                      {selected && (
                        <CheckCircle2 className="ml-auto h-5 w-5 text-blue-600" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Navigation */}

            <div className="flex items-center justify-between border-t border-slate-200 p-5 sm:p-6">
              <button
                type="button"
                onClick={goPrevious}
                disabled={currentQuestion === 0}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </button>

              {currentQuestion === questionCount - 1 ? (
                <button
                  type="button"
                  onClick={() => {
                    router.push(
                      `/student/{student}/practice/${subject}/result`
                    );
                  }}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-700"
                >
                  Submit Exam
                  <CheckCircle2 className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={goNext}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </section>

          {/* ============================================================
              DESKTOP SIDEBAR
          ============================================================ */}

          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="font-black text-slate-900">
                Exam Progress
              </h3>

              <div className="mt-5">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">
                    Progress
                  </span>

                  <span className="font-bold text-slate-900">
                    {answeredCount}/{questionCount}
                  </span>
                </div>

                <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-blue-600"
                    style={{
                      width: `${
                        questionCount > 0
                          ? (answeredCount /
                              questionCount) *
                            100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>

              <div className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">
                    Answered
                  </span>

                  <span className="font-bold text-emerald-600">
                    {answeredCount}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">
                    Remaining
                  </span>

                  <span className="font-bold text-slate-900">
                    {questionCount - answeredCount}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-500">
                    Flagged
                  </span>

                  <span className="font-bold text-amber-600">
                    {flagged.length}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowQuestionGrid(true)}
                className="mt-6 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
              >
                View All Questions
              </button>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}