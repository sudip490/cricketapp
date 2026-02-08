import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Live TV",
  description: "Watch live TV channels",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
