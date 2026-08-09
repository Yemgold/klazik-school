


"use client";

import {
  Quote,
  Star,
} from "lucide-react";

import {
  cn,
} from "@/lib/utils";

import Container from "@/components/layout/Container";





const testimonials = [

  {
    name: "David Adewale",

    role: "JAMB Candidate",

    school: "Lagos",

    message:
      "JAMB League helped me practice consistently and compete with my friends. It made preparation more exciting.",

  },


  {
    name: "Sarah Okeke",

    role: "Science Student",

    school: "Enugu",

    message:
      "The team competition format motivated us to study harder and improve our scores.",

  },


  {
    name: "Michael Yusuf",

    role: "Team Captain",

    school: "Abuja",

    message:
      "The leaderboard experience made learning feel like a real challenge. We enjoyed every competition.",

  },

];









export default function Testimonials() {


  return (

    <section

      className="py-20"

    >

      <Container>


        {/* Header */}

        <div

          className="mx-auto mb-12 max-w-2xl text-center"

        >


          <p

            className="mb-3 text-sm font-semibold text-blue-600"

          >

            Student Stories

          </p>




          <h2

            className="text-3xl font-bold text-slate-900 sm:text-4xl"

          >

            Students love competing with JAMB League

          </h2>




          <p

            className="mt-4 text-slate-600"

          >

            See how students are preparing smarter,
            competing together, and improving their
            JAMB readiness.

          </p>


        </div>









        {/* Cards */}

        <div

          className={cn(

            "grid",

            "gap-8",

            "md:grid-cols-3"

          )}

        >



          {
            testimonials.map(

              (item) => (

                <div

                  key={
                    item.name
                  }

                  className={cn(

                    "rounded-2xl",

                    "border",

                    "bg-white",

                    "p-6",

                    "transition",

                    "hover:-translate-y-1",

                    "hover:shadow-lg"

                  )}

                >




                  {/* Stars */}

                  <div

                    className="mb-5 flex gap-1"

                  >

                    {
                      Array.from({

                        length: 5

                      }).map(

                        (_, index) => (

                          <Star

                            key={index}

                            size={18}

                            className="fill-yellow-400 text-yellow-400"

                          />

                        )

                      )
                    }


                  </div>







                  {/* Quote */}

                  <div

                    className="mb-5"

                  >

                    <Quote

                      size={28}

                      className="mb-3 text-blue-600"

                    />



                    <p

                      className="leading-7 text-slate-600"

                    >

                      {item.message}

                    </p>


                  </div>









                  {/* User */}

                  <div>

                    <h3

                      className="font-semibold text-slate-900"

                    >

                      {item.name}

                    </h3>


                    <p

                      className="text-sm text-slate-500"

                    >

                      {item.role} · {item.school}

                    </p>


                  </div>



                </div>

              )

            )
          }


        </div>





      </Container>


    </section>

  );

}