import React from "react";

export const GlassCard = ({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div
            className={`backdrop-blur-xl bg-white/60 border border-white/40 rounded-2xl shadow-[0_8px_32px_rgba(31,38,135,0.15)] p-6 ${className}`}
        >
            {children}
        </div>
    );
};
