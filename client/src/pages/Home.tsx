import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ProductShowcase from "@/components/ProductShowcase";
import PricingSection from "@/components/PricingSection";
import CheckoutExperience from "@/components/CheckoutExperience";
import BusinessTypes from "@/components/BusinessTypes";
import Testimonial from "@/components/Testimonial";
import ProductIcons from "@/components/ProductIcons";
import AppDownload from "@/components/AppDownload";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <ProductShowcase />
        <PricingSection />
        <CheckoutExperience />
        <BusinessTypes />
        <Testimonial />
        <ProductIcons />
        <AppDownload />
      </main>
      <Footer />
    </div>
  );
}
