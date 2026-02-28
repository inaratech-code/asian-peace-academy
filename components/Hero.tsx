"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const slideCount = 3;

/** Cubic bezier tuple for Framer Motion ease (avoids number[] inference) */
const easeOutExpo: [number, number, number, number] = [0.22, 1, 0.36, 1];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.12,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: easeOutExpo },
  },
};

const scrollHint = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.9, ease: easeOutExpo },
  },
};

export function Hero() {
  const [current, setCurrent] = useState(0);

  function next() {
    setCurrent((c) => (c + 1) % slideCount);
  }
  function prev() {
    setCurrent((c) => (c - 1 + slideCount) % slideCount);
  }

  return (
    <section className="relative w-full overflow-hidden bg-slate-200">
      <div className="relative aspect-[21/9] w-full min-h-[280px] md:min-h-[360px]">
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary-100 via-primary-50 to-slate-100">
          <motion.div
            className="text-center px-6 max-w-4xl mx-auto"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              variants={item}
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-800 tracking-tight"
            >
              ASIAN ACADEMY
            </motion.h1>
            <motion.p
              variants={item}
              className="mt-3 md:mt-4 text-sm md:text-base font-medium text-primary-600 uppercase tracking-[0.2em]"
            >
              For Peace Research and Development
            </motion.p>
            <motion.p
              variants={item}
              className="mt-5 md:mt-6 max-w-xl mx-auto text-slate-600 text-sm md:text-base leading-relaxed"
            >
              Building capacity for peacebuilding, research, and sustainable development across Nepal and the region.
            </motion.p>
            <motion.div
              variants={scrollHint}
              className="mt-10 md:mt-14 flex flex-col items-center gap-2"
            >
              <span className="text-xs uppercase tracking-widest text-slate-500">Scroll to know more</span>
              <motion.span
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="inline-block"
              >
                <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </motion.span>
            </motion.div>
          </motion.div>
        </div>

        <button
          type="button"
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-md hover:bg-white transition-colors"
          aria-label="Previous slide"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          type="button"
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-md hover:bg-white transition-colors"
          aria-label="Next slide"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {Array.from({ length: slideCount }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrent(i)}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                i === current ? "bg-primary-600 w-6" : "bg-white/70 hover:bg-white"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
