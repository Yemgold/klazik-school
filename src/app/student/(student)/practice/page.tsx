

// C:\Users\Lara Spellman\Jamb\jamb-league\src\app\student\(student)\practice\page.tsx

import Link from "next/link";
import {
  BookOpen,
  Brain,
  Clock3,
  Target,
  ArrowRight,
  BarChart3,
  Calculator,
  FlaskConical,
  Globe,
  Atom,
  BookMarked,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const subjects = [
  {
    name: "English",
    icon: BookOpen,
    questions: 2500,
    href: "/student/practice/english",
  },
  {
    name: "Mathematics",
    icon: Calculator,
    questions: 2100,
    href: "/student/practice/mathematics",
  },
  {
    name: "Physics",
    icon: Atom,
    questions: 1800,
    href: "/student/practice/physics",
  },
  {
    name: "Chemistry",
    icon: FlaskConical,
    questions: 1700,
    href: "/student/practice/chemistry",
  },
  {
    name: "Biology",
    icon: Brain,
    questions: 2200,
    href: "/student/practice/biology",
  },
  {
    name: "Government",
    icon: Globe,
    questions: 1200,
    href: "/student/practice/government",
  },
];

export default function PracticePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-10">
          <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700">
            Student Practice
          </span>

          <h1 className="mt-4 text-4xl font-bold">
            Practice Dashboard
          </h1>

          <p className="mt-4 max-w-3xl text-lg text-slate-600">
            Improve your JAMB performance by practising past
            questions, timed CBT examinations, and subject-based
            quizzes.
          </p>
        </div>

        {/* Statistics */}
        <div className="mb-10 grid gap-6 md:grid-cols-4">
          <Card hoverable className="text-center">
            <BookOpen className="mx-auto h-10 w-10 text-blue-600" />

            <h2 className="mt-4 text-3xl font-bold">
              12
            </h2>

            <p className="mt-2 text-slate-600">
              Tests Taken
            </p>
          </Card>

          <Card hoverable className="text-center">
            <Target className="mx-auto h-10 w-10 text-green-600" />

            <h2 className="mt-4 text-3xl font-bold">
              82%
            </h2>

            <p className="mt-2 text-slate-600">
              Average Score
            </p>
          </Card>

          <Card hoverable className="text-center">
            <Clock3 className="mx-auto h-10 w-10 text-orange-600" />

            <h2 className="mt-4 text-3xl font-bold">
              18h
            </h2>

            <p className="mt-2 text-slate-600">
              Study Time
            </p>
          </Card>

          <Card hoverable className="text-center">
            <BarChart3 className="mx-auto h-10 w-10 text-purple-600" />

            <h2 className="mt-4 text-3xl font-bold">
              +15%
            </h2>

            <p className="mt-2 text-slate-600">
              Improvement
            </p>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-12 grid gap-6 lg:grid-cols-3">
          <Card hoverable>
            <Brain className="h-12 w-12 text-blue-600" />

            <h3 className="mt-5 text-2xl font-bold">
              Random Practice
            </h3>

            <p className="mt-3 text-slate-600">
              Answer randomly selected JAMB questions from
              multiple subjects.
            </p>

            <Link
              href="/student/practice/subjects"
              className="mt-6 inline-flex"
            >
              <Button
                rightIcon={
                  <ArrowRight className="h-4 w-4" />
                }
              >
                Start Practice
              </Button>
            </Link>
          </Card>

          <Card hoverable>
            <Clock3 className="h-12 w-12 text-green-600" />

            <h3 className="mt-5 text-2xl font-bold">
              Timed CBT
            </h3>

            <p className="mt-3 text-slate-600">
              Simulate the real JAMB CBT examination with a
              countdown timer.
            </p>

            <Link
              href="/student/practice/subjects"
              className="mt-6 inline-flex"
            >
              <Button
                variant="outline"
                rightIcon={
                  <ArrowRight className="h-4 w-4" />
                }
              >
                Start CBT
              </Button>
            </Link>
          </Card>

          <Card hoverable>
            <BookMarked className="h-12 w-12 text-purple-600" />

            <h3 className="mt-5 text-2xl font-bold">
              Practice History
            </h3>

            <p className="mt-3 text-slate-600">
              Review previous attempts and monitor your
              improvement over time.
            </p>

            <Link
              href="/student/practice/history"
              className="mt-6 inline-flex"
            >
              <Button
                variant="secondary"
                rightIcon={
                  <ArrowRight className="h-4 w-4" />
                }
              >
                View History
              </Button>
            </Link>
          </Card>
        </div>

        {/* Subjects */}
        <div>
          <h2 className="mb-8 text-3xl font-bold">
            Practice by Subject
          </h2>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {subjects.map((subject) => {
              const Icon = subject.icon;

              return (
                <Card
                  key={subject.name}
                  hoverable
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
                      <Icon className="h-7 w-7 text-blue-600" />
                    </div>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm">
                      {subject.questions.toLocaleString()} Questions
                    </span>
                  </div>

                  <h3 className="mt-6 text-2xl font-bold">
                    {subject.name}
                  </h3>

                  <p className="mt-3 text-slate-600">
                    Practice past JAMB questions and improve your
                    performance.
                  </p>

                  <Link
                    href={subject.href}
                    className="mt-8 inline-flex"
                  >
                    <Button
                      fullWidth
                      rightIcon={
                        <ArrowRight className="h-4 w-4" />
                      }
                    >
                      Practice Now
                    </Button>
                  </Link>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}