"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks: { href: string; label: string; children?: { href: string; label: string }[] }[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About", children: [{ href: "/about", label: "About Us" }, { href: "/about#team", label: "Team" }] },
  { href: "/programs", label: "Expertise & Services", children: [{ href: "/programs", label: "Our Programs" }, { href: "/apply", label: "Apply" }] },
  { href: "/blog", label: "Updates", children: [{ href: "/blog", label: "Blog" }, { href: "/", label: "News" }] },
  { href: "/gallery", label: "Gallery", children: [{ href: "/gallery", label: "Photo Gallery" }] },
  { href: "/contact", label: "Contact", children: [{ href: "/contact", label: "Contact Us" }, { href: "/contact", label: "Location" }] },
];

function isActive(pathname: string, href: string, children?: { href: string }[]) {
  if (pathname === href) return true;
  if (children?.some((c) => pathname === c.href || (c.href !== "/" && pathname.startsWith(c.href)))) return true;
  return false;
}

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      {/* Top bar - compact; on mobile only email + phone to avoid overflow */}
      <div className="bg-[#f2f5f7] border-b border-slate-200/50">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-4 gap-y-1 px-3 py-2 text-xs text-slate-600 md:px-4">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 min-w-0">
            <a
              href="mailto:asianacademy11@gmail.com"
              className="flex items-center gap-1.5 text-slate-600 hover:text-primary-600 min-w-0"
            >
              <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="truncate max-w-[180px] sm:max-w-none">asianacademy11@gmail.com</span>
            </a>
            <a
              href="tel:+97715244060"
              className="flex items-center gap-1.5 text-slate-600 hover:text-primary-600 shrink-0"
            >
              <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +977-1-5244060
            </a>
          </div>
          <div className="hidden sm:flex flex-wrap items-center gap-x-3 gap-y-0.5">
            <span className="hidden md:inline-flex items-center gap-1 text-slate-600">
              <svg className="h-3 w-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              ASIAN ACADEMY: FOR PEACE RESEARCH AND DEVELOPMENT
            </span>
            <span className="inline-flex items-center gap-1 text-slate-600">
              <svg className="h-3 w-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Thapa Gaun, New Baneshwor, Kathmandu, Nepal
            </span>
            <button type="button" className="p-2 -m-2 text-slate-600 hover:text-primary-600 rounded" aria-label="Search">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 md:px-6" aria-label="Main navigation">
        <Link href="/" className="flex items-center gap-2 sm:gap-3 min-w-0 shrink">
          <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-primary-500 text-white text-lg sm:text-xl font-bold">
            A
          </div>
          <div className="min-w-0">
            <span className="block text-base sm:text-lg font-bold tracking-tight text-slate-800 truncate">ASIAN ACADEMY</span>
            <span className="block text-[11px] sm:text-xs font-medium text-primary-500 uppercase tracking-wide sm:tracking-wider break-words">
              For Peace Research and Development
            </span>
          </div>
        </Link>

        <ul className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) => {
            const active = isActive(pathname, link.href, link.children);
            return (
              <li key={link.href} className="relative group">
                <Link
                  href={link.href}
                  className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    active
                      ? "bg-[#e8eef4] text-slate-800"
                      : "text-slate-700 hover:bg-slate-50 hover:text-primary-600"
                  }`}
                >
                  {link.label}
                  {link.children && link.children.length > 0 && (
                    <svg className="h-3.5 w-3.5 shrink-0 text-current opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>
                {link.children && link.children.length > 0 && (
                  <div className="invisible group-hover:visible absolute left-0 top-full z-50 min-w-[180px] pt-1">
                    <div className="rounded-md border border-slate-200 bg-white py-1 shadow-lg">
                      {link.children.map((child) => (
                        <Link
                          key={child.href + child.label}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-primary-600"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          className="lg:hidden p-3 -m-2 rounded-lg text-slate-600 hover:bg-slate-100 touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden border-t border-slate-200 bg-white"
          >
            <ul className="px-4 py-4 space-y-0.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block py-2.5 px-3 text-base font-medium rounded-lg ${
                      pathname === link.href ? "bg-[#e8eef4] text-slate-800" : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                  {link.children && link.children.length > 0 && (
                    <ul className="ml-4 mt-0.5 space-y-0.5 border-l border-slate-200 pl-3">
                      {link.children.map((child) => (
                        <li key={child.href + child.label}>
                          <Link
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                            className="block py-1.5 px-2 text-sm text-slate-600 hover:text-primary-600"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
