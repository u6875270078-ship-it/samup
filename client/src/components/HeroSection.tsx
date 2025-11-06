import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/contexts/LanguageContext";
import heroImage from "@assets/New_social_sharing_image_2024_1762422736248.jpg";
import cardReaderImage from "@assets/download_1762422736247.jpg";
import posImage from "@assets/Manage_business-3_1762422736248.png";
import onlinePaymentImage from "@assets/stock_images/online_payment_mobil_975d9e3b.jpg";

export default function HeroSection() {
  const { t } = useTranslation();
  
  return (
    <section id="hero" className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 opacity-5"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6" data-testid="text-hero-title">
            {t('hero_title')}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8" data-testid="text-hero-subtitle">
            {t('hero_subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" data-testid="button-get-started">
              {t('hero_get_started')}
            </Button>
            <Button size="lg" variant="outline" data-testid="button-learn-more">
              {t('hero_learn_more')}
            </Button>
          </div>
        </div>

        <div className="mt-16 mb-12">
          <Card className="overflow-hidden">
            <div className="w-full">
              <img 
                src={heroImage} 
                alt={t('hero_title')}
                className="w-full h-auto object-cover"
              />
            </div>
          </Card>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="hover-elevate rounded-md" data-testid="card-feature-card">
            <Card>
              <div className="aspect-video w-full overflow-hidden rounded-t-md bg-muted/20">
                <img 
                  src={cardReaderImage} 
                  alt={t('feature_card_readers_alt')}
                  className="w-full h-full object-contain p-4"
                />
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold mb-2">{t('feature_card_readers')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('feature_card_readers_desc')}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="hover-elevate rounded-md" data-testid="card-feature-pos">
            <Card>
              <div className="aspect-video w-full overflow-hidden rounded-t-md">
                <img 
                  src={posImage} 
                  alt={t('feature_pos_alt')}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold mb-2">{t('feature_pos')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('feature_pos_desc')}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="hover-elevate rounded-md" data-testid="card-feature-online">
            <Card>
              <div className="aspect-video w-full overflow-hidden rounded-t-md">
                <img 
                  src={onlinePaymentImage} 
                  alt={t('feature_online_alt')}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold mb-2">{t('feature_online')}</h3>
                <p className="text-sm text-muted-foreground">
                  {t('feature_online_desc')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
