import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { profile } from "@/data/profile";
import "./globals.css";

// Privacy-friendly analytics (GoatCounter). Set NEXT_PUBLIC_GOATCOUNTER to
// your endpoint (e.g. https://<code>.goatcounter.com/count) to enable it.
const analyticsEndpoint = process.env.NEXT_PUBLIC_GOATCOUNTER;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = `${profile.name} — ${profile.role}`;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description: profile.headline,
  keywords: [
    "Senior Software Engineer",
    "React Native",
    "React",
    "TypeScript",
    "NestJS",
    "Mobile Engineer",
    "Full Stack Developer",
    profile.name,
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    title,
    description: profile.headline,
    type: "website",
    siteName: title,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: profile.headline,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="relative flex min-h-full flex-col bg-hacker-bg text-slate-200">
        {children}
        {analyticsEndpoint && (
          <Script
            src="https://gc.zgo.at/count.js"
            data-goatcounter={analyticsEndpoint}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
