import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy – asian peace academy",
};

export default function PrivacyPage() {
  return (
    <main>
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-12 md:px-8">
        <h1 className="text-2xl font-semibold text-primary-800 mb-6">Privacy</h1>
        <p className="text-slate-600 text-sm mb-4">Last updated: {new Date().toISOString().slice(0, 10)}</p>
        <p className="text-slate-700 leading-relaxed text-justify">
          asian peace academy respects your privacy. We collect only the information
          necessary to communicate with you. We do not sell or share your data with third parties.
          For questions, contact us at contact@asianpeaceacademy.org.
        </p>
      </div>
    </main>
  );
}
