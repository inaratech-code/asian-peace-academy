import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apply",
  description: "Apply to programs at the Asian Peace Academy.",
};

export default function ApplyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
