import { readJsonFileSafe } from "@/lib/fileHandler";
import type { Metadata } from "next";
import { AboutContent } from "@/components/AboutContent";

export const metadata: Metadata = {
  title: "About Us",
  description: "About Us – asian peace academy",
};

interface AboutData {
  about?: {
    intro?: string;
    pillars?: Array<{ title: string; body: string }>;
    team?: Array<{ name: string; role: string; slug: string }>;
  };
}

const fallbackAbout = {
  intro: "The organisation is governed by an eleven-member board of directors.",
  pillars: [] as Array<{ title: string; body: string }>,
  team: [] as Array<{ name: string; role: string; slug: string }>,
};

export default async function AboutPage() {
  const content = await readJsonFileSafe<AboutData>("content.json", {});
  const about = content.about ?? fallbackAbout;
  const intro = about.intro ?? fallbackAbout.intro;
  const pillars = Array.isArray(about.pillars) ? about.pillars : fallbackAbout.pillars;
  const team = Array.isArray(about.team) ? about.team : fallbackAbout.team;

  return (
    <main>
      <AboutContent intro={intro} pillars={pillars} team={team} />
    </main>
  );
}
