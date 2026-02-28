import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
      <p className="mt-2 text-slate-600">Manage your academy content.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Link
          href="/admin/content"
          className="rounded-xl border border-slate-200 bg-white p-6 shadow-card hover:border-primary-200 transition-colors"
        >
          <h2 className="font-medium text-slate-900">Homepage Content</h2>
          <p className="mt-1 text-sm text-slate-500">Edit hero, about preview, testimonials, CTA</p>
        </Link>
        <Link
          href="/admin/programs"
          className="rounded-xl border border-slate-200 bg-white p-6 shadow-card hover:border-primary-200 transition-colors"
        >
          <h2 className="font-medium text-slate-900">Programs</h2>
          <p className="mt-1 text-sm text-slate-500">Add, edit, or remove programs</p>
        </Link>
        <Link
          href="/admin/blog"
          className="rounded-xl border border-slate-200 bg-white p-6 shadow-card hover:border-primary-200 transition-colors"
        >
          <h2 className="font-medium text-slate-900">Blog</h2>
          <p className="mt-1 text-sm text-slate-500">Manage blog posts</p>
        </Link>
      </div>
    </div>
  );
}
