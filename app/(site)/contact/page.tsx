"use client";

import { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 800));
    setStatus("success");
  }

  return (
    <main>
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-12 md:px-8">
        <h1 className="text-2xl font-semibold text-primary-800 mb-6">Contact</h1>

        <p className="text-slate-700 mb-8">
          asian peace academy<br />
          Email: contact@asianpeaceacademy.org
        </p>

        <form onSubmit={handleSubmit} className="max-w-md space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="mt-1 block w-full rounded border border-slate-300 px-3 py-2 text-slate-900"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 block w-full rounded border border-slate-300 px-3 py-2 text-slate-900"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-slate-700">Message</label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              className="mt-1 block w-full rounded border border-slate-300 px-3 py-2 text-slate-900"
            />
          </div>
          <button
            type="submit"
            disabled={status === "sending"}
            className="rounded bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 disabled:opacity-70"
          >
            {status === "sending" ? "Sending…" : status === "success" ? "Message sent" : "Send"}
          </button>
          {status === "success" && (
            <p className="text-sm text-green-600">Thank you. We will get back to you soon.</p>
          )}
          {status === "error" && (
            <p className="text-sm text-red-600">Something went wrong. Please try again.</p>
          )}
        </form>
      </div>
    </main>
  );
}
