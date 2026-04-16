"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const images = [
  { src: "/images/food1.png", title: "ULTRASMASH", subtitle: "Batch No. 001 // Dual-Core Beef" },
  { src: "/images/food2.png", title: "CRISPY OAK", subtitle: "Smoked Profile // Hardwood Finish" },
  { src: "/images/food3.png", title: "THE TRUFFLE", subtitle: "Luxury Spec // Earthbound Wagyu" },
  { src: "/images/food5.png", title: "HOT CHICK", subtitle: "Thermal Unit // Nashville Poultry" },
  { src: "/images/food7.png", title: "GREEN CORE", subtitle: "Plant Prototype // Bio-Engineered" },
];

const EyebrowLabel = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <span className={cn("inline-flex items-center gap-2 text-[10px] tracking-[0.45em] uppercase font-body text-white/40", className)}>
    <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow inline-block" />
    {children}
  </span>
);

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // useScroll requires the target to be 'relative', 'absolute', or 'fixed'
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacityParallax = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const slideNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, []);

  const slidePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(slideNext, 6000);
    return () => clearInterval(timer);
  }, [slideNext]);

  return (
    <section 
      ref={containerRef} 
      id="hero" 
      // FIX: 'relative' ensures scroll offset is calculated correctly by framer-motion
      className="relative h-[100svh] w-full overflow-hidden bg-black perspective-1000"
    >
      
      {/* Background Images with Parallax */}
      <motion.div style={{ y: yParallax }} className="absolute inset-0 z-0">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={{
              enter: (direction: number) => ({
                opacity: 0,
                scale: 1.1,
                x: direction > 0 ? "10%" : "-10%",
                filter: "blur(20px) grayscale(1)",
              }),
              center: {
                zIndex: 1,
                x: 0,
                opacity: 0.6,
                scale: 1,
                filter: "blur(0px) grayscale(0.4)",
              },
              exit: (direction: number) => ({
                zIndex: 0,
                opacity: 0,
                scale: 0.95,
                x: direction < 0 ? "10%" : "-10%",
                filter: "blur(20px) grayscale(1)",
              }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              opacity: { duration: 1 },
              scale: { duration: 2, ease: [0.16, 1, 0.3, 1] },
              x: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
              filter: { duration: 1 },
            }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60 z-10" />
            <Image
              src={images[currentIndex].src}
              alt={images[currentIndex].title}
              fill
              priority // High priority as it is the Largest Contentful Paint (LCP)
              sizes="100vw" // FIX: Added sizes to improve page performance and clear warning
              className="object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Decorative Technical Grid Overlay */}
      <div className="absolute inset-0 z-[5] opacity-20 pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(circle, #ffffff10 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

      {/* Content Container */}
      <motion.div 
        style={{ opacity: opacityParallax }}
        className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4 md:px-6"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${currentIndex}`}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { 
                opacity: 1, 
                y: 0, 
                transition: { duration: 1, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.15 }
              },
              exit: { opacity: 0, y: -20, transition: { duration: 0.5 } }
            }}
            className="max-w-[95vw] md:max-w-6xl"
          >
            <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
               <EyebrowLabel className="mb-8">Flavor Engineering Lab</EyebrowLabel>
            </motion.div>

            <motion.h1 
              variants={{
                hidden: { opacity: 0, letterSpacing: "-0.05em" },
                visible: { opacity: 1, letterSpacing: "0.02em" }
              }}
              className="text-white text-5xl sm:text-8xl md:text-[12rem] font-heading font-medium leading-[0.8] mb-10 uppercase tracking-tight"
            >
              {images[currentIndex].title}
            </motion.h1>

            <motion.h2 
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 }
              }}
              className="text-white/40 font-body text-[10px] md:text-xs tracking-[0.5em] mb-12 uppercase"
            >
              {images[currentIndex].subtitle}
            </motion.h2>

            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1 }
              }}
            >
              <button 
                onClick={() => document.getElementById("top-picks")?.scrollIntoView({ behavior: "smooth" })}
                className="group relative px-12 py-6 bg-brand-yellow text-black font-bold text-[11px] uppercase tracking-[0.4em] overflow-hidden transition-all active:scale-95 rounded-full"
              >
                <span className="relative z-10 flex items-center gap-3">
                   Initialize Order <Zap className="w-3 h-3 fill-current" />
                </span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
              </button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Industrial Controls */}
      <div className="absolute bottom-16 left-0 right-0 z-30 flex flex-col items-center justify-center gap-10">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex items-center gap-12"
        >
          <button
            onClick={slidePrev}
            className="p-3 border border-white/5 rounded-full hover:bg-white/10 transition-all group active:scale-90"
          >
            <ChevronLeft className="w-6 h-6 text-white/30 group-hover:text-brand-yellow" />
          </button>

          <div className="flex gap-4">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className="group py-4"
              >
                <div className={cn(
                  "h-0.5 transition-all duration-700",
                  idx === currentIndex ? "w-12 bg-brand-yellow" : "w-4 bg-white/10 group-hover:bg-white/30"
                )} />
              </button>
            ))}
          </div>

          <button
            onClick={slideNext}
            className="p-3 border border-white/5 rounded-full hover:bg-white/10 transition-all group active:scale-90"
          >
            <ChevronRight className="w-6 h-6 text-white/30 group-hover:text-brand-yellow" />
          </button>
        </motion.div>
      </div>

      {/* Technical Sidebar Stats */}
      <div className="absolute left-10 bottom-16 hidden lg:flex flex-col gap-6 z-30">
          <div>
            <div className="text-[9px] text-white/20 uppercase tracking-[0.3em] font-bold">System Status</div>
            <div className="flex items-center gap-2 mt-1">
               <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
               <span className="text-[10px] text-white font-mono uppercase tracking-widest">Optimal</span>
            </div>
          </div>
          <div>
            <div className="text-[9px] text-white/20 uppercase tracking-[0.3em] font-bold">Heat Index</div>
            <div className="text-[10px] text-white font-mono uppercase tracking-widest mt-1">180°C / Hard Sear</div>
          </div>
      </div>

      {/* Frame Counter */}
      <div className="absolute right-12 bottom-16 hidden lg:flex items-baseline gap-4 z-30">
        <span className="text-white/20 text-[10px] uppercase tracking-[0.4em] font-bold">Prototype</span>
        <motion.span 
          key={currentIndex}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-brand-yellow font-heading text-4xl"
        >
          0{currentIndex + 1}
        </motion.span>
        <span className="text-white/10 font-heading text-xl">/ 0{images.length}</span>
      </div>
    </section>
  );
}