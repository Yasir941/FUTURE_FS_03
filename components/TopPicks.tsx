"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import Section from "./Section";
import { Send, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/* ---------------- CONSTANTS ---------------- */

const EyebrowLabel = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <span className={cn("inline-flex items-center gap-2 text-[10px] tracking-[0.45em] uppercase font-body text-white/40", className)}>
    <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow inline-block" />
    {children}
  </span>
);

const picks = [
  { id: 4,  name: "The Smoked Oak",     priceAed: "18.00", tags: ["Bestseller", "Smoky"],     desc: "Hard-smoked over white oak. Deep flavor profile. Uncompromising." },
  { id: 6,  name: "Emerald Glaze",      priceAed: "22.00", tags: ["Premium", "Unique"],          desc: "House-calibrated jalapeño glaze. Sustained heat finish." },
  { id: 8,  name: "Double Trouble",     priceAed: "24.00", tags: ["Large", "Spicy"],           desc: "Dual-stacked assembly. Maximum viscosity sauce." },
  { id: 9,  name: "The Morning After", priceAed: "19.00", tags: ["Egg", "Breakfast"],          desc: "Soft-core yolk. Crispy perimeter. Morning blueprint." },
  { id: 10, name: "Truffle Noir",       priceAed: "26.00", tags: ["Luxury", "Earthy"],          desc: "Black truffle infusion. Aged dairy. High-spec richness." },
  { id: 11, name: "Crispy Korean",      priceAed: "21.00", tags: ["Crunchy", "Sweet"],          desc: "Gochujang lacquer. Fermented daikon. Structural crunch." },
];

/* ---------------- COMPONENTS ---------------- */

function AddButton() {
  const [state, setState] = React.useState<"idle" | "adding" | "added">("idle");

  const handleClick = () => {
    if (state !== "idle") return;
    setState("adding");
    setTimeout(() => setState("added"), 800);
    setTimeout(() => setState("idle"), 2500);
  };

  return (
    <button
      onClick={handleClick}
      className="relative overflow-hidden bg-brand-yellow text-black px-6 py-3.5 font-bold text-[10px] tracking-[0.3em] uppercase transition-all duration-300 hover:bg-white active:scale-95 rounded-full min-w-[140px]"
    >
      <AnimatePresence mode="wait" initial={false}>
        {state === "idle" && (
          <motion.span
            key="idle"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center justify-center gap-2"
          >
            Deploy to Tray <Send className="w-3 h-3" />
          </motion.span>
        )}
        {state === "adding" && (
          <motion.span key="adding" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center">
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 0.6, ease: "linear" }}
              className="block w-3 h-3 border-2 border-black/20 border-t-black rounded-full"
            />
          </motion.span>
        )}
        {state === "added" && (
          <motion.span key="added" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center justify-center gap-2 font-black">
            Confirmed
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

function PickCard({ pick, index }: { pick: (typeof picks)[0]; index: number }) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 100, damping: 25 });
  const ySpring = useSpring(y, { stiffness: 100, damping: 25 });

  const rotateX = useTransform(ySpring, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], [-7, 7]);

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="perspective-[1500px]"
    >
      <motion.div
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          x.set((e.clientX - rect.left) / rect.width - 0.5);
          y.set((e.clientY - rect.top) / rect.height - 0.5);
        }}
        onMouseLeave={() => { x.set(0); y.set(0); }}
        className="group relative w-full bg-white/[0.02] border border-white/[0.05] overflow-hidden cursor-pointer rounded-[2.5rem] transition-colors duration-500 hover:border-brand-yellow/20 hover:bg-white/[0.04]"
        style={{
          height: "580px",
          rotateX: reduced ? 0 : rotateX,
          rotateY: reduced ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        <motion.div className="absolute inset-0 z-0">
          <Image
            src={`/images/food${pick.id}.png`}
            alt={pick.name}
            fill
            className="object-cover opacity-30 grayscale transition-all duration-1000 group-hover:scale-110 group-hover:opacity-50 group-hover:grayscale-0"
          />
        </motion.div>

        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black via-black/60 to-transparent" />

        <div className="absolute top-8 left-8 z-[10] flex flex-wrap gap-2">
          {pick.tags.map((tag) => (
            <span key={tag} className="text-[9px] font-bold tracking-[0.25em] text-white/40 uppercase px-3 py-1.5 rounded-full border border-white/10 bg-black/40 backdrop-blur-md">
              {tag}
            </span>
          ))}
        </div>

        <div style={{ transform: "translateZ(50px)" }} className="absolute bottom-0 left-0 right-0 z-[10] p-10">
          <p className="text-[11px] text-white/40 font-medium uppercase tracking-[0.2em] mb-6 line-clamp-2 max-w-[80%] transition-colors group-hover:text-white/70">
            {pick.desc}
          </p>
          
          <h3 className="font-heading font-medium text-white uppercase text-4xl tracking-tight leading-[1.1] mb-8 transition-all group-hover:text-brand-yellow">
            {pick.name}
          </h3>

          <div className="flex items-center justify-between border-t border-white/[0.05] pt-8">
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-white/20 uppercase tracking-[0.4em] mb-1">Standard Rate</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-heading font-medium text-white tabular-nums">{pick.priceAed}</span>
                <span className="text-[10px] font-bold text-brand-yellow uppercase tracking-widest">AED</span>
              </div>
            </div>
            <AddButton />
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
}

/* ---------------- MAIN SECTION ---------------- */

export default function TopPicks() {
  return (
    <Section id="top-picks" className="bg-black py-32 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* HEADER */}
        <div className="mb-28 flex flex-col lg:flex-row lg:items-end justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <EyebrowLabel className="mb-6">Curation Unit</EyebrowLabel>
            <h2 
              className="font-heading font-medium uppercase text-white tracking-[0.05em] leading-[1.1]"
              style={{ fontSize: "clamp(3rem, 8vw, 6.5rem)" }}
            >
              SELECTED <br />
              <span className="text-brand-yellow">LAB</span> FAVORITES
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:max-w-[340px] border-l border-brand-yellow/30 pl-8"
          >
             <p className="text-white/40 text-[11px] font-medium uppercase tracking-[0.25em] leading-[2.2]">
              A precise assembly of our most requested blueprints. Engineered for the palate, tested in the heat.
            </p>
          </motion.div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {picks.map((pick, idx) => (
            <PickCard key={pick.id} pick={pick} index={idx} />
          ))}
        </div>

        {/* FOOTER STATS */}
        <div className="mt-32 pt-16 border-t border-white/[0.05] flex flex-col md:flex-row items-center justify-between gap-16">
           <div className="flex gap-20">
              <div>
                <EyebrowLabel>Registry</EyebrowLabel>
                <div className="mt-4 text-6xl font-heading font-medium text-white leading-none tabular-nums">0{picks.length}</div>
                <div className="mt-2 text-[10px] uppercase tracking-[0.5em] text-white/20 font-bold">Master Units</div>
              </div>
              <div>
                <EyebrowLabel>Status</EyebrowLabel>
                <div className="mt-4 text-6xl font-heading font-medium text-brand-yellow leading-none tabular-nums">24/7</div>
                <div className="mt-2 text-[10px] uppercase tracking-[0.5em] text-white/20 font-bold">Operation</div>
              </div>
           </div>

          <button className="group relative flex items-center justify-center gap-6 bg-white/[0.03] border border-white/[0.08] px-10 py-6 rounded-full transition-all duration-500 hover:bg-brand-yellow hover:border-brand-yellow">
            <span className="text-[11px] font-bold uppercase tracking-[0.5em] text-white group-hover:text-black transition-colors">
              Access Full Blueprint
            </span>
            <ArrowUpRight className="w-5 h-5 text-brand-yellow group-hover:text-black transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
        </div>
      </div>
    </Section>
  );
}