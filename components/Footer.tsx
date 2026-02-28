const socialLinks = [
  { href: "https://facebook.com", label: "Facebook", icon: "facebook" },
  { href: "https://twitter.com", label: "X", icon: "twitter" },
  { href: "https://youtube.com", label: "YouTube", icon: "youtube" },
  { href: "https://linkedin.com", label: "LinkedIn", icon: "linkedin" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-[#f0f4f8]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:py-10 md:px-6">
        <div className="min-w-0">
          <p className="text-base sm:text-lg font-bold text-slate-800">ASIAN ACADEMY</p>
          <p className="text-[11px] sm:text-xs font-medium text-primary-500 uppercase tracking-wider mt-0.5">
            For Peace Research and Development
          </p>
          <p className="mt-2 text-sm text-slate-600 break-words">
            Thapa Gaun, New Baneshwor, Kathmandu, Nepal
          </p>
          <p className="mt-1 text-sm text-slate-600 break-all">
            <a href="mailto:asianacademy11@gmail.com" className="hover:text-primary-600">asianacademy11@gmail.com</a>
            {" · "}
            <a href="tel:+97715244060" className="hover:text-primary-600">+977-1-5244060</a>
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3 justify-center sm:justify-end">
          {socialLinks.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 sm:h-10 sm:w-10 items-center justify-center rounded-lg border-2 border-slate-300 bg-white text-slate-600 hover:border-primary-400 hover:text-primary-600 transition-colors touch-manipulation"
              aria-label={s.label}
            >
              <span className="sr-only">{s.label}</span>
              {s.icon === "facebook" && (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              )}
              {s.icon === "twitter" && (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              )}
              {s.icon === "youtube" && (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              )}
              {s.icon === "linkedin" && (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              )}
            </a>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200/60 text-center text-sm text-slate-500">
          © {year} Inara Tech. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
