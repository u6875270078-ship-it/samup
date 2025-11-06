import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import PricingSection from "@/components/PricingSection";
import BusinessSection from "@/components/BusinessSection";
import PromoBanner from "@/components/PromoBanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <HeroSection />
        <BusinessSection />
        <PromoBanner />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}
