import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function PricingSection() {
  const plans = [
    {
      name: "Solo",
      price: "1.69%",
      description: "Perfect for small businesses and freelancers",
      features: [
        "Card reader included",
        "Next-day payouts",
        "Accept all major cards",
        "No monthly fees",
        "24/7 support"
      ]
    },
    {
      name: "Total",
      price: "2.50%",
      description: "Complete business solution",
      features: [
        "Everything in Solo",
        "Point of Sale system",
        "Invoicing tools",
        "Customer loyalty program",
        "Advanced analytics",
        "Priority support"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large businesses",
      features: [
        "Everything in Total",
        "Custom pricing",
        "Dedicated account manager",
        "API integration",
        "Custom solutions",
        "SLA guarantee"
      ]
    }
  ];

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-pricing-title">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-muted-foreground" data-testid="text-pricing-subtitle">
            No hidden fees. No long-term contracts. Just straightforward pricing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card 
              key={plan.name} 
              className={plan.popular ? "border-primary shadow-lg" : ""}
              data-testid={`card-pricing-${plan.name.toLowerCase()}`}
            >
              <CardHeader>
                {plan.popular && (
                  <div className="inline-block px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold mb-2 w-fit">
                    Most Popular
                  </div>
                )}
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-muted-foreground"> per transaction</span>}
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full" 
                  variant={plan.popular ? "default" : "outline"}
                  data-testid={`button-choose-${plan.name.toLowerCase()}`}
                >
                  Choose {plan.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
