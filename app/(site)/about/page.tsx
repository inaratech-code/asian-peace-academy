import { readJsonFile } from "@/lib/fileHandler";
import type { Metadata } from "next";
import { AboutContent } from "@/components/AboutContent";

export const metadata: Metadata = {
  title: "About Us",
  description: "About Us – asian peace academy",
};

interface AboutData {
  about: {
    intro: string;
    pillars: Array<{ title: string; body: string }>;
    team: Array<{ name: string; role: string; slug: string }>;
  };
}

export default async function AboutPage() {
  const content = await readJsonFile<AboutData>("content.json");
  const { intro, pillars, team } = content.about;

  return (
    <main>
      <AboutContent intro={intro} pillars={pillars} team={team} />
    </main>
  );
}
