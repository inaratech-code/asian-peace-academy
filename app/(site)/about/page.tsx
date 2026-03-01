import { readJsonFileSafe } from "@/lib/fileHandler";
import type { Metadata } from "next";
import { AboutContent } from "@/components/AboutContent";

export const metadata: Metadata = {
  title: "About Us",
  description: "About Us – asian peace academy",
};

interface AboutData {
  about?: {
    sectionTitle?: string;
    orgName?: string;
    intro?: string;
    intro2?: string;
    keyAreasHeading?: string;
    pillars?: Array<{ title: string; body: string }>;
  };
}

const fallbackAbout = {
  sectionTitle: "Who we are",
  orgName: "Asian Academy for Peace, Research and Development",
  intro: "",
  intro2: "",
  keyAreasHeading: "Key areas of Asian Peace Academy involve",
  pillars: [] as Array<{ title: string; body: string }>,
};

export default async function AboutPage() {
  const content = await readJsonFileSafe<AboutData>("content.json", {});
  const about = content.about ?? fallbackAbout;
  const sectionTitle = about.sectionTitle ?? fallbackAbout.sectionTitle;
  const orgName = about.orgName ?? fallbackAbout.orgName;
  const intro = about.intro ?? fallbackAbout.intro;
  const intro2 = about.intro2 ?? fallbackAbout.intro2;
  const keyAreasHeading = about.keyAreasHeading ?? fallbackAbout.keyAreasHeading;
  const pillars = Array.isArray(about.pillars) ? about.pillars : fallbackAbout.pillars;

  return (
    <main>
      <AboutContent
        sectionTitle={sectionTitle}
        orgName={orgName}
        intro={intro}
        intro2={intro2}
        keyAreasHeading={keyAreasHeading}
        pillars={pillars}
      />
    </main>
  );
}
