import type { Metadata } from "next";
import Script from "next/script";
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
      <body>
        {children}
        <Script
          id="ad-script-209375"
          src="https://quge5.com/88/tag.min.js"
          strategy="afterInteractive"
          data-zone="209375"
          data-cfasync="false"
        />
        <Script
          id="ad-script-209376"
          src="https://quge5.com/88/tag.min.js"
          strategy="afterInteractive"
          data-zone="209376"
          data-cfasync="false"
        />
        <Script
          id="ad-script-10583931"
          src="https://3nbf4.com/act/files/tag.min.js?z=10583931"
          strategy="afterInteractive"
          data-cfasync="false"
        />
      </body>
    </html>
  );
}
