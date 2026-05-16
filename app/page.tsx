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
  Menu,
  Phone,
} from "lucide-react";

// ============================================================================
// SITE CONFIGURATION
// ============================================================================
const siteConfig = {
  name: "Ștefan Ionut Răzvan",
  title: "Full-Stack Developer",
  subtitle: "Masterand în Medii Virtuale",
  email: "contact@stefan-razvan.dev",
  phone: "+40 700 000 000",
  whatsapp: "40700000000",
  social: {
    github: "https://github.com/stefan-razvan",
    linkedin: "https://linkedin.com/in/stefan-razvan",
  },
  navLinks: [
    { label: "Acasă", href: "#hero" },
    { label: "Despre", href: "#about" },
    { label: "Servicii", href: "#services" },
    { label: "Proiecte", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],
  about: {
    description: `Sunt un dezvoltator Full-Stack pasionat de crearea experiențelor digitale memorabile. 
    Cu expertiză în React, Next.js și tehnologii moderne de web, transform ideile în realitate digitală.
    Ca Masterand în Medii Virtuale, explorez constant granițele dintre lumea fizică și cea digitală.`,
    stats: [
      { label: "Ani Experiență", value: "5+" },
      { label: "Proiecte Finalizate", value: "50+" },
      { label: "Clienți Mulțumiți", value: "30+" },
      { label: "Tehnologii", value: "15+" },
    ],
  },
  services: [
    {
      icon: "Code2",
      title: "Dezvoltare Web",
      description:
        "Aplicații web moderne cu Next.js, React și TypeScript. Performanță optimizată și experiență utilizator excepțională.",
    },
    {
      icon: "Layers",
      title: "Design UI/UX",
      description:
        "Interfețe intuitive și atractive. Design responsive care funcționează perfect pe orice dispozitiv.",
    },
    {
      icon: "Sparkles",
      title: "Medii Virtuale",
      description:
        "Experiențe 3D interactive și realitate virtuală. Proiecte inovative la granița tehnologiei.",
    },
  ],
  projects: [
    {
      title: "E-Commerce Platform",
      description: "Platformă completă de comerț electronic cu Next.js și Stripe",
      tags: ["Next.js", "TypeScript", "Stripe", "Tailwind"],
      image: "/projects/ecommerce.jpg",
      link: "#",
    },
    {
      title: "Dashboard Analytics",
      description: "Dashboard interactiv pentru vizualizarea datelor în timp real",
      tags: ["React", "D3.js", "Node.js", "MongoDB"],
      image: "/projects/dashboard.jpg",
      link: "#",
    },
    {
      title: "VR Gallery",
      description: "Galerie de artă în realitate virtuală cu Three.js",
      tags: ["Three.js", "WebXR", "GLSL", "React"],
      image: "/projects/vr-gallery.jpg",
      link: "#",
    },
    {
      title: "Mobile App",
      description: "Aplicație mobilă cross-platform pentru management de proiecte",
      tags: ["React Native", "Firebase", "Redux", "TypeScript"],
      image: "/projects/mobile-app.jpg",
      link: "#",
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
      <h1>Ștefan Răzvan</h1>
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
// NAVBAR COMPONENT
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

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
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
        <div className="flex items-center justify-between h-16">
          <m.a
            href="#hero"
            className="text-xl font-bold text-foreground"
            whileHover={{ scale: 1.05 }}
          >
            SR<span className="text-primary/60">.</span>
          </m.a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {siteConfig.navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <m.button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </m.button>

            <m.button
              onClick={onContactClick}
              className="hidden md:flex px-4 py-2 bg-foreground text-background rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact
            </m.button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
              aria-label="Toggle menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border"
          >
            <div className="px-4 py-4 flex flex-col gap-4">
              {siteConfig.navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => {
                  onContactClick();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 bg-foreground text-background rounded-full text-sm font-medium"
              >
                Contact
              </button>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </m.nav>
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
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] dark:opacity-100 opacity-50" />

      <div className="max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 border border-border text-sm text-muted-foreground mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
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
                className="px-6 py-3 bg-foreground text-background rounded-full font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail size={18} />
                Contactează-mă
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
                className="p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
                whileHover={{ scale: 1.1, y: -2 }}
                aria-label="GitHub"
              >
                <Github size={22} />
              </m.a>
              <m.a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
                whileHover={{ scale: 1.1, y: -2 }}
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
// ABOUT SECTION
// ============================================================================
function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section id="about" ref={ref} className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <m.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Despre Mine
          </h2>
          <div className="w-20 h-1 bg-foreground/20 mx-auto rounded-full" />
        </m.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image with Parallax */}
          <m.div style={{ y, opacity }} className="relative">
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-foreground/10 to-transparent rounded-2xl" />
              <div className="absolute inset-4 bg-secondary rounded-2xl overflow-hidden border border-border">
                <Image
                  src="/profile.jpg"
                  alt={siteConfig.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Fallback gradient if image doesn't exist */}
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center">
                  <span className="text-6xl font-bold text-zinc-500">SR</span>
                </div>
              </div>
              {/* Floating elements */}
              <m.div
                className="absolute -top-4 -right-4 w-20 h-20 bg-foreground/5 rounded-full border border-border"
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
              />
              <m.div
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-foreground/5 rounded-full border border-border"
                animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
              />
            </div>
          </m.div>

          {/* Content */}
          <div>
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
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="p-4 bg-secondary/50 rounded-xl border border-border"
                >
                  <div className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </m.div>
              ))}
            </div>
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
    <section id="services" className="py-24 px-4 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <m.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Servicii
          </h2>
          <div className="w-20 h-1 bg-foreground/20 mx-auto rounded-full" />
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
                whileHover={{ y: -5, scale: 1.02 }}
                className="p-6 bg-card rounded-2xl border border-border hover:border-foreground/20 transition-colors group"
              >
                <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center mb-4 group-hover:bg-foreground/10 transition-colors">
                  <Icon size={24} className="text-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-muted-foreground">{service.description}</p>
              </m.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// PROJECTS SECTION
// ============================================================================
function ProjectsSection() {
  return (
    <section id="projects" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <m.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Proiecte
          </h2>
          <div className="w-20 h-1 bg-foreground/20 mx-auto rounded-full" />
        </m.div>

        <div className="grid md:grid-cols-2 gap-6">
          {siteConfig.projects.map((project, index) => (
            <m.a
              key={project.title}
              href={project.link}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card hover:border-foreground/20 transition-colors"
            >
              {/* Project Image */}
              <div className="aspect-video relative overflow-hidden bg-secondary">
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-700 to-zinc-900" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-bold text-zinc-600 group-hover:scale-110 transition-transform">
                    {project.title.slice(0, 2).toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-foreground/80 transition-colors flex items-center gap-2">
                  {project.title}
                  <ExternalLink
                    size={16}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </h3>
                <p className="text-muted-foreground mb-4">
                  {project.description}
                </p>
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
            </m.a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// CONTACT SECTION
// ============================================================================
function ContactSection({ onContactClick }: { onContactClick: () => void }) {
  return (
    <section id="contact" className="py-24 px-4 bg-secondary/30">
      <div className="max-w-4xl mx-auto text-center">
        <m.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Hai să Colaborăm
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Ai un proiect în minte? Sunt mereu deschis pentru noi oportunități și
            colaborări interesante.
          </p>

          <m.button
            onClick={onContactClick}
            className="px-8 py-4 bg-foreground text-background rounded-full font-medium text-lg hover:opacity-90 transition-opacity"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Trimite un Mesaj
          </m.button>
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
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} {siteConfig.name}. Toate drepturile
          rezervate.
        </p>
        <div className="flex items-center gap-4">
          <a
            href={siteConfig.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href={siteConfig.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
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
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-card border border-border rounded-2xl p-6 z-50 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-foreground">Contact</h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-secondary rounded-full transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <p className="text-muted-foreground mb-6">
              Alege metoda preferată de contact:
            </p>

            <div className="flex flex-col gap-3">
              <m.a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-3 p-4 bg-secondary/50 rounded-xl border border-border hover:border-foreground/20 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-10 h-10 bg-foreground/10 rounded-full flex items-center justify-center">
                  <Mail size={20} className="text-foreground" />
                </div>
                <div>
                  <div className="font-medium text-foreground">Email</div>
                  <div className="text-sm text-muted-foreground">
                    {siteConfig.email}
                  </div>
                </div>
              </m.a>

              <m.a
                href={`tel:${siteConfig.phone}`}
                className="flex items-center gap-3 p-4 bg-secondary/50 rounded-xl border border-border hover:border-foreground/20 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-10 h-10 bg-foreground/10 rounded-full flex items-center justify-center">
                  <Phone size={20} className="text-foreground" />
                </div>
                <div>
                  <div className="font-medium text-foreground">Telefon</div>
                  <div className="text-sm text-muted-foreground">
                    {siteConfig.phone}
                  </div>
                </div>
              </m.a>

              <m.a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/30 hover:border-emerald-500/50 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="white"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-emerald-600 dark:text-emerald-400">
                    WhatsApp
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Mesaj instant
                  </div>
                </div>
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
  return (
    <m.a
      href={`https://wa.me/${siteConfig.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30 hover:bg-emerald-600 transition-colors"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring" }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Contact via WhatsApp"
    >
      {/* Pulse Effect */}
      <span className="absolute w-full h-full rounded-full bg-emerald-500 animate-ping opacity-30" />
      <svg viewBox="0 0 24 24" width="28" height="28" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
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
        <div className="w-8 h-8 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
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
