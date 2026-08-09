



"use client";

import {
  Users,
  ClipboardCheck,
  Brain,
  Trophy,
} from "lucide-react";


import {
  cn,
} from "@/lib/utils";


import Container from "@/components/layout/Container";




const steps = [

  {
    number: "01",

    title: "Create Your Team",

    description:
      "Form a team of three students and prepare together for the competition.",

    icon: Users,

  },


  {
    number: "02",

    title: "Register Competition",

    description:
      "Choose your competition category and register your team for the challenge.",

    icon: ClipboardCheck,

  },


  {
    number: "03",

    title: "Practice & Compete",

    description:
      "Answer JAMB-style questions, improve your skills, and compete with other teams.",

    icon: Brain,

  },


  {
    number: "04",

    title: "Climb The Leaderboard",

    description:
      "Earn points, rank higher, and become one of the top-performing teams.",

    icon: Trophy,

  },

];







export default function HowItWorks() {


  return (

    <section

      className="py-20"

    >

      <Container>


        {/* Heading */}

        <div

          className="mx-auto mb-12 max-w-2xl text-center"

        >

          <p

            className="mb-3 text-sm font-semibold text-blue-600"

          >

            How It Works

          </p>



          <h2

            className={cn(

              "text-3xl",

              "font-bold",

              "text-slate-900",

              "sm:text-4xl"

            )}

          >

            Start competing in four simple steps

          </h2>



          <p

            className="mt-4 text-slate-600"

          >

            Join thousands of students preparing for JAMB
            through teamwork and healthy competition.

          </p>


        </div>









        {/* Steps */}

        <div

          className={cn(

            "grid",

            "gap-8",

            "sm:grid-cols-2",

            "lg:grid-cols-4"

          )}

        >



          {
            steps.map(

              (step) => {


                const Icon =
                  step.icon;


                return (

                  <div

                    key={
                      step.number
                    }

                    className={cn(

                      "relative",

                      "rounded-2xl",

                      "border",

                      "bg-white",

                      "p-6",

                      "transition",

                      "hover:-translate-y-1",

                      "hover:shadow-lg"

                    )}

                  >



                    <span

                      className={cn(

                        "absolute",

                        "right-5",

                        "top-5",

                        "text-5xl",

                        "font-bold",

                        "text-slate-100"

                      )}

                    >

                      {
                        step.number
                      }

                    </span>







                    <div

                      className={cn(

                        "mb-5",

                        "flex",

                        "h-12",

                        "w-12",

                        "items-center",

                        "justify-center",

                        "rounded-xl",

                        "bg-blue-100",

                        "text-blue-600"

                      )}

                    >

                      <Icon size={24}/>


                    </div>






                    <h3

                      className="mb-3 text-lg font-semibold text-slate-900"

                    >

                      {
                        step.title
                      }

                    </h3>






                    <p

                      className="text-sm leading-6 text-slate-600"

                    >

                      {
                        step.description
                      }

                    </p>



                  </div>

                );


              }

            )
          }


        </div>



      </Container>


    </section>

  );

}