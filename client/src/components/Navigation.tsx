import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import sumupLogo from "@assets/stock_images/sumup_company_logo_o_dcaecabe.jpg";

export default function Navigation() {
  return (
    <nav className="border-b bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/">
            <a className="flex items-center gap-2" data-testid="link-home">
              <img src={sumupLogo} alt="SumUp" className="h-8 w-auto" />
            </a>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <a href="#hero" className="text-sm font-medium hover-elevate px-3 py-2 rounded-md" data-testid="link-products">
              Products
            </a>
            <a href="#pricing" className="text-sm font-medium hover-elevate px-3 py-2 rounded-md" data-testid="link-pricing">
              Pricing
            </a>
            <a href="#business" className="text-sm font-medium hover-elevate px-3 py-2 rounded-md" data-testid="link-business">
              For Business
            </a>
            <Link href="/login">
              <Button variant="default" size="sm" data-testid="button-login">
                Login
              </Button>
            </Link>
          </div>

          <div className="md:hidden">
            <Link href="/login">
              <Button variant="default" size="sm" data-testid="button-login-mobile">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
