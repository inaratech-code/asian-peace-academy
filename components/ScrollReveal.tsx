"use client";

import { motion } from "framer-motion";

const easeOut = [0.22, 1, 0.36, 1];

/** Single element: fades in and moves up when it enters the viewport (Cherrapunji-style section reveal) */
export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.9,
  y = 56,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: easeOut }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Container that staggers its children as they're revealed (e.g. for cards or list items) */
export function ScrollStagger({
  children,
  className = "",
  staggerDelay = 0.12,
  itemDelay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  itemDelay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: itemDelay,
          },
        },
        hidden: {},
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Child of ScrollStagger: fades in and moves up */
export function ScrollStaggerItem({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 36 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.7, ease: easeOut },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Subtle scale + fade on scroll (for images or blocks) */
export function ScrollRevealScale({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.85, delay, ease: easeOut }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
