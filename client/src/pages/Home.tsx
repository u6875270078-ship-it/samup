import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import PricingSection from "@/components/PricingSection";
import BusinessSection from "@/components/BusinessSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <HeroSection />
        <BusinessSection />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}
