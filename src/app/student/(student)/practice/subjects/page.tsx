



"use client";

import Link from "next/link";
import {
  BookOpen,
  Calculator,
  Atom,
  FlaskConical,
  Brain,
  Globe,
  Landmark,
  Languages,
  ArrowRight,
  Clock3,
  FileQuestion,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const subjects = [
  {
    id: "english",
    name: "Use of English",
    icon: BookOpen,
    questions: 2500,
    duration: "60 mins",
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    id: "mathematics",
    name: "Mathematics",
    icon: Calculator,
    questions: 2100,
    duration: "60 mins",
    color: "text-green-600",
    bg: "bg-green-100",
  },
  {
    id: "physics",
    name: "Physics",
    icon: Atom,
    questions: 1800,
    duration: "50 mins",
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
  {
    id: "chemistry",
    name: "Chemistry",
    icon: FlaskConical,
    questions: 1700,
    duration: "50 mins",
    color: "text-orange-600",
    bg: "bg-orange-100",
  },
  {
    id: "biology",
    name: "Biology",
    icon: Brain,
    questions: 2200,
    duration: "50 mins",
    color: "text-pink-600",
    bg: "bg-pink-100",
  },
  {
    id: "government",
    name: "Government",
    icon: Landmark,
    questions: 1200,
    duration: "45 mins",
    color: "text-red-600",
    bg: "bg-red-100",
  },
  {
    id: "geography",
    name: "Geography",
    icon: Globe,
    questions: 1300,
    duration: "45 mins",
    color: "text-cyan-600",
    bg: "bg-cyan-100",
  },
  {
    id: "literature",
    name: "Literature",
    icon: Languages,
    questions: 1100,
    duration: "45 mins",
    color: "text-indigo-600",
    bg: "bg-indigo-100",
  },
];

export default function PracticeSubjectsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-10">
          <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700">
            Practice Centre
          </span>

          <h1 className="mt-4 text-4xl font-bold">
            Choose a Subject
          </h1>

          <p className="mt-3 max-w-3xl text-lg text-slate-600">
            Practice real JAMB CBT questions, improve your speed,
            accuracy and confidence before the examination.
          </p>
        </div>

        {/* Subject Cards */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {subjects.map((subject) => {
            const Icon = subject.icon;

            return (
              <Card
                key={subject.id}
                hoverable
                className="flex flex-col"
              >
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl ${subject.bg}`}
                >
                  <Icon
                    className={`h-8 w-8 ${subject.color}`}
                  />
                </div>

                <h2 className="mt-6 text-2xl font-bold">
                  {subject.name}
                </h2>

                <div className="mt-6 space-y-3 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <FileQuestion className="h-4 w-4" />
                    {subject.questions.toLocaleString()} Questions
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock3 className="h-4 w-4" />
                    {subject.duration}
                  </div>
                </div>

                <div className="mt-8 flex-1" />

                <Link
                  href={`/student/practice/${subject.id}`}
                >
                  <Button
                    fullWidth
                    rightIcon={
                      <ArrowRight className="h-4 w-4" />
                    }
                  >
                    Start Practice
                  </Button>
                </Link>
              </Card>
            );
          })}
        </div>
      </div>
    </main>
  );
}