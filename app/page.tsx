"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  LazyMotion,
  domAnimation,
  m,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import {
  Moon,
  Sun,
  Mail,
  ExternalLink,
  Github,
  Linkedin,
  X,
  Code2,
  Sparkles,
  ChevronDown,
  Phone,
  ArrowRight,
  GraduationCap,
  Globe,
  Menu,
  ChevronRight,
  Clock,
  Users,
  CheckCircle2,
  BookOpen,
  Laptop,
} from "lucide-react";

// ============================================================================
// SITE CONFIGURATION - EDITATI AICI INFORMATIILE VOASTRE
// ============================================================================
const siteConfig = {
  name: "Stefan Ionut Razvan",
  title: "Full-Stack Developer",
  subtitle: "Masterand in Medii Virtuale",
  email: "contact@stefan-razvan.dev",
  phone: "+40 700 000 000",
  whatsapp: "40700000000",
  profileImage: "/images/profile.jpg", // Adaugati imaginea voastra aici
  social: {
    github: "https://github.com/stefan-razvan",
    linkedin: "https://linkedin.com/in/stefan-razvan",
  },
  navLinks: [
    { label: "Acasa", href: "#hero" },
    { label: "Despre", href: "#about" },
    { label: "Servicii", href: "#services" },
    { label: "Proiecte", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],
  about: {
    description: `Sunt un dezvoltator Full-Stack pasionat de crearea experientelor digitale memorabile. 
    Cu expertiza in React, Next.js si tehnologii moderne de web, transform ideile in realitate digitala.
    Ca Masterand in Medii Virtuale, explorez constant granitele dintre lumea fizica si cea digitala.`,
    stats: [
      { label: "Ani Experienta", value: "5+" },
      { label: "Proiecte Finalizate", value: "50+" },
      { label: "Clienti Multumiti", value: "30+" },
      { label: "Tehnologii", value: "15+" },
    ],
  },
  // Doar 2 servicii: Meditatii si Dezvoltare Web
  services: [
    {
      icon: "GraduationCap",
      title: "Meditatii Programare",
      shortDescription:
        "Invata programare de la zero sau avanseaza-ti cunostintele.",
      fullDescription: `Ofer meditatii personalizate pentru studenti si profesionisti care vor sa invete programare sau sa-si imbunatateasca abilitatile existente.`,
      features: [
        "Lectii 1-on-1 adaptate nivelului tau",
        "HTML, CSS, JavaScript de baza pana la avansat",
        "React, Next.js si framework-uri moderne",
        "Proiecte practice pentru portofoliu",
        "Pregatire interviuri tehnice",
        "Flexibilitate program (online/offline)",
      ],
      pricing: "Pret: de la 80 RON / ora",
      cta: "Programeaza o sedinta",
    },
    {
      icon: "Globe",
      title: "Dezvoltare Web",
      shortDescription:
        "Site-uri si aplicatii web moderne, rapide si optimizate.",
      fullDescription: `Dezvolt site-uri web si aplicatii personalizate folosind cele mai noi tehnologii. De la landing pages simple la platforme complexe.`,
      features: [
        "Site-uri de prezentare & landing pages",
        "Magazine online (e-commerce)",
        "Aplicatii web personalizate",
        "Design responsive (mobil, tableta, desktop)",
        "Optimizare SEO & performanta",
        "Mentenanta si suport continuu",
      ],
      pricing: "Pret: de la 500 EUR / proiect",
      cta: "Cere o oferta",
    },
  ],
  projects: [
    {
      title: "LogiFleet - Management de Flotă",
      description:
        "Lucrarea mea de licență: o platformă integrată pentru administrarea vehiculelor comerciale. Include monitorizarea locației prin GPS (integrare Traccar), gestionarea rutelor și a șoferilor, precum și rapoarte automate pentru costuri și mentenanță. Interfața este complet bilingvă (Română/Engleză).",
      tags: ["React", "Node.js", "MongoDB Atlas", "Leaflet"],
      image: "/images/projects/dashboard.webp",
      liveUrl: "#",
      githubUrl: "https://github.com/Razvan0307/SR-WebSite",
      color: "from-blue-500/20 to-emerald-500/20",
    },
    {
      title: "HSSE Asset Inspector (NFC)",
      description:
        "Aplicație dezvoltată în internship-ul la DP World Constanța pentru digitalizarea inspecțiilor de siguranță. Utilizează tehnologia NFC pentru identificarea rapidă a activelor (stingătoare, hamuri), permite raportarea defectelor cu dovezi foto și menține un istoric complet al scanărilor pentru conformitate HSSE.",
      tags: ["Next.js", "NFC Web API", "HSSE Safety", "Asset Management"],
      image: "/images/projects/nfc-app.png",
      liveUrl: "#",
      githubUrl: "https://github.com/Razvan0307/hse-nfc-app",
      color: "from-orange-500/20 to-red-500/20",
    },
  ],
  codeSnippet: `// Hello World in Next.js
import { motion } from 'framer-motion'

export default function App() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="hero"
    >
      <h1>Stefan Razvan</h1>
      <p>Full-Stack Developer</p>
    </motion.div>
  )
}`,
};

// ============================================================================
// ICON MAPPING
// ============================================================================
const iconMap: Record<string, React.ElementType> = {
  Code2,
  GraduationCap,
  Globe,
  Sparkles,
  BookOpen,
  Laptop,
};

// ============================================================================
// THEME HOOK
// ============================================================================
function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    setTheme(saved || (prefersDark ? "dark" : "light"));
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.classList.toggle("dark", theme === "dark");
      localStorage.setItem("theme", theme);
    }
  }, [theme, mounted]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return { theme, toggleTheme, mounted };
}

// ============================================================================
// MOBILE MENU - Design complet refacut
// ============================================================================
function MobileMenu({
  isOpen,
  onClose,
  onContactClick,
  theme,
  toggleTheme,
}: {
  isOpen: boolean;
  onClose: () => void;
  onContactClick: () => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
}) {
  const menuVariants = {
    closed: {
      opacity: 0,
      transition: { staggerChildren: 0.03, staggerDirection: -1 },
    },
    open: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.15 },
    },
  };

  const itemVariants = {
    closed: { x: -30, opacity: 0 },
    open: { x: 0, opacity: 1 },
  };

  const handleNavClick = (href: string) => {
    onClose();
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 150);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50"
        >
          {/* Animated background with gradient */}
          <m.div
            initial={{ scale: 0, borderRadius: "100%" }}
            animate={{ scale: 1, borderRadius: "0%" }}
            exit={{ scale: 0, borderRadius: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 bg-linear-to-br from-background via-background to-secondary/50 origin-top-right"
          />

          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="absolute -top-20 -right-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl"
            />
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.1 }}
              className="absolute bottom-20 -left-20 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl"
            />
          </div>

          {/* Content */}
          <div className="relative h-full flex flex-col">
            {/* Header with close & theme */}
            <div className="flex items-center justify-between p-5">
              <m.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-2xl font-bold"
              >
                SR<span className="text-emerald-500">.</span>
              </m.span>

              <div className="flex items-center gap-2">
                {/* Theme toggle in menu */}
                <m.button
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  onClick={toggleTheme}
                  className="w-11 h-11 rounded-xl bg-secondary/80 flex items-center justify-center"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                </m.button>

                {/* Close button */}
                <m.button
                  initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  transition={{ delay: 0.15 }}
                  onClick={onClose}
                  className="w-11 h-11 rounded-xl bg-foreground text-background flex items-center justify-center"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </m.button>
              </div>
            </div>

            {/* Navigation */}
            <m.nav
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="flex-1 flex flex-col justify-center px-6 -mt-10"
            >
              {siteConfig.navLinks.map((link, index) => (
                <m.button
                  key={link.href}
                  variants={itemVariants}
                  onClick={() => handleNavClick(link.href)}
                  className="group relative py-4 text-left overflow-hidden"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-4">
                      <span className="text-xs font-mono text-emerald-500/70 w-6">
                        0{index + 1}
                      </span>
                      <span className="text-3xl font-semibold text-foreground tracking-tight">
                        {link.label}
                      </span>
                    </div>
                    <m.div
                      className="text-muted-foreground"
                      initial={{ x: -5, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 0.5 }}
                    >
                      <ChevronRight size={20} />
                    </m.div>
                  </div>
                  {/* Animated underline */}
                  <m.div
                    className="absolute bottom-3 left-10 right-0 h-px bg-linear-to-r from-border to-transparent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ delay: 0.1 * index }}
                  />
                </m.button>
              ))}
            </m.nav>

            {/* Footer with CTA and social */}
            <m.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-6 space-y-4"
            >
              <m.button
                onClick={() => {
                  onContactClick();
                  onClose();
                }}
                className="w-full py-4 bg-linear-to-r from-emerald-500 to-emerald-600 text-white rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 shadow-lg shadow-emerald-500/25"
                whileTap={{ scale: 0.98 }}
              >
                <Mail size={20} />
                Contacteaza-ma
              </m.button>

              <div className="flex items-center justify-center gap-4">
                <a
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="GitHub"
                >
                  <Github size={22} />
                </a>
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={22} />
                </a>
                <a
                  href={`https://wa.me/${siteConfig.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500"
                  aria-label="WhatsApp"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="22"
                    height="22"
                    fill="currentColor"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </a>
              </div>
            </m.div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}

// ============================================================================
// NAVBAR
// ============================================================================
function Navbar({
  theme,
  toggleTheme,
  onContactClick,
}: {
  theme: "light" | "dark";
  toggleTheme: () => void;
  onContactClick: () => void;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#hero");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = siteConfig.navLinks.map((link) => link.href);
      for (const section of sections.reverse()) {
        const element = document.querySelector(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <m.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-lg border-b border-border shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <m.a
              href="#hero"
              className="relative text-xl md:text-2xl font-bold text-foreground"
              whileHover={{ scale: 1.05 }}
            >
              SR<span className="text-emerald-500">.</span>
            </m.a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-1">
              {siteConfig.navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm transition-colors ${
                    activeSection === link.href
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {activeSection === link.href && (
                    <m.span
                      layoutId="activeSection"
                      className="absolute inset-0 bg-secondary rounded-lg"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              <m.button
                onClick={toggleTheme}
                className="p-2.5 rounded-full bg-secondary/80 hover:bg-secondary transition-colors"
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait">
                  {theme === "dark" ? (
                    <m.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                    >
                      <Sun size={18} />
                    </m.div>
                  ) : (
                    <m.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                    >
                      <Moon size={18} />
                    </m.div>
                  )}
                </AnimatePresence>
              </m.button>

              <m.button
                onClick={onContactClick}
                className="px-5 py-2.5 bg-foreground text-background rounded-full text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact
                <ArrowRight size={16} />
              </m.button>
            </div>

            {/* Mobile Menu Button - Redesigned */}
            <m.button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden w-11 h-11 rounded-xl bg-secondary/80 flex items-center justify-center"
              whileTap={{ scale: 0.9 }}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </m.button>
          </div>
        </div>
      </m.nav>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onContactClick={onContactClick}
        theme={theme}
        toggleTheme={toggleTheme}
      />
    </>
  );
}

// ============================================================================
// 3D LAPTOP COMPONENT
// ============================================================================
function Laptop3D() {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.innerWidth < 768) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const springConfig = { stiffness: 100, damping: 30 };
  const rotateX = useSpring(mousePos.y, springConfig);
  const rotateY = useSpring(-mousePos.x, springConfig);

  return (
    <m.div
      ref={ref}
      className="relative w-full max-w-lg mx-auto"
      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <m.div
        className="relative"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        animate={{ y: [0, -10, 0] }}
        transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
      >
        {/* Laptop Screen */}
        <div className="relative bg-linear-to-b from-zinc-800 to-zinc-900 rounded-t-xl p-2 border border-zinc-700/50">
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-zinc-700" />
          <div className="bg-zinc-950 rounded-lg overflow-hidden aspect-16/10 relative">
            <div className="absolute inset-0 p-4 font-mono text-xs sm:text-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-2 text-zinc-500 text-xs">page.tsx</span>
              </div>
              <CodeAnimation code={siteConfig.codeSnippet} />
            </div>
          </div>
        </div>
        {/* Laptop Base */}
        <div className="relative">
          <div className="h-3 bg-linear-to-b from-zinc-700 to-zinc-800 rounded-b-sm" />
          <div className="h-1 bg-zinc-900 rounded-b-xl mx-4" />
          <div className="h-2 bg-linear-to-b from-zinc-800 to-zinc-900 rounded-b-xl mx-8 flex items-center justify-center">
            <div className="w-16 h-1 bg-zinc-700/50 rounded-full" />
          </div>
        </div>
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-4/5 h-4 bg-foreground/5 blur-xl rounded-full" />
      </m.div>
    </m.div>
  );
}

// ============================================================================
// CODE ANIMATION
// ============================================================================
function CodeAnimation({ code }: { code: string }) {
  const [displayedCode, setDisplayedCode] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < code.length) {
      const timeout = setTimeout(() => {
        setDisplayedCode((prev) => prev + code[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 30);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setDisplayedCode("");
        setCurrentIndex(0);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, code]);

  const highlightSyntax = (text: string) => {
    return text
      .replace(/(\/\/.*)/g, '<span class="text-zinc-500">$1</span>')
      .replace(
        /\b(import|export|default|function|return|const)\b/g,
        '<span class="text-pink-400">$1</span>',
      )
      .replace(/\b(from|className)\b/g, '<span class="text-cyan-400">$1</span>')
      .replace(/(['"`].*?['"`])/g, '<span class="text-emerald-400">$1</span>')
      .replace(/(&lt;\/?[a-zA-Z.]+)/g, '<span class="text-blue-400">$1</span>')
      .replace(/(\{|\}|\(|\))/g, '<span class="text-yellow-400">$1</span>');
  };

  return (
    <pre className="text-zinc-300 leading-relaxed whitespace-pre-wrap wrap-break-word">
      <code
        dangerouslySetInnerHTML={{
          __html: highlightSyntax(
            displayedCode.replace(/</g, "&lt;").replace(/>/g, "&gt;"),
          ),
        }}
      />
      <span className="animate-pulse text-cyan-400">|</span>
    </pre>
  );
}

// ============================================================================
// HERO SECTION
// ============================================================================
function HeroSection({ onContactClick }: { onContactClick: () => void }) {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center pt-16 pb-8 px-4 relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[50px_50px] dark:opacity-100 opacity-50" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-sm text-emerald-600 dark:text-emerald-400 mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Disponibil pentru proiecte
            </m.div>

            <m.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 text-balance"
            >
              {siteConfig.name}
            </m.h1>

            <m.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl sm:text-2xl text-muted-foreground mb-2"
            >
              {siteConfig.title}
            </m.p>

            <m.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg text-muted-foreground/70 mb-8"
            >
              {siteConfig.subtitle}
            </m.p>

            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4"
            >
              <m.button
                onClick={onContactClick}
                className="group px-6 py-3 bg-foreground text-background rounded-full font-medium hover:opacity-90 transition-all flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail size={18} />
                Contacteaza-ma
              </m.button>

              <m.a
                href="#projects"
                className="px-6 py-3 border border-border rounded-full font-medium hover:bg-secondary transition-colors flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Vezi Proiecte
                <ExternalLink size={18} />
              </m.a>
            </m.div>

            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex justify-center lg:justify-start gap-4 mt-8"
            >
              <m.a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-secondary/50 hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
                whileHover={{ scale: 1.1, y: -3 }}
                aria-label="GitHub"
              >
                <Github size={22} />
              </m.a>
              <m.a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-secondary/50 hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
                whileHover={{ scale: 1.1, y: -3 }}
                aria-label="LinkedIn"
              >
                <Linkedin size={22} />
              </m.a>
            </m.div>
          </div>

          <Laptop3D />
        </div>

        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30"
        >
          <m.button
            onClick={() => {
              const aboutSection = document.getElementById("about");
              if (aboutSection) {
                const navbarHeight = 80; // înălțimea bării de navigație
                const extraOffset = 40; // cât mai vrei să coboare (poți mări, ex: 100)
                const elementPosition =
                  aboutSection.getBoundingClientRect().top + window.scrollY;
                window.scrollTo({
                  top: elementPosition - navbarHeight - extraOffset,
                  behavior: "smooth",
                });
              }
            }}
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <span className="text-xs">Scroll</span>
            <ChevronDown size={20} />
          </m.button>
        </m.div>
      </div>
    </section>
  );
}

// ============================================================================
// ANIMATED IMAGE with 3D effect
// ============================================================================
function AnimatedImage({
  src,
  alt,
  fallbackText,
  className = "",
}: {
  src: string;
  alt: string;
  fallbackText: string;
  className?: string;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x * 15);
    mouseY.set(y * 15);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const rotateX = useSpring(mouseY, { stiffness: 150, damping: 20 });
  const rotateY = useSpring(mouseX, { stiffness: 150, damping: 20 });

  return (
    <m.div
      ref={ref}
      className={`relative overflow-hidden w-full h-full ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "1000px" }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <m.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-full h-full"
      >
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 bg-linear-to-r from-secondary via-secondary/50 to-secondary animate-pulse" />
        )}

        {hasError && (
          <div className="absolute inset-0 bg-linear-to-br from-zinc-700 to-zinc-900 flex items-center justify-center">
            <span className="text-4xl md:text-6xl font-bold text-zinc-500">
              {fallbackText}
            </span>
          </div>
        )}

        {!hasError && (
          <Image
            src={src}
            alt={alt}
            fill
            className={`object-cover transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        )}

        <m.div
          className="absolute inset-0 bg-linear-to-tr from-transparent via-white/10 to-transparent opacity-0"
          whileHover={{ opacity: 1, x: ["100%", "-100%"] }}
          transition={{ duration: 0.6 }}
        />
      </m.div>
    </m.div>
  );
}

// ============================================================================
// ABOUT SECTION
// ============================================================================
function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-5, 5]);

  return (
    <section
      id="about"
      ref={ref}
      className="py-24 px-4 relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2" />

      <div className="max-w-6xl mx-auto">
        <m.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-mono text-emerald-600 dark:text-emerald-400 mb-4 block">
            01. DESPRE MINE
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Cine sunt eu?
          </h2>
          <div className="w-20 h-1 bg-linear-to-r from-emerald-500 to-blue-500 mx-auto rounded-full" />
        </m.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <m.div style={{ y }} className="relative order-2 lg:order-1">
            <m.div
              style={{ scale, rotate }}
              className="relative aspect-4/5 max-w-md mx-auto"
            >
              <m.div
                className="absolute -inset-4 border-2 border-emerald-500/20 rounded-2xl"
                animate={{ rotate: [0, 2, 0, -2, 0] }}
                transition={{ duration: 10, repeat: Infinity }}
              />

              <div className="relative h-full rounded-2xl overflow-hidden border border-border shadow-2xl">
                <AnimatedImage
                  src={siteConfig.profileImage}
                  alt={siteConfig.name}
                  fallbackText="SR"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-transparent" />
                <m.div
                  className="absolute bottom-0 left-0 right-0 p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center gap-2 text-sm text-white/80">
                    <Code2 size={16} />
                    <span>Full-Stack Developer</span>
                  </div>
                </m.div>
              </div>

              <m.div
                className="absolute -top-6 -right-6 w-24 h-24 bg-linear-to-br from-emerald-500/20 to-blue-500/20 rounded-2xl border border-white/10 backdrop-blur-sm flex items-center justify-center"
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                <Code2 size={32} className="text-emerald-500" />
              </m.div>

              <m.div
                className="absolute -bottom-4 -left-4 w-20 h-20 bg-linear-to-br from-blue-500/20 to-cyan-500/20 rounded-full border border-white/10 backdrop-blur-sm flex items-center justify-center"
                animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
              >
                <Sparkles size={24} className="text-blue-500" />
              </m.div>
            </m.div>
          </m.div>

          <div className="order-1 lg:order-2">
            <m.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-lg text-muted-foreground leading-relaxed mb-8"
            >
              {siteConfig.about.description}
            </m.p>

            <div className="grid grid-cols-2 gap-4">
              {siteConfig.about.stats.map((stat, index) => (
                <m.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="p-5 bg-linear-to-br from-secondary/80 to-secondary/40 rounded-2xl border border-border hover:border-emerald-500/30 transition-colors"
                >
                  <m.div className="text-3xl sm:text-4xl font-bold text-foreground mb-1">
                    {stat.value}
                  </m.div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </m.div>
              ))}
            </div>

            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-8 flex flex-wrap gap-2"
            >
              {[
                "React",
                "Next.js",
                "TypeScript",
                "Node.js",
                "Three.js",
                "Tailwind",
              ].map((tech, i) => (
                <m.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + i * 0.05 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="px-3 py-1.5 text-xs font-medium bg-foreground/5 border border-border rounded-full text-muted-foreground hover:text-foreground hover:border-emerald-500/30 transition-colors cursor-default"
                >
                  {tech}
                </m.span>
              ))}
            </m.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// SERVICE CARD - Expandable with details
// ============================================================================
function ServiceCard({
  service,
  index,
  onContactClick,
}: {
  service: (typeof siteConfig.services)[0];
  index: number;
  onContactClick: () => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = iconMap[service.icon];

  return (
    <m.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="group relative"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-linear-to-br from-emerald-500/20 to-blue-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <m.div
        className="relative bg-card rounded-3xl border border-border hover:border-emerald-500/30 transition-all duration-300 overflow-hidden"
        layout
      >
        {/* Main content */}
        <div className="p-8">
          <m.div
            className="w-16 h-16 bg-linear-to-br from-emerald-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center mb-6"
            whileHover={{ rotate: 5, scale: 1.1 }}
          >
            <Icon
              size={32}
              className="text-emerald-600 dark:text-emerald-400"
            />
          </m.div>

          <h3 className="text-2xl font-bold text-foreground mb-3">
            {service.title}
          </h3>
          <p className="text-muted-foreground mb-6">
            {service.shortDescription}
          </p>

          {/* Expand button */}
          <m.button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium"
            whileHover={{ x: 5 }}
          >
            {isExpanded ? "Vezi mai putin" : "Vezi detalii"}
            <m.span animate={{ rotate: isExpanded ? 90 : 0 }}>
              <ChevronRight size={18} />
            </m.span>
          </m.button>
        </div>

        {/* Expandable details */}
        <AnimatePresence>
          {isExpanded && (
            <m.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-8 pb-8 border-t border-border pt-6">
                <p className="text-muted-foreground mb-6">
                  {service.fullDescription}
                </p>

                {/* Features list */}
                <div className="space-y-3 mb-6">
                  {service.features.map((feature, i) => (
                    <m.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2
                        size={18}
                        className="text-emerald-500 mt-0.5 shrink-0"
                      />
                      <span className="text-sm text-foreground">{feature}</span>
                    </m.div>
                  ))}
                </div>

                {/* Pricing */}
                <div className="flex items-center gap-2 mb-6 p-4 bg-emerald-500/10 rounded-xl">
                  <Clock size={18} className="text-emerald-500" />
                  <span className="font-semibold text-foreground">
                    {service.pricing}
                  </span>
                </div>

                {/* CTA */}
                <m.button
                  onClick={onContactClick}
                  className="w-full py-4 bg-linear-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {service.cta}
                  <ArrowRight size={18} />
                </m.button>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </m.div>
    </m.div>
  );
}

// ============================================================================
// SERVICES SECTION
// ============================================================================
function ServicesSection({ onContactClick }: { onContactClick: () => void }) {
  return (
    <section
      id="services"
      className="py-24 px-4 bg-secondary/30 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative">
        <m.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-mono text-emerald-600 dark:text-emerald-400 mb-4 block">
            02. SERVICII
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Ce ofer?
          </h2>
          <div className="w-20 h-1 bg-linear-to-r from-emerald-500 to-blue-500 mx-auto rounded-full" />
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Servicii personalizate pentru a te ajuta sa inveti programare sau
            sa-ti construiesti prezenta online
          </p>
        </m.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {siteConfig.services.map((service, index) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={index}
              onContactClick={onContactClick}
            />
          ))}
        </div>

        {/* Additional info */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-6 flex-wrap justify-center text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users size={18} className="text-emerald-500" />
              <span>Sesiuni 1-on-1</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-emerald-500" />
              <span>Program flexibil</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} className="text-emerald-500" />
              <span>Garantie satisfactie</span>
            </div>
          </div>
        </m.div>
      </div>
    </section>
  );
}

// ============================================================================
// PROJECT CARD - Fixed links
// ============================================================================
function ProjectCard({
  project,
  index,
}: {
  project: (typeof siteConfig.projects)[0];
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <m.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card hover:border-emerald-500/30 transition-all duration-500"
    >
      <m.div
        className={`absolute inset-0 bg-linear-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />

      {/* Project Image */}
      <div className="aspect-video relative overflow-hidden">
        <AnimatedImage
          src={project.image}
          alt={project.title}
          fallbackText={project.title.slice(0, 2).toUpperCase()}
          className="w-full h-full object-cover"
        />

        <m.div
          className="absolute inset-0 bg-linear-to-t from-card via-card/50 to-transparent"
          animate={{ opacity: isHovered ? 0.9 : 0.7 }}
        />

        {/* Action buttons on hover */}
        <m.div
          className="absolute top-4 right-4 flex gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -10 }}
          transition={{ duration: 0.3 }}
        >
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            aria-label="View live site"
          >
            <ExternalLink size={18} />
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            aria-label="View source code"
          >
            <Github size={18} />
          </a>
        </m.div>

        {/* Tags on hover */}
        <m.div
          className="absolute top-4 left-4 flex flex-wrap gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {project.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md border border-white/10 rounded-md text-white shadow-xl"
            >
              {tag}
            </span>
          ))}
        </m.div>
      </div>

      {/* Project Info */}
      <div className="relative p-6">
        <m.h3
          className="text-xl font-semibold text-foreground mb-2"
          animate={{ x: isHovered ? 5 : 0 }}
        >
          {project.title}
        </m.h3>

        <p className="text-muted-foreground mb-4">{project.description}</p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs bg-secondary rounded-full text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Corner accent */}
      <m.div
        className="absolute top-0 right-0 w-20 h-20 bg-linear-to-bl from-emerald-500/20 to-transparent"
        animate={{ scale: isHovered ? 1.5 : 1 }}
        transition={{ duration: 0.5 }}
      />
    </m.div>
  );
}

// ============================================================================
// PROJECTS SECTION
// ============================================================================
function ProjectsSection() {
  return (
    <section id="projects" className="py-24 px-4 relative overflow-hidden">
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative">
        <m.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-mono text-emerald-600 dark:text-emerald-400 mb-4 block">
            03. PORTOFOLIU
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Proiecte Recente
          </h2>
          <div className="w-20 h-1 bg-linear-to-r from-emerald-500 to-blue-500 mx-auto rounded-full" />
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            O selectie de proiecte care demonstreaza abilitatile mele in
            dezvoltarea web moderna
          </p>
        </m.div>

        <div className="grid md:grid-cols-2 gap-8">
          {siteConfig.projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <m.a
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-full text-muted-foreground hover:text-foreground hover:border-emerald-500/30 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={20} />
            Vezi toate proiectele pe GitHub
            <ArrowRight size={16} />
          </m.a>
        </m.div>
      </div>
    </section>
  );
}

// ============================================================================
// CONTACT SECTION
// ============================================================================
function ContactSection({ onContactClick }: { onContactClick: () => void }) {
  return (
    <section
      id="contact"
      className="py-24 px-4 bg-secondary/30 relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-linear-to-r from-emerald-500/10 via-blue-500/10 to-emerald-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative">
        <m.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-mono text-emerald-600 dark:text-emerald-400 mb-4 block">
            04. CONTACT
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Hai sa Colaboram
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Ai un proiect in minte sau vrei sa inveti programare? Sunt mereu
            deschis pentru noi oportunitati.
          </p>

          <m.button
            onClick={onContactClick}
            className="group px-10 py-5 bg-foreground text-background rounded-full font-semibold text-lg hover:opacity-90 transition-opacity inline-flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail size={22} />
            Trimite un Mesaj
            <m.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <ArrowRight size={22} />
            </m.span>
          </m.button>

          <m.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-12 flex flex-wrap justify-center gap-6"
          >
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail size={18} />
              {siteConfig.email}
            </a>
            <a
              href={`tel:${siteConfig.phone}`}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Phone size={18} />
              {siteConfig.phone}
            </a>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}

// ============================================================================
// FOOTER
// ============================================================================
function Footer() {
  return (
    <footer className="py-8 px-4 border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold">
            SR<span className="text-emerald-500">.</span>
          </span>
          <span className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Toate drepturile rezervate.
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href={siteConfig.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}

// ============================================================================
// CONTACT MODAL
// ============================================================================
function ContactModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />

          <m.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-md bg-card border border-border rounded-3xl p-8 z-50 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-foreground">Contact</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Alege metoda preferata
                </p>
              </div>
              <m.button
                onClick={onClose}
                className="p-2 hover:bg-secondary rounded-full transition-colors"
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Close modal"
              >
                <X size={24} />
              </m.button>
            </div>

            <div className="flex flex-col gap-3">
              <m.a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-4 p-4 bg-secondary/50 rounded-2xl border border-border hover:border-emerald-500/30 transition-all group"
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-12 h-12 bg-foreground/10 rounded-xl flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                  <Mail size={24} className="text-foreground" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-foreground">Email</div>
                  <div className="text-sm text-muted-foreground">
                    {siteConfig.email}
                  </div>
                </div>
                <ArrowRight
                  size={20}
                  className="text-muted-foreground group-hover:text-emerald-500 transition-colors"
                />
              </m.a>

              <m.a
                href={`tel:${siteConfig.phone}`}
                className="flex items-center gap-4 p-4 bg-secondary/50 rounded-2xl border border-border hover:border-emerald-500/30 transition-all group"
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-12 h-12 bg-foreground/10 rounded-xl flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                  <Phone size={24} className="text-foreground" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-foreground">Telefon</div>
                  <div className="text-sm text-muted-foreground">
                    {siteConfig.phone}
                  </div>
                </div>
                <ArrowRight
                  size={20}
                  className="text-muted-foreground group-hover:text-emerald-500 transition-colors"
                />
              </m.a>

              <m.a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/30 hover:border-emerald-500/50 transition-all group"
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-emerald-600 dark:text-emerald-400">
                    WhatsApp
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Mesaj instant
                  </div>
                </div>
                <ArrowRight size={20} className="text-emerald-500" />
              </m.a>
            </div>
          </m.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ============================================================================
// WHATSAPP FAB
// ============================================================================
function WhatsAppFAB() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <m.a
      href={`https://wa.me/${siteConfig.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      aria-label="Contact via WhatsApp"
    >
      <AnimatePresence>
        {isHovered && (
          <m.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-2 bg-card border border-border rounded-lg shadow-lg whitespace-nowrap"
          >
            <span className="text-sm font-medium">Scrie-mi pe WhatsApp</span>
          </m.div>
        )}
      </AnimatePresence>

      <m.div
        className="relative w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <span className="absolute w-full h-full rounded-full bg-emerald-500 animate-ping opacity-30" />
        <svg viewBox="0 0 24 24" width="28" height="28" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </m.div>
    </m.a>
  );
}

// ============================================================================
// MAIN PAGE
// ============================================================================
export default function PortfolioPage() {
  const { theme, toggleTheme, mounted } = useTheme();
  const [contactModalOpen, setContactModalOpen] = useState(false);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <m.div
          className="w-10 h-10 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  return (
    <LazyMotion features={domAnimation}>
      <main className="min-h-screen bg-background text-foreground">
        <Navbar
          theme={theme}
          toggleTheme={toggleTheme}
          onContactClick={() => setContactModalOpen(true)}
        />
        <HeroSection onContactClick={() => setContactModalOpen(true)} />
        <AboutSection />
        <ServicesSection onContactClick={() => setContactModalOpen(true)} />
        <ProjectsSection />
        <ContactSection onContactClick={() => setContactModalOpen(true)} />
        <Footer />
        <ContactModal
          isOpen={contactModalOpen}
          onClose={() => setContactModalOpen(false)}
        />
        <WhatsAppFAB />
      </main>
    </LazyMotion>
  );
}
