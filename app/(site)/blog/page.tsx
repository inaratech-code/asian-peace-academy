import { readJsonFileSafe } from "@/lib/fileHandler";
import type { Metadata } from "next";
import { BlogList } from "@/components/BlogList";

export const metadata: Metadata = {
  title: "Blog",
  description: "Blog – asian peace academy",
};

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
}

export default async function BlogPage() {
  const data = await readJsonFileSafe<{ posts?: BlogPost[] }>("blog.json", { posts: [] });
  const posts = Array.isArray(data.posts) ? data.posts : [];

  return (
    <main>
      <BlogList posts={posts} />
    </main>
  );
}
