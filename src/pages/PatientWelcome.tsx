import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "../components/ui/GlassCard";
import { GradientText } from "../components/ui/GradientText";
import { ShimmerButton } from "../components/ui/ShimmerButton";

export default function PatientWelcome() {
    const { nbsalle, idpatient } = useParams();
    const [data, setData] = useState<any>(null);
    const [index, setIndex] = useState(0);

    const messages = [
        "Bienvenue à Didon Clinic 🌸",
        "Votre bien-être est notre priorité 💆‍♀️",
        "Respirez... Détendez-vous 🕊️",
        "Un instant pour vous, rien que pour vous ✨",
        "Nos experts s’occupent du reste 💜",
    ];

    useEffect(() => {
        if (nbsalle && idpatient) {
            fetch(`/api/${nbsalle}/${idpatient}`)
                .then((r) => r.json())
                .then((res) => res.success && setData(res));
        }
    }, [nbsalle, idpatient]);

    useEffect(() => {
        const interval = setInterval(
            () => setIndex((i) => (i + 1) % messages.length),
            4000
        );
        return () => clearInterval(interval);
    }, []);

    if (!data)
        return (
            <div className="h-screen flex items-center justify-center text-gray-500 text-lg">
                Chargement...
            </div>
        );

    const { person } = data;
    const fullName = `${person.prenom} ${person.nom}`;

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#e8f1ff] via-[#f8f9ff] to-[#f3ecff]">
            {/* === Bandeau du nom de la clinique === */}
            <motion.header
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="absolute top-0 left-0 w-full text-center py-6 backdrop-blur-md bg-white/30 border-b border-white/40 z-20 shadow-sm"
            >
                <GradientText
                    from="#06B6D4"
                    to="#6D28D9"
                    className="text-3xl md:text-4xl font-extrabold tracking-wide"
                >
                    Didon Clinic
                </GradientText>
                <p className="text-sky-700 font-medium tracking-wider text-sm mt-1">
                    Beauté • Bien-être • Médecine Esthétique
                </p>
            </motion.header>

            {/* === FOND ANIMÉ === */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-br from-sky-200 via-purple-100 to-indigo-200 opacity-60"
                animate={{
                    backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: "300% 300%" }}
            />

            {/* halos mouvants */}
            <motion.div
                className="absolute -top-40 -left-40 w-96 h-96 bg-sky-300/40 rounded-full blur-3xl"
                animate={{ x: [0, 100, 0], y: [0, 80, 0] }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-[-150px] right-[-150px] w-[500px] h-[500px] bg-violet-200/50 rounded-full blur-3xl"
                animate={{ x: [0, -80, 0], y: [0, -60, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* === CONTENU PRINCIPAL === */}
            <GlassCard className="relative z-10 mt-24 p-10 md:p-14 w-[90%] max-w-6xl flex flex-col md:flex-row items-center justify-between shadow-2xl rounded-3xl border border-white/40 backdrop-blur-2xl bg-white/50">
                {/* Texte gauche */}
                <motion.div
                    initial={{ opacity: 0, x: -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2 }}
                    className="flex-1 text-left space-y-6"
                >
                    <GradientText
                        from="#6D28D9"
                        to="#06B6D4"
                        className="text-4xl md:text-5xl font-bold"
                    >
                        Bienvenue {fullName}
                    </GradientText>

                    <p className="text-sky-500 text-lg font-medium">
                        Salle n° {nbsalle}
                    </p>

                    {/* Texte déroulant fluide */}
                    <div
                        className="overflow-hidden relative mt-6"
                        style={{ height: "6rem" }}
                    >

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={index}
                                initial={{ y: "100%", opacity: 0 }}
                                animate={{ y: "0%", opacity: 1 }}
                                exit={{ y: "-100%", opacity: 0 }}
                                transition={{ duration: 1 }}
                                className="absolute text-2xl md:text-3xl text-gray-700 font-semibold"
                            >
                                {messages[index]}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <p className="text-gray-600 leading-relaxed max-w-lg mt-6">
                        Nous vous offrons une expérience unique, combinant soins médicaux et
                        détente. Laissez-vous porter par la douceur et la sérénité de notre
                        espace ✨
                    </p>
                </motion.div>

                {/* Image docteur à droite */}
                <motion.div
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2 }}
                    className="flex-1 flex justify-center relative"
                >
                    <motion.img
                        src="/doctor.png"  // ✅ utilise ton image locale placée dans /public
                        alt="Docteur"
                        className="w-80 md:w-96 drop-shadow-2xl select-none"
                        animate={{ y: [0, -15, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    />

                    <motion.div
                        className="absolute -z-10 bottom-0 right-0 w-64 h-64 bg-sky-100 rounded-full blur-3xl opacity-70"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    />
                </motion.div>
            </GlassCard>

            <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent pointer-events-none"></div>
        </div>
    );
}
