import React from "react";
import { motion } from "framer-motion";

export const ShimmerButton = ({
    text,
    onClick,
}: {
    text: string;
    onClick?: () => void;
}) => {
    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="relative overflow-hidden text-white font-semibold py-3 px-6 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 shadow-lg hover:shadow-xl transition"
        >
            <span className="relative z-10">{text}</span>
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ repeat: Infinity, duration: 2 }}
            />
        </motion.button>
    );
};
