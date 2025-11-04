import { Button } from "@/components/ui/button";
import { Apple, Smartphone } from "lucide-react";
import appImage from "@assets/generated_images/SumUp_mobile_app_e8fea734.png";

export default function AppDownload() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <img
              src={appImage}
              alt="SumUp Mobile App"
              className="w-full max-w-sm mx-auto lg:mx-0"
              data-testid="img-app"
            />
          </div>

          <div className="order-1 lg:order-2 space-y-6">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" data-testid="text-app-title">
              One app, countless possibilities
            </h2>
            <p className="text-lg text-muted-foreground" data-testid="text-app-subtitle">
              Simply download the free SumUp App from the Apple App Store or Google Play for instant access to our business solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" size="lg" className="gap-2" data-testid="button-app-apple">
                <Apple className="h-5 w-5" />
                Download for Apple
              </Button>
              <Button variant="outline" size="lg" className="gap-2" data-testid="button-app-android">
                <Smartphone className="h-5 w-5" />
                Download for Android
              </Button>
            </div>
            <div className="pt-4">
              <Button size="lg" data-testid="button-app-signup">
                Sign up
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-24 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" data-testid="text-customer-title">
              Customers can discover rewards
            </h2>
            <p className="text-lg text-muted-foreground" data-testid="text-customer-subtitle">
              Customers can discover your business through the Fivestars App and access savings and rewards right from their phone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="outline" size="lg" className="gap-2" data-testid="button-customer-apple">
                <Apple className="h-5 w-5" />
                Download for Apple
              </Button>
              <Button variant="outline" size="lg" className="gap-2" data-testid="button-customer-android">
                <Smartphone className="h-5 w-5" />
                Download for Android
              </Button>
            </div>
          </div>

          <div>
            <img
              src={appImage}
              alt="Customer App"
              className="w-full max-w-sm mx-auto lg:mx-0"
              data-testid="img-customer-app"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
