import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const simplePrint = localFont({
  src: "../../public/fonts/SimplePrint.ttf",
  variable: "--font-simple-print",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sight Words Game | Grade 1 Learning",
  description: "Fun sight words learning game for Grade 1 children in South Africa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${simplePrint.variable} font-simple-print antialiased`}>
        {children}
      </body>
    </html>
  );
}
