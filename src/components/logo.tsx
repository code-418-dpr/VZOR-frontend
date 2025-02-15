import Image from "next/image";

interface Props {
    width: number;
}

export function Logo({ width }: Props) {
    return <Image src="/full-transparent-logo.png" alt="VZOR AI" width={width} height="0" />;
}
