"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
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
  useReducedMotion,
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
  Menu,
  ChevronRight,
  Clock,
  Users,
  CheckCircle2,
  Layout,
  Calculator,
  Terminal,
  Gamepad2,
  HelpCircle,
  Download,
  BookOpen,
  Briefcase,
  Zap,
  GraduationCap,
} from "lucide-react";

// ============================================================================
// SITE CONFIGURATION
// ============================================================================
const siteConfig = {
  name: "Ștefan Ionuț Răzvan",
  title: "Dezvoltator Aplicații Web & Mentor Matematică și Informatică",
  subtitle: "Masterand în Medii Virtuale Multimodale Distribuite",
  university: "Universitatea Ovidius din Constanța",
  email: "stefan.razvan2103@gmail.com",
  phone: "+40 732 336 734",
  whatsapp: "40732336734",
  profileImage: "/images/profile.jpg",
  cvUrl: "/CV.pdf",
  social: {
    github: "https://github.com/Razvan0307",
    linkedin: "https://www.linkedin.com/in/stefan-razvan-411331295/",
  },
  navLinks: [
    { label: "Acasă", href: "#hero" },
    { label: "Despre", href: "#about" },
    { label: "Servicii", href: "#services" },
    { label: "Proiecte", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],
  about: {
    description: `Sunt dezvoltator full-stack și masterand la Universitatea Ovidius din Constanța. 
    Pasiunea mea pentru tehnologie s-a concretizat prin dezvoltarea de platforme complexe (precum aplicații 
    de management al flotelor auto și sisteme de verificare a istoricului vehiculelor). În paralel cu 
    dezvoltarea de aplicații web moderne, îmi dedic timpul mentoratului, ajutând elevii și studenții să 
    înțeleagă logica din spatele matematicii și informaticii.`,
    stats: [
      { label: "Ani Experiență", value: "3+", icon: "Briefcase" },
      { label: "Tehnologii", value: "15+", icon: "Code2" },
      { label: "Elevi Pregătiți", value: "20+", icon: "GraduationCap" },
    ],
  },
  services: [
    {
      title: "Meditații Matematică (Clasele 1-12)",
      icon: "Calculator",
      shortDescription:
        "Pregătire pentru Bacalaureat, Evaluarea Națională și admitere la facultate.",
      fullDescription:
        "Oferă sesiuni personalizate axate pe înțelegerea logică a matematicii, nu pe memorare mecanică. Ajut elevii să recupereze materia, să consolideze cunoștințele și să obțină rezultate excelente la examenele naționale. Metodologia se concentrează pe rezolvarea de probleme practice și dezvoltarea gândirii analitice.",
      features: [
        "Pregătire intensivă pentru Bacalaureat și Evaluarea Națională",
        "Explicații logice adaptate nivelului fiecărui elev",
        "Suport constant pentru teme și evaluări curente",
        "Pregătire pentru admitere la facultățile de profil (Politehnica, ASE, etc.)",
        "Monitorizarea progresului și simulări de examen",
      ],
      pricing: "80 RON / ședință (2h)",
      cta: "Rezervă o ședință",
    },
    {
      title: "Meditații Informatică (Clasele 1-12)",
      icon: "Code2",
      shortDescription:
        "Programare C/C++, algoritmi și logică pentru viitorii ingineri.",
      fullDescription:
        "Predau bazele programării și algoritmică avansată în limbajul C/C++. Ne concentrăm pe rezolvarea problemelor de tip olimpiadă sau bacalaureat și pe dezvoltarea gândirii logice. Elevii învață să scrie cod eficient, să înțeleagă structurile de date și să rezolve probleme complexe pas cu pas.",
      features: [
        "Bazele programării în limbajul C/C++ de la zero",
        "Algoritmi fundamentali și structuri de date",
        "Pregătire completă pentru proba de Bacalaureat la Informatică",
        "Rezolvare de probleme tip olimpiadă (nivel județean și național)",
        "Dezvoltare de mici proiecte practice și portofoliu",
        "Înțelegerea logicii de programare și debugging eficient",
      ],
      pricing: "100 RON / ședință (2h)",
      cta: "Vreau să învăț programare",
    },
    {
      title: "Dezvoltare Aplicații Web",
      icon: "Layout",
      shortDescription:
        "Site-uri de prezentare, aplicații personalizate și soluții full-stack moderne.",
      fullDescription:
        "Construiesc platforme web scalabile și performante folosind tehnologii de ultimă oră: React, Next.js, Node.js, MongoDB. De la site-uri simple de prezentare până la aplicații complexe de management (fleet management, verificare istoric auto), ofer soluții complete adaptate nevoilor tale. Fiecare proiect include design responsive, optimizare SEO și securitate.",
      features: [
        "Site-uri de prezentare profesionale cu design modern",
        "Aplicații web personalizate (React, Next.js, Node.js)",
        "Integrare API-uri și servicii externe (Google Maps, plăți online)",
        "Optimizare pentru performanță și SEO",
        "Baze de date cloud (MongoDB Atlas, PostgreSQL)",
        "Hosting și mentenanță continuă",
      ],
      pricing: "De la 500 EUR / proiect",
      cta: "Hai să discutăm proiectul tău",
    },
  ],
  projects: [
    {
      title: "LogiFleet - Platformă Management de Flotă",
      description:
        "Lucrarea mea de licență: o platformă integrată pentru administrarea vehiculelor comerciale. Include monitorizarea locației în timp real prin GPS (integrare cu Traccar Server), gestionarea rutelor și șoferilor, rapoarte automate pentru costuri și mentenanță. Interfața este complet bilingvă (Română/Engleză) și oferă hărți interactive prin Leaflet.",
      tags: ["React", "Node.js", "MongoDB Atlas", "Leaflet", "JWT", "Express"],
      image: "/images/projects/dashboard.webp",
      liveUrl: "#",
      githubUrl: "https://github.com/Razvan0307/SR-WebSite",
      color: "from-blue-500/20 to-emerald-500/20",
    },
    {
      title: "HSSE Asset Inspector (NFC)",
      description:
        "Aplicatie dezvoltata in internship-ul la DP World Constanta pentru digitalizarea inspectiilor de siguranta. Utilizeaza tehnologia NFC pentru identificarea rapida a activelor (stingatoare, hamuri), permite raportarea defectelor cu dovezi foto si mentine un istoric complet al scanarilor pentru conformitate HSSE.",
      tags: ["Next.js", "NFC Web API", "HSSE Safety", "Asset Management"],
      image: "/images/projects/nfc-app.png",
      liveUrl: "#",
      githubUrl: "https://github.com/Razvan0307/hse-nfc-app",
      color: "from-orange-500/20 to-red-500/20",
    },
  ],
};

// ============================================================================
// TERMINAL COMMANDS CONFIG
// ============================================================================
const terminalCommands = {
  help: {
    description: "Afișează toate comenzile disponibile",
    response: `
╔═════════════════════════════════════════�������══╗
║     COMENZI DISPONIBILE - C++ Terminal     ║
╠════════════════════════════════════════════╣
║  help        - Afișează acest meniu        ║
║  whoami      - Cine sunt eu?               ║
║  get_cv      - Descarcă CV-ul meu          ║
║  skills      - Vezi abilitățile mele       ║
║  contact     - Informații de contact       ║
║  projects    - Proiecte recente            ║
║  game        - Joacă X și 0                ║
║  clear       - Curăță terminalul           ║
║  matrix      - Efect Matrix                ║
╚════════════════════════════════════════════╝`,
  },
  whoami: {
    description: "Informații despre mine",
    response: `
/**
 * @name Ștefan Ionuț Răzvan
 * @role Dezvoltator Web & Mentor
 * @education Masterand MVMOD @ Ovidius
 * @passion Full-Stack Development + Teaching
 * 
 * Combin dezvoltarea aplicațiilor moderne
 * cu pasiunea pentru predare. Ajut elevii
 * să descopere frumusețea programării și
 * construiesc soluții web scalabile.
 */`,
  },
  skills: {
    description: "Afișează abilitățile tehnice",
    response: `
#include <skills>

class Developer {
public:
  vector<string> frontend = {
    "React", "Next.js", "TypeScript",
    "TailwindCSS", "Framer Motion"
  };
  
  vector<string> backend = {
    "Node.js", "Express", "MongoDB Atlas",
    "PostgreSQL", "JWT Authentication"
  };
  
  vector<string> languages = {
    "C/C++", "Python", "Java",
    "JavaScript", "SQL"
  };
  
  vector<string> teaching = {
    "Matematică (1-12)", "Informatică C/C++",
    "Algoritmi", "Bacalaureat", "Admitere"
  };
};`,
  },
  contact: {
    description: "Informații de contact",
    response: `
struct Contact {
  string email = "stefan.razvan2103@gmail.com";
  string phone = "+40 732 336 734";
  string github = "github.com/Razvan0307";
  string linkedin = "linkedin.com/in/stefan-razvan-411331295";
};

// Scrie-mi un mesaj! :)`,
  },
  projects: {
    description: "Proiecte recente",
    response: `
Project projects[] = {
  {
    .name = "LogiFleet",
    .tech = "React, Node.js, MongoDB, Leaflet",
    .desc = "Fleet Management Platform"
  },
  {
    .name = "ECarInfo", 
    .tech = "Next.js, API Integration",
    .desc = "Vehicle History Verification"
  }
};

// Vezi secțiunea Portofoliu pentru detalii!`,
  },
  clear: {
    description: "Curăță terminalul",
    response: "CLEAR",
  },
  matrix: {
    description: "Efect Matrix",
    response: "MATRIX",
  },
  get_cv: {
    description: "Descarcă CV-ul",
    response: "DOWNLOAD_CV",
  },
  game: {
    description: "Joacă X și 0",
    response: "START_GAME",
  },
};

// ============================================================================
// ICON MAPPING
// ============================================================================
const iconMap: Record<
  string,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  Layout: Layout,
  Calculator: Calculator,
  Code2: Code2,
  Github: Github,
  ExternalLink: ExternalLink,
  Mail: Mail,
  Phone: Phone,
  BookOpen: BookOpen,
  Briefcase: Briefcase,
  GraduationCap: GraduationCap,
};

// ============================================================================
// THEME HOOK — fixed: no blocking spinner, instant init
// ============================================================================
function useTheme() {
  // Default to dark; syncs with localStorage on first effect without gating render
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  // One-time sync on mount — runs before paint where possible
  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const initial = saved ?? (prefersDark ? "dark" : "light");
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(
    () => setTheme((t) => (t === "dark" ? "light" : "dark")),
    [],
  );

  return { theme, toggleTheme };
}

// ============================================================================
// THROTTLE UTILITY
// ============================================================================
function throttle<T extends (...args: unknown[]) => void>(
  fn: T,
  ms: number,
): T {
  let last = 0;
  return ((...args) => {
    const now = Date.now();
    if (now - last >= ms) {
      last = now;
      fn(...args);
    }
  }) as T;
}

// ============================================================================
// TIC TAC TOE GAME COMPONENT
// ============================================================================
function TicTacToe({ onClose }: { onClose: () => void }) {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);

  const checkWinner = useCallback((squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const [a, b, c] of lines) {
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }, []);

  const minimax = useCallback(
    (squares: (string | null)[], isMax: boolean): number => {
      const win = checkWinner(squares);
      if (win === "O") return 10;
      if (win === "X") return -10;
      if (!squares.includes(null)) return 0;
      if (isMax) {
        let best = -Infinity;
        for (let i = 0; i < 9; i++) {
          if (!squares[i]) {
            squares[i] = "O";
            best = Math.max(best, minimax(squares, false));
            squares[i] = null;
          }
        }
        return best;
      } else {
        let best = Infinity;
        for (let i = 0; i < 9; i++) {
          if (!squares[i]) {
            squares[i] = "X";
            best = Math.min(best, minimax(squares, true));
            squares[i] = null;
          }
        }
        return best;
      }
    },
    [checkWinner],
  );

  const computerMove = useCallback(
    (squares: (string | null)[]) => {
      let bestMove = -1;
      let bestVal = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (!squares[i]) {
          squares[i] = "O";
          const moveVal = minimax(squares, false);
          squares[i] = null;
          if (moveVal > bestVal) {
            bestVal = moveVal;
            bestMove = i;
          }
        }
      }
      return bestMove;
    },
    [minimax],
  );

  const handleClick = (i: number) => {
    if (board[i] || winner || !isXNext) return;
    const newBoard = [...board];
    newBoard[i] = "X";
    setBoard(newBoard);
    const win = checkWinner(newBoard);
    if (win) {
      setWinner(win);
      return;
    }
    if (!newBoard.includes(null)) {
      setWinner("draw");
      return;
    }
    setIsXNext(false);
  };

  useEffect(() => {
    if (!isXNext && !winner) {
      const timer = setTimeout(() => {
        const newBoard = [...board];
        const move = computerMove(newBoard);
        if (move !== -1) {
          newBoard[move] = "O";
          setBoard(newBoard);
          const win = checkWinner(newBoard);
          if (win) setWinner(win);
          else if (!newBoard.includes(null)) setWinner("draw");
        }
        setIsXNext(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isXNext, winner, board, computerMove, checkWinner]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <div className="text-center">
      <div className="text-emerald-400 mb-2 text-[10px] sm:text-xs font-mono">
        {winner === "X"
          ? "// Ai câștigat! 🎉"
          : winner === "O"
            ? "// AI câștigă! 🤖"
            : winner === "draw"
              ? "// Remiză! 🤝"
              : `// ${isXNext ? "Tu (X) — alege o celulă" : "AI calculează..."}`}
      </div>
      <div className="grid grid-cols-3 gap-1.5 w-fit mx-auto mb-3">
        {board.map((cell, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            disabled={!!cell || !!winner || !isXNext}
            className={`w-10 h-10 sm:w-12 sm:h-12 text-base sm:text-lg font-bold border border-zinc-600 rounded-lg transition-all
              ${cell === "X" ? "text-cyan-400 bg-cyan-500/10" : cell === "O" ? "text-pink-400 bg-pink-500/10" : "text-zinc-600"}
              ${!cell && !winner && isXNext ? "hover:bg-zinc-700 hover:border-emerald-500 cursor-pointer" : ""}`}
          >
            {cell || "·"}
          </button>
        ))}
      </div>
      <div className="flex gap-2 justify-center text-[10px] sm:text-xs">
        <button
          onClick={resetGame}
          className="text-yellow-400 hover:text-yellow-300 px-3 py-1 border border-zinc-700 rounded-md bg-zinc-900"
        >
          restart
        </button>
        <button
          onClick={onClose}
          className="text-zinc-500 hover:text-zinc-400 px-3 py-1 border border-zinc-700 rounded-md bg-zinc-900"
        >
          exit
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// INTERACTIVE TERMINAL COMPONENT
// ============================================================================
function InteractiveTerminal({ isMobile }: { isMobile: boolean }) {
  const [history, setHistory] = useState<
    Array<{ command: string; response: string | React.ReactNode }>
  >([
    {
      command: "",
      response: '// Bine ai venit! Tastează "help" pentru comenzi.',
    },
  ]);
  const [currentInput, setCurrentInput] = useState("");
  const [showGame, setShowGame] = useState(false);
  const [showMatrix, setShowMatrix] = useState(false);
  const [matrixChars, setMatrixChars] = useState<string[]>([]);
  const [showQuickCommands, setShowQuickCommands] = useState(true);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const quickCommands = [
    "help",
    "skills",
    "get_cv",
    "game",
    "contact",
    "clear",
  ];

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history, showGame]);

  useEffect(() => {
    if (!showMatrix) return;
    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノ";
    const interval = setInterval(() => {
      setMatrixChars((prev) => {
        const next = [...prev, chars[Math.floor(Math.random() * chars.length)]];
        return next.slice(-100);
      });
    }, 50);
    const timeout = setTimeout(() => {
      setShowMatrix(false);
      setMatrixChars([]);
      setHistory((prev) => [
        ...prev,
        { command: "", response: "// Matrix effect ended" },
      ]);
    }, 3000);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [showMatrix]);

  const executeCommand = useCallback(
    (cmd: string) => {
      const trimmedCmd = cmd.trim().toLowerCase();
      if (!trimmedCmd) return;
      if (isMobile) setShowQuickCommands(false);

      const commandConfig =
        terminalCommands[trimmedCmd as keyof typeof terminalCommands];

      if (commandConfig) {
        if (commandConfig.response === "CLEAR") {
          setHistory([{ command: "", response: "// Terminal cleared" }]);
          setShowGame(false);
        } else if (commandConfig.response === "START_GAME") {
          setShowGame(true);
          setHistory((prev) => [
            ...prev,
            { command: `> ${cmd}`, response: "// X si 0 - Tu esti X!" },
          ]);
        } else if (commandConfig.response === "MATRIX") {
          setShowMatrix(true);
          setHistory((prev) => [
            ...prev,
            { command: `> ${cmd}`, response: "// Matrix..." },
          ]);
        } else if (commandConfig.response === "DOWNLOAD_CV") {
          setHistory((prev) => [
            ...prev,
            { command: `> ${cmd}`, response: "// Descarc CV..." },
          ]);
          window.open(siteConfig.cvUrl, "_blank");
        } else {
          setHistory((prev) => [
            ...prev,
            { command: `> ${cmd}`, response: commandConfig.response },
          ]);
        }
      } else {
        setHistory((prev) => [
          ...prev,
          { command: `> ${cmd}`, response: `// Error: "${cmd}" not found` },
        ]);
      }
      setCurrentInput("");
    },
    [isMobile],
  );

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") executeCommand(currentInput);
  };

  return (
    <div className="absolute inset-0 p-3 sm:p-4 font-mono text-xs flex flex-col bg-zinc-950">
      {/* Terminal Header */}
      <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2 pb-1 sm:pb-2 border-b border-zinc-700/50 shrink-0">
        <div className="w-1.5 h-1.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80" />
        <div className="w-1.5 h-1.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80" />
        <div className="w-1.5 h-1.5 sm:w-3 sm:h-3 rounded-full bg-green-500/80" />
        <span className="ml-1 text-zinc-500 text-[7px] sm:text-xs flex items-center gap-1">
          <Terminal size={8} className="sm:w-3 sm:h-3" />
          <span className="hidden sm:inline">terminal.cpp</span>
          <span className="sm:hidden">C++</span>
        </span>
        {isMobile && (
          <button
            onClick={() => setShowQuickCommands(!showQuickCommands)}
            className="ml-auto flex items-center gap-1.5 text-[11px] sm:text-xs px-3 py-1.5 bg-emerald-500/20 border border-emerald-500/50 rounded-full text-emerald-300 font-medium shadow-sm active:scale-95 transition-all"
          >
            {showQuickCommands ? (
              <>
                <X size={12} />
                <span>Ascunde</span>
                <span className="text-[10px]">▲</span>
              </>
            ) : (
              <>
                <Terminal size={12} />
                <span>Comenzi</span>
                <span className="text-[10px]">▼</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Matrix Effect Overlay */}
      {showMatrix && (
        <div className="absolute inset-0 bg-black/90 z-10 overflow-hidden pointer-events-none">
          <div className="text-green-500 text-xs leading-none break-all p-2">
            {matrixChars.join("")}
          </div>
        </div>
      )}

      {/* Terminal Content */}
      <div
        ref={terminalRef}
        className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden text-zinc-300 leading-tight"
        style={{ WebkitOverflowScrolling: "touch" }}
        onClick={() => !isMobile && inputRef.current?.focus()}
      >
        {history.map((item, i) => (
          <div key={i} className="mb-1 sm:mb-2">
            {item.command && (
              <div className="text-cyan-400 text-[10px] sm:text-xs">
                {item.command}
              </div>
            )}
            <pre className="text-emerald-400/90 whitespace-pre-wrap text-[9px] sm:text-xs leading-tight">
              {item.response}
            </pre>
          </div>
        ))}

        {showGame && (
          <div className="my-1 p-1 sm:p-2 border border-zinc-700 rounded bg-zinc-900/50">
            <TicTacToe onClose={() => setShowGame(false)} />
          </div>
        )}

        {!isMobile && (
          <div className="flex items-center gap-1 text-cyan-400 mt-1">
            <span className="text-pink-400">{">"}</span>
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 bg-transparent outline-none text-cyan-400 caret-emerald-400 text-xs"
              placeholder="type command..."
              autoComplete="off"
              spellCheck={false}
            />
            <span className="animate-pulse text-emerald-400">|</span>
          </div>
        )}
      </div>

      {isMobile && showQuickCommands && (
        <div className="mt-auto pt-2 border-t border-zinc-700/50 shrink-0 bg-zinc-950">
          <div className="grid grid-cols-3 gap-1.5">
            {quickCommands.map((cmd) => (
              <button
                key={cmd}
                onClick={() => executeCommand(cmd)}
                className="px-1 py-2.5 text-[9px] bg-zinc-900 active:bg-zinc-800 border border-zinc-700 rounded-lg text-emerald-400 active:text-emerald-300 transition-colors flex items-center justify-center gap-1 shadow-sm"
              >
                {cmd === "help" && <HelpCircle size={8} />}
                {cmd === "skills" && <Code2 size={8} />}
                {cmd === "get_cv" && <Download size={8} />}
                {cmd === "game" && <Gamepad2 size={8} />}
                {cmd === "contact" && <Mail size={8} />}
                {cmd === "clear" && <X size={8} />}
                <span>{cmd}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// MOBILE HERO VISUAL - Lightweight alternative to Laptop3D for mobile
// ============================================================================
function MobileHeroVisual() {
  return (
    <div className="relative w-full max-w-sm mx-auto mt-8">
      {/* Simple code card without heavy animations */}
      <div className="relative bg-zinc-900 rounded-2xl border border-zinc-700/50 p-4 shadow-2xl">
        {/* Terminal header */}
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-zinc-700/50">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          <span className="ml-2 text-zinc-500 text-xs flex items-center gap-1">
            <Terminal size={12} />
            developer.cpp
          </span>
        </div>
        {/* Static code display */}
        <div className="font-mono text-xs space-y-1.5 text-zinc-300">
          <div>
            <span className="text-pink-400">class</span>{" "}
            <span className="text-cyan-400">Developer</span>{" "}
            <span className="text-zinc-500">{"{"}</span>
          </div>
          <div className="pl-4">
            <span className="text-emerald-400">skills</span>
            <span className="text-zinc-500">:</span>{" "}
            <span className="text-amber-300">{'"React, Node.js, C++"'}</span>
          </div>
          <div className="pl-4">
            <span className="text-emerald-400">passion</span>
            <span className="text-zinc-500">:</span>{" "}
            <span className="text-amber-300">{'"Teaching & Coding"'}</span>
          </div>
          <div className="pl-4">
            <span className="text-emerald-400">status</span>
            <span className="text-zinc-500">:</span>{" "}
            <span className="text-amber-300">{'"Available"'}</span>
          </div>
          <div>
            <span className="text-zinc-500">{"}"};</span>
          </div>
        </div>
        {/* Decorative glow */}
        <div className="absolute -inset-1 bg-emerald-500/10 rounded-2xl blur-xl -z-10" />
      </div>
    </div>
  );
}

// ============================================================================
// 3D LAPTOP COMPONENT - Optimized: no 3D transforms on mobile for performance
// ============================================================================
function Laptop3D() {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(true); // Default true for SSR
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // Skip mouse tracking on mobile for performance
    if (shouldReduceMotion || isMobile) return;
    const handleMouseMove = throttle((e: unknown) => {
      const event = e as MouseEvent;
      setMousePos({
        x: (event.clientX / window.innerWidth - 0.5) * 20,
        y: (event.clientY / window.innerHeight - 0.5) * 20,
      });
    }, 16);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [shouldReduceMotion, isMobile]);

  const springConfig = { stiffness: 100, damping: 30 };
  const rotateX = useSpring(isMobile ? 0 : mousePos.y, springConfig);
  const rotateY = useSpring(isMobile ? 0 : -mousePos.x, springConfig);

  // On mobile: no 3D transforms, just a clean static laptop
  const laptopStyle = isMobile 
    ? {} 
    : { rotateX, rotateY, transformStyle: "preserve-3d" as const };

  return (
    <m.div
      ref={ref}
      className="relative w-full max-w-lg mx-auto isolate mt-8 lg:mt-0"
      style={isMobile ? {} : { perspective: "1000px", transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <m.div
        className="relative"
        style={laptopStyle}
        animate={shouldReduceMotion || isMobile ? {} : { y: [0, -8, 0] }}
        transition={{ y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
      >
        <div className="relative bg-linear-to-b from-zinc-800 to-zinc-900 rounded-t-xl p-2 border border-zinc-700/50">
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-zinc-700" />
          <div className="bg-zinc-950 rounded-lg overflow-hidden aspect-16/10 relative">
            <InteractiveTerminal isMobile={isMobile} />
          </div>
        </div>
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
// MOBILE MENU — optimised: fast slide-in replaces heavy scale+borderRadius
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
  const itemVariants = {
    closed: { x: -24, opacity: 0 },
    open: { x: 0, opacity: 1 },
  };

  const handleNavClick = useCallback(
    (href: string) => {
      onClose();
      setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    },
    [onClose],
  );

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          key="mobile-menu"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{
            type: "tween",
            duration: 0.28,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="fixed inset-0 z-50 bg-background"
          style={{ willChange: "transform" }}
        >
          {/* Decorative blobs — rendered once, no re-animation */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl opacity-50" />
            <div className="absolute bottom-20 -left-20 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl opacity-30" />
          </div>

          <div className="relative h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-5">
              <m.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 }}
                className="text-2xl font-bold"
              >
                SR<span className="text-emerald-500">.</span>
              </m.span>
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleTheme}
                  className="w-11 h-11 rounded-xl bg-secondary/80 flex items-center justify-center"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <button
                  onClick={onClose}
                  className="w-11 h-11 rounded-xl bg-foreground text-background flex items-center justify-center"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Nav links */}
            <nav className="flex-1 flex flex-col justify-center px-6 -mt-10">
              {siteConfig.navLinks.map((link, index) => (
                <m.button
                  key={link.href}
                  variants={itemVariants}
                  initial="closed"
                  animate="open"
                  transition={{ delay: 0.06 + index * 0.05, duration: 0.25 }}
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
                    <ChevronRight
                      size={20}
                      className="text-muted-foreground opacity-50"
                    />
                  </div>
                  <div className="absolute bottom-3 left-10 right-0 h-px bg-linear-to-r from-border to-transparent" />
                </m.button>
              ))}
            </nav>

            {/* Bottom CTA */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="p-6 space-y-4"
            >
              <button
                onClick={() => {
                  onContactClick();
                  onClose();
                }}
                className="w-full py-4 bg-linear-to-r from-emerald-500 to-emerald-600 text-white rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 shadow-lg shadow-emerald-500/25"
              >
                <Mail size={20} />
                Contactează-mă
              </button>
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
// NAVBAR - Optimized: reduced animations on mobile
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
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();

    const handleScroll = throttle(() => {
      setIsScrolled(window.scrollY > 50);
      const sections = [...siteConfig.navLinks]
        .map((link) => link.href)
        .reverse();
      for (const section of sections) {
        const el = document.querySelector(section);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(section);
          break;
        }
      }
    }, 100) as () => void;

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-lg border-b border-border shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            <a
              href="#hero"
              className="relative text-xl md:text-2xl font-bold text-foreground hover:scale-105 transition-transform"
            >
              SR<span className="text-emerald-500">.</span>
            </a>

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

            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-full bg-secondary/80 hover:bg-secondary transition-colors hover:scale-110 hover:rotate-12 active:scale-90"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button
                onClick={onContactClick}
                className="px-5 py-2.5 bg-foreground text-background rounded-full text-sm font-medium hover:opacity-90 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                Contact <ArrowRight size={16} />
              </button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden w-11 h-11 rounded-xl bg-secondary/80 flex items-center justify-center active:scale-90 transition-transform"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </nav>

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
// HERO SECTION - Optimized for mobile INP/LCP
// ============================================================================
function HeroSection({ onContactClick }: { onContactClick: () => void }) {
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(true); // Default to true for SSR

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Disable heavy animations on mobile for performance
  const disableHeavyAnimations = isMobile || shouldReduceMotion;

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center pt-16 pb-20 md:pb-8 px-4 relative overflow-hidden"
    >
      {/* Light background - simplified blur on mobile */}
      <div className="absolute inset-0 dark:hidden">
        <div className="absolute inset-0 bg-linear-to-br from-slate-50 via-white to-slate-100" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.1)_1px,transparent_1px)] bg-size-[40px_40px]" />
        <div className="hidden md:block absolute top-20 right-1/4 w-100 h-100 bg-linear-to-br from-blue-100/60 to-indigo-100/40 rounded-full blur-3xl" />
        <div className="hidden md:block absolute bottom-0 left-0 w-125 h-87.5 bg-linear-to-tr from-slate-200/50 to-blue-50/30 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--background)_80%)]" />
      </div>

      {/* Dark background - no animated blobs on mobile */}
      <div className="absolute inset-0 hidden dark:block">
        <div className="absolute inset-0 bg-linear-to-br from-zinc-950 via-zinc-900 to-zinc-950" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-size-[60px_60px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--background)_70%)]" />
        {/* Static blobs on mobile, animated on desktop */}
        {!disableHeavyAnimations ? (
          <>
            <m.div
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"
              animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, 30, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <m.div
              className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
              animate={{ scale: [1.2, 1, 1.2], x: [0, -50, 0], y: [0, -30, 0] }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </>
        ) : (
          <>
            <div className="hidden md:block absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
            <div className="hidden md:block absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          </>
        )}
        {/* Floating particles only on desktop */}
        {!disableHeavyAnimations &&
          [...Array(8)].map((_, i) => (
            <m.div
              key={i}
              className="absolute w-1 h-1 bg-emerald-500/30 rounded-full"
              style={{ left: `${15 + i * 10}%`, top: `${20 + i * 7}%` }}
              animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
              transition={{
                duration: 4 + (i % 2),
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-sm text-blue-600 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-400 mb-6"
            >
              <span className="relative flex h-2 w-2">
                {/* Static dot on mobile, animated on desktop */}
                {!isMobile && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 dark:bg-emerald-400 opacity-75" />
                )}
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500 dark:bg-emerald-500" />
              </span>
              Disponibil pentru proiecte și meditații
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
              <br />
              <span className="text-sm">{siteConfig.university}</span>
            </m.p>
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4"
            >
              <button
                onClick={onContactClick}
                className="group px-6 py-3 bg-foreground text-background rounded-full font-medium hover:opacity-90 transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
              >
                <Mail size={18} /> Contactează-mă
              </button>
              <a
                href="#projects"
                className="px-6 py-3 border border-border rounded-full font-medium hover:bg-secondary transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
              >
                Vezi Proiecte <ExternalLink size={18} />
              </a>
            </m.div>
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex justify-center lg:justify-start gap-4 mt-8"
            >
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-secondary/50 hover:bg-secondary transition-all text-muted-foreground hover:text-foreground hover:scale-110 hover:-translate-y-1"
                aria-label="GitHub"
              >
                <Github size={22} />
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-secondary/50 hover:bg-secondary transition-all text-muted-foreground hover:text-foreground hover:scale-110 hover:-translate-y-1"
                aria-label="LinkedIn"
              >
                <Linkedin size={22} />
              </a>
            </m.div>
          </div>
          {/* Show Laptop3D on all devices */}
          <Laptop3D />
        </div>

        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="hidden md:block absolute bottom-4 left-1/2 -translate-x-1/2 z-30"
        >
          <m.button
            onClick={() => {
              const el = document.getElementById("about");
              if (el)
                window.scrollTo({
                  top: el.getBoundingClientRect().top + window.scrollY - 120,
                  behavior: "smooth",
                });
            }}
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            animate={shouldReduceMotion ? {} : { y: [0, 8, 0] }}
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
// ANIMATED IMAGE - Optimized: no 3D transforms on mobile
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
  const [isMobile, setIsMobile] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 10);
    mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * 10);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };
  const rotateX = useSpring(mouseY, { stiffness: 150, damping: 20 });
  const rotateY = useSpring(mouseX, { stiffness: 150, damping: 20 });

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden w-full h-full ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={isMobile ? undefined : { perspective: "1000px" }}
    >
      <m.div
        style={isMobile ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
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
      </m.div>
    </div>
  );
}

// ============================================================================
// ABOUT SECTION - Optimized: reduced parallax and continuous animations on mobile
// ============================================================================
function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  const disableParallax = isMobile || shouldReduceMotion;
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    disableParallax ? [0, 0] : [50, -50],
  );
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], disableParallax ? [1, 1, 1] : [0.95, 1, 0.95]);
  const rotate = useTransform(scrollYProgress, [0, 1], disableParallax ? [0, 0] : [-2, 2]);

  const statIconMap: Record<
    string,
    React.ComponentType<{ size?: number; className?: string }>
  > = {
    Briefcase,
    Code2,
    GraduationCap,
  };

  return (
    <section
      id="about"
      ref={ref}
      className="py-24 px-4 relative overflow-hidden isolate"
    >
      {/* Light background - hidden blur on mobile */}
      <div className="absolute inset-0 dark:hidden">
        <div className="hidden md:block absolute top-1/2 left-0 w-64 h-64 bg-linear-to-r from-blue-100/40 to-indigo-100/20 rounded-full blur-3xl -translate-y-1/2" />
        <div className="hidden md:block absolute bottom-0 right-1/4 w-56 h-56 bg-linear-to-l from-slate-200/40 to-slate-100/20 rounded-full blur-3xl" />
      </div>
      <div className="absolute inset-0 hidden dark:block">
        <div className="hidden md:block absolute top-1/2 left-0 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2" />
      </div>

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
          {/* Photo - simplified floating animations */}
          <m.div style={{ y }} className="relative order-2 lg:order-1">
            <m.div
              style={{ scale, rotate }}
              className="relative aspect-4/5 max-w-md mx-auto"
            >
              <m.div
                className="absolute -inset-4 border-2 border-emerald-500/20 rounded-2xl"
                animate={disableParallax ? {} : { rotate: [0, 1, 0, -1, 0] }}
                transition={{ duration: 12, repeat: Infinity }}
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
                    <span>Full-Stack Developer & Mentor</span>
                  </div>
                </m.div>
              </div>
              {/* Floating badges - static on mobile */}
              <m.div
                className="hidden md:flex absolute -top-6 -right-6 w-24 h-24 bg-linear-to-br from-emerald-500/20 to-blue-500/20 rounded-2xl border border-white/10 backdrop-blur-sm items-center justify-center"
                animate={
                  disableParallax
                    ? {}
                    : { y: [0, -8, 0] }
                }
                transition={{ duration: 6, repeat: Infinity }}
              >
                <Code2 size={32} className="text-emerald-500" />
              </m.div>
              <m.div
                className="hidden md:flex absolute -bottom-4 -left-4 w-20 h-20 bg-linear-to-br from-blue-500/20 to-cyan-500/20 rounded-full border border-white/10 backdrop-blur-sm items-center justify-center"
                animate={
                  disableParallax
                    ? {}
                    : { y: [0, 8, 0] }
                }
                transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
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
              className="text-lg text-muted-foreground leading-relaxed mb-10"
            >
              {siteConfig.about.description}
            </m.p>

            <div className="grid grid-cols-3 gap-3 mb-8">
              {siteConfig.about.stats.map((stat, index) => {
                const StatIcon = statIconMap[stat.icon] || Briefcase;
                return (
                  <m.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.03 }}
                    className="group relative p-4 bg-linear-to-br from-secondary/80 to-secondary/40 rounded-2xl border border-border hover:border-emerald-500/30 transition-all text-center overflow-hidden"
                  >
                    <m.div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                    <div className="relative">
                      <div className="w-8 h-8 mx-auto mb-2 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                        <StatIcon size={16} className="text-emerald-500" />
                      </div>
                      <div className="text-2xl sm:text-3xl font-bold text-foreground mb-0.5">
                        {stat.value}
                      </div>
                      <div className="text-xs text-muted-foreground leading-tight">
                        {stat.label}
                      </div>
                    </div>
                  </m.div>
                );
              })}
            </div>

            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-2"
            >
              {[
                "React",
                "Next.js",
                "TypeScript",
                "Node.js",
                "MongoDB",
                "TailwindCSS",
                "C/C++",
                "Python",
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
// SERVICE CARD - Optimized: reduced 3D transforms and continuous animations on mobile
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
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const Icon = iconMap[service.icon];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <m.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => !isMobile && setIsHovered(true)}
      onHoverEnd={() => !isMobile && setIsHovered(false)}
      className="group relative"
    >
      {/* Glow effect - only on desktop hover */}
      {!isMobile && (
        <m.div
          className="absolute -inset-1 bg-linear-to-br from-emerald-500/20 via-blue-500/15 to-cyan-500/20 rounded-3xl blur-xl"
          animate={{ opacity: isHovered ? 0.6 : 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
      <div
        className="relative bg-card rounded-3xl border border-border hover:border-blue-500/50 dark:hover:border-emerald-500/50 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-lg dark:shadow-none"
      >
        <div className="p-8 relative">
          <div
            className={`w-16 h-16 bg-linear-to-br from-emerald-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center mb-6 relative transition-transform duration-300 ${
              isHovered && !isMobile ? "scale-110" : ""
            }`}
          >
            <div
              className={`absolute inset-0 bg-blue-500/30 dark:bg-emerald-500/30 rounded-2xl blur-lg transition-opacity duration-300 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            />
            <Icon
              size={32}
              className="text-emerald-600 dark:text-emerald-400 relative z-10"
            />
          </div>
          <h3
            className={`text-2xl font-bold text-foreground mb-3 transition-transform duration-300 ${
              isHovered && !isMobile ? "translate-x-1" : ""
            }`}
          >
            {service.title}
          </h3>
          <p className="text-muted-foreground mb-6">
            {service.shortDescription}
          </p>
          <m.button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium"
            whileHover={{ x: 5 }}
          >
            {isExpanded ? "Vezi mai puțin" : "Vezi detalii"}
            <m.span
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronRight size={18} />
            </m.span>
          </m.button>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <m.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="px-8 pb-8 border-t border-border pt-6">
                <m.p
                  className="text-muted-foreground mb-6"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  {service.fullDescription}
                </m.p>
                <div className="space-y-3 mb-6">
                  {service.features.map((feature, i) => (
                    <m.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.1 }}
                      className="flex items-start gap-3 group/feature"
                    >
                      <CheckCircle2
                        size={18}
                        className="text-emerald-500 mt-0.5 shrink-0"
                      />
                      <span className="text-sm text-foreground group-hover/feature:text-emerald-500 transition-colors">
                        {feature}
                      </span>
                    </m.div>
                  ))}
                </div>
                <m.div
                  className="flex items-center gap-2 mb-6 p-4 bg-blue-500/10 dark:bg-emerald-500/10 rounded-xl"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Clock size={18} className="text-emerald-500" />
                  <span className="font-semibold text-foreground">
                    {service.pricing}
                  </span>
                </m.div>
                <m.button
                  onClick={onContactClick}
                  className="w-full py-4 bg-linear-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <span className="relative z-10">{service.cta}</span>
                  <ArrowRight size={18} className="relative z-10" />
                </m.button>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </m.div>
  );
}

// ============================================================================
// SERVICES SECTION - Optimized: reduced blur on mobile
// ============================================================================
function ServicesSection({ onContactClick }: { onContactClick: () => void }) {
  return (
    <section id="services" className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 dark:hidden">
        <div className="absolute inset-0 bg-linear-to-br from-slate-100/80 via-white to-slate-50" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-size-[40px_40px]" />
        <div className="hidden md:block absolute top-0 right-0 w-100 h-100 bg-linear-to-bl from-blue-100/40 to-transparent rounded-full blur-3xl" />
        <div className="hidden md:block absolute bottom-0 left-0 w-87.5 h-87.5 bg-linear-to-tr from-slate-200/50 to-transparent rounded-full blur-3xl" />
      </div>
      <div className="absolute inset-0 hidden dark:block">
        <div className="absolute inset-0 bg-secondary/30" />
        <div className="hidden md:block absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.1),transparent_50%)]" />
        <div className="hidden md:block absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(59,130,246,0.1),transparent_50%)]" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        <m.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <m.span
            className="text-sm font-mono text-emerald-600 dark:text-emerald-400 mb-4 block"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            02. SERVICII
          </m.span>
          <m.h2
            className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Ce ofer?
          </m.h2>
          <m.div
            className="w-20 h-1 bg-linear-to-r from-emerald-500 to-blue-500 mx-auto rounded-full"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          />
          <m.p
            className="mt-4 text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Servicii personalizate pentru a te ajuta să înveți programare sau
            să-ți construiești prezența online
          </m.p>
        </m.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {siteConfig.services.map((service, index) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={index}
              onContactClick={onContactClick}
            />
          ))}
        </div>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-6 flex-wrap justify-center text-sm text-muted-foreground">
            {[
              { icon: Users, text: "Ședințe individuale" },
              { icon: Clock, text: "Program flexibil" },
              { icon: CheckCircle2, text: "Satisfacție garantată" },
            ].map((item, i) => (
              <m.div
                key={item.text}
                className="flex items-center gap-2"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <item.icon size={18} className="text-emerald-500" />
                <span>{item.text}</span>
              </m.div>
            ))}
          </div>
        </m.div>
      </div>
    </section>
  );
}

// ============================================================================
// PROJECT CARD - Optimized: reduced animations on mobile
// ============================================================================
function ProjectCard({
  project,
  index,
}: {
  project: (typeof siteConfig.projects)[0];
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <m.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => !isMobile && setIsHovered(true)}
      onHoverEnd={() => !isMobile && setIsHovered(false)}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card hover:border-blue-500/50 dark:hover:border-emerald-500/50 transition-all duration-300 shadow-sm hover:shadow-lg dark:shadow-none"
    >
      <div
        className={`absolute inset-0 bg-linear-to-br ${project.color} transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="aspect-video relative overflow-hidden">
        <div
          className={`absolute inset-0 transition-transform duration-500 ${
            isHovered && !isMobile ? "scale-110" : "scale-100"
          }`}
        >
          <AnimatedImage
            src={project.image}
            alt={project.title}
            fallbackText={project.title.slice(0, 2).toUpperCase()}
            className="w-full h-full object-cover"
          />
        </div>
        <div
          className={`absolute inset-0 bg-linear-to-t from-card via-card/50 to-transparent transition-opacity duration-300 ${
            isHovered ? "opacity-95" : "opacity-70"
          }`}
        />
        <m.div
          className="absolute top-4 right-4 flex gap-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -20 }}
          transition={{ duration: 0.3 }}
        >
          <m.a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <ExternalLink size={18} />
          </m.a>
          <m.a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <Github size={18} />
          </m.a>
        </m.div>
        <m.div
          className="absolute top-4 left-4 flex flex-wrap gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          {project.tags.slice(0, 2).map((tag, i) => (
            <m.span
              key={tag}
              className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md border border-white/10 rounded-md text-white shadow-xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.05 }}
            >
              {tag}
            </m.span>
          ))}
        </m.div>
      </div>

      <div className="relative p-6">
        <h3
          className={`text-xl font-semibold text-foreground mb-2 transition-transform duration-300 ${
            isHovered && !isMobile ? "translate-x-1" : ""
          }`}
        >
          {project.title}
        </h3>
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, i) => (
            <m.span
              key={tag}
              className="px-3 py-1 text-xs bg-secondary rounded-full text-muted-foreground"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.05 }}
            >
              {tag}
            </m.span>
          ))}
        </div>
      </div>
    </m.div>
  );
}

// ============================================================================
// PROJECTS SECTION - Optimized: reduced blur on mobile
// ============================================================================
function ProjectsSection() {
  return (
    <section id="projects" className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 dark:hidden">
        <div className="hidden md:block absolute bottom-0 left-1/4 w-80 h-80 bg-linear-to-tr from-blue-100/30 to-indigo-100/20 rounded-full blur-3xl" />
        <div className="hidden md:block absolute top-1/4 right-0 w-56 h-56 bg-linear-to-bl from-slate-200/40 to-slate-100/20 rounded-full blur-3xl" />
      </div>
      <div className="absolute inset-0 hidden dark:block">
        <div className="hidden md:block absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="hidden md:block absolute top-1/4 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        <m.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <m.span
            className="text-sm font-mono text-emerald-600 dark:text-emerald-400 mb-4 block"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            03. PORTOFOLIU
          </m.span>
          <m.h2
            className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Proiecte Recente
          </m.h2>
          <m.div
            className="w-20 h-1 bg-linear-to-r from-emerald-500 to-blue-500 mx-auto rounded-full"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          />
          <m.p
            className="mt-4 text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            O selecție de proiecte care demonstrează abilitățile mele în
            dezvoltarea web modernă
          </m.p>
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
            className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-full text-muted-foreground hover:text-foreground hover:border-emerald-500/30 transition-colors group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={20} />
            <span>Vezi toate proiectele pe GitHub</span>
            <ArrowRight size={16} />
          </m.a>
        </m.div>
      </div>
    </section>
  );
}

// ============================================================================
// CONTACT SECTION - Optimized: reduced blur on mobile
// ============================================================================
function ContactSection({ onContactClick }: { onContactClick: () => void }) {
  return (
    <section id="contact" className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 dark:hidden">
        <div className="absolute inset-0 bg-linear-to-br from-slate-100/60 via-white to-slate-50/80" />
        <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-linear-to-r from-blue-100/30 via-slate-100/20 to-indigo-100/30 rounded-full blur-3xl" />
      </div>
      <div className="absolute inset-0 hidden dark:block">
        <div className="absolute inset-0 bg-secondary/30" />
        <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-linear-to-r from-emerald-500/10 via-blue-500/10 to-emerald-500/10 rounded-full blur-3xl" />
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
            Hai să Colaborăm
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Ai un proiect în minte sau vrei să înveți programare? Sunt mereu
            deschis pentru noi oportunități.
          </p>
          <m.button
            onClick={onContactClick}
            className="group px-10 py-5 bg-foreground text-background rounded-full font-semibold text-lg hover:opacity-90 transition-opacity inline-flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail size={22} />
            Trimite un Mesaj
            <ArrowRight size={22} className="transition-transform group-hover:translate-x-1" />
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
const whatsappPath =
  "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z";

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
      <path d={whatsappPath} />
    </svg>
  );
}

function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-border bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        {/* Mobile layout */}
        <div className="md:hidden space-y-6 mb-8">
          <div>
            <span className="text-2xl font-bold">
              SR<span className="text-emerald-500">.</span>
            </span>
            <p className="text-sm text-muted-foreground mt-2 max-w-xs">
              Dezvoltator web & mentor pasionat de tehnologie și predarea
              programării.
            </p>
          </div>
          <div className="flex gap-3">
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href={`https://wa.me/${siteConfig.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-emerald-500 hover:text-emerald-400 transition-colors"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon size={18} />
            </a>
          </div>
          <div>
            <p className="text-xs text-muted-foreground/60 uppercase tracking-wider mb-2 font-mono">
              Navigare
            </p>
            <div className="flex flex-wrap gap-2">
              {siteConfig.navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-3 py-1.5 text-sm bg-secondary/80 border border-border rounded-full text-muted-foreground hover:text-foreground hover:border-emerald-500/30 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs text-muted-foreground/60 uppercase tracking-wider mb-2 font-mono">
              Contact
            </p>
            <div className="flex flex-col gap-2">
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail size={14} className="text-emerald-500" />
                {siteConfig.email}
              </a>
              <a
                href={`tel:${siteConfig.phone}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Phone size={14} className="text-emerald-500" />
                {siteConfig.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Desktop layout */}
        <div className="hidden md:grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold">
                SR<span className="text-emerald-500">.</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              Dezvoltator web și mentor pasionat de crearea de experiențe
              digitale memorabile și de predarea programării către generația
              viitoare.
            </p>
            <div className="flex items-center gap-4 mt-4">
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
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon size={18} />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Navigare</h4>
            <ul className="space-y-2 text-sm">
              {siteConfig.navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <Mail size={14} />
                  Email
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <Phone size={14} />
                  Telefon
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${siteConfig.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <WhatsAppIcon size={14} />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground text-center sm:text-left">
            © {new Date().getFullYear()} Ștefan Ionuț Răzvan. Construit cu
            Next.js. Toate drepturile rezervate.
          </p>
          {/* Replaced cliché with developer-flavoured sign-off */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
            <span className="text-emerald-500/70">~/</span>
            <span>git commit -m &quot;built in Constanța&quot;</span>
          </div>
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
                  Alege metoda preferată
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
              {[
                {
                  href: `mailto:${siteConfig.email}`,
                  icon: <Mail size={24} className="text-foreground" />,
                  label: "Email",
                  sub: siteConfig.email,
                  className:
                    "bg-secondary/50 border-border hover:border-blue-500/30 dark:hover:border-emerald-500/30",
                  iconBg:
                    "bg-foreground/10 group-hover:bg-blue-500/20 dark:group-hover:bg-emerald-500/20",
                  arrowColor:
                    "text-muted-foreground group-hover:text-blue-500 dark:group-hover:text-emerald-500",
                  external: false,
                },
                {
                  href: `tel:${siteConfig.phone}`,
                  icon: <Phone size={24} className="text-foreground" />,
                  label: "Telefon",
                  sub: siteConfig.phone,
                  className:
                    "bg-secondary/50 border-border hover:border-blue-500/30 dark:hover:border-emerald-500/30",
                  iconBg:
                    "bg-foreground/10 group-hover:bg-blue-500/20 dark:group-hover:bg-emerald-500/20",
                  arrowColor:
                    "text-muted-foreground group-hover:text-blue-500 dark:group-hover:text-emerald-500",
                  external: false,
                },
                {
                  href: `https://wa.me/${siteConfig.whatsapp}`,
                  icon: <WhatsAppIcon size={24} />,
                  label: "WhatsApp",
                  sub: "Mesaj instant",
                  className:
                    "bg-emerald-500/10 border-emerald-500/30 hover:border-emerald-500/50",
                  iconBg: "bg-emerald-500",
                  arrowColor: "text-emerald-500",
                  external: true,
                  iconColor: "text-white",
                },
              ].map((item) => (
                <m.a
                  key={item.label}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className={`flex items-center gap-4 p-4 rounded-2xl border transition-all group ${item.className}`}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div
                    className={`w-12 h-12 ${item.iconBg} rounded-xl flex items-center justify-center transition-colors ${item.iconColor ?? ""}`}
                  >
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <div
                      className={`font-semibold ${item.label === "WhatsApp" ? "text-emerald-600 dark:text-emerald-400" : "text-foreground"}`}
                    >
                      {item.label}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {item.sub}
                    </div>
                  </div>
                  <ArrowRight size={20} className={item.arrowColor} />
                </m.a>
              ))}
            </div>
          </m.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ============================================================================
// WHATSAPP FAB - Optimized: no continuous ping animation
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
        {/* Ring effect only on hover instead of continuous ping */}
        <span 
          className={`absolute w-full h-full rounded-full bg-emerald-500 transition-all duration-300 ${
            isHovered ? "scale-125 opacity-0" : "scale-100 opacity-0"
          }`} 
        />
        <WhatsAppIcon size={28} />
      </m.div>
    </m.a>
  );
}

// ============================================================================
// MAIN PAGE — no spinner gate, renders immediately
// ============================================================================
export default function PortfolioPage() {
  const { theme, toggleTheme } = useTheme(); // Note: useTheme handles its own mounting logic
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const openContact = useCallback(() => setContactModalOpen(true), []);
  const closeContact = useCallback(() => setContactModalOpen(false), []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-background" />;

  return (
    <LazyMotion features={domAnimation}>
      <main className="min-h-screen bg-background text-foreground relative">
        <div className="fixed inset-0 pointer-events-none dark:hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.05)_1px,transparent_1px)] bg-size-[32px_32px]" />
        </div>
        <Navbar
          theme={theme}
          toggleTheme={toggleTheme}
          onContactClick={openContact}
        />
        <HeroSection onContactClick={openContact} />
        <AboutSection />
        <ServicesSection onContactClick={openContact} />
        <ProjectsSection />
        <ContactSection onContactClick={openContact} />
        <Footer />
        <ContactModal isOpen={contactModalOpen} onClose={closeContact} />
        <WhatsAppFAB />
      </main>
    </LazyMotion>
  );
}
