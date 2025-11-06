import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useTranslation } from "@/contexts/LanguageContext";

export default function PricingSection() {
  const { t } = useTranslation();
  
  const plans = [
    {
      id: "solo",
      name: t('pricing_solo_name'),
      price: t('pricing_solo_price'),
      description: t('pricing_solo_desc'),
      features: [
        t('pricing_solo_feature1'),
        t('pricing_solo_feature2'),
        t('pricing_solo_feature3'),
        t('pricing_solo_feature4'),
        t('pricing_solo_feature5')
      ]
    },
    {
      id: "total",
      name: t('pricing_total_name'),
      price: t('pricing_total_price'),
      description: t('pricing_total_desc'),
      features: [
        t('pricing_total_feature1'),
        t('pricing_total_feature2'),
        t('pricing_total_feature3'),
        t('pricing_total_feature4'),
        t('pricing_total_feature5'),
        t('pricing_total_feature6')
      ],
      popular: true
    },
    {
      id: "enterprise",
      name: t('pricing_enterprise_name'),
      price: t('pricing_enterprise_price'),
      description: t('pricing_enterprise_desc'),
      features: [
        t('pricing_enterprise_feature1'),
        t('pricing_enterprise_feature2'),
        t('pricing_enterprise_feature3'),
        t('pricing_enterprise_feature4'),
        t('pricing_enterprise_feature5'),
        t('pricing_enterprise_feature6')
      ]
    }
  ];

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-pricing-title">
            {t('pricing_title')}
          </h2>
          <p className="text-lg text-muted-foreground" data-testid="text-pricing-subtitle">
            {t('pricing_subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card 
              key={plan.id} 
              className={plan.popular ? "border-primary shadow-lg" : ""}
              data-testid={`card-pricing-${plan.id}`}
            >
              <CardHeader>
                {plan.popular && (
                  <div className="inline-block px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold mb-2 w-fit">
                    {t('pricing_most_popular')}
                  </div>
                )}
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.price !== t('pricing_custom') && <span className="text-muted-foreground"> {t('pricing_per_transaction')}</span>}
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full" 
                  variant={plan.popular ? "default" : "outline"}
                  data-testid={`button-choose-${plan.id}`}
                >
                  {t('pricing_choose')} {plan.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
