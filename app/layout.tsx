import type { Metadata } from "next";
import { Baloo_2 } from "next/font/google";
import "./globals.css";
import PageTransition from "@/components/PageTransition";

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Petualangan Lingkungan Si Lala",
  description: "Aplikasi edukasi interaktif untuk belajar tentang lingkungan",
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body
        className={`${baloo.variable} antialiased`}
      >
        <PageTransition>
        {children}
        </PageTransition>
      </body>
    </html>
  );
}
