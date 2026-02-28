import { readJsonFile } from "@/lib/fileHandler";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
}

export async function generateStaticParams() {
  const { posts } = await readJsonFile<{ posts: BlogPost[] }>("blog.json");
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { posts } = await readJsonFile<{ posts: BlogPost[] }>("blog.json");
  const post = posts.find((p) => p.slug === slug);
  if (!post) return { title: "Post not found" };
  return {
    title: `${post.title} – asian peace academy`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { posts } = await readJsonFile<{ posts: BlogPost[] }>("blog.json");
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <main>
      <article className="mx-auto max-w-4xl px-6 py-12 md:px-8">
        <p className="text-sm font-medium text-slate-500 mb-4">
          <Link href="/" className="hover:text-primary-600">Blog</Link>
        </p>

        <h1 className="text-2xl font-semibold text-primary-800 mb-6">{post.title}</h1>

        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed">
          {post.content.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <p className="mt-8">
          <Link
            href="/blog"
            className="text-sm font-medium text-primary-600 hover:text-primary-700"
          >
            Read more
          </Link>
        </p>
      </article>
    </main>
  );
}
