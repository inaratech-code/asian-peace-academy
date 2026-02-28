import { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
  background?: "white" | "soft";
}

export function SectionWrapper({
  children,
  className = "",
  id,
  background = "white",
}: SectionWrapperProps) {
  const bgClass = background === "soft" ? "bg-soft-gray" : "bg-white";
  return (
    <section
      id={id}
      className={`py-16 md:py-24 lg:py-30 ${bgClass} ${className}`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">{children}</div>
    </section>
  );
}
