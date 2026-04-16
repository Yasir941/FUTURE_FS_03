"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a minimum loading time for cinematic effect
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2200);

    // Also clear when window is loaded if it takes longer than 2.2s
    const handleLoad = () => {
      // We still respect the timer for branding, but we could clear it here if we wanted it faster.
    };

    window.addEventListener("load", handleLoad);
    return () => {
      window.removeEventListener("load", handleLoad);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
        >
          <div className="relative">
            {/* Logo Pulse Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                filter: "blur(0px)",
                transition: { duration: 1, ease: "easeOut" }
              }}
              className="relative w-32 h-32 md:w-48 md:h-48"
            >
              <Image
                src="/logo.png"
                alt="Cut In Half Logo"
                fill
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Cinematic Glow Effect behind logo */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 0.4, 0.2],
                transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute inset-0 -z-10 bg-brand-yellow/20 blur-3xl rounded-full scale-150"
            />
            
            {/* Loading Progress bar (Subtle) */}
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-white/10 overflow-hidden">
               <motion.div 
                 initial={{ x: "-100%" }}
                 animate={{ x: "100%" }}
                 transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
                 className="w-full h-full bg-brand-yellow"
               />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
