




"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  FileQuestion,
  Play,
  Sparkles,
  Target,
  Timer,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

/* -------------------------------------------------------------------------- */
/* TYPES                                                                      */
/* -------------------------------------------------------------------------- */

type PracticeMode = "quick" | "full" | "custom";

interface SubjectConfig {
  name: string;
  questions: number;
  duration: number;
  description: string;
}

/* -------------------------------------------------------------------------- */
/* SUBJECT DATA                                                               */
/* -------------------------------------------------------------------------- */

const SUBJECTS: Record<string, SubjectConfig> = {
  english: {
    name: "Use of English",
    questions: 60,
    duration: 60,
    description:
      "Practice comprehension, grammar, vocabulary and other Use of English skills.",
  },

  mathematics: {
    name: "Mathematics",
    questions: 40,
    duration: 60,
    description:
      "Practice JAMB-style Mathematics questions under realistic examination conditions.",
  },

  physics: {
    name: "Physics",
    questions: 40,
    duration: 50,
    description:
      "Test your understanding of Physics concepts and calculations.",
  },

  chemistry: {
    name: "Chemistry",
    questions: 40,
    duration: 50,
    description:
      "Practice Chemistry questions covering important JAMB examination topics.",
  },

  biology: {
    name: "Biology",
    questions: 40,
    duration: 50,
    description:
      "Test your knowledge of Biology through realistic CBT questions.",
  },

  government: {
    name: "Government",
    questions: 40,
    duration: 45,
    description:
      "Practice Government questions and improve your examination confidence.",
  },

  geography: {
    name: "Geography",
    questions: 40,
    duration: 45,
    description:
      "Practice Geography questions across important JAMB examination areas.",
  },

  literature: {
    name: "Literature",
    questions: 40,
    duration: 45,
    description:
      "Practice Literature questions and prepare for your examination.",
  },
};

/* -------------------------------------------------------------------------- */
/* COMPONENT                                                                  */
/* -------------------------------------------------------------------------- */

export default function PracticeSubjectPage() {
  const params = useParams();
  const router = useRouter();

  const subjectId = String(params.subject ?? "").toLowerCase();

  const subject = useMemo(
    () => SUBJECTS[subjectId],
    [subjectId]
  );

  const [practiceMode, setPracticeMode] =
    useState<PracticeMode>("full");

  const [customQuestions, setCustomQuestions] =
    useState(20);

  /* ------------------------------------------------------------------------ */
  /* INVALID SUBJECT                                                          */
  /* ------------------------------------------------------------------------ */

  if (!subject) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center px-4">
          <Card className="w-full p-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100">
              <BookOpen className="h-8 w-8 text-red-600" />
            </div>

            <h1 className="mt-6 text-2xl font-black text-slate-900">
              Subject Not Found
            </h1>

            <p className="mt-3 text-slate-500">
              We could not find the subject you are looking for.
            </p>

            <Link
              href="/student/practice"
              className="mt-6 inline-block"
            >
              <Button
                leftIcon={
                  <ArrowLeft className="h-4 w-4" />
                }
              >
                Back to Practice
              </Button>
            </Link>
          </Card>
        </div>
      </main>
    );
  }

  /* ------------------------------------------------------------------------ */
  /* QUESTION / TIME CALCULATION                                              */
  /* ------------------------------------------------------------------------ */

  const questionCount =
    practiceMode === "quick"
      ? 10
      : practiceMode === "full"
        ? subject.questions
        : customQuestions;

  const duration =
    practiceMode === "quick"
      ? Math.max(15, Math.round(subject.duration / 4))
      : practiceMode === "full"
        ? subject.duration
        : Math.max(
            15,
            Math.round(
              subject.duration *
                (customQuestions /
                  subject.questions)
            )
          );

  /* ------------------------------------------------------------------------ */
  /* START PRACTICE                                                           */
  /* ------------------------------------------------------------------------ */

  const handleStartPractice = () => {
    const searchParams = new URLSearchParams({
      mode: practiceMode,
      questions: String(questionCount),
      duration: String(duration),
    });

    router.push(
      `/student/practice/${subjectId}/session?${searchParams.toString()}`
    );
  };

  /* ------------------------------------------------------------------------ */
  /* UI                                                                       */
  /* ------------------------------------------------------------------------ */

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back */}
        <Link
          href="/student/practice"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-blue-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Practice
        </Link>

        {/* Header */}
        <section className="relative overflow-hidden rounded-3xl bg-slate-950 px-6 py-10 text-white shadow-xl sm:px-10">
          {/* Decorative background */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-20 -top-32 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl" />

            <div className="absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-purple-600/10 blur-3xl" />
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-300">
              <Sparkles className="h-4 w-4" />
              Learning CBT
            </div>

            <h1 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              {subject.name}
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
              {subject.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 rounded-xl bg-white/5 px-4 py-3 text-sm font-medium text-slate-300">
                <FileQuestion className="h-4 w-4 text-blue-400" />
                JAMB-style questions
              </div>

              <div className="inline-flex items-center gap-2 rounded-xl bg-white/5 px-4 py-3 text-sm font-medium text-slate-300">
                <Timer className="h-4 w-4 text-purple-400" />
                Timed practice
              </div>

              <div className="inline-flex items-center gap-2 rounded-xl bg-white/5 px-4 py-3 text-sm font-medium text-slate-300">
                <Target className="h-4 w-4 text-emerald-400" />
                Instant results
              </div>
            </div>
          </div>
        </section>

        {/* Practice setup */}
        <section className="mt-8">
          <div className="mb-5">
            <h2 className="text-2xl font-black text-slate-900">
              Choose Practice Mode
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              How would you like to practice?
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {/* Quick */}
            <button
              type="button"
              onClick={() =>
                setPracticeMode("quick")
              }
              className={[
                "rounded-3xl border p-6 text-left transition-all",
                practiceMode === "quick"
                  ? "border-blue-500 bg-blue-50 shadow-lg shadow-blue-500/10"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-md",
              ].join(" ")}
            >
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100">
                  <Play className="h-6 w-6 text-blue-600" />
                </div>

                {practiceMode === "quick" && (
                  <CheckCircle2 className="h-6 w-6 text-blue-600" />
                )}
              </div>

              <h3 className="mt-6 text-xl font-black text-slate-900">
                Quick Practice
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                A short practice session when you
                want to test yourself quickly.
              </p>

              <div className="mt-5 flex gap-4 text-sm font-semibold text-slate-600">
                <span>10 Questions</span>
                <span>•</span>
                <span>
                  {Math.max(
                    15,
                    Math.round(
                      subject.duration / 4
                    )
                  )}{" "}
                  mins
                </span>
              </div>
            </button>

            {/* Full */}
            <button
              type="button"
              onClick={() =>
                setPracticeMode("full")
              }
              className={[
                "rounded-3xl border p-6 text-left transition-all",
                practiceMode === "full"
                  ? "border-blue-500 bg-blue-50 shadow-lg shadow-blue-500/10"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-md",
              ].join(" ")}
            >
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100">
                  <Target className="h-6 w-6 text-purple-600" />
                </div>

                {practiceMode === "full" && (
                  <CheckCircle2 className="h-6 w-6 text-blue-600" />
                )}
              </div>

              <h3 className="mt-6 text-xl font-black text-slate-900">
                Full Practice
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Simulate a complete subject practice
                session under timed conditions.
              </p>

              <div className="mt-5 flex gap-4 text-sm font-semibold text-slate-600">
                <span>
                  {subject.questions} Questions
                </span>

                <span>•</span>

                <span>
                  {subject.duration} mins
                </span>
              </div>
            </button>

            {/* Custom */}
            <button
              type="button"
              onClick={() =>
                setPracticeMode("custom")
              }
              className={[
                "rounded-3xl border p-6 text-left transition-all",
                practiceMode === "custom"
                  ? "border-blue-500 bg-blue-50 shadow-lg shadow-blue-500/10"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-md",
              ].join(" ")}
            >
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100">
                  <FileQuestion className="h-6 w-6 text-emerald-600" />
                </div>

                {practiceMode === "custom" && (
                  <CheckCircle2 className="h-6 w-6 text-blue-600" />
                )}
              </div>

              <h3 className="mt-6 text-xl font-black text-slate-900">
                Custom Practice
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Choose how many questions you want
                to answer.
              </p>

              {practiceMode === "custom" && (
                <div
                  className="mt-5"
                  onClick={(event) =>
                    event.stopPropagation()
                  }
                >
                  <label
                    htmlFor="question-count"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Number of questions
                  </label>

                  <select
                    id="question-count"
                    value={customQuestions}
                    onChange={(event) =>
                      setCustomQuestions(
                        Number(event.target.value)
                      )
                    }
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                  >
                    {[10, 20, 30, 40].map(
                      (count) =>
                        count <=
                          subject.questions && (
                          <option
                            key={count}
                            value={count}
                          >
                            {count} Questions
                          </option>
                        )
                    )}
                  </select>
                </div>
              )}
            </button>
          </div>
        </section>

        {/* Selected practice summary */}
        <section className="mt-8">
          <Card className="overflow-hidden border-slate-200 p-0">
            <div className="border-b border-slate-100 bg-slate-50 px-6 py-5">
              <h2 className="font-black text-slate-900">
                Practice Summary
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Review your session before starting.
              </p>
            </div>

            <div className="grid gap-4 p-6 sm:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-5">
                <FileQuestion className="h-5 w-5 text-blue-600" />

                <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Questions
                </p>

                <p className="mt-1 text-2xl font-black text-slate-900">
                  {questionCount}
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <Clock3 className="h-5 w-5 text-purple-600" />

                <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Time Limit
                </p>

                <p className="mt-1 text-2xl font-black text-slate-900">
                  {duration} mins
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <BookOpen className="h-5 w-5 text-emerald-600" />

                <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Subject
                </p>

                <p className="mt-1 truncate text-xl font-black text-slate-900">
                  {subject.name}
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* Start */}
        <section className="mt-8 flex flex-col items-center justify-between gap-5 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:flex-row sm:p-8">
          <div>
            <h2 className="text-xl font-black text-slate-900">
              Ready to begin?
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Once you start, the timer will begin.
            </p>
          </div>

          <Button
            size="lg"
            onClick={handleStartPractice}
            rightIcon={
              <ArrowRight className="h-5 w-5" />
            }
          >
            Start Practice
          </Button>
        </section>

        {/* Exam reminder */}
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <Timer className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

          <div>
            <p className="font-bold text-amber-900">
              Practice under exam conditions
            </p>

            <p className="mt-1 text-sm leading-6 text-amber-800/80">
              Find a quiet place, manage your time
              carefully and try to answer each
              question before the timer runs out.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}