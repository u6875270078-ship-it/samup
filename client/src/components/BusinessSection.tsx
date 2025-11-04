import { Card, CardContent } from "@/components/ui/card";
import { Coffee, ShoppingBag, Scissors, Utensils, Truck, Users } from "lucide-react";

export default function BusinessSection() {
  const businesses = [
    {
      icon: Coffee,
      name: "Cafes & Coffee Shops",
      description: "Fast payments for busy morning rushes"
    },
    {
      icon: ShoppingBag,
      name: "Retail Stores",
      description: "Complete inventory and payment solutions"
    },
    {
      icon: Scissors,
      name: "Salons & Spas",
      description: "Appointment booking and payment processing"
    },
    {
      icon: Utensils,
      name: "Restaurants",
      description: "Table service and quick checkout"
    },
    {
      icon: Truck,
      name: "Food Trucks",
      description: "Mobile payment solutions on the go"
    },
    {
      icon: Users,
      name: "Services",
      description: "Professional services and consulting"
    }
  ];

  return (
    <section id="business" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-business-title">
            Built for your business
          </h2>
          <p className="text-lg text-muted-foreground" data-testid="text-business-subtitle">
            Trusted by thousands of businesses across different industries
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {businesses.map((business) => (
            <Card 
              key={business.name} 
              className="hover-elevate"
              data-testid={`card-business-${business.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-md bg-primary/10 text-primary shrink-0">
                    <business.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{business.name}</h3>
                    <p className="text-sm text-muted-foreground">{business.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
