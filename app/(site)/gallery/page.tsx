import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Gallery – Asian Academy for Peace Research and Development",
};

export default function GalleryPage() {
  return (
    <main>
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <h1 className="text-2xl font-semibold text-slate-800 mb-2">Gallery</h1>
        <p className="text-primary-500 text-sm font-medium uppercase tracking-wider mb-8">
          For Peace Research and Development
        </p>
        <div className="rounded-lg border-2 border-dashed border-slate-200 bg-slate-50/50 py-16 text-center text-slate-500">
          Gallery content and images can be added here.
        </div>
      </div>
    </main>
  );
}
