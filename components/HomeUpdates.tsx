"use client";

import Link from "next/link";
import { ScrollReveal, ScrollStagger, ScrollStaggerItem } from "./ScrollReveal";

interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
}

export function HomeUpdates({ posts }: { posts: Post[] }) {
  return (
    <ScrollReveal className="mx-auto max-w-7xl px-4 py-16 md:px-6" y={48} duration={0.85}>
      <h2 className="text-2xl font-semibold text-slate-800 mb-2">Updates</h2>
      <p className="text-primary-500 text-sm font-medium uppercase tracking-wider mb-10">
        Latest from the academy
      </p>

      <ScrollStagger className="space-y-6" staggerDelay={0.14}>
        {posts.map((post) => (
          <ScrollStaggerItem key={post.id}>
            <div className="border-b border-slate-200 pb-6 last:border-0">
              <h3 className="text-lg font-medium text-slate-900">{post.title}</h3>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-2 inline-block text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
              >
                Read more
              </Link>
            </div>
          </ScrollStaggerItem>
        ))}
      </ScrollStagger>
    </ScrollReveal>
  );
}
