import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import posImage from "@assets/generated_images/POS_business_tools_card_d7eafae0.png";
import kioskImage from "@assets/generated_images/Customer_engagement_kiosk_8666b6b2.png";
import rewardsImage from "@assets/generated_images/Rewards_payment_terminal_5c0d4483.png";
import financeImage from "@assets/generated_images/Manage_finances_card_reader_6be45aa8.png";
import paymentsImage from "@assets/generated_images/Take_payments_terminal_cd500bc7.png";

const products = [
  {
    title: "Run Your Business",
    description: "POS tools for your daily business needs",
    image: posImage,
  },
  {
    title: "Engage Customers",
    description: "Enhance your customers' experience",
    image: kioskImage,
  },
  {
    title: "Offer Rewards",
    description: "Incentivize regulars and one-time visitors",
    image: rewardsImage,
  },
  {
    title: "Manage Finances",
    description: "Spend, save, and manage your money",
    image: financeImage,
  },
  {
    title: "Take Payments",
    description: "Take card payments anywhere, anytime",
    image: paymentsImage,
  },
];

export default function ProductShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="products" className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4" data-testid="text-products-title">
            Choose products based on your needs
          </h2>
        </div>

        <div className="hidden lg:grid lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <Card key={index} className="overflow-hidden hover-elevate transition-all" data-testid={`card-product-${index}`}>
              <CardContent className="p-0">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-64 object-cover"
                  data-testid={`img-product-${index}`}
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2" data-testid={`text-product-title-${index}`}>
                    {product.title}
                  </h3>
                  <p className="text-muted-foreground" data-testid={`text-product-desc-${index}`}>
                    {product.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="lg:hidden relative">
          <Card className="overflow-hidden" data-testid="card-product-mobile">
            <CardContent className="p-0">
              <img
                src={products[currentIndex].image}
                alt={products[currentIndex].title}
                className="w-full h-64 object-cover"
                data-testid="img-product-mobile"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2" data-testid="text-product-mobile-title">
                  {products[currentIndex].title}
                </h3>
                <p className="text-muted-foreground" data-testid="text-product-mobile-desc">
                  {products[currentIndex].description}
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center justify-center gap-4 mt-6">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrevious}
              data-testid="button-product-prev"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-muted-foreground" data-testid="text-product-count">
              {currentIndex + 1} / {products.length}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              data-testid="button-product-next"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
