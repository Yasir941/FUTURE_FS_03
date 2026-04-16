import { Suspense } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import HeroCarousel from "@/components/HeroCarousel";
import TopPicks from "@/components/TopPicks";
import MenuSection from "@/components/MenuSection";
import AboutTestimonials from "@/components/AboutTestimonials";
import GallerySection from "@/components/GallerySection";
import Footer from "@/components/Footer";

/**
 * Loading state to show while Next.js prepares components 
 * that rely on client-side search parameters.
 */
function UIPlaceholder() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-brand-yellow border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function Home() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-black">
        {/* Suspense is required here because child components use useSearchParams().
          This prevents the "missing-suspense-with-csr-bailout" error in Vercel.
        */}
        <Suspense fallback={<UIPlaceholder />}>
          <HeroCarousel />
          <TopPicks />
          <MenuSection />
          <AboutTestimonials />
          <GallerySection />
          <Footer />
        </Suspense>
      </main>
    </SmoothScroll>
  );
}