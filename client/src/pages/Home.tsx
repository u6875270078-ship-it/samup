import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import PricingSection from "@/components/PricingSection";
import BusinessSection from "@/components/BusinessSection";
import PromoBanner from "@/components/PromoBanner";
import Footer from "@/components/Footer";
import { apiRequest } from "@/lib/queryClient";

export default function Home() {
  useEffect(() => {
    // Track visitor when page loads
    apiRequest("POST", "/api/track-visit", { page: "Homepage" }).catch(() => {
      // Silent fail - tracking shouldn't break the app
    });
  }, []);

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
