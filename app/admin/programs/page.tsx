"use client";

import { useState, useEffect } from "react";

interface Program {
  id: string;
  title: string;
  slug: string;
  duration: string;
  format: string;
  description: string;
  highlights: string[];
  ctaText: string;
}

export default function AdminProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Program | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  function load() {
    fetch("/api/programs")
      .then((r) => r.json())
      .then(setPrograms)
      .catch(() => setMessage({ type: "error", text: "Failed to load programs" }))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Delete this program?")) return;
    const res = await fetch(`/api/programs?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      setMessage({ type: "success", text: "Program deleted." });
      setPrograms((p) => p.filter((x) => x.id !== id));
      if (editing?.id === id) setEditing(null);
    } else {
      setMessage({ type: "error", text: "Failed to delete." });
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-slate-900">Programs</h1>
      <p className="mt-2 text-slate-600">Add, edit, or remove programs.</p>
      {message && (
        <p className={`mt-4 ${message.type === "success" ? "text-green-600" : "text-red-600"}`}>
          {message.text}
        </p>
      )}

      {editing ? (
        <ProgramForm
          program={editing}
          onClose={() => setEditing(null)}
          onSaved={() => {
            setMessage({ type: "success", text: "Program saved." });
            setEditing(null);
            load();
          }}
          onError={() => setMessage({ type: "error", text: "Failed to save." })}
        />
      ) : (
        <AddProgramForm
          onSaved={() => {
            setMessage({ type: "success", text: "Program added." });
            load();
          }}
          onError={() => setMessage({ type: "error", text: "Failed to add." })}
        />
      )}

      {loading ? (
        <div className="mt-8 h-32 animate-pulse rounded-lg bg-slate-100" />
      ) : (
        <ul className="mt-8 space-y-4">
          {programs.map((p) => (
            <li
              key={p.id}
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4"
            >
              <div>
                <p className="font-medium text-slate-900">{p.title}</p>
                <p className="text-sm text-slate-500">{p.duration} · {p.format}</p>
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

function ProgramForm({
  program,
  onClose,
  onSaved,
  onError,
}: {
  program: Program;
  onClose: () => void;
  onSaved: () => void;
  onError: () => void;
}) {
  const [form, setForm] = useState(program);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/programs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: program.id }),
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
      <h2 className="text-lg font-medium text-slate-900">Edit program</h2>
      <div>
        <label className="block text-sm font-medium text-slate-700">Title</label>
        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
          className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700">Duration</label>
          <input
            value={form.duration}
            onChange={(e) => setForm({ ...form, duration: e.target.value })}
            className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Format</label>
          <input
            value={form.format}
            onChange={(e) => setForm({ ...form, format: e.target.value })}
            className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Description</label>
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={3}
          className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Highlights (comma-separated)</label>
        <input
          value={form.highlights.join(", ")}
          onChange={(e) => setForm({ ...form, highlights: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })}
          className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">CTA text</label>
        <input
          value={form.ctaText}
          onChange={(e) => setForm({ ...form, ctaText: e.target.value })}
          className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5"
        />
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

function AddProgramForm({ onSaved, onError }: { onSaved: () => void; onError: () => void }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    duration: "",
    format: "",
    description: "",
    highlights: [] as string[],
    ctaText: "Learn More",
  });
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/programs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        onSaved();
        setForm({ title: "", slug: "", duration: "", format: "", description: "", highlights: [], ctaText: "Learn More" });
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
        + Add program
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 rounded-xl border border-slate-200 bg-white p-6 space-y-4">
      <h2 className="text-lg font-medium text-slate-900">Add program</h2>
      <div>
        <label className="block text-sm font-medium text-slate-700">Title</label>
        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
          className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700">Duration</label>
          <input
            value={form.duration}
            onChange={(e) => setForm({ ...form, duration: e.target.value })}
            className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Format</label>
          <input
            value={form.format}
            onChange={(e) => setForm({ ...form, format: e.target.value })}
            className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Description</label>
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={3}
          className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Highlights (comma-separated)</label>
        <input
          value={form.highlights.join(", ")}
          onChange={(e) => setForm({ ...form, highlights: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })}
          className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5"
        />
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
