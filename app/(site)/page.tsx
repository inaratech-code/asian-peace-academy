import { readJsonFileSafe } from "@/lib/fileHandler";
import { Hero } from "@/components/Hero";
import { HomeUpdates } from "@/components/HomeUpdates";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
}

interface ContentData {
  hero?: {
    headline?: string;
    subtitle?: string;
    primaryCta?: string;
    secondaryCta?: string;
  };
}

export default async function HomePage() {
  const blogData = await readJsonFileSafe<{ posts?: BlogPost[] }>("blog.json", { posts: [] });
  const posts = Array.isArray(blogData.posts) ? blogData.posts : [];

  const contentData = await readJsonFileSafe<ContentData>("content.json", {});
  const hero = contentData.hero;

  return (
    <>
      <Hero
        headline={hero?.headline}
        tagline={hero?.subtitle}
      />

      <main>
        <HomeUpdates posts={posts} />
      </main>
    </>
  );
}
