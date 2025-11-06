import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/contexts/LanguageContext";
import cafeImage from "@assets/stock_images/cafe_coffee_shop_bar_040baf63.jpg";
import retailImage from "@assets/stock_images/retail_store_clothin_4830d1c9.jpg";
import salonImage from "@assets/stock_images/hair_salon_spa_profe_eb34fbe7.jpg";
import restaurantImage from "@assets/stock_images/restaurant_dining_cu_2d84675f.jpg";
import foodTruckImage from "@assets/stock_images/food_truck_street_ve_2cb1d16c.jpg";
import servicesImage from "@assets/stock_images/professional_service_8d51a6bc.jpg";

export default function BusinessSection() {
  const { t } = useTranslation();
  
  const businesses = [
    {
      image: cafeImage,
      name: t('business_cafe'),
      description: t('business_cafe_desc')
    },
    {
      image: retailImage,
      name: t('business_retail'),
      description: t('business_retail_desc')
    },
    {
      image: salonImage,
      name: t('business_salon'),
      description: t('business_salon_desc')
    },
    {
      image: restaurantImage,
      name: t('business_restaurant'),
      description: t('business_restaurant_desc')
    },
    {
      image: foodTruckImage,
      name: t('business_food_truck'),
      description: t('business_food_truck_desc')
    },
    {
      image: servicesImage,
      name: t('business_services'),
      description: t('business_services_desc')
    }
  ];

  return (
    <section id="business" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-business-title">
            {t('business_title')}
          </h2>
          <p className="text-lg text-muted-foreground" data-testid="text-business-subtitle">
            {t('business_subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {businesses.map((business) => (
            <div 
              key={business.name}
              className="hover-elevate rounded-md"
              data-testid={`card-business-${business.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <Card>
                <div className="aspect-[4/3] w-full overflow-hidden rounded-t-md">
                  <img 
                    src={business.image} 
                    alt={business.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 text-lg">{business.name}</h3>
                  <p className="text-sm text-muted-foreground">{business.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
