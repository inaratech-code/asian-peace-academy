"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface ProgramCardProps {
  id: string;
  title: string;
  slug: string;
  duration: string;
  format: string;
  description: string;
  highlights: string[];
  ctaText: string;
}

export function ProgramCard({
  title,
  slug,
  duration,
  format,
  description,
  highlights,
  ctaText,
}: ProgramCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="group relative rounded-2xl border border-slate-200 bg-white p-5 sm:p-8 shadow-card transition-shadow hover:shadow-glow hover:border-primary-200"
    >
      <div className="flex flex-col h-full">
        <div className="mb-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700">
            {duration}
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            {format}
          </span>
        </div>
        <h3 className="text-xl font-semibold text-slate-900 group-hover:text-primary-700 transition-colors">
          {title}
        </h3>
        <p className="mt-3 text-slate-600 text-sm leading-relaxed flex-grow">
          {description}
        </p>
        {highlights.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {highlights.slice(0, 4).map((h) => (
              <li key={h} className="text-xs text-slate-500">
                {h}
              </li>
            ))}
          </ul>
        )}
        <Link
          href={`/programs#${slug}`}
          className="mt-6 inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
        >
          {ctaText}
          <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </motion.article>
  );
}
