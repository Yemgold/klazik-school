




"use client";

import Link from "next/link";

import {
  Trophy,
  Users,
  GraduationCap,
} from "lucide-react";


import {
  cn,
} from "@/lib/utils";


import Container from "@/components/layout/Container";





const stats = [

  {
    icon: Trophy,

    value: "100+",

    label: "Competitions",

  },


  {
    icon: Users,

    value: "10K+",

    label: "Students",

  },


  {
    icon: GraduationCap,

    value: "500+",

    label: "Schools",

  },

];








export default function Hero() {


  return (

    <section

      className={cn(

        "relative",

        "overflow-hidden",

        "bg-gradient-to-br",

        "from-blue-700",

        "via-blue-600",

        "to-indigo-800",

        "text-white"

      )}

    >




      {/* Background blur */}

      <div

        className={cn(

          "absolute",

          "inset-0",

          "opacity-20",

          "bg-[radial-gradient(circle_at_top_right,_white,_transparent_40%)]"

        )}

      />







      <Container>


        <div

          className={cn(

            "relative",

            "grid",

            "min-h-[85vh]",

            "items-center",

            "gap-12",

            "py-20",

            "lg:grid-cols-2"

          )}

        >







          {/* Content */}

          <div

            className="space-y-8"

          >




            <div

              className={cn(

                "inline-flex",

                "items-center",

                "gap-2",

                "rounded-full",

                "bg-white/10",

                "px-4",

                "py-2",

                "text-sm",

                "backdrop-blur"

              )}

            >

              <Trophy

                size={18}

              />

              Nigeria's Premier JAMB Competition

            </div>








            <h1

              className={cn(

                "text-4xl",

                "font-extrabold",

                "leading-tight",

                "sm:text-5xl",

                "lg:text-6xl"

              )}

            >

              Compete.

              Learn.

              <br />

             

              <span

                className="text-yellow-300"

              >

                Score Higher

              </span>

              .

            </h1>








            <p

              className={cn(

                "max-w-xl",

                "text-lg",

                "leading-8",

                "text-blue-100"

              )}

            >

              Join thousands of students across Nigeria

              in a competitive JAMB preparation league.

              Form your team, practice together, and

              become champions.

            </p>








            <div

              className="flex flex-wrap gap-4"

            >




              <Link

                href="/register"

                className={cn(

                  "rounded-xl",

                  "bg-yellow-400",

                  "px-6",

                  "py-3",

                  "font-semibold",

                  "text-slate-900",

                  "transition",

                  "hover:bg-yellow-300"

                )}

              >

                Join Competition

              </Link>







              <Link

                href="/competitions"

                className={cn(

                  "rounded-xl",

                  "border",

                  "border-white/40",

                  "px-6",

                  "py-3",

                  "font-semibold",

                  "text-white",

                  "transition",

                  "hover:bg-white/10"

                )}

              >

                Explore Competitions

              </Link>




            </div>





          </div>









          {/* Stats Card */}

          <div

            className={cn(

              "rounded-3xl",

              "border",

              "border-white/20",

              "bg-white/10",

              "p-8",

              "backdrop-blur-lg"

            )}

          >



            <h3

              className="mb-6 text-xl font-bold"

            >

              Why Students Join

            </h3>






            <div

              className="space-y-5"

            >


              {
                stats.map(

                  (item) => {


                    const Icon =
                      item.icon;


                    return (

                      <div

                        key={
                          item.label
                        }

                        className="flex items-center gap-4"

                      >


                        <div

                          className={cn(

                            "flex",

                            "h-12",

                            "w-12",

                            "items-center",

                            "justify-center",

                            "rounded-xl",

                            "bg-white/20"

                          )}

                        >

                          <Icon />

                        </div>





                        <div>


                          <p

                            className="text-2xl font-bold"

                          >

                            {
                              item.value
                            }

                          </p>



                          <p

                            className="text-sm text-blue-100"

                          >

                            {
                              item.label
                            }

                          </p>


                        </div>



                      </div>


                    );


                  }

                )
              }


            </div>



          </div>







        </div>


      </Container>


    </section>

  );

}