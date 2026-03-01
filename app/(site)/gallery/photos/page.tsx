import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photos",
  description: "Photo Gallery – Asian Academy for Peace Research and Development",
};

export default function GalleryPhotosPage() {
  return (
    <main>
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <Link
          href="/gallery"
          className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700 mb-6"
        >
          ← Back to Gallery
        </Link>
        <h1 className="text-2xl font-semibold text-slate-800 mb-2">Photos</h1>
        <p className="text-slate-600 text-sm mb-10">
          Photo gallery – Asian Academy for Peace Research and Development
        </p>
        <div className="rounded-xl border border-slate-200 bg-slate-50/50 min-h-[400px] p-8 flex items-center justify-center">
          <p className="text-slate-500 text-sm text-center">
            Photo gallery content can be added here.
          </p>
        </div>
      </div>
    </main>
  );
}
