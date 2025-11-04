import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import heroImage from "@assets/stock_images/business_owner_using_84bfa1b6.jpg";
import cardReaderImage from "@assets/stock_images/business_owner_using_84bfa1b6.jpg";
import posImage from "@assets/stock_images/modern_pos_point_of__09a8df66.jpg";
import onlinePaymentImage from "@assets/stock_images/online_shopping_paym_5c8b8986.jpg";

export default function HeroSection() {
  return (
    <section id="hero" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 opacity-5"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
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
          <Card className="overflow-hidden hover-elevate" data-testid="card-feature-card">
            <div className="aspect-video w-full overflow-hidden">
              <img 
                src={cardReaderImage} 
                alt="Card Readers" 
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold mb-2">Card Readers</h3>
              <p className="text-sm text-muted-foreground">
                Portable card readers that work with your smartphone or tablet
              </p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden hover-elevate" data-testid="card-feature-pos">
            <div className="aspect-video w-full overflow-hidden">
              <img 
                src={posImage} 
                alt="Point of Sale" 
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold mb-2">Point of Sale</h3>
              <p className="text-sm text-muted-foreground">
                Complete POS system for retail and hospitality businesses
              </p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden hover-elevate" data-testid="card-feature-online">
            <div className="aspect-video w-full overflow-hidden">
              <img 
                src={onlinePaymentImage} 
                alt="Online Payments" 
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold mb-2">Online Payments</h3>
              <p className="text-sm text-muted-foreground">
                Accept payments on your website and mobile app
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
