"use client";

import { useState, useEffect } from "react";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  publishedAt: string;
  category: string;
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  function load() {
    fetch("/api/blog")
      .then((r) => r.json())
      .then(setPosts)
      .catch(() => setMessage({ type: "error", text: "Failed to load posts" }))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this post?")) return;
    const res = await fetch(`/api/blog?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      setMessage({ type: "success", text: "Post deleted." });
      setPosts((p) => p.filter((x) => x.id !== id));
      if (editing?.id === id) setEditing(null);
    } else {
      setMessage({ type: "error", text: "Failed to delete." });
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900">Blog</h1>
      <p className="mt-2 text-slate-600">Add, edit, or remove blog posts.</p>
      {message && (
        <p className={`mt-4 ${message.type === "success" ? "text-green-600" : "text-red-600"}`}>
          {message.text}
        </p>
      )}

      {editing ? (
        <BlogPostForm
          post={editing}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setMessage({ type: "success", text: "Post saved." });
            setEditing(null);
            load();
          }}
          onError={() => setMessage({ type: "error", text: "Failed to save." })}
        />
      ) : (
        <AddBlogPostForm
          onSaved={() => {
            setMessage({ type: "success", text: "Post added." });
            load();
          }}
          onError={() => setMessage({ type: "error", text: "Failed to add." })}
        />
      )}

      {loading ? (
        <div className="mt-8 h-32 animate-pulse rounded-lg bg-slate-100" />
      ) : (
        <ul className="mt-8 space-y-4">
          {posts.map((p) => (
            <li
              key={p.id}
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4"
            >
              <div>
                <p className="font-medium text-slate-900">{p.title}</p>
                <p className="text-sm text-slate-500">{p.category} · {p.publishedAt}</p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setEditing(p)}
                  className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(p.id)}
                  className="rounded-lg border border-red-200 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function BlogPostForm({
  post,
  onClose,
  onSaved,
  onError,
}: {
  post: BlogPost;
  onClose: () => void;
  onSaved: () => void;
  onError: () => void;
}) {
  const [form, setForm] = useState(post);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/blog", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: post.id }),
      });
      if (res.ok) onSaved();
      else onError();
    } catch {
      onError();
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 rounded-xl border border-slate-200 bg-white p-6 space-y-4">
      <h2 className="text-lg font-medium text-slate-900">Edit post</h2>
      <div>
        <label className="block text-sm font-medium text-slate-700">Title</label>
        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
          className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Excerpt</label>
        <textarea
          value={form.excerpt}
          onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
          rows={2}
          className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Content</label>
        <textarea
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          rows={8}
          className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700">Author</label>
          <input
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
            className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Author role</label>
          <input
            value={form.authorRole}
            onChange={(e) => setForm({ ...form, authorRole: e.target.value })}
            className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5"
          />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700">Published date (YYYY-MM-DD)</label>
          <input
            value={form.publishedAt}
            onChange={(e) => setForm({ ...form, publishedAt: e.target.value })}
            className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Category</label>
          <input
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5"
          />
        </div>
      </div>
      <div className="flex gap-2">
        <button type="submit" disabled={saving} className="rounded-lg bg-primary-600 px-4 py-2 text-white font-medium hover:bg-primary-700 disabled:opacity-70">
          {saving ? "Saving…" : "Save"}
        </button>
        <button type="button" onClick={onClose} className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-50">
          Cancel
        </button>
      </div>
    </form>
  );
}

function AddBlogPostForm({ onSaved, onError }: { onSaved: () => void; onError: () => void }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    author: "",
    authorRole: "",
    publishedAt: new Date().toISOString().slice(0, 10),
    category: "News",
  });
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        onSaved();
        setForm({
          title: "",
          slug: "",
          excerpt: "",
          content: "",
          author: "",
          authorRole: "",
          publishedAt: new Date().toISOString().slice(0, 10),
          category: "News",
        });
        setOpen(false);
      } else onError();
    } catch {
      onError();
    } finally {
      setSaving(false);
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-6 rounded-lg bg-primary-600 px-4 py-2 text-white font-medium hover:bg-primary-700"
      >
        + Add post
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 rounded-xl border border-slate-200 bg-white p-6 space-y-4">
      <h2 className="text-lg font-medium text-slate-900">Add post</h2>
      <div>
        <label className="block text-sm font-medium text-slate-700">Title</label>
        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
          className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Excerpt</label>
        <textarea
          value={form.excerpt}
          onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
          rows={2}
          className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Content</label>
        <textarea
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          rows={6}
          className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700">Author</label>
          <input
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
            className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Category</label>
          <input
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5"
          />
        </div>
      </div>
      <div className="flex gap-2">
        <button type="submit" disabled={saving} className="rounded-lg bg-primary-600 px-4 py-2 text-white font-medium hover:bg-primary-700 disabled:opacity-70">
          {saving ? "Adding…" : "Add"}
        </button>
        <button type="button" onClick={() => setOpen(false)} className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-50">
          Cancel
        </button>
      </div>
    </form>
  );
}
