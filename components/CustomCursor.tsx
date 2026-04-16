"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Core dot position
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Outer ring position with heavy spring for cinematic trail
  const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
  const outerX = useSpring(cursorX, springConfig);
  const outerY = useSpring(cursorY, springConfig);

  useEffect(() => {
    setMounted(true);
    
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.closest('button') || 
        target.closest('a') || 
        target.closest('input') || 
        target.closest('textarea') ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      setIsHovered(!!isInteractive);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] hidden lg:block">
      
      {/* Precision Crosshairs (Visible only on hover) */}
      <motion.div
        style={{ translateX: cursorX, translateY: cursorY, left: -20, top: -20 }}
        animate={{
          opacity: isHovered ? 0.4 : 0,
          rotate: isHovered ? 90 : 0,
          scale: isHovered ? 1 : 0.5,
        }}
        className="absolute w-10 h-10 flex items-center justify-center"
      >
        <div className="absolute w-[1px] h-full bg-brand-yellow" />
        <div className="absolute h-[1px] w-full bg-brand-yellow" />
      </motion.div>

      {/* Outer Targeting Ring */}
      <motion.div
        style={{
          translateX: outerX,
          translateY: outerY,
          left: -24,
          top: -24,
        }}
        animate={{
          scale: isHovered ? 1.5 : isClicked ? 0.8 : 1,
          opacity: isVisible ? 1 : 0,
          borderWidth: isHovered ? "1px" : "2px",
          borderColor: isHovered ? "#ffb800" : "rgba(255, 255, 255, 0.2)",
        }}
        className="h-12 w-12 rounded-full border border-dashed absolute flex items-center justify-center"
      >
        {/* Scanning Text Label */}
        <AnimatePresence>
          {isHovered && (
            <motion.span
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 40 }}
              exit={{ opacity: 0, x: 10 }}
              className="absolute whitespace-nowrap text-[8px] font-mono font-bold text-brand-yellow tracking-[0.3em] uppercase"
            >
              Target_Acquired
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Central Core Dot */}
      <motion.div
        style={{
          translateX: cursorX,
          translateY: cursorY,
          left: -3,
          top: -3,
        }}
        animate={{
          scale: isClicked ? 2 : 1,
          backgroundColor: isHovered ? "#ffb800" : "#ffffff",
        }}
        className="h-1.5 w-1.5 rounded-full absolute shadow-[0_0_15px_rgba(255,184,0,0.5)]"
      />

      {/* Velocity Particle (Trailing effect) */}
      <motion.div
        style={{ translateX: outerX, translateY: outerY, left: -1, top: -1 }}
        animate={{ opacity: isVisible ? 0.2 : 0 }}
        className="h-0.5 w-0.5 bg-brand-yellow rounded-full absolute"
      />
    </div>
  );
}