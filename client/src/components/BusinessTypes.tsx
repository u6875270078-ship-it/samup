import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import fastCasualImage from "@assets/generated_images/Fast_casual_business_524575b1.png";
import barberImage from "@assets/generated_images/Barber_shop_business_4a80bf1d.png";
import coffeeImage from "@assets/generated_images/Coffee_and_tea_business_7dcfa0bf.png";
import nailSalonImage from "@assets/generated_images/Nail_salon_business_d5996432.png";
import boutiqueImage from "@assets/generated_images/Boutique_clothing_business_8e9ddecb.png";
import petStoreImage from "@assets/generated_images/Pet_store_business_7c946728.png";
import bakeryImage from "@assets/generated_images/Dessert_bakery_business_08d149dc.png";
import homeGoodsImage from "@assets/generated_images/Home_goods_business_f7a0502a.png";
import enterpriseImage from "@assets/generated_images/Enterprise_business_venue_170549b8.png";

const businessTypes = [
  { name: "Fast Casual", image: fastCasualImage },
  { name: "Barber Shop", image: barberImage },
  { name: "Coffee & Tea", image: coffeeImage },
  { name: "Nail Salon", image: nailSalonImage },
  { name: "Boutique", image: boutiqueImage },
  { name: "Pet Store", image: petStoreImage },
  { name: "Dessert & Bakery", image: bakeryImage },
  { name: "Home Goods", image: homeGoodsImage },
  { name: "Enterprise", image: enterpriseImage },
];

export default function BusinessTypes() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? businessTypes.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === businessTypes.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="business-types" className="py-16 lg:py-24 bg-accent/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4" data-testid="text-business-title">
            Tools for every type of business
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto" data-testid="text-business-subtitle">
            From coffee shops to clothing boutiques, SumUp has the tools you need to take payments, run your business, and grow your customer base.
          </p>
        </div>

        <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {businessTypes.map((business, index) => (
            <Card
              key={index}
              className="relative overflow-hidden group hover-elevate transition-all aspect-square"
              data-testid={`card-business-${index}`}
            >
              <img
                src={business.image}
                alt={business.name}
                className="w-full h-full object-cover"
                data-testid={`img-business-${index}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <h3 className="text-white text-xl font-bold" data-testid={`text-business-${index}`}>
                  {business.name}
                </h3>
              </div>
            </Card>
          ))}
        </div>

        <div className="md:hidden">
          <Card className="relative overflow-hidden aspect-square" data-testid="card-business-mobile">
            <img
              src={businessTypes[currentIndex].image}
              alt={businessTypes[currentIndex].name}
              className="w-full h-full object-cover"
              data-testid="img-business-mobile"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
              <h3 className="text-white text-xl font-bold" data-testid="text-business-mobile">
                {businessTypes[currentIndex].name}
              </h3>
            </div>
          </Card>

          <div className="flex items-center justify-center gap-4 mt-6">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrevious}
              data-testid="button-business-prev"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-muted-foreground" data-testid="text-business-count">
              {currentIndex + 1} / {businessTypes.length}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              data-testid="button-business-next"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
