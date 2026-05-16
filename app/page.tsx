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
  Layers,
  Sparkles,
  ChevronDown,
  Phone,
  ArrowRight,
} from "lucide-react";

// ============================================================================
// SITE CONFIGURATION
// ============================================================================
const siteConfig = {
  name: "Stefan Ionut Razvan",
  title: "Full-Stack Developer",
  subtitle: "Masterand in Medii Virtuale",
  email: "contact@stefan-razvan.dev",
  phone: "+40 700 000 000",
  whatsapp: "40700000000",
  profileImage: "/images/profile.jpg", // Add your profile image here
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
  services: [
    {
      icon: "Code2",
      title: "Dezvoltare Web",
      description:
        "Aplicatii web moderne cu Next.js, React si TypeScript. Performanta optimizata si experienta utilizator exceptionala.",
    },
    {
      icon: "Layers",
      title: "Design UI/UX",
      description:
        "Interfete intuitive si atractive. Design responsive care functioneaza perfect pe orice dispozitiv.",
    },
    {
      icon: "Sparkles",
      title: "Medii Virtuale",
      description:
        "Experiente 3D interactive si realitate virtuala. Proiecte inovative la granita tehnologiei.",
    },
  ],
  projects: [
    {
      title: "E-Commerce Platform",
      description: "Platforma completa de comert electronic cu Next.js si Stripe",
      tags: ["Next.js", "TypeScript", "Stripe", "Tailwind"],
      image: "/images/projects/ecommerce.jpg", // Add your project image here
      link: "#",
      color: "from-blue-500/20 to-cyan-500/20",
    },
    {
      title: "Dashboard Analytics",
      description: "Dashboard interactiv pentru vizualizarea datelor in timp real",
      tags: ["React", "D3.js", "Node.js", "MongoDB"],
      image: "/images/projects/dashboard.jpg", // Add your project image here
      link: "#",
      color: "from-emerald-500/20 to-teal-500/20",
    },
    {
      title: "VR Gallery",
      description: "Galerie de arta in realitate virtuala cu Three.js",
      tags: ["Three.js", "WebXR", "GLSL", "React"],
      image: "/images/projects/vr-gallery.jpg", // Add your project image here
      link: "#",
      color: "from-orange-500/20 to-amber-500/20",
    },
    {
      title: "Mobile App",
      description: "Aplicatie mobila cross-platform pentru management de proiecte",
      tags: ["React Native", "Firebase", "Redux", "TypeScript"],
      image: "/images/projects/mobile-app.jpg", // Add your project image here
      link: "#",
      color: "from-rose-500/20 to-pink-500/20",
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
  Layers,
  Sparkles,
};

// ============================================================================
// THEME PROVIDER
// ============================================================================
function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
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
// MOBILE MENU COMPONENT (New Dynamic Design)
// ============================================================================
function MobileMenu({
  isOpen,
  onClose,
  onContactClick,
}: {
  isOpen: boolean;
  onClose: () => void;
  onContactClick: () => void;
}) {
  const menuVariants = {
    closed: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    closed: { x: -20, opacity: 0 },
    open: { x: 0, opacity: 1 },
  };

  const handleNavClick = (href: string) => {
    onClose();
    // Small delay to allow animation to start before scroll
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Full screen backdrop */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-background/95 backdrop-blur-xl z-40"
            onClick={onClose}
          />

          {/* Menu content */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col"
          >
            {/* Close button */}
            <div className="flex justify-end p-6">
              <m.button
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={onClose}
                className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center"
                aria-label="Close menu"
              >
                <X size={24} />
              </m.button>
            </div>

            {/* Navigation links */}
            <m.nav
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="flex-1 flex flex-col justify-center px-8"
            >
              {siteConfig.navLinks.map((link, index) => (
                <m.button
                  key={link.href}
                  variants={itemVariants}
                  onClick={() => handleNavClick(link.href)}
                  className="group py-4 border-b border-border/30 first:border-t text-left"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground font-mono">
                        0{index + 1}
                      </span>
                      <span className="text-3xl font-semibold text-foreground group-hover:text-foreground/70 transition-colors">
                        {link.label}
                      </span>
                    </div>
                    <m.div
                      initial={{ x: -10, opacity: 0 }}
                      whileHover={{ x: 0, opacity: 1 }}
                      className="text-muted-foreground"
                    >
                      <ArrowRight size={24} />
                    </m.div>
                  </div>
                </m.button>
              ))}

              {/* Contact CTA */}
              <m.div variants={itemVariants} className="mt-8">
                <m.button
                  onClick={() => {
                    onContactClick();
                    onClose();
                  }}
                  className="w-full py-4 bg-foreground text-background rounded-2xl font-semibold text-lg flex items-center justify-center gap-2"
                  whileTap={{ scale: 0.98 }}
                >
                  <Mail size={20} />
                  Contacteaza-ma
                </m.button>
              </m.div>

              {/* Social links */}
              <m.div
                variants={itemVariants}
                className="flex justify-center gap-6 mt-8"
              >
                <a
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-secondary text-foreground"
                  aria-label="GitHub"
                >
                  <Github size={24} />
                </a>
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-secondary text-foreground"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={24} />
                </a>
              </m.div>
            </m.nav>
          </m.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ============================================================================
// NAVBAR COMPONENT (Enhanced)
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

      // Detect active section
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

  // Prevent body scroll when mobile menu is open
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
              <span className="relative z-10">SR</span>
              <m.span
                className="absolute -inset-2 bg-foreground/5 rounded-lg -z-0"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              />
              <span className="text-emerald-500">.</span>
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
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 md:gap-3">
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
                      transition={{ duration: 0.2 }}
                    >
                      <Sun size={18} />
                    </m.div>
                  ) : (
                    <m.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon size={18} />
                    </m.div>
                  )}
                </AnimatePresence>
              </m.button>

              <m.button
                onClick={onContactClick}
                className="hidden md:flex px-5 py-2.5 bg-foreground text-background rounded-full text-sm font-medium hover:opacity-90 transition-opacity items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact
                <ArrowRight size={16} />
              </m.button>

              {/* Hamburger Menu Button */}
              <m.button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden p-2.5 rounded-full bg-secondary/80"
                whileTap={{ scale: 0.9 }}
                aria-label="Open menu"
              >
                <div className="w-5 h-4 flex flex-col justify-between">
                  <m.span className="w-full h-0.5 bg-foreground rounded-full" />
                  <m.span className="w-3/4 h-0.5 bg-foreground rounded-full" />
                  <m.span className="w-1/2 h-0.5 bg-foreground rounded-full" />
                </div>
              </m.button>
            </div>
          </div>
        </div>
      </m.nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onContactClick={onContactClick}
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
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <m.div
        className="relative"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          y: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      >
        {/* Laptop Screen */}
        <div className="relative bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-t-xl p-2 border border-zinc-700/50">
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-zinc-700" />
          <div className="bg-zinc-950 rounded-lg overflow-hidden aspect-[16/10] relative">
            {/* Screen Content - Code Animation */}
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
          <div className="h-3 bg-gradient-to-b from-zinc-700 to-zinc-800 rounded-b-sm" />
          <div className="h-1 bg-zinc-900 rounded-b-xl mx-4" />
          <div className="h-2 bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-b-xl mx-8 flex items-center justify-center">
            <div className="w-16 h-1 bg-zinc-700/50 rounded-full" />
          </div>
        </div>

        {/* Reflection/Shadow */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-4/5 h-4 bg-foreground/5 blur-xl rounded-full" />
      </m.div>
    </m.div>
  );
}

// ============================================================================
// CODE ANIMATION COMPONENT
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
        '<span class="text-pink-400">$1</span>'
      )
      .replace(
        /\b(from|className)\b/g,
        '<span class="text-cyan-400">$1</span>'
      )
      .replace(/(['"`].*?['"`])/g, '<span class="text-emerald-400">$1</span>')
      .replace(/(&lt;\/?[a-zA-Z.]+)/g, '<span class="text-blue-400">$1</span>')
      .replace(/(\{|\}|\(|\))/g, '<span class="text-yellow-400">$1</span>');
  };

  return (
    <pre className="text-zinc-300 leading-relaxed whitespace-pre-wrap break-words">
      <code
        dangerouslySetInnerHTML={{
          __html: highlightSyntax(
            displayedCode.replace(/</g, "&lt;").replace(/>/g, "&gt;")
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
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] dark:opacity-100 opacity-50" />
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
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
                <m.span
                  className="inline-block"
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                >
                  <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </m.span>
              </m.button>

              <m.a
                href="#projects"
                className="px-6 py-3 border border-border rounded-full font-medium hover:bg-secondary transition-colors flex items-center gap-2 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Vezi Proiecte
                <ExternalLink size={18} className="group-hover:rotate-12 transition-transform" />
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

          {/* 3D Laptop */}
          <Laptop3D />
        </div>

        {/* Scroll Indicator */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <m.a
            href="#about"
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <span className="text-xs">Scroll</span>
            <ChevronDown size={20} />
          </m.a>
        </m.div>
      </div>
    </section>
  );
}

// ============================================================================
// ANIMATED IMAGE COMPONENT
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
    mouseX.set(x * 20);
    mouseY.set(y * 20);
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
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: "1000px",
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <m.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full"
      >
        {/* Loading shimmer */}
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/50 to-secondary animate-pulse" />
        )}

        {/* Fallback gradient */}
        {hasError && (
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center">
            <span className="text-4xl md:text-6xl font-bold text-zinc-500">{fallbackText}</span>
          </div>
        )}

        {/* Actual image */}
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

        {/* Shine effect on hover */}
        <m.div
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0"
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
    <section id="about" ref={ref} className="py-24 px-4 relative overflow-hidden">
      {/* Background decoration */}
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
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 mx-auto rounded-full" />
        </m.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image with Parallax and 3D Effect */}
          <m.div style={{ y }} className="relative order-2 lg:order-1">
            <m.div
              style={{ scale, rotate }}
              className="relative aspect-[4/5] max-w-md mx-auto"
            >
              {/* Decorative frame */}
              <m.div
                className="absolute -inset-4 border-2 border-emerald-500/20 rounded-2xl"
                animate={{ rotate: [0, 2, 0, -2, 0] }}
                transition={{ duration: 10, repeat: Infinity }}
              />

              {/* Main image container */}
              <div className="relative h-full rounded-2xl overflow-hidden border border-border shadow-2xl">
                <AnimatedImage
                  src={siteConfig.profileImage}
                  alt={siteConfig.name}
                  fallbackText="SR"
                  className="absolute inset-0"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

                {/* Info overlay */}
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

              {/* Floating elements */}
              <m.div
                className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-2xl border border-white/10 backdrop-blur-sm flex items-center justify-center"
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                <Code2 size={32} className="text-emerald-500" />
              </m.div>

              <m.div
                className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full border border-white/10 backdrop-blur-sm flex items-center justify-center"
                animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
              >
                <Sparkles size={24} className="text-blue-500" />
              </m.div>
            </m.div>
          </m.div>

          {/* Content */}
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

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {siteConfig.about.stats.map((stat, index) => (
                <m.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="p-5 bg-gradient-to-br from-secondary/80 to-secondary/40 rounded-2xl border border-border hover:border-emerald-500/30 transition-colors group"
                >
                  <m.div
                    className="text-3xl sm:text-4xl font-bold text-foreground mb-1"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {stat.value}
                  </m.div>
                  <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    {stat.label}
                  </div>
                </m.div>
              ))}
            </div>

            {/* Tech stack badges */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-8 flex flex-wrap gap-2"
            >
              {["React", "Next.js", "TypeScript", "Node.js", "Three.js", "Tailwind"].map(
                (tech, i) => (
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
                )
              )}
            </m.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// SERVICES SECTION
// ============================================================================
function ServicesSection() {
  return (
    <section id="services" className="py-24 px-4 bg-secondary/30 relative overflow-hidden">
      {/* Background decoration */}
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
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 mx-auto rounded-full" />
        </m.div>

        <div className="grid md:grid-cols-3 gap-6">
          {siteConfig.services.map((service, index) => {
            const Icon = iconMap[service.icon];
            return (
              <m.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                {/* Card glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative p-8 bg-card rounded-2xl border border-border hover:border-emerald-500/30 transition-all duration-300 h-full">
                  {/* Icon */}
                  <m.div
                    className="w-14 h-14 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                    whileHover={{ rotate: 5 }}
                  >
                    <Icon size={28} className="text-emerald-600 dark:text-emerald-400" />
                  </m.div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>

                  {/* Arrow indicator */}
                  <m.div
                    className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ x: -10 }}
                    whileHover={{ x: 0 }}
                  >
                    <ArrowRight size={20} className="text-emerald-500" />
                  </m.div>
                </div>
              </m.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// PROJECT CARD COMPONENT
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
    <m.a
      href={project.link}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative block overflow-hidden rounded-2xl border border-border bg-card hover:border-emerald-500/30 transition-all duration-500"
    >
      {/* Background glow */}
      <m.div
        className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />

      {/* Project Image */}
      <div className="aspect-video relative overflow-hidden">
        <AnimatedImage
          src={project.image}
          alt={project.title}
          fallbackText={project.title.slice(0, 2).toUpperCase()}
          className="absolute inset-0"
        />

        {/* Image overlay */}
        <m.div
          className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent"
          animate={{ opacity: isHovered ? 0.8 : 0.6 }}
        />

        {/* Floating tags on hover */}
        <m.div
          className="absolute top-4 left-4 flex flex-wrap gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -10 }}
          transition={{ duration: 0.3 }}
        >
          {project.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs font-medium bg-white/10 backdrop-blur-sm rounded-full text-white"
            >
              {tag}
            </span>
          ))}
        </m.div>
      </div>

      {/* Project Info */}
      <div className="relative p-6">
        <m.h3
          className="text-xl font-semibold text-foreground mb-2 flex items-center gap-2"
          animate={{ x: isHovered ? 5 : 0 }}
        >
          {project.title}
          <m.span
            animate={{ x: isHovered ? 5 : 0, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ExternalLink size={16} className="text-emerald-500" />
          </m.span>
        </m.h3>

        <p className="text-muted-foreground mb-4">{project.description}</p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <m.span
              key={tag}
              className="px-3 py-1 text-xs bg-secondary rounded-full text-muted-foreground"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(16, 185, 129, 0.1)" }}
            >
              {tag}
            </m.span>
          ))}
        </div>
      </div>

      {/* Corner accent */}
      <m.div
        className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-emerald-500/20 to-transparent"
        animate={{ scale: isHovered ? 1.5 : 1 }}
        transition={{ duration: 0.5 }}
      />
    </m.a>
  );
}

// ============================================================================
// PROJECTS SECTION
// ============================================================================
function ProjectsSection() {
  return (
    <section id="projects" className="py-24 px-4 relative overflow-hidden">
      {/* Background decoration */}
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
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 mx-auto rounded-full" />
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            O selectie de proiecte care demonstreaza abilitatile mele in dezvoltarea web moderna
          </p>
        </m.div>

        <div className="grid md:grid-cols-2 gap-8">
          {siteConfig.projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* CTA */}
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
    <section id="contact" className="py-24 px-4 bg-secondary/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-emerald-500/10 rounded-full blur-3xl" />
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
            Ai un proiect in minte? Sunt mereu deschis pentru noi oportunitati si
            colaborari interesante. Hai sa transformam ideea ta in realitate.
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

          {/* Quick contact info */}
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
          <span className="text-xl font-bold">SR<span className="text-emerald-500">.</span></span>
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
          {/* Backdrop */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <m.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-card border border-border rounded-3xl p-8 z-50 shadow-2xl"
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
                <ArrowRight size={20} className="text-muted-foreground group-hover:text-emerald-500 transition-colors" />
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
                <ArrowRight size={20} className="text-muted-foreground group-hover:text-emerald-500 transition-colors" />
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
      {/* Tooltip */}
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
        {/* Pulse Effect */}
        <span className="absolute w-full h-full rounded-full bg-emerald-500 animate-ping opacity-30" />
        <svg viewBox="0 0 24 24" width="28" height="28" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </m.div>
    </m.a>
  );
}

// ============================================================================
// MAIN PAGE COMPONENT
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
        <ServicesSection />
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
