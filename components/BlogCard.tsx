"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface BlogCardProps {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  publishedAt: string;
  category: string;
}

export function BlogCard({
  slug,
  title,
  excerpt,
  author,
  publishedAt,
  category,
}: BlogCardProps) {
  const date = new Date(publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -2 }}
      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card transition-shadow hover:shadow-soft"
    >
      <Link href={`/blog/${slug}`} className="block">
        <div className="relative aspect-[16/10] bg-soft-blue overflow-hidden">
          <div
            className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-hidden
          />
          <div className="absolute inset-0 flex items-center justify-center bg-primary-100/50">
            <span className="text-4xl font-light text-primary-600/60">APA</span>
          </div>
        </div>
        <div className="p-6">
          <span className="text-xs font-medium text-primary-600">{category}</span>
          <h3 className="mt-2 text-lg font-semibold text-slate-900 group-hover:text-primary-700 transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="mt-2 text-sm text-slate-600 line-clamp-2">{excerpt}</p>
          <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
            <span>{author}</span>
            <time dateTime={publishedAt}>{date}</time>
          </div>
          <span className="mt-3 inline-flex items-center text-sm font-medium text-primary-600 group-hover:underline">
            Read More
            <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
