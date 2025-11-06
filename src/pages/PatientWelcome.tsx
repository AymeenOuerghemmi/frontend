import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "../components/ui/GlassCard";
import { GradientText } from "../components/ui/GradientText";
import { translateTextGroup } from "../services/translateService";

export default function PatientWelcome() {
  const { nbsalle, idpatient } = useParams();
  const [data, setData] = useState<any>(null);
  const [index, setIndex] = useState(0);
  const [time, setTime] = useState(new Date());
  const [lang, setLang] = useState<"fr" | "en" | "ar">("fr");
  const [translatedTexts, setTranslatedTexts] = useState<Record<string, any>>({});
  const lastDataRef = useRef<any>(null);

  const messages = [
    "Bienvenue à Didon Clinic 🌸",
    "Votre bien-être est notre priorité 💆‍♀️",
    "Respirez... Détendez-vous 🕊️",
    "Un instant pour vous, rien que pour vous ✨",
    "Nos experts s’occupent du reste 💜",
  ];

  // Récupération API
  const loadData = async () => {
    if (!nbsalle || !idpatient) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/${nbsalle}/${idpatient}`);
      const json = await res.json();
      const prev = lastDataRef.current;
      const hasChanged = JSON.stringify(json) !== JSON.stringify(prev);
      if (hasChanged) {
        setData(json);
        lastDataRef.current = json;
      }
    } catch (err) {
      console.error("Erreur API:", err);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 15000);
    return () => clearInterval(interval);
  }, [nbsalle, idpatient]);

  // Horloge
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Défilement messages
  useEffect(() => {
    const interval = setInterval(() => setIndex((i) => (i + 1) % messages.length), 4000);
    return () => clearInterval(interval);
  }, []);

  const person = data?.person || {};
  const rawPatientName = (data?.success ? `${person?.prenom || ""} ${person?.nom || ""}` : "").trim();

  const baseTexts = {
    clinicName: "DIDON CLINIC",
    welcomeTitle: "Bienvenue",
    patientName: rawPatientName,
    subText: data?.success ? `Chambre n° ${nbsalle}` : "Bienvenue dans votre espace de soins 🌿",
    description: data?.success
      ? "Nous vous offrons une expérience unique, combinant soins médicaux et détente."
      : "Merci de votre confiance. Prenez soin de vous et à bientôt 🌸",
    baseline:
      "Chirurgie esthétique • Centre de Laser • Médecine esthétique • Greffe Capillaire • Rééducation & Santé",
    dateText: time.toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
    messages: messages.join(" || "),
  };

  useEffect(() => {
    const translateAll = async () => {
      if (lang === "fr") {
        setTranslatedTexts(baseTexts);
        return;
      }
      try {
        const result = await translateTextGroup(baseTexts, lang);
        if (result.messages)
          result.messages = result.messages.split(" || ").map((m: string) => m.trim());
        setTranslatedTexts(result);
      } catch (e) {
        console.error("Erreur traduction:", e);
        setTranslatedTexts(baseTexts);
      }
    };
    translateAll();
  }, [lang, data]);

  const looksLatin = (s: string) => /^[\u0000-\u00ff\s'.-]+$/.test(s);
  const finalPatientName =
    lang === "ar" && looksLatin(translatedTexts.patientName)
      ? baseTexts.patientName
      : (translatedTexts.patientName || baseTexts.patientName);

  const welcomeText = `${translatedTexts.welcomeTitle || baseTexts.welcomeTitle} ${finalPatientName}`.trim();

  // --- IMAGES affichées en ligne + cliquables
  const serviceImages = [
    { src: "/images/IMG-20251106-WA0001.jpg", url: "https://www.clinique-didon.com/content/lifting-mammaire" },
    { src: "/images/IMG-20251106-WA0002.jpg", url: "https://www.clinique-didon.com/content/laser-vasculaire" },
    { src: "/images/IMG-20251106-WA0003.jpg", url: "https://www.clinique-didon.com/content/botox" },
    { src: "/images/IMG-20251106-WA0004.jpg", url: "https://www.clinique-didon.com/content/greffe-de-cheveux" },
    { src: "/images/IMG-20251106-WA0005.jpg", url: "https://www.clinique-didon.com/content/bien-etre-et-soin" },
  ];

  if (!data)
    return (
      <div className="h-screen flex items-center justify-center text-gray-500 text-lg font-[Times_New_Roman]">
        Chargement...
      </div>
    );

  const msgs =
    Array.isArray(translatedTexts.messages) && translatedTexts.messages.length
      ? translatedTexts.messages
      : messages;

  return (
    <div
      className={`relative min-h-screen flex flex-col items-center overflow-hidden font-[Times_New_Roman] bg-[#f9f7f3] ${
        lang === "ar" ? "direction-rtl text-right" : ""
      }`}
    >
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full flex items-center justify-between px-10 py-1 bg-black/90 backdrop-blur-md border-b border-white/10 z-30 shadow-md">
        <img src="/logo-Didon.png" alt="Didon Clinic" className="w-16 h-16 object-contain" />
        <div className="text-center leading-tight">
          <h1 className="text-[#E5C89D] text-3xl md:text-4xl font-semibold uppercase drop-shadow-sm">
            {translatedTexts.clinicName || baseTexts.clinicName}
          </h1>
        </div>

        {/* Heure + langues */}
        <div className="flex items-center gap-3 text-[#E5C89D]">
          <div className="text-right leading-tight">
            <div className="text-sm font-medium">
              {time.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
            </div>
            <div className="text-xs text-[#d4b896]">
              {translatedTexts.dateText || baseTexts.dateText}
            </div>
          </div>

          <div className="flex items-center gap-1 bg-black/40 border border-[#E5C89D]/40 rounded-full px-1 py-[2px]">
            {["fr", "en", "ar"].map((lng) => (
              <button
                key={lng}
                onClick={() => setLang(lng as any)}
                className={`w-7 h-7 flex items-center justify-center text-[10px] font-bold rounded-full transition-all ${
                  lang === lng
                    ? "bg-[#E5C89D] text-black shadow-sm"
                    : "text-[#E5C89D] hover:bg-[#E5C89D]/30"
                }`}
              >
                {lng.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* CONTENU */}
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
          <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-3xl" />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative z-10 text-center space-y-6"
          >
            <GradientText from="#50301aff" to="#8b4513" className="text-4xl md:text-5xl font-bold">
              {welcomeText}
            </GradientText>

            <p className="text-[#50301aff] text-lg font-medium">
              {translatedTexts.subText || baseTexts.subText}
            </p>

            <div className="overflow-hidden relative mt-10 mb-6 h-16 flex justify-center items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  className="absolute text-2xl md:text-3xl text-[#3E2E18] font-semibold drop-shadow-sm"
                >
                  {msgs[index]}
                </motion.div>
              </AnimatePresence>
            </div>

            <p className="text-[#4b281b] leading-relaxed max-w-2xl mx-auto mt-6 text-base">
              {translatedTexts.description || baseTexts.description}
            </p>
          </motion.div>
        </GlassCard>

        {/* Séparateur */}
        <div className="w-full py-3 flex items-center justify-center">
          <div className="flex items-center justify-center gap-4 w-full max-w-4xl px-4">
            <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-[#d4b896] to-transparent max-w-[400px]" />
            <p className="text-[#E5C89D] text-sm md:text-base italic tracking-wider mt-1">
              {translatedTexts.baseline || baseTexts.baseline}
            </p>
            <div className="flex-1 h-[2px] bg-gradient-to-l from-transparent via-[#d4b896] to-transparent max-w-[400px]" />
          </div>
        </div>

        {/* IMAGES EN LIGNE */}
        <div className="flex flex-row justify-center items-center gap-4 mt-6 overflow-x-auto px-2 w-full max-w-6xl">
          {serviceImages.map((img, i) => (
            <a
              key={i}
              href={img.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0"
            >
              <img
                src={img.src}
                className="h-40 w-auto rounded-xl shadow-md object-cover cursor-pointer hover:scale-105 transition-transform"
              />
            </a>
          ))}
        </div>
      </div>

      {/* FOOTER */}
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
