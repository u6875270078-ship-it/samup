import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PricingSection() {
  return (
    <section id="pricing" className="py-16 lg:py-24 bg-accent/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4" data-testid="text-pricing-title">
            Transparent pricing at its best
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto" data-testid="text-pricing-subtitle">
            Our pricing is designed to work for you. We'll never charge you admin costs or annual renewal fees–and there's no minimum amount you need to process each month.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          <Card data-testid="card-pricing-in-person">
            <CardHeader className="text-center pb-8">
              <CardDescription className="text-base font-medium" data-testid="text-pricing-type-1">
                In-person transactions
              </CardDescription>
              <CardTitle className="text-5xl font-bold mt-4" data-testid="text-pricing-rate-1">
                2.6% + 10¢
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-2" data-testid="text-pricing-desc-1">
                When card is present
              </p>
            </CardHeader>
          </Card>

          <Card data-testid="card-pricing-online">
            <CardHeader className="text-center pb-8">
              <CardDescription className="text-base font-medium" data-testid="text-pricing-type-2">
                Online & Manual Entry
              </CardDescription>
              <CardTitle className="text-5xl font-bold mt-4" data-testid="text-pricing-rate-2">
                3.5% + 15¢
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-2" data-testid="text-pricing-desc-2">
                Online transactions and when card is not present
              </p>
            </CardHeader>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" data-testid="button-pricing-shop">
            Shop Now
          </Button>
          <Button size="lg" variant="outline" data-testid="button-pricing-demo">
            Get a Demo
          </Button>
        </div>
      </div>
    </section>
  );
}
