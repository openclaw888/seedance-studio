import type { Metadata } from "next";
import { Fraunces, Instrument_Sans } from "next/font/google";
import Script from "next/script";
import Providers from "./providers";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Seedance Studio — AI Video Generation",
  description:
    "Transform your ideas into stunning AI-generated videos in seconds. Text to video, image to video, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          defer
          data-domain="seedance-studio.com"
          src="https://click.pageview.click/js/script.js"
        />
      </head>
      <body
        className={`${fraunces.variable} ${instrumentSans.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
