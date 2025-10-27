import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { GlassCard } from "../components/ui/GlassCard";
import { GradientText } from "../components/ui/GradientText";
import { ShimmerButton } from "../components/ui/ShimmerButton";
import TextType from "./TextType";

export default function App() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setLoaded(true), 800);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-50 via-violet-50 to-indigo-100 flex flex-col items-center justify-center overflow-hidden relative">
            {/* Background animated glow */}
            <motion.div
                className="absolute -top-40 -left-40 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-40"
                animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
                transition={{ repeat: Infinity, duration: 10 }}
            />
            <motion.div
                className="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-200 rounded-full blur-3xl opacity-30"
                animate={{ x: [0, -60, 0], y: [0, 60, 0] }}
                transition={{ repeat: Infinity, duration: 12 }}
            />

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-center mb-12 z-10"
            >
                <GradientText from="#7C3AED" to="#06B6D4" className="text-4xl md:text-5xl font-bold">
                    Didon Clinic
                </GradientText>
                <p className="text-gray-600 mt-2 text-lg">
                    Votre espace bien-être, santé & beauté 💆‍♀️
                </p>
            </motion.div>

            {/* Central glass card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: loaded ? 1 : 0, scale: loaded ? 1 : 0.95 }}
                transition={{ duration: 1 }}
                className="z-10"
            >
                <GlassCard className="p-8 md:p-10 w-[90vw] max-w-2xl text-center space-y-6">
                    <motion.img
                        src="https://cdn-icons-png.flaticon.com/512/387/387561.png"
                        alt="Docteur"
                        className="mx-auto w-24 md:w-32 mb-4"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6, duration: 1.2 }}
                    />

                    {/* TextType welcome */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="text-xl md:text-2xl font-semibold text-violet-700"
                    >
                        <TextType
                            text={[
                                "Bienvenue Mr/Mrs — cher patient 🌸",
                                "Détendez-vous, votre séance va commencer 💜",
                                "Notre équipe médicale vous souhaite une belle journée ✨",
                            ]}
                            typingSpeed={75}
                            pauseDuration={1500}
                            showCursor={true}
                            cursorCharacter="|"
                        />
                    </motion.div>

                    {/* CTA buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5, duration: 1 }}
                        className="pt-6 flex flex-col md:flex-row gap-4 justify-center"
                    >
                        <ShimmerButton
                            text="Voir les salles"
                            onClick={() => window.location.href = "/3/1"}
                        />
                        <ShimmerButton
                            text="Profil patient"
                            onClick={() => window.location.href = "/1/1"}
                        />
                    </motion.div>
                </GlassCard>
            </motion.div>

            {/* Footer */}
            <motion.footer
                className="mt-12 text-sm text-gray-500 z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
            >
            </motion.footer>
        </div>
    );
}
