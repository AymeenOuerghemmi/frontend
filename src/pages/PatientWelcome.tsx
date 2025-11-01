import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "../components/ui/GlassCard";
import { GradientText } from "../components/ui/GradientText";
import ServiceLoop from "../components/ServiceLoop";

export default function PatientWelcome() {
  const { nbsalle, idpatient } = useParams();
  const [data, setData] = useState<any>(null);
  const [index, setIndex] = useState(0);
  const [time, setTime] = useState(new Date());

  const messages = [
    "Bienvenue à Didon Clinic 🌸",
    "Votre bien-être est notre priorité 💆‍♀️",
    "Respirez... Détendez-vous 🕊️",
    "Un instant pour vous, rien que pour vous ✨",
    "Nos experts s’occupent du reste 💜",
  ];

  // 🔹 Récupération des données patient
  useEffect(() => {
    if (nbsalle && idpatient) {
      fetch(`${import.meta.env.VITE_API_BASE_URL}/${nbsalle}/${idpatient}`)
        .then((r) => r.json())
        .then((res) => res.success && setData(res));
    }
  }, [nbsalle, idpatient]);

  // 🔹 Heure en direct
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // 🔹 Message défilant
  useEffect(() => {
    const interval = setInterval(
      () => setIndex((i) => (i + 1) % messages.length),
      4000
    );
    return () => clearInterval(interval);
  }, []);

  if (!data)
    return (
      <div className="h-screen flex items-center justify-center text-gray-500 text-lg font-[Times_New_Roman]">
        Chargement...
      </div>
    );

  const { person } = data;
  const fullName = `${person.prenom} ${person.nom}`;

  // 🔹 Import automatique de toutes les images du dossier /public/images
  const imageModules = import.meta.glob("/public/images/*.{jpg,jpeg,png,webp}");
  const serviceImages = Object.keys(imageModules).map((path) => ({
    src: path.replace("/public", ""), // Retire le /public du chemin
    alt: path.split("/").pop()?.split(".")[0] || "service",
  }));

  return (
    <div className="relative min-h-screen flex flex-col items-center overflow-hidden font-[Times_New_Roman] bg-gradient-to-br from-[#f7ece0] to-[#f7ece0]">
      {/* === HEADER === */}
      <header className="fixed top-0 left-0 w-full flex items-center justify-between px-10 py-1 bg-black/90 backdrop-blur-md border-b border-white/10 z-30 shadow-md">
        <img
          src="/logo-Didon.png"
          alt="Didon Clinic"
          className="w-16 h-16 object-contain"
        />
        <div className="text-center leading-tight">
          <h1 className="text-[#E5C89D] text-3xl md:text-4xl font-semibold uppercase drop-shadow-sm">
            DIDON CLINIC
          </h1>
        </div>
        <div className="text-[#E5C89D] text-right leading-tight">
          <div className="text-lg font-medium">
            {time.toLocaleTimeString("fr-FR", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </div>
          <div className="text-sm text-[#d4b896]">
            {time.toLocaleDateString("fr-FR", {
              weekday: "long",
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </div>
        </div>
      </header>

      {/* === CONTENU PRINCIPAL === */}
      <div className="flex flex-col items-center justify-center flex-grow mt-24 w-full px-2">
        <GlassCard className="relative z-10 p-10 md:p-9 w-[95%] max-w-7xl shadow-2xl rounded-3xl border border-white/40 overflow-hidden">
          <div
            className="absolute inset-0 rounded-3xl"
            style={{
              backgroundImage: `url('/didon-background.png')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-3xl"></div>

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            className="relative z-10 text-center space-y-6"
          >
            <GradientText
              from="#50301aff"
              to="#8b4513"
              className="text-4xl md:text-5xl font-bold"
            >
              Bienvenue {fullName}
            </GradientText>

            <p className="text-[#50301aff] text-lg font-medium">
              Chambre n° {nbsalle}
            </p>

            {/* === Messages défilants === */}
            <div className="overflow-hidden relative mt-10 mb-6 h-16 flex justify-center items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  //exit={{ y: "-100%", opacity: 0 }}
                  //transition={{ duration: 0.7 }}
                  className="absolute text-2xl md:text-3xl text-[#3E2E18] font-semibold drop-shadow-sm"
                >
                  {messages[index]}
                </motion.div>
              </AnimatePresence>
            </div>

            <p className="text-[#4b281b] leading-relaxed max-w-2xl mx-auto mt-6 text-base">
              Nous vous offrons une expérience unique, combinant soins médicaux
              et détente. Laissez-vous porter par la douceur et la sérénité de
              notre espace.
            </p>
          </motion.div>
        </GlassCard>

        {/* === DIVIDER === */}
        <div className="w-full py-3 flex items-center justify-center bg-gradient-to-b from-transparent to-[#f8eee2]">
          <div className="flex items-center justify-center gap-4 w-full max-w-4xl px-4">
            <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-[#d4b896] to-transparent max-w-[400px]" />
            <div className="text-[#74280DFF] text-xl">
              <p className="text-[#E7A542FF] text-sm md:text-base italic tracking-wider mt-1">
                Chirurgie esthétique • Centre de Laser • Médecine esthétique •
                Greffe Capillaire • Rééducation & Santé
              </p>
            </div>
            <div className="flex-1 h-[2px] bg-gradient-to-l from-transparent via-[#d4b896] to-transparent max-w-[400px]" />
          </div>
        </div>

        {/* === BOUCLE D’IMAGES DE SERVICES === */}
        <ServiceLoop images={serviceImages} speed={40} />
      </div>

      {/* === FOOTER === */}
      <footer className="w-full py-3 bg-black/90 backdrop-blur-md border-t border-white/10 flex items-center justify-center gap-3 text-center mt-10">
        <img
          src="https://softsys.com.tn/wp-content/uploads/2018/02/LOGOSOFTSYS.png"
          alt="Softsys Logo"
          className="h-8 w-auto object-contain"
        />
        <p className="text-[#E5C89D] text-sm md:text-base italic tracking-wider">
          © SOFTSYS International - {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
