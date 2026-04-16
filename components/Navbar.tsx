"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Menu, X, Circle, UtensilsCrossed } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "#hero", label: "01" },
  { name: "Top Picks", href: "#top-picks", label: "02" },
  { name: "The Menu", href: "#menu", label: "03" },
  { name: "Our Story", href: "#about", label: "04" },
  { name: "Gallery", href: "#gallery", label: "05" },
  { name: "Contact", href: "#contact", label: "06" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    navLinks.forEach((link) => {
      const element = document.querySelector(link.href);
      if (element) observer.observe(element);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className={cn(
      "fixed top-0 left-0 w-full z-[100] transition-all duration-700 ease-[0.22, 1, 0.36, 1]",
      isScrolled ? "py-4" : "py-8"
    )}>
      <div className={cn(
        "max-w-7xl mx-auto flex items-center justify-between transition-all duration-700 px-6",
        isScrolled 
          ? "bg-black/80 backdrop-blur-2xl py-3 rounded-full border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] mx-6" 
          : "bg-transparent"
      )}>
        
        {/* BRAND LOGO UNIT */}
        <div className="flex items-center gap-4">
          <div 
            className="relative w-12 h-12 cursor-pointer group" 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <div className="absolute inset-0 bg-brand-yellow/10 rounded-full blur-xl group-hover:bg-brand-yellow/30 transition-all" />
            <Image 
              src="/logo.png" 
              alt="Cut In Half" 
              fill 
              priority // FIX: Added priority for LCP optimization
              sizes="48px" // FIX: Added sizes for performance (matches w-12)
              className="object-contain relative z-10 brightness-110 group-hover:scale-105 transition-transform" 
            />
          </div>
          
          <div className="hidden lg:flex flex-col border-l border-white/10 pl-4">
            <span className="text-[9px] uppercase tracking-[0.3em] text-white/30 font-bold">Kitchen Status</span>
            <div className="flex items-center gap-2">
              <Circle className="w-1.5 h-1.5 fill-brand-yellow text-brand-yellow animate-pulse" />
              <span className="text-[10px] uppercase tracking-widest text-white/80 font-mono">Accepting Orders</span>
            </div>
          </div>
        </div>

        {/* NAVIGATION PILL */}
        <div className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/[0.05] p-1 rounded-full">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={cn(
                  "px-6 py-2 rounded-full text-[11px] uppercase tracking-[0.2em] font-bold transition-all duration-500 relative group",
                  isActive ? "text-brand-yellow" : "text-white/40 hover:text-white"
                )}
              >
                <span className="relative z-10">{link.name}</span>
                
                {isActive && (
                  <motion.div 
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-white/[0.07] border border-white/[0.1] rounded-full shadow-[inset_0_0_10px_rgba(255,255,255,0.02)]"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* RESERVATION TERMINAL */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="hidden md:flex group relative items-center gap-3 px-8 py-3 bg-brand-yellow rounded-full transition-all hover:bg-white active:scale-95 overflow-hidden shadow-[0_10px_20px_rgba(255,210,0,0.15)]"
          >
            <UtensilsCrossed className="w-3.5 h-3.5 text-black" />
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-black transition-colors">
              Book Table
            </span>
            <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/40 opacity-40 group-hover:animate-shine" />
          </button>

          {/* MOBILE TOGGLE */}
          <button 
            className="md:hidden w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white active:scale-90 transition-transform"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* MOBILE FULLSCREEN TERMINAL */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[90] md:hidden bg-black/98 backdrop-blur-3xl flex flex-col items-center justify-center"
          >
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm1 1v38h38V1H1z' fill='%23fff' fill-rule='evenodd'/%3E%3C/svg%3E")` }} />
            
            <div className="relative z-10 flex flex-col items-center gap-10">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.05 * idx }}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="group flex flex-col items-center"
                >
                  <span className="text-[9px] font-mono text-brand-yellow/40 tracking-[0.8em] mb-2">MOD_{link.label}</span>
                  <span className="text-5xl font-heading uppercase text-white group-hover:text-brand-yellow transition-all">
                    {link.name}
                  </span>
                </motion.a>
              ))}
              
              <motion.button 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8 px-16 py-5 bg-brand-yellow text-black font-black uppercase text-xs tracking-[0.4em] rounded-full"
              >
                Find A Table
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}