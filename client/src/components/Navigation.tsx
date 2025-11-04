import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
        <div className="flex items-center gap-8">
          <a href="#" className="text-2xl font-bold text-primary" data-testid="link-logo">
            SumUp
          </a>
          <div className="hidden lg:flex lg:gap-6">
            <a href="#products" className="text-sm font-medium hover-elevate rounded-md px-3 py-2" data-testid="link-products">
              Products
            </a>
            <a href="#pricing" className="text-sm font-medium hover-elevate rounded-md px-3 py-2" data-testid="link-pricing">
              Pricing
            </a>
            <a href="#business-types" className="text-sm font-medium hover-elevate rounded-md px-3 py-2" data-testid="link-business">
              Business Types
            </a>
            <a href="#support" className="text-sm font-medium hover-elevate rounded-md px-3 py-2" data-testid="link-support">
              Support
            </a>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden lg:flex lg:gap-3">
            <Button variant="ghost" data-testid="button-login">
              Log in
            </Button>
            <Button variant="default" data-testid="button-shop">
              Shop Now
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t" data-testid="menu-mobile">
          <div className="space-y-1 px-4 py-4">
            <a href="#products" className="block px-3 py-2 text-base font-medium hover-elevate rounded-md" data-testid="link-mobile-products">
              Products
            </a>
            <a href="#pricing" className="block px-3 py-2 text-base font-medium hover-elevate rounded-md" data-testid="link-mobile-pricing">
              Pricing
            </a>
            <a href="#business-types" className="block px-3 py-2 text-base font-medium hover-elevate rounded-md" data-testid="link-mobile-business">
              Business Types
            </a>
            <a href="#support" className="block px-3 py-2 text-base font-medium hover-elevate rounded-md" data-testid="link-mobile-support">
              Support
            </a>
            <div className="flex flex-col gap-2 pt-4">
              <Button variant="ghost" className="w-full justify-center" data-testid="button-mobile-login">
                Log in
              </Button>
              <Button variant="default" className="w-full justify-center" data-testid="button-mobile-shop">
                Shop Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
