import SmoothScroll from "@/components/SmoothScroll";
import HeroCarousel from "@/components/HeroCarousel";
import TopPicks from "@/components/TopPicks";
import MenuSection from "@/components/MenuSection";
import AboutTestimonials from "@/components/AboutTestimonials";
import GallerySection from "@/components/GallerySection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-black">
        <HeroCarousel />
        <TopPicks />
        <MenuSection />
        <AboutTestimonials />
        <GallerySection />
        <Footer />
      </main>
    </SmoothScroll>
  );
}

