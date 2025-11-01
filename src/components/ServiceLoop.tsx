import { motion, useAnimation } from "framer-motion";
import { useEffect, useState, useRef } from "react";

interface ServiceLoopProps {
    images: { src: string; alt: string }[];
    speed?: number; // Durée du cycle complet
}

export default function ServiceLoop({ images, speed = 40 }: ServiceLoopProps) {
    const loopImages = [...images, ...images, ...images]; // triple = garantit continuité
    const controls = useAnimation();
    const containerRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);

    // ✅ Démarre une animation infinie linéaire fluide
    useEffect(() => {
        controls.start({
            x: ["0%", "-100%"],
            transition: { repeat: Infinity, duration: speed, ease: "linear" },
        });
    }, [controls, speed]);

    // ✅ Gère le survol
    const handleMouseEnter = () => {
        setIsPaused(true);
        controls.stop();
    };

    const handleMouseLeave = () => {
        setIsPaused(false);
        controls.start({
            x: ["0%", "-100%"],
            transition: { repeat: Infinity, duration: speed, ease: "linear" },
        });
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full overflow-hidden py-8 bg-gradient-to-b from-[#f7ece0] to-[#f7ece0]"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                className="flex gap-8"
                animate={controls}
                style={{ minWidth: "200%" }}
            >
                {loopImages.map((img, i) => (
                    <div
                        key={i}
                        onClick={() =>
                            window.open("https://www.clinique-didon.com/", "_blank")
                        }
                        className="flex-shrink-0 w-72 h-60 rounded-3xl overflow-hidden cursor-pointer relative transition-transform duration-300 hover:scale-105"
                    >
                        {/* 🌫️ Ombre DERRIÈRE l’image */}
                        <div className="absolute inset-0 rounded-3xl shadow-[0_0_40px_10px_rgba(0,0,0,0.25)] -z-10"></div>

                        {/* 🖼️ Image */}
                        <img
                            src={img.src}
                            alt={img.alt}
                            className="w-full h-full object-cover rounded-3xl transition-transform duration-500"
                        />
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
