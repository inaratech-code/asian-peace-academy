"use client";

import Link from "next/link";
import { ScrollReveal, ScrollStagger, ScrollStaggerItem } from "./ScrollReveal";

interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
}

export function BlogList({ posts }: { posts: Post[] }) {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12 md:px-8">
      <ScrollReveal>
        <h2 className="text-2xl font-semibold text-primary-800 mb-8">Blog</h2>
      </ScrollReveal>

      <ScrollStagger className="space-y-6" staggerDelay={0.12}>
        {posts.map((post) => (
          <ScrollStaggerItem key={post.id}>
            <li className="border-b border-slate-200 pb-6 last:border-0 list-none">
              <h3 className="text-lg font-medium text-slate-900">{post.title}</h3>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-2 inline-block text-sm font-medium text-primary-600 hover:text-primary-700"
              >
                Read more
              </Link>
            </li>
          </ScrollStaggerItem>
        ))}
      </ScrollStagger>
    </div>
  );
}
