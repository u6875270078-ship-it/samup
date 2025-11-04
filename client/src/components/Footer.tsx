export default function Footer() {
  return (
    <footer className="border-t bg-muted/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-semibold mb-4">Products</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover-elevate px-2 py-1 rounded-md inline-block" data-testid="link-footer-card-readers">Card Readers</a></li>
              <li><a href="#" className="hover-elevate px-2 py-1 rounded-md inline-block" data-testid="link-footer-pos">Point of Sale</a></li>
              <li><a href="#" className="hover-elevate px-2 py-1 rounded-md inline-block" data-testid="link-footer-online-payments">Online Payments</a></li>
              <li><a href="#" className="hover-elevate px-2 py-1 rounded-md inline-block" data-testid="link-footer-invoices">Invoices</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Solutions</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover-elevate px-2 py-1 rounded-md inline-block" data-testid="link-footer-retail">Retail</a></li>
              <li><a href="#" className="hover-elevate px-2 py-1 rounded-md inline-block" data-testid="link-footer-restaurants">Restaurants</a></li>
              <li><a href="#" className="hover-elevate px-2 py-1 rounded-md inline-block" data-testid="link-footer-services">Services</a></li>
              <li><a href="#" className="hover-elevate px-2 py-1 rounded-md inline-block" data-testid="link-footer-enterprise">Enterprise</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover-elevate px-2 py-1 rounded-md inline-block" data-testid="link-footer-about">About Us</a></li>
              <li><a href="#" className="hover-elevate px-2 py-1 rounded-md inline-block" data-testid="link-footer-careers">Careers</a></li>
              <li><a href="#" className="hover-elevate px-2 py-1 rounded-md inline-block" data-testid="link-footer-press">Press</a></li>
              <li><a href="#" className="hover-elevate px-2 py-1 rounded-md inline-block" data-testid="link-footer-contact">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover-elevate px-2 py-1 rounded-md inline-block" data-testid="link-footer-help">Help Center</a></li>
              <li><a href="#" className="hover-elevate px-2 py-1 rounded-md inline-block" data-testid="link-footer-docs">Documentation</a></li>
              <li><a href="#" className="hover-elevate px-2 py-1 rounded-md inline-block" data-testid="link-footer-privacy">Privacy Policy</a></li>
              <li><a href="#" className="hover-elevate px-2 py-1 rounded-md inline-block" data-testid="link-footer-terms">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 SumUp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
