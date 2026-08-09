


"use client";

import Link from "next/link";

import {
  Trophy,
  Medal,
  Crown,
} from "lucide-react";


import {
  cn,
} from "@/lib/utils";


import Container from "@/components/layout/Container";





const leaderboard = [

  {
    rank: 1,

    team: "Team Champions",

    school: "Lagos Science Academy",

    score: 985,

  },


  {
    rank: 2,

    team: "Future Leaders",

    school: "Abuja College",

    score: 942,

  },


  {
    rank: 3,

    team: "Brain Masters",

    school: "Ibadan High School",

    score: 918,

  },


  {
    rank: 4,

    team: "JAMB Stars",

    school: "Kano Model School",

    score: 884,

  },

];







function RankIcon({
  rank,
}: {
  rank: number;
}) {


  if (rank === 1) {

    return (

      <Crown

        size={22}

        className="text-yellow-500"

      />

    );

  }



  if (rank === 2) {

    return (

      <Medal

        size={22}

        className="text-slate-400"

      />

    );

  }



  if (rank === 3) {

    return (

      <Medal

        size={22}

        className="text-orange-500"

      />

    );

  }



  return (

    <span

      className="font-semibold text-slate-500"

    >

      {rank}

    </span>

  );

}







export default function LeaderboardPreview() {


  return (

    <section

      className="py-20"

    >

      <Container>



        <div

          className="mx-auto mb-12 max-w-2xl text-center"

        >

          <p

            className="mb-3 text-sm font-semibold text-blue-600"

          >

            Leaderboard

          </p>



          <h2

            className="text-3xl font-bold text-slate-900 sm:text-4xl"

          >

            Compete. Rank. Become a Champion.

          </h2>



          <p

            className="mt-4 text-slate-600"

          >

            Track your team's performance and see how
            you compare with students across Nigeria.

          </p>


        </div>









        <div

          className={cn(

            "mx-auto",

            "max-w-4xl",

            "overflow-hidden",

            "rounded-3xl",

            "border",

            "bg-white",

            "shadow-sm"

          )}

        >



          {/* Header */}

          <div

            className={cn(

              "flex",

              "items-center",

              "gap-3",

              "border-b",

              "bg-slate-50",

              "px-6",

              "py-5"

            )}

          >

            <div

              className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white"

            >

              <Trophy size={22}/>

            </div>



            <div>


              <h3

                className="font-bold text-slate-900"

              >

                National Rankings

              </h3>


              <p

                className="text-sm text-slate-500"

              >

                JAMB League 2027 Championship

              </p>


            </div>


          </div>









          {/* Rows */}

          <div

            className="divide-y"

          >

            {
              leaderboard.map(

                (item) => (

                  <div

                    key={
                      item.rank
                    }

                    className={cn(

                      "flex",

                      "items-center",

                      "justify-between",

                      "px-6",

                      "py-5",

                      "transition",

                      "hover:bg-slate-50"

                    )}

                  >


                    <div

                      className="flex items-center gap-4"

                    >

                      <div

                        className="flex w-8 justify-center"

                      >

                        <RankIcon

                          rank={
                            item.rank
                          }

                        />

                      </div>






                      <div>


                        <h4

                          className="font-semibold text-slate-900"

                        >

                          {
                            item.team
                          }

                        </h4>



                        <p

                          className="text-sm text-slate-500"

                        >

                          {
                            item.school
                          }

                        </p>


                      </div>


                    </div>







                    <div

                      className="text-right"

                    >

                      <p

                        className="font-bold text-blue-600"

                      >

                        {
                          item.score
                        }

                      </p>


                      <p

                        className="text-xs text-slate-500"

                      >

                        Points

                      </p>


                    </div>



                  </div>

                )

              )
            }


          </div>








          {/* CTA */}

          <div

            className="border-t p-6 text-center"

          >

            <Link

              href="/leaderboard"

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

              View Full Leaderboard

            </Link>


          </div>




        </div>




      </Container>


    </section>

  );

}