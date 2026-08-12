






"use client";

import { useMemo, useState } from "react";
import Arena from "@/components/arena/Arena";

import { SUBJECTS } from "@/data/arena/subjects";
import TopicSelector from "@/components/arena/TopicSelector";
import SubjectSelector from "@/components/arena/SubjectSelector";
import LearningModeSelector from "@/components/arena/LearningModeSelector";

/* -------------------------------------------------------------------------- */
/* TYPES                                                                      */
/* -------------------------------------------------------------------------- */

type LearningMode = "interactive" | "practice";



/* -------------------------------------------------------------------------- */
/* SUBJECTS                                                                   */
/* -------------------------------------------------------------------------- */



/* -------------------------------------------------------------------------- */
/* COMPONENT                                                                  */
/* -------------------------------------------------------------------------- */

export default function ArenaPage() {
  /* ------------------------------------------------------------------------ */
  /* STATE                                                                    */
  /* ------------------------------------------------------------------------ */

  const [selectedSubject, setSelectedSubject] =
    useState<string>("");



  const [selectedTopic, setSelectedTopic] =
    useState<string>("");

  const [learningMode, setLearningMode] =
    useState<LearningMode>("interactive");

  const [started, setStarted] =
    useState(false);

  /* ------------------------------------------------------------------------ */
  /* SELECTED SUBJECT                                                         */
  /* ------------------------------------------------------------------------ */

  const currentSubject = useMemo(() => {
    return SUBJECTS.find(
      (subject) =>
        subject.name === selectedSubject
    );
  }, [selectedSubject]);

  const topics = currentSubject?.topics ?? [];

  const currentTopic = useMemo(() => {
  return topics.find(
    (topic) => topic.name === selectedTopic
  );
}, [topics, selectedTopic]);

  const selectedTopicConfig = useMemo(() => {
  return topics.find(
    (topic) => topic.name === selectedTopic
  );
}, [topics, selectedTopic]);

  /* ------------------------------------------------------------------------ */
  /* SUBJECT CHANGE                                                           */
  /* ------------------------------------------------------------------------ */

  const handleSubjectChange = (
    subject: string
  ) => {
    setSelectedSubject(subject);

    /*
     * Reset topic whenever the subject changes.
     */
    setSelectedTopic("");
  };

  /* ------------------------------------------------------------------------ */
  /* START LESSON                                                             */
  /* ------------------------------------------------------------------------ */

  const handleStartLesson = () => {
    if (
      !selectedSubject ||
      !selectedTopic
    ) {
      return;
    }

    setStarted(true);
  };

  /* ------------------------------------------------------------------------ */
  /* ACTUAL ARENA                                                             */
  /* ------------------------------------------------------------------------ */

  if (
    started &&
    selectedSubject &&
    selectedTopic
  ) {
    /*
     * Interactive Lesson
     *
     * This connects the setup screen to
     * our actual Arena component.
     */

    if (learningMode === "interactive") {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <Arena
      questions={currentTopic?.questions ?? []}
      subject={selectedSubject}
      topic={selectedTopic}
      timePerQuestion={10}
      onComplete={(result) => {
        console.log("Arena completed:", result);
      }}
    />
    </main>
  );
}

    /*
     * Practice mode will eventually have
     * its own Practice CBT experience.
     */
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
        <section className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center shadow-2xl">
          <div className="text-5xl">
            📝
          </div>

          <h1 className="mt-5 text-3xl font-black">
            Practice Questions
          </h1>

          <p className="mt-3 text-slate-400">
            {selectedSubject} • {selectedTopic}
          </p>

          <p className="mt-4 text-sm text-slate-500">
            The Practice Question mode will be
            connected to the CBT question engine next.
          </p>

          <button
            type="button"
            onClick={() => {
              setStarted(false);
            }}
            className="mt-8 rounded-2xl bg-white px-7 py-3 font-bold text-slate-950 transition hover:scale-105"
          >
            Back to Lesson Setup
          </button>
        </section>
      </main>
    );
  }

  /* ------------------------------------------------------------------------ */
  /* SETUP SCREEN                                                             */
  /* ------------------------------------------------------------------------ */

  const canStart =
    Boolean(selectedSubject) &&
    Boolean(selectedTopic) &&
    Boolean(learningMode);

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-5xl">

        {/* ---------------------------------------------------------------- */}
        {/* PAGE HEADER                                                       */}
        {/* ---------------------------------------------------------------- */}

        <header className="mb-8 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-blue-300">
            🎬 Interactive Learning Arena
          </div>

          <h1 className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
            What do you want to learn?
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
            Choose a subject, pick a topic, and select
            how you want to learn.
          </p>
        </header>

        {/* ---------------------------------------------------------------- */}
        {/* SETUP CARD                                                        */}
        {/* ---------------------------------------------------------------- */}

        <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-2xl">

          {/* ============================================================ */}
          {/* STEP 1 — SUBJECT                                             */}
          {/* ============================================================ */}
<SubjectSelector
  subjects={SUBJECTS}
  selectedSubject={selectedSubject}
  onSubjectSelect={handleSubjectChange}
/>
          {/* ============================================================ */}
          {/* STEP 2 — TOPIC                                               */}
          {/* ============================================================ */}

      
           <TopicSelector
  selectedSubject={selectedSubject}
  topics={topics}
  selectedTopic={selectedTopic}
  onTopicSelect={setSelectedTopic}
/>

          {/* ============================================================ */}
          {/* STEP 3 — LEARNING MODE                                      */}
          {/* ============================================================ */}

 <LearningModeSelector
  learningMode={learningMode}
  onModeSelect={setLearningMode}
/>
          {/* ============================================================ */}
          {/* START                                                         */}
          {/* ============================================================ */}

          <div className="p-6 sm:p-8">

            {/* Selection summary */}

            {canStart && (
              <div className="mb-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  Your Lesson
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-2 text-sm font-semibold">
                  <span className="rounded-lg bg-blue-500/10 px-3 py-1.5 text-blue-300">
                    {selectedSubject}
                  </span>

                  <span className="text-slate-600">
                    →
                  </span>

                  <span className="rounded-lg bg-purple-500/10 px-3 py-1.5 text-purple-300">
                    {selectedTopic}
                  </span>

                  <span className="text-slate-600">
                    →
                  </span>

                  <span className="rounded-lg bg-white/5 px-3 py-1.5 text-slate-300">
                    {learningMode ===
                    "interactive"
                      ? "Interactive Lesson"
                      : "Practice Questions"}
                  </span>
                </div>
              </div>
            )}

            <button
              type="button"
              disabled={!canStart}
              onClick={
                handleStartLesson
              }
              className="group w-full rounded-2xl bg-blue-600 px-6 py-4 text-base font-black text-white shadow-xl shadow-blue-900/20 transition-all duration-200 hover:bg-blue-500 hover:shadow-blue-900/30 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-600 disabled:shadow-none"
            >
              <span className="flex items-center justify-center gap-2">
                {learningMode ===
                "interactive"
                  ? "Start Interactive Lesson"
                  : "Start Practice"}

                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            </button>

            {!canStart && (
              <p className="mt-3 text-center text-xs text-slate-600">
                Select a subject and topic to continue.
              </p>
            )}
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* FOOTER                                                          */}
        {/* ---------------------------------------------------------------- */}

        <p className="mt-6 text-center text-xs text-slate-600">
          Learn at your own pace. Listen, think, answer,
          and understand.
        </p>
      </div>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* STEP NUMBER                                                                */
/* -------------------------------------------------------------------------- */

function StepNumber({
  number,
}: {
  number: string;
}) {
  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-xs font-black text-slate-400">
      {number}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* LEARNING MODE CARD                                                         */
/* -------------------------------------------------------------------------- */

interface LearningModeCardProps {
  selected: boolean;
  onClick: () => void;
  icon: string;
  title: string;
  description: string;
}

function LearningModeCard({
  selected,
  onClick,
  icon,
  title,
  description,
}: LearningModeCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "relative rounded-2xl border p-5 text-left transition-all duration-200",
        selected
          ? "border-emerald-400/40 bg-emerald-500/10 shadow-lg shadow-emerald-500/5"
          : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]",
      ].join(" ")}
    >
      {/* Selected indicator */}

      {selected && (
        <div className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-xs font-black text-white">
          ✓
        </div>
      )}

      <div className="text-3xl">
        {icon}
      </div>

      <h3
        className={[
          "mt-4 text-base font-black",
          selected
            ? "text-emerald-300"
            : "text-white",
        ].join(" ")}
      >
        {title}
      </h3>

      <p className="mt-2 pr-6 text-sm leading-relaxed text-slate-500">
        {description}
      </p>
    </button>
  );
}











// "use client";

// import { useMemo, useState } from "react";
// import Arena from "@/components/arena/Arena";

// import { SUBJECTS } from "@/data/arena/subjects";

// /* -------------------------------------------------------------------------- */
// /* TYPES                                                                      */
// /* -------------------------------------------------------------------------- */

// type LearningMode = "interactive" | "practice";



// /* -------------------------------------------------------------------------- */
// /* SUBJECTS                                                                   */
// /* -------------------------------------------------------------------------- */



// /* -------------------------------------------------------------------------- */
// /* COMPONENT                                                                  */
// /* -------------------------------------------------------------------------- */

// export default function ArenaPage() {
//   /* ------------------------------------------------------------------------ */
//   /* STATE                                                                    */
//   /* ------------------------------------------------------------------------ */

//   const [selectedSubject, setSelectedSubject] =
//     useState<string>("");



//   const [selectedTopic, setSelectedTopic] =
//     useState<string>("");

//   const [learningMode, setLearningMode] =
//     useState<LearningMode>("interactive");

//   const [started, setStarted] =
//     useState(false);

//   /* ------------------------------------------------------------------------ */
//   /* SELECTED SUBJECT                                                         */
//   /* ------------------------------------------------------------------------ */

//   const currentSubject = useMemo(() => {
//     return SUBJECTS.find(
//       (subject) =>
//         subject.name === selectedSubject
//     );
//   }, [selectedSubject]);

//   const topics = currentSubject?.topics ?? [];

//   const currentTopic = useMemo(() => {
//   return topics.find(
//     (topic) => topic.name === selectedTopic
//   );
// }, [topics, selectedTopic]);

//   const selectedTopicConfig = useMemo(() => {
//   return topics.find(
//     (topic) => topic.name === selectedTopic
//   );
// }, [topics, selectedTopic]);

//   /* ------------------------------------------------------------------------ */
//   /* SUBJECT CHANGE                                                           */
//   /* ------------------------------------------------------------------------ */

//   const handleSubjectChange = (
//     subject: string
//   ) => {
//     setSelectedSubject(subject);

//     /*
//      * Reset topic whenever the subject changes.
//      */
//     setSelectedTopic("");
//   };

//   /* ------------------------------------------------------------------------ */
//   /* START LESSON                                                             */
//   /* ------------------------------------------------------------------------ */

//   const handleStartLesson = () => {
//     if (
//       !selectedSubject ||
//       !selectedTopic
//     ) {
//       return;
//     }

//     setStarted(true);
//   };

//   /* ------------------------------------------------------------------------ */
//   /* ACTUAL ARENA                                                             */
//   /* ------------------------------------------------------------------------ */

//   if (
//     started &&
//     selectedSubject &&
//     selectedTopic
//   ) {
//     /*
//      * Interactive Lesson
//      *
//      * This connects the setup screen to
//      * our actual Arena component.
//      */

//     if (learningMode === "interactive") {
//   return (
//     <main className="min-h-screen bg-slate-950 text-white">
//       <Arena
//       questions={currentTopic?.questions ?? []}
//       subject={selectedSubject}
//       topic={selectedTopic}
//       timePerQuestion={10}
//       onComplete={(result) => {
//         console.log("Arena completed:", result);
//       }}
//     />
//     </main>
//   );
// }

//     /*
//      * Practice mode will eventually have
//      * its own Practice CBT experience.
//      */
//     return (
//       <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
//         <section className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center shadow-2xl">
//           <div className="text-5xl">
//             📝
//           </div>

//           <h1 className="mt-5 text-3xl font-black">
//             Practice Questions
//           </h1>

//           <p className="mt-3 text-slate-400">
//             {selectedSubject} • {selectedTopic}
//           </p>

//           <p className="mt-4 text-sm text-slate-500">
//             The Practice Question mode will be
//             connected to the CBT question engine next.
//           </p>

//           <button
//             type="button"
//             onClick={() => {
//               setStarted(false);
//             }}
//             className="mt-8 rounded-2xl bg-white px-7 py-3 font-bold text-slate-950 transition hover:scale-105"
//           >
//             Back to Lesson Setup
//           </button>
//         </section>
//       </main>
//     );
//   }

//   /* ------------------------------------------------------------------------ */
//   /* SETUP SCREEN                                                             */
//   /* ------------------------------------------------------------------------ */

//   const canStart =
//     Boolean(selectedSubject) &&
//     Boolean(selectedTopic) &&
//     Boolean(learningMode);

//   return (
//     <main className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-6 lg:px-8">
//       <div className="mx-auto w-full max-w-5xl">

//         {/* ---------------------------------------------------------------- */}
//         {/* PAGE HEADER                                                       */}
//         {/* ---------------------------------------------------------------- */}

//         <header className="mb-8 text-center">
//           <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-blue-300">
//             🎬 Interactive Learning Arena
//           </div>

//           <h1 className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
//             What do you want to learn?
//           </h1>

//           <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
//             Choose a subject, pick a topic, and select
//             how you want to learn.
//           </p>
//         </header>

//         {/* ---------------------------------------------------------------- */}
//         {/* SETUP CARD                                                        */}
//         {/* ---------------------------------------------------------------- */}

//         <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-2xl">

//           {/* ============================================================ */}
//           {/* STEP 1 — SUBJECT                                             */}
//           {/* ============================================================ */}

//           <div className="border-b border-white/10 p-6 sm:p-8">

//             <div className="mb-5 flex items-center gap-3">
//               <StepNumber number="01" />

//               <div>
//                 <h2 className="text-lg font-black sm:text-xl">
//                   Select Subject
//                 </h2>

//                 <p className="text-xs text-slate-500 sm:text-sm">
//                   What subject are you studying?
//                 </p>
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
//               {SUBJECTS.map(
//                 (subject) => {
//                   const isSelected =
//                     selectedSubject ===
//                     subject.name;

//                   return (
//                     <button
//                       key={subject.name}
//                       type="button"
//                       onClick={() =>
//                         handleSubjectChange(
//                           subject.name
//                         )
//                       }
//                       className={[
//                         "group relative rounded-2xl border p-4 text-left transition-all duration-200 sm:p-5",
//                         isSelected
//                           ? "border-blue-400/50 bg-blue-500/10 shadow-lg shadow-blue-500/5"
//                           : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]",
//                       ].join(" ")}
//                     >
//                       <div className="flex items-center justify-between gap-2">
//                         <span
//                           className={[
//                             "text-sm font-bold sm:text-base",
//                             isSelected
//                               ? "text-blue-300"
//                               : "text-white",
//                           ].join(" ")}
//                         >
//                           {subject.name}
//                         </span>

//                         {isSelected && (
//                           <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-500 text-xs font-black text-white">
//                             ✓
//                           </span>
//                         )}
//                       </div>
//                     </button>
//                   );
//                 }
//               )}
//             </div>
//           </div>

//           {/* ============================================================ */}
//           {/* STEP 2 — TOPIC                                               */}
//           {/* ============================================================ */}

//           <div className="border-b border-white/10 p-6 sm:p-8">

//             <div className="mb-5 flex items-center gap-3">
//               <StepNumber number="02" />

//               <div>
//                 <h2 className="text-lg font-black sm:text-xl">
//                   Select Topic
//                 </h2>

//                 <p className="text-xs text-slate-500 sm:text-sm">
//                   {selectedSubject
//                     ? `Choose a ${selectedSubject} topic`
//                     : "Select a subject first"}
//                 </p>
//               </div>
//             </div>

//             {!selectedSubject ? (
//               <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-8 text-center">
//                 <div className="text-3xl">
//                   📚
//                 </div>

//                 <p className="mt-3 text-sm font-medium text-slate-500">
//                   Select a subject to see available topics.
//                 </p>
//               </div>
//             ) : (
                
//               <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
//   {topics.map((topic) => {
//     const isSelected =
//       selectedTopic === topic.name;

//     return (
//       <button
//         key={topic.name}
//         type="button"
//         onClick={() =>
//           setSelectedTopic(topic.name)
//         }
//         className={[
//           "rounded-2xl border p-4 text-left transition-all duration-200",
//           isSelected
//             ? "border-purple-400/50 bg-purple-500/10 text-purple-300 shadow-lg shadow-purple-500/5"
//             : "border-white/10 bg-white/[0.02] text-slate-300 hover:border-white/20 hover:bg-white/[0.05]",
//         ].join(" ")}
//       >
//         <div className="flex items-center justify-between gap-3">
//           <span className="text-sm font-semibold">
//             {topic.name}
//           </span>

//           {isSelected && (
//             <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-500 text-[10px] font-black text-white">
//               ✓
//             </span>
//           )}
//         </div>
//       </button>
//     );
//   })}
// </div>
//             )}
//           </div>

//           {/* ============================================================ */}
//           {/* STEP 3 — LEARNING MODE                                      */}
//           {/* ============================================================ */}

//           <div className="border-b border-white/10 p-6 sm:p-8">

//             <div className="mb-5 flex items-center gap-3">
//               <StepNumber number="03" />

//               <div>
//                 <h2 className="text-lg font-black sm:text-xl">
//                   Choose Learning Mode
//                 </h2>

//                 <p className="text-xs text-slate-500 sm:text-sm">
//                   How do you want to learn?
//                 </p>
//               </div>
//             </div>

//             <div className="grid gap-4 md:grid-cols-2">

//               {/* Interactive Lesson */}

//               <LearningModeCard
//                 selected={
//                   learningMode ===
//                   "interactive"
//                 }
//                 onClick={() =>
//                   setLearningMode(
//                     "interactive"
//                   )
//                 }
//                 icon="🎬"
//                 title="Interactive Lesson"
//                 description="Watch → Listen → Think → Answer → Learn"
//               />

//               {/* Practice Questions */}

//               <LearningModeCard
//                 selected={
//                   learningMode ===
//                   "practice"
//                 }
//                 onClick={() =>
//                   setLearningMode(
//                     "practice"
//                   )
//                 }
//                 icon="📝"
//                 title="Practice Questions"
//                 description="Answer questions directly"
//               />

//             </div>
//           </div>

//           {/* ============================================================ */}
//           {/* START                                                         */}
//           {/* ============================================================ */}

//           <div className="p-6 sm:p-8">

//             {/* Selection summary */}

//             {canStart && (
//               <div className="mb-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
//                 <div className="text-xs font-bold uppercase tracking-widest text-slate-500">
//                   Your Lesson
//                 </div>

//                 <div className="mt-2 flex flex-wrap items-center gap-2 text-sm font-semibold">
//                   <span className="rounded-lg bg-blue-500/10 px-3 py-1.5 text-blue-300">
//                     {selectedSubject}
//                   </span>

//                   <span className="text-slate-600">
//                     →
//                   </span>

//                   <span className="rounded-lg bg-purple-500/10 px-3 py-1.5 text-purple-300">
//                     {selectedTopic}
//                   </span>

//                   <span className="text-slate-600">
//                     →
//                   </span>

//                   <span className="rounded-lg bg-white/5 px-3 py-1.5 text-slate-300">
//                     {learningMode ===
//                     "interactive"
//                       ? "Interactive Lesson"
//                       : "Practice Questions"}
//                   </span>
//                 </div>
//               </div>
//             )}

//             <button
//               type="button"
//               disabled={!canStart}
//               onClick={
//                 handleStartLesson
//               }
//               className="group w-full rounded-2xl bg-blue-600 px-6 py-4 text-base font-black text-white shadow-xl shadow-blue-900/20 transition-all duration-200 hover:bg-blue-500 hover:shadow-blue-900/30 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-600 disabled:shadow-none"
//             >
//               <span className="flex items-center justify-center gap-2">
//                 {learningMode ===
//                 "interactive"
//                   ? "Start Interactive Lesson"
//                   : "Start Practice"}

//                 <span className="transition-transform group-hover:translate-x-1">
//                   →
//                 </span>
//               </span>
//             </button>

//             {!canStart && (
//               <p className="mt-3 text-center text-xs text-slate-600">
//                 Select a subject and topic to continue.
//               </p>
//             )}
//           </div>
//         </section>

//         {/* ---------------------------------------------------------------- */}
//         {/* FOOTER                                                          */}
//         {/* ---------------------------------------------------------------- */}

//         <p className="mt-6 text-center text-xs text-slate-600">
//           Learn at your own pace. Listen, think, answer,
//           and understand.
//         </p>
//       </div>
//     </main>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* STEP NUMBER                                                                */
// /* -------------------------------------------------------------------------- */

// function StepNumber({
//   number,
// }: {
//   number: string;
// }) {
//   return (
//     <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-xs font-black text-slate-400">
//       {number}
//     </div>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /* LEARNING MODE CARD                                                         */
// /* -------------------------------------------------------------------------- */

// interface LearningModeCardProps {
//   selected: boolean;
//   onClick: () => void;
//   icon: string;
//   title: string;
//   description: string;
// }

// function LearningModeCard({
//   selected,
//   onClick,
//   icon,
//   title,
//   description,
// }: LearningModeCardProps) {
//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       className={[
//         "relative rounded-2xl border p-5 text-left transition-all duration-200",
//         selected
//           ? "border-emerald-400/40 bg-emerald-500/10 shadow-lg shadow-emerald-500/5"
//           : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]",
//       ].join(" ")}
//     >
//       {/* Selected indicator */}

//       {selected && (
//         <div className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-xs font-black text-white">
//           ✓
//         </div>
//       )}

//       <div className="text-3xl">
//         {icon}
//       </div>

//       <h3
//         className={[
//           "mt-4 text-base font-black",
//           selected
//             ? "text-emerald-300"
//             : "text-white",
//         ].join(" ")}
//       >
//         {title}
//       </h3>

//       <p className="mt-2 pr-6 text-sm leading-relaxed text-slate-500">
//         {description}
//       </p>
//     </button>
//   );
// }