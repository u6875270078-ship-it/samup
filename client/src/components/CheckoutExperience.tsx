import checkoutImage from "@assets/generated_images/Seamless_checkout_experience_d5896cda.png";

export default function CheckoutExperience() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" data-testid="text-checkout-title">
            A Seamless Checkout Experience
          </h2>
        </div>

        <div className="rounded-lg overflow-hidden" data-testid="img-checkout">
          <img
            src={checkoutImage}
            alt="Seamless checkout experience with POS system and customer interaction"
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
}
