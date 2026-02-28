"use client";

import { useState, useEffect } from "react";

interface ContentState {
  hero: { headline: string; subtitle: string; primaryCta: string; secondaryCta: string };
  aboutPreview: { title: string; description: string; ctaText: string };
  ctaSection: { title: string; description: string; buttonText: string };
}

export default function AdminContentPage() {
  const [content, setContent] = useState<ContentState | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetch("/api/content")
      .then((r) => r.json())
      .then((data) => {
        setContent({
          hero: data.hero || { headline: "", subtitle: "", primaryCta: "", secondaryCta: "" },
          aboutPreview: data.aboutPreview || { title: "", description: "", ctaText: "" },
          ctaSection: data.ctaSection || { title: "", description: "", buttonText: "" },
        });
      })
      .catch(() => setMessage({ type: "error", text: "Failed to load content" }))
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content) return;
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (!res.ok) throw new Error("Failed to save");
      setMessage({ type: "success", text: "Content saved." });
    } catch {
      setMessage({ type: "error", text: "Failed to save." });
    } finally {
      setSaving(false);
    }
  }

  if (loading || !content) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 w-48 bg-slate-200 rounded" />
        <div className="h-64 bg-slate-100 rounded" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900">Homepage Content</h1>
      <p className="mt-2 text-slate-600">Edit hero, about preview, and CTA section.</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-10">
        <fieldset className="rounded-xl border border-slate-200 bg-white p-6">
          <legend className="text-lg font-medium text-slate-900">Hero</legend>
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Headline</label>
              <input
                value={content.hero.headline}
                onChange={(e) => setContent({ ...content, hero: { ...content.hero, headline: e.target.value } })}
                className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Subtitle</label>
              <textarea
                value={content.hero.subtitle}
                onChange={(e) => setContent({ ...content, hero: { ...content.hero, subtitle: e.target.value } })}
                rows={3}
                className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700">Primary CTA</label>
                <input
                  value={content.hero.primaryCta}
                  onChange={(e) => setContent({ ...content, hero: { ...content.hero, primaryCta: e.target.value } })}
                  className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Secondary CTA</label>
                <input
                  value={content.hero.secondaryCta}
                  onChange={(e) => setContent({ ...content, hero: { ...content.hero, secondaryCta: e.target.value } })}
                  className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5"
                />
              </div>
            </div>
          </div>
        </fieldset>

        <fieldset className="rounded-xl border border-slate-200 bg-white p-6">
          <legend className="text-lg font-medium text-slate-900">About preview</legend>
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Title</label>
              <input
                value={content.aboutPreview.title}
                onChange={(e) => setContent({ ...content, aboutPreview: { ...content.aboutPreview, title: e.target.value } })}
                className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Description</label>
              <textarea
                value={content.aboutPreview.description}
                onChange={(e) => setContent({ ...content, aboutPreview: { ...content.aboutPreview, description: e.target.value } })}
                rows={4}
                className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">CTA text</label>
              <input
                value={content.aboutPreview.ctaText}
                onChange={(e) => setContent({ ...content, aboutPreview: { ...content.aboutPreview, ctaText: e.target.value } })}
                className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5"
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="rounded-xl border border-slate-200 bg-white p-6">
          <legend className="text-lg font-medium text-slate-900">CTA section</legend>
          <div className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Title</label>
              <input
                value={content.ctaSection.title}
                onChange={(e) => setContent({ ...content, ctaSection: { ...content.ctaSection, title: e.target.value } })}
                className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Description</label>
              <textarea
                value={content.ctaSection.description}
                onChange={(e) => setContent({ ...content, ctaSection: { ...content.ctaSection, description: e.target.value } })}
                rows={2}
                className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Button text</label>
              <input
                value={content.ctaSection.buttonText}
                onChange={(e) => setContent({ ...content, ctaSection: { ...content.ctaSection, buttonText: e.target.value } })}
                className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5"
              />
            </div>
          </div>
        </fieldset>

        {message && (
          <p className={message.type === "success" ? "text-green-600" : "text-red-600"}>
            {message.text}
          </p>
        )}
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-primary-600 px-6 py-2.5 font-medium text-white hover:bg-primary-700 disabled:opacity-70"
        >
          {saving ? "Saving…" : "Save changes"}
        </button>
      </form>
    </div>
  );
}
