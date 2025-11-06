import { useTranslation } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useTranslation();
  
  return (
    <footer className="border-t bg-muted/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-semibold mb-4">{t('footer_products')}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover-elevate px-2 py-1 rounded-md inline-block" data-testid="link-footer-card-readers">{t('footer_products_card_reader')}</a></li>
              <li><a href="#" className="hover-elevate px-2 py-1 rounded-md inline-block" data-testid="link-footer-pos">{t('footer_products_pos')}</a></li>
              <li><a href="#" className="hover-elevate px-2 py-1 rounded-md inline-block" data-testid="link-footer-online-payments">{t('footer_products_online')}</a></li>
              <li><a href="#" className="hover-elevate px-2 py-1 rounded-md inline-block" data-testid="link-footer-invoices">{t('footer_products_invoices')}</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">{t('nav_solutions')}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover-elevate px-2 py-1 rounded-md inline-block" data-testid="link-footer-retail">{t('footer_solutions_retail')}</a></li>
              <li><a href="#" className="hover-elevate px-2 py-1 rounded-md inline-block" data-testid="link-footer-restaurants">{t('footer_solutions_restaurants')}</a></li>
              <li><a href="#" className="hover-elevate px-2 py-1 rounded-md inline-block" data-testid="link-footer-services">{t('footer_solutions_services')}</a></li>
              <li><a href="#" className="hover-elevate px-2 py-1 rounded-md inline-block" data-testid="link-footer-enterprise">{t('footer_solutions_enterprise')}</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">{t('footer_company')}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover-elevate px-2 py-1 rounded-md inline-block" data-testid="link-footer-about">{t('footer_company_about')}</a></li>
              <li><a href="#" className="hover-elevate px-2 py-1 rounded-md inline-block" data-testid="link-footer-careers">{t('footer_company_careers')}</a></li>
              <li><a href="#" className="hover-elevate px-2 py-1 rounded-md inline-block" data-testid="link-footer-press">{t('footer_company_press')}</a></li>
              <li><a href="#" className="hover-elevate px-2 py-1 rounded-md inline-block" data-testid="link-footer-contact">{t('footer_company_contact')}</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">{t('footer_support')}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover-elevate px-2 py-1 rounded-md inline-block" data-testid="link-footer-help">{t('footer_support_help')}</a></li>
              <li><a href="#" className="hover-elevate px-2 py-1 rounded-md inline-block" data-testid="link-footer-docs">{t('footer_support_docs')}</a></li>
              <li><a href="#" className="hover-elevate px-2 py-1 rounded-md inline-block" data-testid="link-footer-privacy">{t('footer_privacy')}</a></li>
              <li><a href="#" className="hover-elevate px-2 py-1 rounded-md inline-block" data-testid="link-footer-terms">{t('footer_terms')}</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 SumUp. {t('footer_rights')}</p>
        </div>
      </div>
    </footer>
  );
}
