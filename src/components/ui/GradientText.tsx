import React from "react";

export const GradientText = ({
    children,
    from = "#7C3AED",
    to = "#06B6D4",
    className = "",
}: {
    children: React.ReactNode;
    from?: string;
    to?: string;
    className?: string;
}) => {
    return (
        <span
            className={`bg-clip-text text-transparent bg-gradient-to-r ${className}`}
            style={{
                backgroundImage: `linear-gradient(90deg, ${from}, ${to})`,
            }}
        >
            {children}
        </span>
    );
};
