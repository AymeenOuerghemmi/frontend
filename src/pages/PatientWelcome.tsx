import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "../components/ui/GlassCard";
import { GradientText } from "../components/ui/GradientText";

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

  useEffect(() => {
    if (nbsalle && idpatient) {
      fetch(`/api/${nbsalle}/${idpatient}`)
        .then((r) => r.json())
        .then((res) => res.success && setData(res));
    }
  }, [nbsalle, idpatient]);

  useEffect(() => {
    if (nbsalle && idpatient) {
      fetch(`${import.meta.env.VITE_API_BASE_URL}/${nbsalle}/${idpatient}`)
        .then((r) => r.json())
        .then((res) => res.success && setData(res));
    }
  }, [nbsalle, idpatient]);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

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

  return (
    <div className="relative min-h-screen flex flex-col items-center overflow-hidden font-[Times_New_Roman]">
      {/* === NAVBAR === */}
      <motion.header
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0 }}
        className="fixed top-0 left-0 w-full flex items-center justify-between px-10 py-1 bg-black/90 backdrop-blur-md border-b border-white/10 z-30 shadow-md"
      >
        {/* === Logo à gauche === */}
        <div className="flex items-center gap-3">
          <img
            src="/logo-Didon.png"
            alt="Didon Clinic Logo"
            className="w-16 h-16 object-contain drop-shadow-md"
          />
        </div>

        {/* === Nom de la clinique centré === */}
        <div className="flex flex-col items-center text-center leading-tight">
          <h1 className="text-[#E5C89D] text-3xl md:text-4xl font-semibold tracking-wide uppercase drop-shadow-sm">
            DIDON CLINIC
          </h1>
          <p className="text-[#E5C89D] text-sm md:text-base italic tracking-wider mt-1">
            Bien-être • Santé • Laser • Esthétique • Greffe • Chirurgie
          </p>
        </div>

        {/* === Heure actuelle à droite === */}
        <div className="text-[#E5C89D] text-lg font-medium tracking-wide text-right leading-tight">
          {/* Heure actuelle */}
          <div>
            {time.toLocaleTimeString("fr-FR", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </div>

          {/* Date du jour */}
          <div className="text-sm text-[#d4b896]">
            {time.toLocaleDateString("fr-FR", {
              weekday: "long",
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </div>
        </div>
      </motion.header>

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
              Salle n° {nbsalle}
            </p>

            {/* === Messages défilants === */}
            <div className="overflow-hidden relative mt-10 mb-6 h-16 flex justify-center items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0 }}
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
        {/* === DIVIDER ÉLÉGANT ENTRE LA CARTE ET LES SERVICES === */}
        <div className="w-full py-3 flex items-center justify-center bg-gradient-to-b ">
          <div className="flex items-center justify-center gap-4 w-full max-w-4xl px-4">
            {/* Ligne gauche */}
            <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-[#d4b896] to-transparent max-w-[400px]" />
            {/* Étoile centrale (4 branches) */}
            <div className="text-[#7a3016] text-xl">
              <span className="inline-block">✦</span>
            </div>
            {/* Ligne droite */}
            <div className="flex-1 h-[2px] bg-gradient-to-l from-transparent via-[#d4b896] to-transparent max-w-[400px]" />
          </div>
        </div>

        {/* === CARTES DES SERVICES === */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 mt-2 w-full max-w-9xl px-2 ">
          {[
            {
              title: "Bien-être & Soins",
              desc: "Un espace dédié à la détente et à l'harmonie : 3 salles de soins, un hammam traditionnel et des soins haut de gamme signés Clarins, pour une expérience unique de beauté et de relaxation.",
              icon: "/icons/spa.png",
              bg: "bg-[#f0dfc7]/15",
            },
            {
              title: "Rééducation & Santé",
              desc: "Nous vous accompagnons avec un programme nutritionnel et sportif adapté à vos besoins, alliant nutrition, suivi médicalisé et programme personnalisé.",
              icon: "/icons/Rééducation.png",
              bg: "bg-[#f0dfc7]/30",
            },
            {
              title: "Centre de Laser",
              desc: "Équipé des technologies les plus performantes pour toutes les carnations : épilation définitive, laser anti-tâches et vasculaire.",
              icon: "/icons/laser.png",
              bg: "bg-[#f0dfc7]/45",
            },
            {
              title: "Médecine Esthétique",
              desc: "Pôle dédié à la médecine esthétique : injections, soins de la peau et laser. Des médecins de référence et des technologies de pointe à votre service.",
              icon: "/icons/docteur.png",
              bg: "bg-[#f0dfc7]/60",
            },
            {
              title: "Greffe Capillaire",
              desc: "Pôle dédié à la greffe de cheveux, barbe et sourcils. Un accompagnement complet du diagnostic personnalisé au suivi post-opératoire.",
              icon: "/icons/traitement-capillaire.png",
              bg: "bg-[#f0dfc7]/75",
            },
            {
              title: "Chirurgie Esthétique",
              desc: "4 salles d'opération, 31 chambres et une équipe médicale dédiée à votre confort et à votre sécurité.",
              icon: "/icons/chirurgie.png",
              bg: "bg-[#f0dfc7]/90",
            },
          ].map((srv, i) => (
            <motion.div
              key={i}
              transition={{ type: "spring", stiffness: 200 }}
              className={`p-6 rounded-2xl ${srv.bg} backdrop-blur-md shadow-lg border border-[#C7A36A]/40 text-center hover:shadow-2xl`}
            >
              {/* === Affichage conditionnel de l’icône === */}
              <div className="flex justify-center mb-3">
                {srv.icon.startsWith("/") ? (
                  <img
                    src={srv.icon}
                    alt={srv.title}
                    className="w-12 h-12 object-contain"
                  />
                ) : (
                  <span className="text-4xl">{srv.icon}</span>
                )}
              </div>

              <h3 className="text-[#8b4513] font-semibold text-xl mb-2 font-[Times_New_Roman]">
                {srv.title}
              </h3>
              <p className="text-gray-900 text-sm leading-relaxed font-[Times_New_Roman]">
                {srv.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
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
