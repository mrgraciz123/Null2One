import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
 variable: "--font-sans",
 subsets: ["latin"],
});

const geistMono = Geist_Mono({
 variable: "--font-geist-mono",
 subsets: ["latin"],
});

const newsreader = Newsreader({
 variable: "--font-heading",
 subsets: ["latin"],
 style: ["normal", "italic"],
});

export const metadata: Metadata = {
 title: "AscendID - Trust Layer for Talent",
 description: "Verified digital identity and opportunity platform for students and recruiters.",
};

import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
 <html lang="en" className="dark">
 <body
 className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} antialiased min-h-screen bg-background text-foreground`}
 >
 <AuthProvider>
 {children}
 </AuthProvider>
 </body>
 </html>
 );
}
