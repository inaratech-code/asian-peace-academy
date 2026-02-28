"use client";

import Link from "next/link";
import { ScrollReveal, ScrollStagger, ScrollStaggerItem } from "./ScrollReveal";

interface AboutContentProps {
  intro: string;
  pillars: Array<{ title: string; body: string }>;
  team: Array<{ name: string; role: string; slug: string }>;
}

export function AboutContent({ intro, pillars, team }: AboutContentProps) {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12 md:px-8">
      <ScrollReveal>
        <h1 className="text-2xl font-semibold text-primary-800 mb-6">About Us</h1>
        <p className="text-slate-700 leading-relaxed mb-10">{intro}</p>
      </ScrollReveal>

      {pillars.map((pillar, i) => (
        <ScrollReveal key={pillar.title} delay={i * 0.08} y={40}>
          <section className="mb-10">
            <h2 className="text-lg font-semibold text-slate-900 mb-2">
              <Link href="/about" className="text-primary-600 hover:text-primary-700">
                {pillar.title}
              </Link>
            </h2>
            <p className="text-slate-700 leading-relaxed">{pillar.body}</p>
          </section>
        </ScrollReveal>
      ))}

      <ScrollReveal y={40}>
        <div className="mt-12 pt-8 border-t border-slate-200" id="team">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Team</h2>
          <ScrollStagger className="space-y-3" staggerDelay={0.08}>
            {team.map((member) => (
              <ScrollStaggerItem key={member.slug}>
                <div>
                  <Link
                    href={`/team/${member.slug}`}
                    className="font-medium text-primary-600 hover:text-primary-700"
                  >
                    {member.name}
                  </Link>
                  <span className="block text-sm text-slate-600">{member.role}</span>
                </div>
              </ScrollStaggerItem>
            ))}
          </ScrollStagger>
        </div>
      </ScrollReveal>
    </div>
  );
}
