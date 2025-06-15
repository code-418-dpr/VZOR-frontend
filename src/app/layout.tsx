import React from "react";

import { Metadata } from "next";
import { Inter } from "next/font/google";

import "@/app/globals.css";
import Footer from "@/components/footer";
import { SessionProvider } from "@/components/session-provider";
import { ThemeProvider } from "@/components/theming/theme-provider";
import siteMetadata from "@/conf/site-metadata";
import { getSession } from "@/lib/session";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: { default: siteMetadata.name, template: `%s | ${siteMetadata.name}` },
    applicationName: siteMetadata.name,
    description: siteMetadata.description,
    authors: [siteMetadata.authors],
    icons: [{ url: siteMetadata.app_icon.src, sizes: siteMetadata.app_icon.sizes }],
};

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getSession();
    return (
        <html lang="ru" suppressHydrationWarning>
            <body className={inter.className}>
                <SessionProvider session={session}>
                    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                        {children}
                        <Footer />
                    </ThemeProvider>
                </SessionProvider>
            </body>
        </html>
    );
}
