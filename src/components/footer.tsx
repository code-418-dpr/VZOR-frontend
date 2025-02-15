import Link from "next/link";

import siteMetadata from "@/conf/site-metadata";

export default function Footer() {
    return (
        <footer className="flex items-center border-t py-6 text-sm text-muted-foreground text-center">
            <Link className="flex-1" href={siteMetadata.authors.url}>
                Разработано командой {siteMetadata.authors.name}
            </Link>
            <Link className="flex-1" href="https://t.me/fspdnr/614">
                Межрегиональный IT хакатон в рамках федерального проекта «Цифровая Россия»
                <br />
                Донецк, 14 — 15 марта 2025
            </Link>
            <Link className="flex-1" href={siteMetadata.repo_url}>
                Исходный код на GitHub
            </Link>
        </footer>
    );
}
