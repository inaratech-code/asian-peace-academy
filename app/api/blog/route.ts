import { NextRequest, NextResponse } from "next/server";
import { readJsonFile, writeJsonFile, sanitizeInput, sanitizeSlug } from "@/lib/fileHandler";
import { requireAuth } from "@/lib/auth";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  authorRole: string;
  publishedAt: string;
  category: string;
}

interface BlogData {
  posts: BlogPost[];
}

function sanitizePost(body: Record<string, unknown>): Omit<BlogPost, "id"> {
  const title = sanitizeInput(body.title) || "Untitled";
  const slug = sanitizeSlug(body.slug || title);
  return {
    slug,
    title,
    excerpt: sanitizeInput(body.excerpt) || "",
    content: typeof body.content === "string" ? body.content.trim().slice(0, 50000) : "",
    image: typeof body.image === "string" ? body.image.trim().slice(0, 500) : "",
    author: sanitizeInput(body.author) || "",
    authorRole: sanitizeInput(body.authorRole) || "",
    publishedAt: typeof body.publishedAt === "string" ? body.publishedAt.slice(0, 10) : new Date().toISOString().slice(0, 10),
    category: sanitizeInput(body.category) || "News",
  };
}

export async function GET() {
  try {
    const data = await readJsonFile<BlogData>("blog.json");
    return NextResponse.json(data.posts);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to load blog" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const auth = await requireAuth();
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const data = await readJsonFile<BlogData>("blog.json");
    const maxId = data.posts.reduce((m, p) => Math.max(m, parseInt(p.id, 10) || 0), 0);
    const newPost: BlogPost = {
      ...sanitizePost(body as Record<string, unknown>),
      id: String(maxId + 1),
    };
    data.posts.push(newPost);
    await writeJsonFile("blog.json", data);
    return NextResponse.json(newPost);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to create post" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const auth = await requireAuth();
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const id = typeof body.id === "string" ? body.id : "";
    if (!id) {
      return NextResponse.json({ error: "Post id required" }, { status: 400 });
    }

    const data = await readJsonFile<BlogData>("blog.json");
    const index = data.posts.findIndex((p) => p.id === id);
    if (index === -1) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const updated = { ...data.posts[index], ...sanitizePost(body as Record<string, unknown>), id };
    data.posts[index] = updated;
    await writeJsonFile("blog.json", data);
    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to update post" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const auth = await requireAuth();
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Post id required" }, { status: 400 });
  }

  try {
    const data = await readJsonFile<BlogData>("blog.json");
    const filtered = data.posts.filter((p) => p.id !== id);
    if (filtered.length === data.posts.length) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    data.posts = filtered;
    await writeJsonFile("blog.json", data);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to delete post" },
      { status: 500 }
    );
  }
}
