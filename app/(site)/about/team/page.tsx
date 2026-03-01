import Link from "next/link";
import { readJsonFileSafe } from "@/lib/fileHandler";
import type { Metadata } from "next";
import { ScrollReveal, ScrollStagger, ScrollStaggerItem } from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Team Of Expert",
  description: "Team Of Expert – Asian Peace Academy",
};

interface AboutData {
  about?: {
    team?: Array<{ name: string; role: string; slug: string }>;
  };
}

export default async function TeamOfExpertPage() {
  const content = await readJsonFileSafe<AboutData>("content.json", {});
  const team = Array.isArray(content.about?.team) ? content.about.team : [];

  return (
    <main>
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-12 md:px-8">
        <ScrollReveal>
          <h1 className="text-2xl font-semibold text-primary-800 mb-6">Team Of Expert</h1>
        </ScrollReveal>
        <ScrollReveal y={40}>
          <div className="space-y-4">
            <ScrollStagger className="space-y-4" staggerDelay={0.06}>
              {team.length === 0 ? (
                <p className="text-slate-600">No team members listed yet.</p>
              ) : (
                team.map((member) => (
                  <ScrollStaggerItem key={member.slug}>
                    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm hover:border-primary-200 transition-colors">
                      <Link
                        href={`/team/${member.slug}`}
                        className="font-medium text-primary-600 hover:text-primary-700"
                      >
                        {member.name}
                      </Link>
                      <span className="block text-sm text-slate-600 mt-0.5">{member.role}</span>
                    </div>
                  </ScrollStaggerItem>
                ))
              )}
            </ScrollStagger>
          </div>
        </ScrollReveal>
      </div>
    </main>
  );
}
