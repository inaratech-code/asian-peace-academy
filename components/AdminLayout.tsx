"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const adminNav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/content", label: "Homepage Content" },
  { href: "/admin/programs", label: "Programs" },
  { href: "/admin/blog", label: "Blog" },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-soft-gray">
      <aside className="fixed left-0 top-0 z-40 h-full w-56 border-r border-slate-200 bg-white">
        <div className="flex h-16 items-center border-b border-slate-200 px-6">
          <Link href="/admin" className="font-semibold text-slate-900">
            Admin
          </Link>
        </div>
        <nav className="p-4 space-y-1">
          {adminNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors border-l-4 ${
                pathname === link.href
                  ? "bg-primary-100 text-primary-800 border-primary-500 shadow-sm"
                  : "text-slate-700 hover:bg-slate-100 hover:text-slate-900 border-transparent"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 border-t border-slate-200 p-4 space-y-1">
          <Link
            href="/"
            className="block rounded-lg px-4 py-2 text-sm text-slate-600 hover:bg-slate-100"
          >
            ← Back to site
          </Link>
          <form action="/api/auth/logout" method="POST" className="block">
            <button
              type="submit"
              className="w-full rounded-lg px-4 py-2 text-left text-sm text-slate-600 hover:bg-slate-100"
            >
              Log out
            </button>
          </form>
        </div>
      </aside>
      <main className="pl-56 min-h-screen">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
