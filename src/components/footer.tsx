import Link from "next/link";

import siteMetadata from "@/conf/site-metadata";

export default function Footer() {
    return (
        <footer className="text-muted-foreground flex flex-col items-center space-y-4 border-t py-6 text-center text-xs md:flex-row md:text-sm">
            <Link className="hover:text-foreground group flex-1" href={siteMetadata.authors.url} target="_blank">
                Разработано командой <span className="gradient-text font-bold">{siteMetadata.authors.name}</span>
            </Link>
            <Link className="hover:text-foreground flex-1" href="https://t.me/fspdnr/614" target="_blank">
                Межрегиональный IT хакатон в рамках федерального проекта «Цифровая Россия»
                <br />
                Донецк, 14 — 15 марта 2025
            </Link>
            <Link className="hover:text-foreground flex-1" href={siteMetadata.repo_url} target="_blank">
                Исходный код на GitHub
            </Link>
        </footer>
    );
}
