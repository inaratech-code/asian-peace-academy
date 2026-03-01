import Link from "next/link";
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
        <p className="text-primary-500 text-sm font-medium uppercase tracking-wider mb-10">
          For Peace Research and Development
        </p>

        <div className="grid grid-cols-1 gap-10 lg:gap-12 md:grid-cols-2">
          {/* Photos column - clickable */}
          <Link
            href="/gallery/photos"
            className="group block rounded-xl border-2 border-slate-200 bg-slate-50/50 min-h-[320px] p-6 flex flex-col hover:border-primary-300 hover:bg-primary-50/30 hover:shadow-md transition-all"
          >
            <h2 className="text-lg font-semibold text-primary-800 mb-4 border-b border-slate-200 pb-2 group-hover:text-primary-700">
              Photos
            </h2>
            <div className="flex-1 flex items-center justify-center">
              <p className="text-slate-500 text-sm text-center group-hover:text-slate-600">
                Photo gallery content can be added here. Click to view →
              </p>
            </div>
          </Link>

          {/* Videos column - clickable */}
          <Link
            href="/gallery/videos"
            className="group block rounded-xl border-2 border-slate-200 bg-slate-50/50 min-h-[320px] p-6 flex flex-col hover:border-primary-300 hover:bg-primary-50/30 hover:shadow-md transition-all"
          >
            <h2 className="text-lg font-semibold text-primary-800 mb-4 border-b border-slate-200 pb-2 group-hover:text-primary-700">
              Videos
            </h2>
            <div className="flex-1 flex items-center justify-center">
              <p className="text-slate-500 text-sm text-center group-hover:text-slate-600">
                Video gallery content can be added here. Click to view →
              </p>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
