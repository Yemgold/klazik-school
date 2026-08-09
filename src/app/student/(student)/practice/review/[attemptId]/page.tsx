


import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  HelpCircle,
  BookOpen,
  Clock3,
  Trophy,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const questions = [
  {
    id: 1,
    question: "What is the capital city of Nigeria?",
    selected: "Abuja",
    correct: "Abuja",
    status: "correct",
  },
  {
    id: 2,
    question: "The SI unit of Force is ____.",
    selected: "Joule",
    correct: "Newton",
    status: "wrong",
  },
  {
    id: 3,
    question: "Who wrote Things Fall Apart?",
    selected: "Not Answered",
    correct: "Chinua Achebe",
    status: "skipped",
  },
];

export default function PracticeReviewPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="container mx-auto max-w-6xl px-4 py-10">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/student/practice/history"
            className="inline-flex items-center gap-2 text-blue-600 hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Practice History
          </Link>

          <h1 className="mt-5 text-4xl font-bold">
            Practice Review
          </h1>

          <p className="mt-3 text-lg text-slate-600">
            Review your answers, compare them with the correct
            solutions and identify areas for improvement.
          </p>
        </div>

        {/* Summary */}
        <div className="mb-10 grid gap-6 md:grid-cols-4">
          <Card hoverable className="text-center">
            <Trophy className="mx-auto h-10 w-10 text-yellow-500" />

            <h2 className="mt-3 text-3xl font-bold">
              82%
            </h2>

            <p className="mt-2 text-slate-600">
              Final Score
            </p>
          </Card>

          <Card hoverable className="text-center">
            <CheckCircle2 className="mx-auto h-10 w-10 text-green-600" />

            <h2 className="mt-3 text-3xl font-bold">
              41
            </h2>

            <p className="mt-2 text-slate-600">
              Correct
            </p>
          </Card>

          <Card hoverable className="text-center">
            <XCircle className="mx-auto h-10 w-10 text-red-600" />

            <h2 className="mt-3 text-3xl font-bold">
              7
            </h2>

            <p className="mt-2 text-slate-600">
              Incorrect
            </p>
          </Card>

          <Card hoverable className="text-center">
            <Clock3 className="mx-auto h-10 w-10 text-blue-600" />

            <h2 className="mt-3 text-3xl font-bold">
              47 mins
            </h2>

            <p className="mt-2 text-slate-600">
              Time Used
            </p>
          </Card>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {questions.map((question) => (
            <Card
              key={question.id}
              className="p-8"
            >
              <div className="flex items-start gap-4">
                {question.status === "correct" && (
                  <CheckCircle2 className="mt-1 h-6 w-6 text-green-600" />
                )}

                {question.status === "wrong" && (
                  <XCircle className="mt-1 h-6 w-6 text-red-600" />
                )}

                {question.status === "skipped" && (
                  <HelpCircle className="mt-1 h-6 w-6 text-yellow-500" />
                )}

                <div className="flex-1">
                  <h2 className="text-lg font-semibold">
                    Question {question.id}
                  </h2>

                  <p className="mt-3 text-slate-700">
                    {question.question}
                  </p>

                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <div className="rounded-xl border border-red-200 bg-red-50 p-4">
                      <p className="text-sm font-medium text-red-700">
                        Your Answer
                      </p>

                      <p className="mt-2 font-semibold">
                        {question.selected}
                      </p>
                    </div>

                    <div className="rounded-xl border border-green-200 bg-green-50 p-4">
                      <p className="text-sm font-medium text-green-700">
                        Correct Answer
                      </p>

                      <p className="mt-2 font-semibold">
                        {question.correct}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Button
                      variant="outline"
                      leftIcon={
                        <BookOpen className="h-4 w-4" />
                      }
                    >
                      View Explanation
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom Actions */}
        <Card className="mt-10">
          <div className="flex flex-col gap-4 md:flex-row md:justify-between">
            <Link href="/student/practice">
              <Button variant="outline">
                Practice Again
              </Button>
            </Link>

            <Link href="/student/practice/history">
              <Button>
                Back to History
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </main>
  );
}