import { Logo } from "@/components/logo";

export default function LogoWithAi() {
    return (
        <div className="flex -mb-12">
            <Logo width={800} className="w-100 sm:w-130 md:w-170" />
            <i className="text-muted-foreground -ml-10 sm:-ml-12 md:-ml-16 mt-2.5 sm:mt-4 md:mt-5.5 text-2xl sm:text-3xl md:text-4xl">
                AI
            </i>
        </div>
    );
}
