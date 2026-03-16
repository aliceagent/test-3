import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Torah Light | Torah之光",
  description: "A comprehensive resource for Mandarin speakers learning Orthodox Judaism",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
