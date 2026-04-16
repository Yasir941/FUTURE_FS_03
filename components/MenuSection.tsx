"use client";

import * as React from "react";
import {
  AnimatePresence,
  motion,
  Variants,
  useReducedMotion,
  useSpring,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { Beef, Coffee, Pizza, Star, Utensils, Zap, Send } from "lucide-react";
import Section from "./Section";
import { cn } from "@/lib/utils";
import Image from "next/image"; // Error fixed by using this below

// --- Components from Footer Design ---

const EyebrowLabel = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.45em] uppercase font-body text-white/40">
    <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow inline-block" />
    {children}
  </span>
);

// ─── Types ────────────────────────────────────────────────────────────────────

type MenuCategory = {
  category: string;
  items: Array<{ name: string; priceAed: string; note?: string }>;
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const menuHighlights = [
  { icon: Beef,     name: "Wagyu Focus",      description: "Premium cuts, hard sear, zero shortcuts." },
  { icon: Zap,      name: "Sides + Heat",     description: "Messy fries, wings, jalapeño crunch." },
  { icon: Coffee,   name: "Shakes + Treats",  description: "Thick, cold, and built like dessert." },
  { icon: Star,     name: "Monthly Special",  description: "Limited-run drop. No repeats." },
  { icon: Pizza,    name: "Social Platters",  description: "Shareable stacks for the whole crew." },
  { icon: Utensils, name: "Dine-In Vibe",      description: "Industrial luxury. Book the workshop." },
] as const;

const menuData: MenuCategory[] = [
  {
    category: "Beef Burgers",
    items: [
      { name: "Cut in Half — Signature",    priceAed: "62.00" },
      { name: "Sweet Escape — Bacon",       priceAed: "58.00" },
      { name: "The O.G Half — Basic",       priceAed: "37.00" },
      { name: "Truffle Knock",              priceAed: "44.00" },
      { name: "Cheese Burger",             priceAed: "44.00" },
      { name: "JC",                         priceAed: "45.00" },
      { name: "Smokey B",                   priceAed: "48.00" },
    ],
  },
  {
    category: "Chicken Burgers",
    items: [
      { name: "The General",                          priceAed: "45.00" },
      { name: "Classic Chicken",                      priceAed: "42.00" },
      { name: "D' Chosen One — I Can Handle It",      priceAed: "42.00" },
      { name: "D' Chosen One — Don't Burn Me",        priceAed: "42.00" },
      { name: "All Rounder",                          priceAed: "50.00" },
    ],
  },
  {
    category: "Sides & Fries",
    items: [
      { name: "Chicken Strips",      priceAed: "30.00" },
      { name: "Jalapeño Strips",     priceAed: "32.00" },
      { name: "Messy Fries",         priceAed: "30.00" },
      { name: "Normal Fries",        priceAed: "16.00" },
      { name: "Loaded Fries",        priceAed: "29.00" },
      { name: "Truffle Fries",       priceAed: "28.00" },
      { name: "Cheese Fries",        priceAed: "25.00" },
      { name: "Cheese Balls",        priceAed: "30.00" },
      { name: "Mozzarella Sticks",   priceAed: "20.00" },
      { name: "Corn Cutz",           priceAed: "27.00" },
      { name: "Wings — Honey Mustard", priceAed: "30.00" },
      { name: "Wings — K-Pop Sauce",   priceAed: "30.00" },
      { name: "Wings — Truffle Sauce", priceAed: "30.00" },
    ],
  },
  {
    category: "Drinks",
    items: [
      { name: "Coca-Cola Zero",              priceAed: "11.00" },
      { name: "Coca-Cola Original",          priceAed: "11.00" },
      { name: "Dolomia Still (Small)",       priceAed: "11.00" },
      { name: "Dolomia Sparkling",           priceAed: "11.00" },
    ],
  },
  {
    category: "Sodas & Juices",
    items: [
      { name: "Piña Colada",              priceAed: "30.00" },
      { name: "Blue Lagoon Lemonade",     priceAed: "25.00" },
      { name: "Passion Cooler",           priceAed: "25.00" },
      { name: "Passion Cooler Mojito",    priceAed: "27.00" },
      { name: "CIH Mixberries Mojito",    priceAed: "27.00" },
      { name: "Peach Lemonade",           priceAed: "27.00" },
      { name: "CIH Cocktail",             priceAed: "27.00" },
      { name: "Berry Soda — Strawberry",  priceAed: "25.00" },
      { name: "Mango Cooler",             priceAed: "25.00" },
      { name: "Vimto",                    priceAed: "25.00" },
      { name: "Hibiscus",                 priceAed: "27.00" },
    ],
  },
  {
    category: "Ice Cream & Shakes",
    items: [
      { name: "Carapeanut Ice Cream",      priceAed: "25.00" },
      { name: "D' Pistachio Milkshake",    priceAed: "30.00" },
      { name: "Chocolutos Milkshake",      priceAed: "30.00" },
      { name: "Rose Milkshake",            priceAed: "30.00" },
      { name: "Carapeanut Milkshake",      priceAed: "27.00" },
    ],
  },
  {
    category: "Kids Meals",
    items: [
      { name: "Kids Meal — Chicken", priceAed: "35.00" },
      { name: "Kids Meal — Beef",    priceAed: "35.00" },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function formatPrice(priceAed: string) {
  const n = Number(priceAed);
  return Number.isFinite(n) ? n.toFixed(2) : priceAed;
}

// ─── Animation variants ───────────────────────────────────────────────────────

const panelVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.035,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.25, ease: "easeIn" },
  },
};

const rowVariants: Variants = {
  hidden: { opacity: 0, x: -12 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

// ─── Tilt card ────────────────────────────────────────────────────────────────

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 280, damping: 28 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-6,  6]), { stiffness: 280, damping: 28 });

  return (
    <motion.div
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left) / r.width  - 0.5);
        y.set((e.clientY - r.top)  / r.height - 0.5);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX: reduced ? 0 : rx, rotateY: reduced ? 0 : ry, transformStyle: "preserve-3d" }}
      className={className}
    >
      <div style={{ transform: "translateZ(30px)" }}>{children}</div>
    </motion.div>
  );
}

// ─── Highlight card ───────────────────────────────────────────────────────────

function HighlightCard({ h, index }: { h: (typeof menuHighlights)[number]; index: number }) {
  const Icon = h.icon;
  return (
    <TiltCard>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
        className="group relative h-full overflow-hidden border border-white/[0.05] bg-white/[0.02] p-8 transition-all duration-500 hover:border-brand-yellow/25 hover:bg-white/[0.04] backdrop-blur-sm"
        style={{ borderRadius: "2rem" }}
      >
        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: "radial-gradient(ellipse at 20% 20%, rgba(255,210,0,0.06) 0%, transparent 70%)" }} />

        <div className="relative z-10 flex flex-col gap-5">
          <div className="flex h-12 w-12 items-center justify-center bg-brand-yellow"
            style={{ borderRadius: "0.85rem" }}>
            <Icon className="h-5 w-5 text-black" strokeWidth={2.5} />
          </div>

          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.4em] text-brand-yellow">
              {h.name}
            </p>
            <p className="text-[13px] leading-relaxed text-white/40 group-hover:text-white/70 transition-colors duration-300">
              {h.description}
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-brand-yellow origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
      </motion.div>
    </TiltCard>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function MenuSection() {
  const categories = React.useMemo(
    () => menuData.map((c) => ({ id: slugify(c.category), label: c.category })),
    []
  );

  const [selectedId, setSelectedId] = React.useState(categories[0].id);

  const selectedCategory = React.useMemo(
    () => menuData.find((c) => slugify(c.category) === selectedId) ?? menuData[0],
    [selectedId]
  );

  const scrollToOrder = () =>
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <Section id="menu" className="bg-black py-28 overflow-hidden">
      <div className="relative container mx-auto px-6 max-w-7xl">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20">
          <div>
            <EyebrowLabel>The Workshop</EyebrowLabel>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 font-heading font-medium uppercase text-white tracking-[0.1em] leading-[1.1]"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
            >
              ENGINEERED <br />
              <span className="text-brand-yellow">FLAVOR</span> MENU
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="lg:max-w-[320px] flex flex-col gap-8 self-end"
          >
            <p className="text-[11px] text-white/40 leading-relaxed border-l border-brand-yellow/30 pl-6 tracking-[0.15em] uppercase">
              Precision built. Hard sear, zero shortcuts. Every burger is a prototype perfected for the palate.
            </p>
            <button 
              onClick={scrollToOrder}
              className="flex items-center justify-center gap-4 bg-brand-yellow px-8 py-4 rounded-full text-[11px] tracking-[0.4em] font-bold text-black uppercase hover:bg-white transition-all group w-fit"
            >
              Order Now <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
          </motion.div>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
          {menuHighlights.map((h, i) => (
            <HighlightCard key={h.name} h={h} index={i} />
          ))}
        </div>

        {/* Category Tabs */}
        <div className="sticky top-8 z-40 mb-12">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border border-white/[0.05] bg-black/80 backdrop-blur-xl px-4 py-3 rounded-full max-w-fit mx-auto"
          >
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide no-scrollbar">
              {categories.map((c) => {
                const active = selectedId === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedId(c.id)}
                    className={cn(
                      "shrink-0 px-6 py-2.5 text-[10px] font-bold tracking-[0.25em] uppercase transition-all duration-300 rounded-full border",
                      active
                        ? "bg-brand-yellow border-brand-yellow text-black"
                        : "border-transparent text-white/40 hover:text-white/80 hover:bg-white/5"
                    )}
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Menu Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedId}
            variants={panelVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="relative border border-white/[0.05] bg-white/[0.02] overflow-hidden backdrop-blur-sm"
            style={{ borderRadius: "2.5rem" }}
          >
            {/* Using the Image component to add a decorative lab schematic watermark */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none scale-150 grayscale invert">
               <Image 
                 src="/images/blueprint.png" // Ensure you have a relevant PNG here
                 alt="Schematic Backdrop"
                 width={500}
                 height={500}
                 priority
               />
            </div>

            <div className="relative z-10 flex items-center justify-between px-10 py-10 border-b border-white/[0.05] sm:px-16">
              <div>
                <EyebrowLabel>{selectedCategory.items.length} Units Available</EyebrowLabel>
                <h3
                  className="mt-3 font-heading font-medium uppercase text-white tracking-[0.05em] leading-none"
                  style={{ fontSize: "clamp(1.5rem, 4vw, 2.8rem)" }}
                >
                  {selectedCategory.category}
                </h3>
              </div>
              <div className="hidden sm:flex items-center gap-3 text-[10px] font-bold tracking-[0.3em] text-white/20 uppercase">
                <span className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse" />
                Live Kitchen
              </div>
            </div>

            <div className="relative z-10 px-10 py-12 sm:px-16">
              <ul className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-2">
                {selectedCategory.items.map((item) => (
                  <motion.li
                    key={item.name}
                    variants={rowVariants}
                    className="group flex items-center justify-between gap-4 py-5 border-b border-white/[0.03] last:border-0"
                  >
                    <span className="text-[12px] font-medium text-white/50 group-hover:text-white transition-colors duration-300 uppercase tracking-[0.15em]">
                      {item.name}
                    </span>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-lg font-heading font-medium text-brand-yellow tabular-nums">
                        {formatPrice(item.priceAed)}
                      </span>
                      <span className="text-[9px] font-bold text-brand-yellow/40 uppercase tracking-[0.1em]">
                        AED
                      </span>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6 px-10 py-8 sm:px-16 border-t border-white/[0.05] bg-white/[0.01]">
              <p className="text-[10px] tracking-[0.6em] uppercase text-white/20">
                Precision Dining • Engineered Flavor
              </p>
              <button
                onClick={scrollToOrder}
                className="group flex items-center gap-3 text-[10px] font-bold tracking-[0.4em] uppercase text-white/40 hover:text-brand-yellow transition-colors duration-300"
              >
                Inquire Within
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-16 flex items-center justify-between border-t border-white/[0.05] pt-10"
        >
          <span className="text-[10px] font-medium text-white/10 uppercase tracking-[0.8em]">
            © {new Date().getFullYear()} CIH.LABS
          </span>
          <span className="text-[10px] font-medium text-white/10 uppercase tracking-[0.8em]">
            V.02-2026
          </span>
        </motion.div>
      </div>
    </Section>
  );
}

// Re-using the icon from Footer for consistency
function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <line x1="7" y1="17" x2="17" y2="7"></line>
      <polyline points="7 7 17 7 17 17"></polyline>
    </svg>
  );
}