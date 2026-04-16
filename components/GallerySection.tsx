"use client";

import * as React from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useSpring,
  useMotionValue,
  useTransform,
  useScroll,
  MotionValue,
} from "framer-motion";
import Image from "next/image";
import Section from "./Section";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

/* ---------------- DATA ---------------- */

const galleryImages = [
  { id: 1, src: "/images/gallery1.png" },
  { id: 2, src: "/images/gallery2.png" },
  { id: 3, src: "/images/gallery3.png" },
  { id: 4, src: "/images/gallery4.png" },
  { id: 5, src: "/images/gallery5.png" },
  { id: 6, src: "/images/gallery6.png" },
  { id: 7, src: "/images/gallery7.png" },
];

function wrapIndex(i: number, len: number) {
  return (i + len) % len;
}

/* ---------------- COMPONENTS ---------------- */

const EyebrowLabel = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.45em] uppercase font-body text-white/40">
    <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow inline-block" />
    {children}
  </span>
);

function GalleryTiltCard({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { stiffness: 150, damping: 20 });

  const glare = useTransform(
    [x, y] as MotionValue<number>[],
    ([xVal, yVal]: number[]) =>
      `radial-gradient(circle at ${50 + xVal * 100}% ${
        50 + yVal * 100
      }%, rgba(255,215,0,0.15), transparent 60%)`
  );

  return (
    <motion.div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
      }}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      onClick={onClick}
      style={{
        rotateX: reduced ? 0 : rotateX,
        rotateY: reduced ? 0 : rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative cursor-pointer aspect-[4/5] sm:aspect-square overflow-hidden rounded-[2.5rem] border border-white/5 bg-neutral-950 transition-all duration-700 hover:border-brand-yellow/40 hover:shadow-[0_0_40px_rgba(255,215,0,0.1)]"
    >
      <div className="absolute inset-0 z-0">{children}</div>
      <motion.div style={{ background: glare }} className="absolute inset-0 z-10 pointer-events-none" />
      
      <div className="absolute inset-0 z-20 bg-black/40 group-hover:bg-transparent transition-colors duration-700" />

      <div
        style={{ transform: "translateZ(50px)" }}
        className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-30"
      >
        <div className="bg-brand-yellow p-4 rounded-full text-black shadow-[0_0_20px_rgba(255,215,0,0.4)] scale-75 group-hover:scale-100 transition-transform duration-500">
          <Maximize2 className="w-5 h-5" />
        </div>
        <p className="mt-4 text-[10px] tracking-[0.4em] text-white uppercase font-bold drop-shadow-md">
          Inspect Frame
        </p>
      </div>
    </motion.div>
  );
}

/* ---------------- MAIN ---------------- */

export default function GallerySection() {
  const [selectedId, setSelectedId] = React.useState<number | null>(null);
  const containerRef = React.useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const headingY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const selectedIndex = React.useMemo(() => {
    if (selectedId == null) return -1;
    return galleryImages.findIndex((g) => g.id === selectedId);
  }, [selectedId]);

  const open = (id: number) => setSelectedId(id);
  const close = () => setSelectedId(null);
  const goNext = React.useCallback(() => setSelectedId(galleryImages[wrapIndex(selectedIndex + 1, galleryImages.length)].id), [selectedIndex]);
  const goPrev = React.useCallback(() => setSelectedId(galleryImages[wrapIndex(selectedIndex - 1, galleryImages.length)].id), [selectedIndex]);

  React.useEffect(() => {
    if (selectedId == null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedId, goNext, goPrev]);

  return (
    <Section id="gallery" className="relative bg-black py-32 md:py-48 overflow-hidden">
      <div ref={containerRef} className="container mx-auto px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 mb-32">
          <motion.div style={{ y: headingY }} className="space-y-6">
            <EyebrowLabel>The Visual Workshop</EyebrowLabel>
            <h2 className="text-6xl md:text-[7rem] font-heading font-medium text-white tracking-[0.05em] uppercase leading-none">
              THE <span className="text-brand-yellow text-glow">GALLERY</span>
            </h2>
          </motion.div>
          <div className="max-w-[300px] border-l border-white/10 pl-8">
            <p className="text-[10px] tracking-[0.3em] uppercase text-white/40 leading-relaxed font-medium italic">
              {"// EVERY FRAME IS A CALIBRATED PIECE OF ART. NO FILTERS, JUST PRECISION."}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {galleryImages.map((img, idx) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.8, 
                delay: (idx % 3) * 0.15,
                ease: [0.215, 0.61, 0.355, 1]
              }}
            >
              <GalleryTiltCard onClick={() => open(img.id)}>
                <Image
                  src={img.src}
                  alt={`Calibrated Image ${img.id}`}
                  fill
                  // Optimized performance for grid layout
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition duration-1000 grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-105"
                />
              </GalleryTiltCard>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6 md:p-12"
            onClick={close}
          >
            <button 
              onClick={close} 
              className="absolute top-10 right-10 z-[110] bg-brand-yellow p-4 rounded-full text-black hover:scale-110 active:scale-95 transition-transform"
            >
              <X size={24} />
            </button>

            <div className="absolute inset-x-10 top-1/2 -translate-y-1/2 flex justify-between z-[110] pointer-events-none">
              <button onClick={(e) => { e.stopPropagation(); goPrev(); }} className="pointer-events-auto bg-white/5 hover:bg-brand-yellow p-5 rounded-full text-white hover:text-black transition-all backdrop-blur-md border border-white/10">
                <ChevronLeft size={32} />
              </button>
              <button onClick={(e) => { e.stopPropagation(); goNext(); }} className="pointer-events-auto bg-white/5 hover:bg-brand-yellow p-5 rounded-full text-white hover:text-black transition-all backdrop-blur-md border border-white/10">
                <ChevronRight size={32} />
              </button>
            </div>

            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full h-full max-w-6xl aspect-video rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galleryImages[selectedIndex].src}
                alt="Selected Vision"
                fill
                className="object-contain"
                sizes="100vw"
                priority // Ensures the lightbox image loads immediately
              />
              
              <div className="absolute bottom-8 left-8 p-6 bg-black/40 backdrop-blur-md border border-white/5 rounded-2xl">
                <EyebrowLabel>Frame {selectedIndex + 1} of {galleryImages.length}</EyebrowLabel>
                <p className="mt-1 text-xs tracking-[0.2em] text-white/60 uppercase">High Fidelity Output</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}