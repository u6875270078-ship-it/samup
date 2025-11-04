import bannerImage from "@assets/image_1762299745903.png";

export default function PromoBanner() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-lg overflow-hidden">
          <img 
            src={bannerImage}
            alt="Promotional Banner"
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
