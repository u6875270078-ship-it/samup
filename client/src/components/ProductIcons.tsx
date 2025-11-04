import { CreditCard, Wallet, Monitor, FileText, Smartphone, Gift } from "lucide-react";

const products = [
  { name: "Point of Sale", icon: Monitor },
  { name: "SumUp Connect", icon: Gift },
  { name: "Kiosk", icon: Smartphone },
  { name: "Card Readers", icon: CreditCard },
  { name: "Business Account", icon: Wallet },
  { name: "Invoices", icon: FileText },
];

export default function ProductIcons() {
  return (
    <section className="py-16 lg:py-24 bg-accent/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" data-testid="text-icons-title">
            Explore more products SumUp has to offer
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {products.map((product, index) => {
            const Icon = product.icon;
            return (
              <a
                key={index}
                href="#"
                className="flex flex-col items-center gap-4 p-6 rounded-lg hover-elevate active-elevate-2 transition-all"
                data-testid={`link-icon-${index}`}
              >
                <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center" data-testid={`icon-wrapper-${index}`}>
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <span className="text-sm font-medium text-center" data-testid={`text-icon-${index}`}>
                  {product.name}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
