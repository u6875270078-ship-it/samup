import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/contexts/LanguageContext";
import sumupLogo from "@assets/1_1762300078908.png";

export default function Navigation() {
  const { t } = useTranslation();
  
  return (
    <nav className="border-b bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2" data-testid="link-home">
            <img src={sumupLogo} alt="SumUp" className="h-8 w-auto" />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a href="#hero" className="text-sm font-medium hover-elevate px-3 py-2 rounded-md" data-testid="link-products">
              {t('nav_solutions')}
            </a>
            <a href="#pricing" className="text-sm font-medium hover-elevate px-3 py-2 rounded-md" data-testid="link-pricing">
              {t('nav_pricing')}
            </a>
            <a href="#business" className="text-sm font-medium hover-elevate px-3 py-2 rounded-md" data-testid="link-business">
              {t('nav_business')}
            </a>
            <Link href="/login">
              <Button variant="default" size="sm" data-testid="button-login">
                {t('nav_login')}
              </Button>
            </Link>
          </div>

          <div className="md:hidden">
            <Link href="/login">
              <Button variant="default" size="sm" data-testid="button-login-mobile">
                {t('nav_login')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
