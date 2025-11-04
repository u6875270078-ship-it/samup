import { Card, CardContent } from "@/components/ui/card";

export default function Testimonial() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Card data-testid="card-testimonial">
          <CardContent className="p-8 lg:p-12">
            <div className="text-center space-y-6">
              <p className="text-2xl lg:text-3xl font-medium leading-relaxed" data-testid="text-testimonial-quote">
                "I added SumUp to my business and I see nothing but my business go up! It gives an easier way for people to pay me and check out."
              </p>
              <div className="pt-4">
                <p className="text-lg font-semibold" data-testid="text-testimonial-author">
                  Joe, owner of Netzel's Barbershop
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
