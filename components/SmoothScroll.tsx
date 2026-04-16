"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Lenis from 'lenis';
import { usePathname, useSearchParams } from "next/navigation";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 1. Initialize Lenis
  useLayoutEffect(() => {
    const lenis = new Lenis({
      duration: 1.4, // Slightly slower for a more "luxurious" cinematic feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.1, // Better response on trackpads
      touchMultiplier: 1.5,
      lerp: 0.05, // Linear interpolation for extra silkiness
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // 2. Reset scroll to top on route change
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [pathname, searchParams]);

  return <>{children}</>;
}