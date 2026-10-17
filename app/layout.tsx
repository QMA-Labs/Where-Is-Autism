import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WHERE IS AUTISM? — The Geometry of a Distributed Mind",
  description: "An interactive research atlas by Masiha. Explore testable hypotheses about family, state, environment and observable traits. Synthetic demonstrations, never diagnosis.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
