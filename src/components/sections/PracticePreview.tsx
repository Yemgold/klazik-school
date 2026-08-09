


"use client";

import Link from "next/link";

import {
  CheckCircle,
  Clock,
  BookOpen,
} from "lucide-react";

import {
  cn,
} from "@/lib/utils";

import Container from "@/components/layout/Container";





const options = [
  "3",
  "5",
  "10",
  "15",
];







export default function PracticePreview() {


  return (

    <section

      className="bg-slate-50 py-20"

    >

      <Container>


        <div

          className={cn(

            "grid",

            "items-center",

            "gap-12",

            "lg:grid-cols-2"

          )}

        >






          {/* Content */}

          <div

            className="space-y-6"

          >



            <p

              className="text-sm font-semibold text-blue-600"

            >

              Practice Engine

            </p>





            <h2

              className="text-3xl font-bold text-slate-900 sm:text-4xl"

            >

              Prepare smarter before the competition

            </h2>





            <p

              className="leading-7 text-slate-600"

            >

              Practice JAMB-style questions, improve your
              speed, track your progress, and prepare with
              your team before competing.

            </p>






            <div

              className="space-y-4"

            >


              <div

                className="flex items-center gap-3"

              >

                <CheckCircle

                  className="text-green-500"

                  size={20}

                />

                <span className="text-slate-700">

                  Thousands of JAMB practice questions

                </span>

              </div>





              <div

                className="flex items-center gap-3"

              >

                <Clock

                  className="text-blue-600"

                  size={20}

                />

                <span className="text-slate-700">

                  Timed examination experience

                </span>

              </div>






              <div

                className="flex items-center gap-3"

              >

                <BookOpen

                  className="text-purple-600"

                  size={20}

                />

                <span className="text-slate-700">

                  Multiple subjects and difficulty levels

                </span>

              </div>


            </div>








            <Link

              href="/student/arena"

              className={cn(

                "inline-flex",

                "rounded-xl",

                "bg-blue-600",

                "px-6",

                "py-3",

                "font-semibold",

                "text-white",

                "transition",

                "hover:bg-blue-700"

              )}

            >

              Start Practicing

            </Link>



          </div>









          {/* Question Preview */}

          <div

            className={cn(

              "rounded-3xl",

              "border",

              "bg-white",

              "p-6",

              "shadow-lg"

            )}

          >





            {/* Header */}

            <div

              className="mb-6 flex items-center justify-between"

            >


              <div

                className="flex items-center gap-3"

              >

                <div

                  className={cn(

                    "flex",

                    "h-10",

                    "w-10",

                    "items-center",

                    "justify-center",

                    "rounded-xl",

                    "bg-blue-100",

                    "text-blue-600"

                  )}

                >

                  <BookOpen size={20}/>

                </div>



                <div>

                  <p

                    className="text-sm font-semibold text-slate-900"

                  >

                    Mathematics

                  </p>


                  <p

                    className="text-xs text-slate-500"

                  >

                    Question 24 of 50

                  </p>


                </div>


              </div>







              <span

                className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700"

              >

                Medium

              </span>



            </div>








            {/* Question */}

            <h3

              className="mb-6 text-lg font-semibold text-slate-900"

            >

              If x + 5 = 10, what is the value of x?

            </h3>







            {/* Options */}

            <div

              className="space-y-3"

            >


              {
                options.map(

                  (option, index) => (

                    <div

                      key={option}

                      className={cn(

                        "flex",

                        "items-center",

                        "justify-between",

                        "rounded-xl",

                        "border",

                        "px-4",

                        "py-3",

                        index === 1 && [

                          "border-green-500",

                          "bg-green-50",

                        ]

                      )}

                    >


                      <span

                        className="text-slate-700"

                      >

                        {String.fromCharCode(65 + index)}. {option}

                      </span>



                      {
                        index === 1 && (

                          <CheckCircle

                            size={18}

                            className="text-green-600"

                          />

                        )
                      }



                    </div>

                  )

                )
              }


            </div>







          </div>




        </div>



      </Container>


    </section>

  );

}