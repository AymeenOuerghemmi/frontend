import { useState, useEffect } from "react";

interface Props {
    text: string[];
    typingSpeed?: number;
    pauseDuration?: number;
    showCursor?: boolean;
    cursorCharacter?: string;
}

export default function TextType({
    text,
    typingSpeed = 100,
    pauseDuration = 1000,
    showCursor = true,
    cursorCharacter = "|",
}: Props) {
    const [displayText, setDisplayText] = useState("");
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        if (index === text.length) return;

        const timeout = setTimeout(() => {
            setDisplayText(text[index].substring(0, subIndex));

            if (!deleting && subIndex === text[index].length) {
                setTimeout(() => setDeleting(true), pauseDuration);
            } else if (deleting && subIndex === 0) {
                setDeleting(false);
                setIndex((prev) => (prev + 1) % text.length);
            }

            setSubIndex((prev) => prev + (deleting ? -1 : 1));
        }, deleting ? typingSpeed / 2 : typingSpeed);

        return () => clearTimeout(timeout);
    }, [subIndex, index, deleting]);

    return (
        <span>
            {displayText}
            {showCursor && (
                <span className="animate-pulse text-cyan-500">{cursorCharacter}</span>
            )}
        </span>
    );
}
