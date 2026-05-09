import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { SiteHeader } from "../components/site-header";
import { SiteFooter } from "../components/site-footer";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display-stack",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const sans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Havenhurst",
  description: "A refined place to gather, rest, and belong.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} h-full scroll-smooth scroll-pt-20 antialiased sm:scroll-pt-[4.75rem]`}
    >
      <body className="flex min-h-full flex-col bg-[var(--strong-white)] font-sans text-[var(--hague-blue)]">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
