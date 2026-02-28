"use client";

import { SectionWrapper } from "@/components/SectionWrapper";
import { AnimatedReveal } from "@/components/AnimatedReveal";
import { useState } from "react";

export default function ApplyPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    try {
      // In production: POST to API with formData (including file)
      await new Promise((r) => setTimeout(r, 1200));
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <main>
        <SectionWrapper>
          <AnimatedReveal className="max-w-xl mx-auto text-center py-16">
            <div className="rounded-full bg-green-100 w-16 h-16 flex items-center justify-center mx-auto text-green-600 text-2xl font-bold">
              ✓
            </div>
            <h1 className="mt-6 text-2xl font-semibold text-slate-900">Application received</h1>
            <p className="mt-3 text-slate-600">
              Thank you for applying. We will review your application and be in touch within two weeks.
            </p>
          </AnimatedReveal>
        </SectionWrapper>
      </main>
    );
  }

  return (
    <main>
      <section className="relative py-12 sm:py-16 md:py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-soft-blue/20 to-primary-100/10" aria-hidden />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
          <AnimatedReveal>
            <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl md:text-5xl">
              Apply
            </h1>
            <p className="mt-4 sm:mt-6 max-w-2xl text-base sm:text-lg text-slate-600">
              Start your application to one of our programs. You can save and return later.
            </p>
          </AnimatedReveal>
        </div>
      </section>

      <SectionWrapper>
        <AnimatedReveal>
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
            <div>
              <label htmlFor="program" className="block text-sm font-medium text-slate-700">Program</label>
              <select
                id="program"
                name="program"
                required
                className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
              >
                <option value="">Select a program</option>
                <option value="executive">Executive Leadership in Peace & Dialogue</option>
                <option value="youth">Youth Peace Fellowship</option>
                <option value="mediation">Mediation & Negotiation Intensive</option>
                <option value="wps">Women in Peace & Security</option>
              </select>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-slate-700">First name</label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-slate-700">Last name</label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
              />
            </div>
            <div>
              <label htmlFor="resume" className="block text-sm font-medium text-slate-700">Resume / CV (PDF)</label>
              <input
                id="resume"
                name="resume"
                type="file"
                accept=".pdf"
                className="mt-1 block w-full text-sm text-slate-500 file:mr-4 file:rounded-lg file:border-0 file:bg-primary-50 file:px-4 file:py-2 file:text-primary-700"
              />
            </div>
            <div>
              <label htmlFor="statement" className="block text-sm font-medium text-slate-700">Statement of interest</label>
              <textarea
                id="statement"
                name="statement"
                rows={6}
                required
                className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-slate-900 focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                placeholder="Tell us about your background and why you want to join this program."
              />
            </div>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full rounded-lg bg-primary-600 px-4 py-3 font-medium text-white hover:bg-primary-700 disabled:opacity-70 transition-colors"
            >
              {status === "submitting" ? "Submitting…" : "Submit application"}
            </button>
            {status === "error" && (
              <p className="text-sm text-red-600">Something went wrong. Please try again.</p>
            )}
          </form>
        </AnimatedReveal>
      </SectionWrapper>
    </main>
  );
}
