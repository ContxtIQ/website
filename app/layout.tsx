import type { Metadata } from "next";
import { Barlow_Condensed, Onest, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const onest = Onest({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-onest",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ContxtIQ — Close technical roles your competitors can't touch",
  description:
    "ContxtIQ gives recruiters the scoring rubrics and follow-up questions of a technical expert — so every interview surfaces real signal, even for roles outside your team's expertise.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${barlowCondensed.variable} ${onest.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-body">{children}</body>
    </html>
  );
}
