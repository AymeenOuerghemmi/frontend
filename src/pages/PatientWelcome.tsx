import { useEffect, useState, useRef } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { GlassCard } from "../components/ui/GlassCard";
import { GradientText } from "../components/ui/GradientText";
import ServiceLoop from "../components/ServiceLoop";
import { translateTextGroup } from "../services/translateService";

export default function PatientWelcome() {
  const { nbsalle: routeSalle } = useParams();
  const [searchParams] = useSearchParams();
  const nbsalleParam = routeSalle ?? searchParams.get("nbsalle");
  const { nbsalle, idpatient } = useParams();

  const [data, setData] = useState<any>(null);
  const [time, setTime] = useState(new Date());
  const [error, setError] = useState<string | null>(null);
  const [isGeneralWelcome, setIsGeneralWelcome] = useState(false);
  const [loading, setLoading] = useState(true);
  const lastDataRef = useRef<any>(null);

  const [lang, setLang] = useState<"fr" | "en" | "ar">("fr");
  const [translatedTexts, setTranslatedTexts] = useState<Record<string, string>>({});

  const messages = [
    "Votre bien-être est notre priorité 💆‍♀️",
    "Respirez... Détendez-vous 🕊️",
    "Un instant pour vous, rien que pour vous ✨",
    "Nos experts s’occupent du reste 💜",
  ];



  // --- Initialisation ---
  useEffect(() => {
    if (nbsalle && idpatient) {
      fetch(`${import.meta.env.VITE_API_BASE_URL}/${nbsalle}/${idpatient}`)
        .then((r) => r.json())
        .then((res) => res.success && setData(res));
    }
  }, [nbsalle, idpatient]);

  // --- Horloge ---
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // --- Textes à traduire ---
  const baseTexts = {
    clinicName: "DIDON CLINIC",
    welcomeText:
      !data?.success || data?.isDischarged
        ? "Bienvenue dans votre espace de soins 🌿"
        : `Bienvenue ${data?.person ? `${data.person.prenom} ${data.person.nom}` : ""}`,
    subText:
      !data?.success || data?.isDischarged
        ? "Profitez de nos services et prenez soin de vous 🌸"
        : `Chambre n° ${data?.chambre || nbsalleParam}`,
    description:
      !data?.success || data?.isDischarged
        ? "Merci de votre confiance. Prenez soin de vous et à bientôt 🌸"
        : "Nous vous offrons une expérience unique, combinant soins médicaux et détente.",
    baseline: "Chirurgie esthétique • Centre de Laser • Médecine esthétique • Greffe Capillaire • Rééducation & Santé",
    dateText: time.toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
    messages: messages.join(" || "),
  };

  // --- Traduction groupée GPT-4o ---
  useEffect(() => {
    const translateAll = async () => {
      if (lang === "fr") {
        setTranslatedTexts(baseTexts);
        return;
      }
      console.log(` Traduction unique vers ${lang.toUpperCase()}...`);
      try {
        const result = await translateTextGroup(baseTexts, lang);
        if (result.messages)
          result.messages = result.messages.split(" || ").map((m: string) => m.trim());
        setTranslatedTexts(result);
      } catch (error) {
        console.error(" Erreur traduction groupée:", error);
        setTranslatedTexts(baseTexts);
      }
    };
    translateAll();
  }, [lang, data]);

  // --- Images Services ---
  const serviceImages = [
    { src: "./images/2-technique-botox-1.jpg", alt: "Bien-être & Soins", url: "https://www.clinique-didon.com/content/botox" },
    { src: "./images/1617917820-8ff0e3a4-e410-4de1-bede-f6b9f0765d60-1024x615.jpg", alt: "Rééducation & Santé", url: "https://www.clinique-didon.com/content/hydrafacial" },
    { src: "./images/C1_5035.jpg", alt: "Centre de Laser", url: "https://www.clinique-didon.com/content/morpheus8" },
    { src: "./images/Capture d’écran 2025-09-29 à 14.37.32.png", alt: "Greffe Capillaire", url: "https://www.clinique-didon.com/content/reduction-mammaire" },
    { src: "./images/Capture d’écran 2025-09-29 à 15.24.22.png", alt: "Chirurgie Esthétique", url: "https://www.clinique-didon.com/content/lifting-mammaire" },
    { src: "./images/Capture d’écran 2025-09-29 à 16.30.48.png", alt: "Chirurgie Esthétique", url: "https://www.clinique-didon.com/content/lifting-cervico-facial" },
    { src: "./images/Capture d’écran 2025-09-29 à 17.27.15.png", alt: "Chirurgie Esthétique", url: "https://www.clinique-didon.com/content/blepharoplastie" },
    { src: "./images/Capture d’écran 2025-10-01 à 18.07.22.png", alt: "Chirurgie Esthétique", url: "https://www.clinique-didon.com/content/reeducation" },
    { src: "./images/Capture d’écran 2025-10-01 à 18.29.29.png", alt: "Chirurgie Esthétique", url: "https://www.clinique-didon.com/content/bien-etre-et-soin" },
    { src: "./images/complements-de-spa (1).jpg", alt: "Chirurgie Esthétique", url: "https://www.clinique-didon.com/content/bien-etre-et-soin" },
    { src: "./images/image (8).png", alt: "Chirurgie Esthétique", url: "https://www.clinique-didon.com/content/bien-etre-et-soin" },
    { src: "./images/jeune-couple-se-detendre-pendant-le-massage-du-dos-au-spa-de-sante-l-accent-est-mis-sur-la-jeune-femme.jpg", alt: "Chirurgie Esthétique", url: "https://www.clinique-didon.com/content/bien-etre-et-soin" },
    { src: "./images/jeune-femme-se-detendre-dans-le-salon-spa (1).jpg", alt: "Chirurgie Esthétique", url: "https://www.clinique-didon.com/content/bien-etre-et-soin" },
    { src: "./images/jolie-femme-africaine-beneficiant-d-un-massage-du-visage-dans-le-salon-spa.jpg", alt: "Chirurgie Esthétique", url: "https://www.clinique-didon.com/content/bien-etre-et-soin" },
    { src: "./images/La-Luminotherapie-LED-Medisol.jpg", alt: "Chirurgie Esthétique", url: "https://www.clinique-didon.com/content/led-therapie" },
    { src: "./images/lipo_1.jpg", alt: "Chirurgie Esthétique", url: "https://www.clinique-didon.com/content/amincissement" },
    { src: "./images/liposuccion-vaser.jpg", alt: "Chirurgie Esthétique", url: "https://www.clinique-didon.com/content/liposuccion" },
    { src: "./images/male-adulte-faisant-une-extraction-d-unite-folliculaire.jpg", alt: "Chirurgie Esthétique", url: "https://www.clinique-didon.com/content/greffe-de-cheveux" },
    { src: "./images/maquillage-permanent-pour-sourcils-gros-plan-belle-femme-aux-sourcils-epais-dans-salon-beaute_358354-9083.jpg", alt: "Chirurgie Esthétique", url: "https://www.clinique-didon.com/content/greffe-des-sourcils" },
    { src: "./images/medecin-orl-touche-nez.jpg", alt: "Chirurgie Esthétique", url: "https://www.clinique-didon.com/content/rhinoplastie" },
    { src: "./images/peeling-dr-pecorelli-chirurgie-plastique-et-medecine-esthetique-paris.jpg", alt: "Chirurgie Esthétique", url: "https://www.clinique-didon.com/content/peeling" },
    { src: "./images/silhouette-de-femme-en-spa (1).jpg", alt: "Chirurgie Esthétique", url: "https://www.clinique-didon.com/content/bien-etre-et-soin" },
    { src: "./images/Site Web (1).png", alt: "Chirurgie Esthétique", url: "https://www.clinique-didon.com/content/bien-etre-et-soin" },
  ];

  // --- Rendu principal ---
  if (error)
    return (
      <div className="h-screen flex flex-col items-center justify-center text-gray-700 text-lg text-center px-4">
        ⚠️ {error}
        <p className="mt-2 text-sm text-gray-500">Vérifiez la connexion au serveur.</p>
      </div>
    );

  if (loading)
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
      className={`relative min-h-screen flex flex-col items-center overflow-hidden font-[Times_New_Roman] bg-[#f9f7f3] ${lang === "ar" ? "direction-rtl text-right" : ""
        }`}
    >
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full flex items-center justify-between px-10 py-1 bg-black/90 backdrop-blur-md border-b border-white/10 z-30 shadow-md">
        <img src="./logo-Didon.png" alt="Didon Clinic" className="w-16 h-16 object-contain" />
        <div className="text-center leading-tight">
          <h1 className="text-[#E5C89D] text-3xl md:text-4xl font-semibold uppercase drop-shadow-sm">
            {translatedTexts.clinicName || baseTexts.clinicName}
          </h1>
        </div>

        {/* Bloc droit (heure + langues) */}
        <div className="flex items-center gap-3 text-[#E5C89D]">
          {/* Heure et date */}
          <div className="text-right leading-tight">
            <div className="text-sm font-medium">
              {time.toLocaleTimeString("fr-FR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
            <div className="text-xs text-[#d4b896]">
              {translatedTexts.dateText || baseTexts.dateText}
            </div>
          </div>

          {/* Sélecteur langue compact */}
          <div className="flex items-center gap-1 bg-black/40 border border-[#E5C89D]/40 rounded-full px-1 py-[2px]">
            {["fr", "en", "ar"].map((lng) => (
              <button
                key={lng}
                onClick={() => setLang(lng as any)}
                className={`w-7 h-7 flex items-center justify-center text-[10px] font-bold rounded-full transition-all ${lang === lng
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
              backgroundImage: `url('./didon-background.png')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-3xl" />
          <div className="relative z-10 text-center space-y-6">
            <GradientText from="#50301aff" to="#8b4513" className="text-4xl md:text-5xl font-bold">
              {translatedTexts.welcomeText || baseTexts.welcomeText}
            </GradientText>
            <p className="text-[#50301aff] text-lg font-medium">
              {translatedTexts.subText || baseTexts.subText}
            </p>
            <div className="relative mt-10 mb-6 h-16 flex justify-center items-center">
              <div className="text-2xl md:text-3xl text-[#3E2E18] font-semibold drop-shadow-sm">
                {msgs[Math.floor((Date.now() / 4000) % msgs.length)]}
              </div>
            </div>
            <p className="text-[#4b281b] leading-relaxed max-w-2xl mx-auto mt-6 text-base">
              {translatedTexts.description || baseTexts.description}
            </p>
          </div>
        </GlassCard>

        <div className="w-full py-3 flex items-center justify-center">
          <div className="flex items-center justify-center gap-4 w-full max-w-4xl px-4">
            <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-[#d4b896] to-transparent max-w-[400px]" />
            <p className="text-[#E5C89D] text-sm md:text-base italic tracking-wider mt-1">
              {translatedTexts.baseline || baseTexts.baseline}
            </p>
            <div className="flex-1 h-[2px] bg-gradient-to-l from-transparent via-[#d4b896] to-transparent max-w-[400px]" />
          </div>
        </div>

        <ServiceLoop images={serviceImages} speed={40} />
      </div>

      {/* FOOTER */}
      <footer className="w-full py-3 bg-black/90 backdrop-blur-md border-t border-white/10 flex items-center justify-center gap-3 text-center">
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
