import Image from "next/image";

interface Props {
    className?: string;
    width: number;
}

export function Logo({ className, width }: Props) {
    return <Image src="/full-transparent-logo.png" alt="VZOR AI" width={width} height="0" className={className} />;
}
