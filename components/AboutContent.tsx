"use client";

import Link from "next/link";
import { ScrollReveal } from "./ScrollReveal";

interface AboutContentProps {
  sectionTitle?: string;
  orgName?: string;
  intro: string;
  intro2?: string;
  keyAreasHeading?: string;
  pillars: Array<{ title: string; body: string }>;
}

export function AboutContent({
  sectionTitle = "Who we are",
  orgName,
  intro,
  intro2,
  keyAreasHeading = "Key areas of Asian Peace Academy involve",
  pillars,
}: AboutContentProps) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-12 md:px-8">
      <ScrollReveal>
        <h1 className="text-2xl font-semibold text-primary-800 mb-2">{sectionTitle}</h1>
        {orgName && (
          <p className="text-lg font-medium text-slate-800 mb-6">{orgName}</p>
        )}
        {intro && (
          <p className="text-slate-700 leading-relaxed text-justify mb-4">{intro}</p>
        )}
        {intro2 && (
          <p className="text-slate-700 leading-relaxed text-justify mb-10">{intro2}</p>
        )}
      </ScrollReveal>

      {pillars.length > 0 && (
        <>
          <ScrollReveal y={40}>
            <h2 className="text-lg font-semibold text-slate-900 mb-4">{keyAreasHeading}</h2>
          </ScrollReveal>
          {pillars.map((pillar, i) => (
            <ScrollReveal key={pillar.title} delay={i * 0.08} y={40}>
              <section className="mb-10">
                <h3 className="text-base font-semibold text-slate-900 mb-2">
                  <Link href="/about" className="text-primary-600 hover:text-primary-700">
                    {pillar.title}
                  </Link>
                </h3>
                <p className="text-slate-700 leading-relaxed text-justify">{pillar.body}</p>
              </section>
            </ScrollReveal>
          ))}
        </>
      )}
    </div>
  );
}
