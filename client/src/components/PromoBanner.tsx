export default function PromoBanner() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-lg overflow-hidden">
          <img 
            src="https://images.ctfassets.net/txhaodyqr481/3xYPPJkQza8MZqmjFm3CqX/5c7b4cfafb407cdd24a52cebb1e2036a/IT_Black-friday_October_Desktop-banner.png?fm=avif&q=85&w=2000&h=592"
            alt="Black Friday Promotion"
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
