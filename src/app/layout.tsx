import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JAI FORGE — Bio HTML Editor",
  description:
    "JAI FORGE is a dark-themed live HTML editor for JanitorAI character and script bios, with CodeMirror 6, sandboxed preview, block-mapping, click-to-jump, theme re-skinning, formatting, linting, diffing, and a self-test suite.",
  keywords: [
    "JAI FORGE",
    "BioForge",
    "HTML editor",
    "CodeMirror",
    "JanitorAI",
    "live preview",
    "bio editor",
    "Next.js",
  ],
  authors: [{ name: "BaraXV" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "JAI FORGE — Bio HTML Editor",
    description:
      "Dark-themed live HTML editor with sandboxed preview, block-mapping, and one-click publish.",
    siteName: "JAI FORGE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JAI FORGE — Bio HTML Editor",
    description:
      "Dark-themed live HTML editor with sandboxed preview and one-click publish.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
