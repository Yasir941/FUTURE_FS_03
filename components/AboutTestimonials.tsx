"use client";

import * as React from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import Section from "./Section";
import { Star } from "lucide-react";

/* ---------------- DATA ---------------- */

const testimonials = [
  {
    quote: "A masterclass in culinary transparency. Slicing the burger reveals a blueprint of flavor that most places try to hide.",
    author: "James Wilson",
    role: "Lead Gastronomy Critic",
    rating: 5,
  },
  {
    quote: "The industrial aesthetic matches the precision of the food. It's rare to find a brand that executes a vision this cleanly.",
    author: "Sarah Chen",
    role: "Architectural Designer",
    rating: 5,
  },
  {
    quote: "Pure engineering. From the 24-hour brine to the signature cross-section, every detail is intentional and delicious.",
    author: "Marcus Thorne",
    role: "Executive Chef",
    rating: 5,
  },
];

/* ---------------- COMPONENTS ---------------- */

const EyebrowLabel = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.45em] uppercase font-body text-white/40">
    <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow inline-block" />
    {children}
  </span>
);

function Stat({ value, label, index }: { value: string; label: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      className="space-y-3 group"
    >
      <div className="text-5xl md:text-6xl font-heading font-medium text-brand-yellow tracking-[0.05em] uppercase italic transition-transform duration-500 group-hover:-translate-y-1">
        {value}
      </div>
      <div className="text-[9px] tracking-[0.3em] uppercase text-white/30 font-medium border-l border-brand-yellow/30 pl-4 transition-colors group-hover:text-white group-hover:border-brand-yellow">
        {label}
      </div>
    </motion.div>
  );
}

/* ---------------- MAIN ---------------- */

export default function AboutTestimonials() {
  const [active, setActive] = React.useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  React.useEffect(() => {
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % testimonials.length);
    }, 8000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <Section id="about" className="bg-black py-32 md:py-48">
      <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        
        {/* LEFT CONTENT */}
        <div className="space-y-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <EyebrowLabel>Our Story</EyebrowLabel>
            <h2 className="mt-6 text-6xl md:text-[5.5rem] font-heading font-medium text-white tracking-[0.05em] uppercase leading-[0.9]">
              THE <span className="text-brand-yellow text-glow">CRAFT</span>
            </h2>
          </motion.div>

          <div className="space-y-8 max-w-xl">
            <p className="text-xs md:text-sm tracking-[0.2em] uppercase text-white/50 leading-relaxed font-medium">
              Born in a converted workshop, <span className="text-white">CUT IN HALF</span> was founded on the principle that true quality cannot be hidden.
            </p>
            <p className="text-xs md:text-sm tracking-[0.2em] uppercase text-white/30 leading-relaxed font-medium border-l border-white/10 pl-8">
              By slicing every burger clean down the middle, we invite you to see the precision, the freshness, and the soul of our craft.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 pt-8">
            <Stat value="100%" label="Organic Beef" index={0} />
            <Stat value="24H" label="Hour Brine" index={1} />
            <Stat value="HAND" label="Crafted" index={2} />
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="rounded-[2.5rem] overflow-hidden border border-white/10 aspect-[4/5] relative group">
            <motion.div style={{ y: imgY }} className="absolute inset-0">
              <Image 
                src="/images/food1.png" 
                alt="Craft Presentation" 
                fill 
                className="object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-1000"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" />
            
            <div className="absolute bottom-8 left-8 right-8 p-8 rounded-3xl bg-black/60 border border-white/10 backdrop-blur-xl">
              <EyebrowLabel>Signature Cut</EyebrowLabel>
              <p className="mt-2 text-2xl font-heading font-medium text-white tracking-[0.1em] uppercase">
                Precision <span className="text-brand-yellow text-glow">Engineered</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* REVIEWS SECTION */}
      <div className="mt-48 pt-32 border-t border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-16">
          <div>
            <EyebrowLabel>Verified Feedback</EyebrowLabel>
            <h3 className="mt-4 text-5xl md:text-7xl font-heading font-medium text-white tracking-[0.05em] uppercase leading-none">
              WHAT THEY <span className="text-brand-yellow text-glow">SAY</span>
            </h3>
          </div>
        </div>

        {/* Review Box Container */}
        <div className="relative min-h-[500px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 40, scale: 0.98, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -40, scale: 1.02, filter: "blur(12px)" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="bg-neutral-950/50 border border-white/10 rounded-[3rem] p-10 md:p-20 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden group backdrop-blur-sm"
            >
              {/* Animated Glow Border */}
              <div className="absolute inset-0 rounded-[3rem] border border-brand-yellow/20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              
              {/* Rating with intense glow */}
              <div className="flex gap-1.5 mb-10">
                {[...Array(testimonials[active].rating)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={18} 
                    className="fill-brand-yellow text-brand-yellow filter drop-shadow-[0_0_10px_rgba(255,215,0,0.8)]" 
                  />
                ))}
              </div>

              {/* Quote with focal glow */}
              <p className="text-3xl md:text-5xl lg:text-6xl font-heading font-medium text-white tracking-tight uppercase leading-[1.1] italic mb-16 relative">
                &ldquo;{testimonials[active].quote}&rdquo;
                <span className="absolute -inset-4 bg-brand-yellow/5 blur-3xl rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              </p>
              
              {/* Author & Progress Bar Wrapper */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center gap-8"
                >
                  <div className="h-[2px] w-16 bg-brand-yellow shadow-[0_0_20px_rgba(255,215,0,0.8)]" />
                  <div>
                    <p className="text-sm tracking-[0.45em] font-bold text-white uppercase">{testimonials[active].author}</p>
                    <p className="text-[10px] tracking-[0.3em] font-medium text-white/30 uppercase mt-2 italic">
                      {testimonials[active].role}
                    </p>
                  </div>
                </motion.div>

                {/* Industrial Progress Indicators */}
                <div className="flex gap-4 h-[40px] items-center">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      className="group relative w-14 h-full flex items-center"
                    >
                      <div className={`h-[2px] w-full transition-all duration-700 ${i === active ? "bg-brand-yellow shadow-[0_0_10px_rgba(255,215,0,0.5)]" : "bg-white/10 group-hover:bg-white/30"}`} />
                      {i === active && (
                        <>
                          <motion.div
                            layoutId="indicator-glow"
                            className="absolute inset-0 bg-brand-yellow/10 blur-2xl rounded-full"
                          />
                          <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 8, ease: "linear" }}
                            className="absolute bottom-0 left-0 h-[2px] w-full bg-brand-yellow origin-left blur-[1px]"
                          />
                        </>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ambient Glowing Orbs */}
              <div className="absolute -top-24 -right-24 w-80 h-80 bg-brand-yellow/10 rounded-full blur-[120px] pointer-events-none group-hover:bg-brand-yellow/20 transition-all duration-1000" />
              <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-brand-yellow/5 rounded-full blur-[100px] pointer-events-none" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}