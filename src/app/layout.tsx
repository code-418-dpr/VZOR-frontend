import React from "react";

import { Metadata } from "next";
import { Inter } from "next/font/google";

import "@/app/globals.css";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theming/theme-provider";
import siteMetadata from "@/conf/site-metadata";

export const metadata: Metadata = {
    title: { default: siteMetadata.name, template: `%s | ${siteMetadata.name}` },
    applicationName: siteMetadata.name,
    description: siteMetadata.description,
    authors: [siteMetadata.authors],
    icons: [{ url: siteMetadata.app_icon.src, sizes: siteMetadata.app_icon.sizes }],
};

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru" suppressHydrationWarning>
            <body className={inter.className}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                    {children}
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
}
