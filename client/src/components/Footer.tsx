export default function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-6">
          <div>
            <h3 className="text-sm font-semibold mb-4" data-testid="text-footer-products">Products</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground hover-elevate rounded px-2 py-1" data-testid="link-footer-pos">POS Systems</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground hover-elevate rounded px-2 py-1" data-testid="link-footer-readers">Card Readers</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground hover-elevate rounded px-2 py-1" data-testid="link-footer-kiosk">Kiosk</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground hover-elevate rounded px-2 py-1" data-testid="link-footer-banking">Banking</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4" data-testid="text-footer-solutions">Solutions</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground hover-elevate rounded px-2 py-1" data-testid="link-footer-retail">Retail</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground hover-elevate rounded px-2 py-1" data-testid="link-footer-food">Food & Beverage</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground hover-elevate rounded px-2 py-1" data-testid="link-footer-services">Services</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground hover-elevate rounded px-2 py-1" data-testid="link-footer-enterprise">Enterprise</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4" data-testid="text-footer-company">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground hover-elevate rounded px-2 py-1" data-testid="link-footer-about">About Us</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground hover-elevate rounded px-2 py-1" data-testid="link-footer-careers">Careers</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground hover-elevate rounded px-2 py-1" data-testid="link-footer-press">Press</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground hover-elevate rounded px-2 py-1" data-testid="link-footer-blog">Blog</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4" data-testid="text-footer-support">Support</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground hover-elevate rounded px-2 py-1" data-testid="link-footer-help">Help Center</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground hover-elevate rounded px-2 py-1" data-testid="link-footer-contact">Contact Us</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground hover-elevate rounded px-2 py-1" data-testid="link-footer-status">System Status</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground hover-elevate rounded px-2 py-1" data-testid="link-footer-community">Community</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4" data-testid="text-footer-resources">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground hover-elevate rounded px-2 py-1" data-testid="link-footer-guides">Guides</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground hover-elevate rounded px-2 py-1" data-testid="link-footer-api">API Docs</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground hover-elevate rounded px-2 py-1" data-testid="link-footer-partners">Partners</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground hover-elevate rounded px-2 py-1" data-testid="link-footer-referrals">Referrals</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4" data-testid="text-footer-legal">Legal</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground hover-elevate rounded px-2 py-1" data-testid="link-footer-privacy">Privacy</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground hover-elevate rounded px-2 py-1" data-testid="link-footer-terms">Terms</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground hover-elevate rounded px-2 py-1" data-testid="link-footer-security">Security</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground hover-elevate rounded px-2 py-1" data-testid="link-footer-compliance">Compliance</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-8">
          <p className="text-xs text-muted-foreground leading-relaxed" data-testid="text-footer-disclaimer">
            *SumUp is a financial technology company, not a bank. Banking services are provided by Piermont Bank, Member FDIC.
            <br />
            Conditions and exceptions apply. The SumUp Mastercard® Debit Card is issued by Piermont Bank, Member FDIC, pursuant to license by Mastercard International Incorporated.
            <br />
            Next-day payouts are only available when used alongside your SumUp merchant account.
          </p>
          <p className="text-xs text-muted-foreground mt-6" data-testid="text-footer-copyright">
            © 2024 SumUp. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
