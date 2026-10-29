import "./BrandsEditorial.css";

const brands = [
  {
    name: "StyleAura",
    category: "FASHION & STYLE",
    title: "Wear Your\nOwn Story.",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=85",
    className: "fashion",
    link: "/styleaura",
  },
  {
    name: "Cookora",
    category: "KITCHEN ESSENTIALS",
    title: "Made for\nEveryday Living.",
    image:
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=85",
    className: "kitchen",
    link: "/cookora",
  },
  {
    name: "StrideX",
    category: "SNEAKERS & SHOES",
    title: "Move Beyond\nOrdinary.",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=85",
    className: "shoes",
    link: "/stridex",
  },
  {
    name: "TechNova",
    category: "TECHNOLOGY",
    title: "Your Next\nBig Idea.",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1000&q=85",
    className: "tech",
    link: "/technova",
  },
];

export default function BrandsEditorial() {
  return (
    <section className="editorial-section" id="brands">
      <div className="editorial-header">
        <div>
          <p className="editorial-label">THE WORLD OF SHOPPING</p>
          <h2>
            Four worlds.
            <br />
            <span>One destination.</span>
          </h2>
        </div>

        <p className="editorial-description">
          Discover thoughtfully selected styles, everyday essentials,
          standout footwear and technology made for modern living.
        </p>
      </div>

      <div className="editorial-grid">
        {brands.map((brand, index) => (
          <article
            className={`editorial-card ${brand.className}`}
            key={brand.name}
          >
            <img
              className="editorial-image"
              src={brand.image}
              alt={brand.name}
              loading="lazy"
            />

            <div className="editorial-overlay">
              <div className="editorial-card-top">
                <span>0{index + 1}</span>
                <span>{brand.category}</span>
              </div>

              <div className="editorial-card-bottom">
                <p className="editorial-brand">{brand.name}</p>

                <h3>{brand.title}</h3>

                <a className="editorial-link" href={brand.link}>
                  Explore collection <span>↗</span>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="editorial-footer">
        <span>STYLE · HOME · MOVEMENT · TECHNOLOGY</span>
        <span>FIND YOUR NEXT FAVOURITE.</span>
      </div>
    </section>
  );
}