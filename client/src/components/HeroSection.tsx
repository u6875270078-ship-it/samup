import { Button } from "@/components/ui/button";
import heroImage from "@assets/generated_images/Hero_POS_system_display_48a911b3.png";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-accent/20">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl" data-testid="text-hero-title">
              Smart POS systems to grow your business
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl" data-testid="text-hero-subtitle">
              From taking payments and processing orders, to customer acquisition and managing your money–with SumUp, it's possible. 4 million businesses have already chosen us to be their partner, let's see how we can help you too.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="text-base" data-testid="button-hero-shop">
                Shop Now
              </Button>
              <Button size="lg" variant="outline" className="text-base" data-testid="button-hero-demo">
                Get a Demo
              </Button>
            </div>
            <p className="text-sm text-muted-foreground" data-testid="text-hero-support">
              Need support?{" "}
              <a href="#contact" className="text-primary hover:underline font-medium" data-testid="link-hero-contact">
                Contact Us.
              </a>
            </p>
          </div>

          <div className="relative" data-testid="img-hero">
            <img
              src={heroImage}
              alt="SumUp POS System"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
