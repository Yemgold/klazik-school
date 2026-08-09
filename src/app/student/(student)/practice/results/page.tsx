




import Link from "next/link";
import {
  Trophy,
  Target,
  Clock3,
  TrendingUp,
  BookOpen,
  Award,
  ArrowRight,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const results = [
  {
    id: "1",
    subject: "Use of English",
    score: 82,
    total: 100,
    questions: 60,
    duration: "48 mins",
    date: "15 Aug 2026",
  },
  {
    id: "2",
    subject: "Mathematics",
    score: 76,
    total: 100,
    questions: 50,
    duration: "55 mins",
    date: "12 Aug 2026",
  },
  {
    id: "3",
    subject: "Biology",
    score: 91,
    total: 100,
    questions: 40,
    duration: "39 mins",
    date: "08 Aug 2026",
  },
  {
    id: "4",
    subject: "Physics",
    score: 73,
    total: 100,
    questions: 40,
    duration: "42 mins",
    date: "05 Aug 2026",
  },
];

export default function PracticeResultsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-10">
          <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700">
            Practice Centre
          </span>

          <h1 className="mt-4 text-4xl font-bold">
            Practice Results
          </h1>

          <p className="mt-3 max-w-3xl text-lg text-slate-600">
            Track your performance, monitor improvement over time,
            and identify subjects that need more attention.
          </p>
        </div>

        {/* Overall Statistics */}
        <div className="mb-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <Card hoverable className="text-center">
            <Trophy className="mx-auto h-10 w-10 text-yellow-500" />

            <h2 className="mt-4 text-3xl font-bold">
              84%
            </h2>

            <p className="mt-2 text-slate-600">
              Overall Average
            </p>
          </Card>

          <Card hoverable className="text-center">
            <BookOpen className="mx-auto h-10 w-10 text-blue-600" />

            <h2 className="mt-4 text-3xl font-bold">
              24
            </h2>

            <p className="mt-2 text-slate-600">
              Practice Tests
            </p>
          </Card>

          <Card hoverable className="text-center">
            <TrendingUp className="mx-auto h-10 w-10 text-green-600" />

            <h2 className="mt-4 text-3xl font-bold">
              +18%
            </h2>

            <p className="mt-2 text-slate-600">
              Improvement
            </p>
          </Card>

          <Card hoverable className="text-center">
            <Award className="mx-auto h-10 w-10 text-purple-600" />

            <h2 className="mt-4 text-3xl font-bold">
              A
            </h2>

            <p className="mt-2 text-slate-600">
              Performance Grade
            </p>
          </Card>
        </div>

        {/* Results List */}
        <div className="space-y-6">
          {results.map((result) => (
            <Card
              key={result.id}
              hoverable
              className="p-8"
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-2xl font-bold">
                    {result.subject}
                  </h2>

                  <p className="mt-2 text-slate-600">
                    Completed on {result.date}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-6 text-sm text-slate-600">
                    <span className="flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      {result.questions} Questions
                    </span>

                    <span className="flex items-center gap-2">
                      <Clock3 className="h-4 w-4" />
                      {result.duration}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-4">
                  <div className="rounded-full bg-blue-100 px-6 py-4 text-center">
                    <p className="text-3xl font-bold text-blue-700">
                      {result.score}%
                    </p>

                    <p className="text-sm text-blue-600">
                      {result.score}/{result.total}
                    </p>
                  </div>

                  <Link
                    href={`/student/practice/review/${result.id}`}
                  >
                    <Button
                      rightIcon={
                        <ArrowRight className="h-4 w-4" />
                      }
                    >
                      Review Answers
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <Card className="mt-10 text-center">
          <h2 className="text-2xl font-bold">
            Ready for Another Challenge?
          </h2>

          <p className="mt-3 text-slate-600">
            Continue practising to improve your speed, accuracy,
            and confidence before your examination.
          </p>

          <div className="mt-6">
            <Link href="/student/practice/subjects">
              <Button size="lg">
                Start New Practice
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </main>
  );
}