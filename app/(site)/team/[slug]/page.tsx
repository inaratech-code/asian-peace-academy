import { readJsonFile } from "@/lib/fileHandler";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

interface TeamMember {
  name: string;
  role: string;
  slug: string;
}

interface AboutData {
  about: { team: TeamMember[] };
}

export async function generateStaticParams() {
  const content = await readJsonFile<AboutData>("content.json");
  return content.about.team.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const content = await readJsonFile<AboutData>("content.json");
  const member = content.about.team.find((m) => m.slug === slug);
  if (!member) return { title: "Team" };
  return {
    title: `${member.name} – asian peace academy`,
    description: member.role,
  };
}

export default async function TeamMemberPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = await readJsonFile<AboutData>("content.json");
  const member = content.about.team.find((m) => m.slug === slug);
  if (!member) notFound();

  return (
    <main>
      <div className="mx-auto max-w-4xl px-6 py-12 md:px-8">
        <p className="text-sm font-medium text-slate-500 mb-4">
          <Link href="/about" className="hover:text-primary-600">About Us</Link>
        </p>

        <h1 className="text-2xl font-semibold text-primary-800">{member.name}</h1>
        <p className="mt-2 text-slate-600">{member.role}</p>

        <p className="mt-8">
          <Link href="/about" className="text-sm font-medium text-primary-600 hover:text-primary-700">
            Back to About Us
          </Link>
        </p>
      </div>
    </main>
  );
}
