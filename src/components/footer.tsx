import Link from "next/link";

import siteMetadata from "@/conf/site-metadata";

export default function Footer() {
    return (
        <footer className="flex flex-col space-y-4 md:flex-row items-center border-t py-6 text-muted-foreground text-xs md:text-sm text-center">
            <Link className="flex-1 hover:text-foreground" href={siteMetadata.authors.url} target="_blank">
                Разработано командой <span className="gradient-text font-bold">{siteMetadata.authors.name}</span>
            </Link>
            <Link className="flex-1 hover:text-foreground" href="https://t.me/fspdnr/614" target="_blank">
                Межрегиональный IT хакатон в рамках федерального проекта «Цифровая Россия»
                <br />
                Донецк, 14 — 15 марта 2025
            </Link>
            <Link className="flex-1 hover:text-foreground" href={siteMetadata.repo_url} target="_blank">
                Исходный код на GitHub
            </Link>
        </footer>
    );
}
