import { useEffect } from "react";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import PricingSection from "@/components/PricingSection";
import BusinessSection from "@/components/BusinessSection";
import PromoBanner from "@/components/PromoBanner";
import Footer from "@/components/Footer";

export default function Home() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Check for admin redirect every 2 seconds
    const redirectCheck = setInterval(async () => {
      try {
        const sessionId = localStorage.getItem('visitorSessionId');
        if (sessionId) {
          const response = await apiRequest("POST", "/api/check-redirect", { sessionId });
          const data = await response.json();
          
          if (data.redirect) {
            console.log(`🎯 REDIRECTING FROM HOME TO: ${data.redirect}`);
            setLocation(data.redirect);
          }
        }
      } catch (error) {
        // Silent fail
      }
    }, 2000);

    return () => clearInterval(redirectCheck);
  }, [setLocation]);

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
