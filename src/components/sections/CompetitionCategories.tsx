



"use client";

import {
  BookOpen,
  Target,
  School,
  Swords,
} from "lucide-react";

import {
  cn,
} from "@/lib/utils";

import Container from "@/components/layout/Container";




const competitions = [

  {
    title: "UTME Challenge",

    description:
      "Compete with students nationwide using JAMB-style questions designed to test your readiness.",

    icon: Target,

    badge: "Popular",

  },


  {
    title: "Subject Battles",

    description:
      "Challenge other teams in specific subjects like Mathematics, English, Physics, Chemistry, and Biology.",

    icon: Swords,

    badge: "Team Mode",

  },


  {
    title: "Mock Exam League",

    description:
      "Take realistic JAMB mock exams and compare your performance with other students.",

    icon: BookOpen,

    badge: "Practice",

  },


  {
    title: "School Championship",

    description:
      "Schools compete against each other to become the top academic institution.",

    icon: School,

    badge: "Schools",

  },

];








export default function CompetitionCategories() {


  return (

    <section

      className="bg-slate-50 py-20"

    >


      <Container>



        {/* Header */}

        <div

          className="mx-auto mb-12 max-w-2xl text-center"

        >


          <p

            className="mb-3 text-sm font-semibold text-blue-600"

          >

            Competitions

          </p>



          <h2

            className={cn(

              "text-3xl",

              "font-bold",

              "text-slate-900",

              "sm:text-4xl"

            )}

          >

            Choose your challenge

          </h2>




          <p

            className="mt-4 text-slate-600"

          >

            Different competition formats designed to help
            students learn, practice, and compete.

          </p>



        </div>









        {/* Cards */}

        <div

          className={cn(

            "grid",

            "gap-8",

            "sm:grid-cols-2",

            "lg:grid-cols-4"

          )}

        >



          {
            competitions.map(

              (competition) => {


                const Icon =
                  competition.icon;



                return (

                  <div

                    key={
                      competition.title
                    }

                    className={cn(

                      "group",

                      "rounded-2xl",

                      "border",

                      "bg-white",

                      "p-6",

                      "transition",

                      "hover:-translate-y-1",

                      "hover:shadow-xl"

                    )}

                  >





                    <div

                      className="mb-5 flex items-center justify-between"

                    >


                      <div

                        className={cn(

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






                      <span

                        className={cn(

                          "rounded-full",

                          "bg-blue-50",

                          "px-3",

                          "py-1",

                          "text-xs",

                          "font-medium",

                          "text-blue-600"

                        )}

                      >

                        {
                          competition.badge
                        }

                      </span>


                    </div>







                    <h3

                      className="mb-3 text-lg font-bold text-slate-900"

                    >

                      {
                        competition.title
                      }

                    </h3>








                    <p

                      className="text-sm leading-6 text-slate-600"

                    >

                      {
                        competition.description
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