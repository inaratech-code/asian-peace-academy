"use client";

import { useState } from "react";

const MAP_EMBED_URL =
  "https://www.openstreetmap.org/export/embed.html?bbox=85.332%2C27.692%2C85.348%2C27.706&layer=mapnik&marker=27.699%2C85.34";
const MAP_LINK_URL = "https://www.openstreetmap.org/?mlat=27.699&mlon=85.34#map=17/27.699/85.34";

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
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12 md:px-8">
        <h1 className="text-2xl font-semibold text-primary-800 mb-8">Contact</h1>

        <div className="grid grid-cols-1 gap-10 lg:gap-12 md:grid-cols-2">
          {/* Left: Contact form */}
          <div>
            <p className="text-slate-700 mb-6">
              asian peace academy<br />
              Email: asianacademy11@gmail.com
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
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

          {/* Right: Location map */}
          <section>
            <h2 className="text-lg font-semibold text-primary-800 mb-2">Location</h2>
            <p className="text-slate-600 text-sm mb-4">
              Thapa Gaun, New Baneshwor, Kathmandu, Nepal · +977-1-5244060
            </p>
            <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100 aspect-video min-h-[260px]">
              <iframe
                title="Asian Peace Academy location map"
                src={MAP_EMBED_URL}
                className="w-full h-full min-h-[260px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              href={MAP_LINK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-sm font-medium text-primary-600 hover:text-primary-700"
            >
              Open in OpenStreetMap →
            </a>
          </section>
        </div>

        {/* Privacy note - full width below */}
        <section className="mt-12 pt-10 border-t border-slate-200">
          <h2 className="text-lg font-semibold text-primary-800 mb-2">Privacy note</h2>
          <div className="rounded-lg bg-slate-50 border border-slate-200 p-4 text-slate-700 text-sm leading-relaxed text-justify">
            <p>
              Asian Peace Academy respects your privacy. We collect only the information necessary to
              communicate with you. We do not sell or share your data with third parties. For
              questions about how we handle your data, contact us at asianacademy11@gmail.com.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
