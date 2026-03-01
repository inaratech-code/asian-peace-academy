import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Strategic Partners",
  description: "Strategic Partners – Asian Peace Academy",
};

export default function PartnersPage() {
  return (
    <main>
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-12 md:px-8">
        <h1 className="text-2xl font-semibold text-primary-800 mb-6">Strategic Partners</h1>
        <p className="text-slate-700 leading-relaxed text-justify">
          Content for Strategic Partners will appear here.
        </p>
      </div>
    </main>
  );
}
