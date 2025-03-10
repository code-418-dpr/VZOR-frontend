import { Logo } from "@/components/logo";

export default function LogoWithAi() {
    return (
        <div className="-mb-12 flex">
            <Logo width={800} className="w-100 sm:w-130 md:w-170" />
            <i className="text-muted-foreground mt-2.5 -ml-10 text-2xl sm:mt-4 sm:-ml-12 sm:text-3xl md:mt-5.5 md:-ml-16 md:text-4xl">
                AI
            </i>
        </div>
    );
}
