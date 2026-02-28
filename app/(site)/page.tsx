import { readJsonFile } from "@/lib/fileHandler";
import { Hero } from "@/components/Hero";
import { HomeUpdates } from "@/components/HomeUpdates";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
}

export default async function HomePage() {
  const { posts } = await readJsonFile<{ posts: BlogPost[] }>("blog.json");

  return (
    <>
      <Hero />

      <main>
        <HomeUpdates posts={posts} />
      </main>
    </>
  );
}
