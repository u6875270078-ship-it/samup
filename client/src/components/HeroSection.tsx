import { Button } from "@/components/ui/button";
import { CreditCard, Smartphone, Store } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6" data-testid="text-hero-title">
            Accept card payments anywhere
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8" data-testid="text-hero-subtitle">
            Start accepting card payments with SumUp. Fast setup, transparent pricing, and tools to help your business grow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" data-testid="button-get-started">
              Get Started
            </Button>
            <Button size="lg" variant="outline" data-testid="button-learn-more">
              Learn More
            </Button>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6" data-testid="card-feature-card">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-md bg-primary/10 text-primary mb-4">
              <CreditCard className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Card Readers</h3>
            <p className="text-sm text-muted-foreground">
              Portable card readers that work with your smartphone or tablet
            </p>
          </div>

          <div className="text-center p-6" data-testid="card-feature-pos">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-md bg-primary/10 text-primary mb-4">
              <Store className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Point of Sale</h3>
            <p className="text-sm text-muted-foreground">
              Complete POS system for retail and hospitality businesses
            </p>
          </div>

          <div className="text-center p-6" data-testid="card-feature-online">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-md bg-primary/10 text-primary mb-4">
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Online Payments</h3>
            <p className="text-sm text-muted-foreground">
              Accept payments on your website and mobile app
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
