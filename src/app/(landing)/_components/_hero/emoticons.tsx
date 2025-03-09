interface EmoticonsProps {
    position: { x: number; y: number };
}

export function Emoticons({ position }: EmoticonsProps) {
    const emoticons = [
        { symbol: "✨", style: { top: "-10%", left: "0%" } },
        { symbol: "🚀", style: { top: "-10%", right: "-6%" } },
        { symbol: "🔍", style: { bottom: "-10%", left: "0%" } },
        { symbol: "💡", style: { bottom: "-10%", right: "-6%" } },
    ];

    return (
        <>
            {emoticons.map((emo, index) => (
                <div
                    key={index}
                    className="absolute text-2xl sm:text-3xl md:text-4xl transition-transform duration-300 ease-out"
                    style={{
                        ...emo.style,
                        transform: `translate(${position.x}px, ${position.y}px)`,
                    }}
                >
                    {emo.symbol}
                </div>
            ))}
        </>
    );
}
