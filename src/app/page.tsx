




import Hero from "@/components/hero/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import CompetitionCategories from "@/components/sections/CompetitionCategories";
import LeaderboardPreview from "@/components/sections/LeaderboardPreview";
import PracticePreview from "@/components/sections/PracticePreview";
import Testimonials from "@/components/sections/Testimonials";

import CompetitionOverview from "@/components/competition/CompetitionOverview";
import CompetitionPrize from "@/components/competition/CompetitionPrize";

export default function HomePage() {
  return (
    <main className="overflow-x-hidden">
      <Hero />

      <HowItWorks />

      <CompetitionCategories />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <CompetitionOverview
            title="JAMB League 2027 Championship"
            subject="All UTME Subjects"
            description="Form a team of three students, compete with schools and teams across Nigeria, improve your UTME preparation, climb the leaderboard, and win amazing prizes."
            startDate="January 2027"
            teamsJoined={250}
            maxTeams={1000}
            prize="₦1,000,000 Prize Pool"
            entryFee="Free"
            joinHref="/competitions/2027/auth/register"
          />
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          <CompetitionPrize
            totalPrize="₦1,000,000"
            prizes={[
              {
                position: "🥇 First Place",
                reward: "₦500,000 Scholarship",
                description:
                  "Scholarship support, medals, certificates and national recognition.",
              },
              {
                position: "🥈 Second Place",
                reward: "₦300,000 Scholarship",
                description:
                  "Scholarship support, medals and certificates.",
              },
              {
                position: "🥉 Third Place",
                reward: "₦200,000 Scholarship",
                description:
                  "Scholarship support and certificates.",
              },
            ]}
          />
        </div>
      </section>

      <LeaderboardPreview />

      <PracticePreview />

      <Testimonials />
    </main>
  );
}