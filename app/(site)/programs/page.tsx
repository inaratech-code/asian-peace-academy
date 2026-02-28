import { SectionWrapper } from "@/components/SectionWrapper";
import { ProgramCard } from "@/components/ProgramCard";
import { readJsonFileSafe } from "@/lib/fileHandler";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Explore our programs in peace leadership, mediation, youth fellowship, and women in peace and security.",
};

interface Program {
  id: string;
  title: string;
  slug: string;
  duration: string;
  format: string;
  description: string;
  highlights: string[];
  ctaText: string;
}

export default async function ProgramsPage() {
  const data = await readJsonFileSafe<{ programs?: Program[] }>("programs.json", { programs: [] });
  const programs = Array.isArray(data.programs) ? data.programs : [];

  return (
    <main>
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-soft-blue/20 to-primary-100/10" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
          <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl md:text-5xl">
            Our Programs
          </h1>
          <p className="mt-4 sm:mt-6 max-w-2xl text-base sm:text-lg text-slate-600">
            From intensive short courses to year-long fellowships, our programs are designed to
            build practical skills and lasting networks.
          </p>
        </div>
      </section>

      <SectionWrapper>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {programs.map((p) => (
            <ProgramCard key={p.id} {...p} />
          ))}
        </div>
      </SectionWrapper>
    </main>
  );
}
