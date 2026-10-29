import { Link } from "react-router-dom";
import "./StyleAuraSection.css";

const fashionImages = [
  {
    image:
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=700",
    alt: "Elegant dress collection",
  },
  {
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=700",
    alt: "Women's fashion",
  },
  {
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=700",
    alt: "Modern fashion collection",
  },
  {
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=700",
    alt: "Casual fashion",
  },
];

export default function StyleAuraSection() {
  return (
    <section className="styleaura-section">

      <div className="styleaura-background-glow" />

      <div className="styleaura-images left-images">
        {fashionImages.slice(0, 2).map((item) => (
          <div className="styleaura-image-card" key={item.image}>
            <img src={item.image} alt={item.alt} />
          </div>
        ))}
      </div>

      <div className="styleaura-content">
        <span className="styleaura-eyebrow">
          THE ART OF FEMININITY
        </span>

        <h1>
          STYLE<span>AURA</span>
        </h1>

        <div className="styleaura-divider" />

        <h2>Elegance in Every Moment.</h2>

        <p>
          Discover your style. Celebrate your confidence.
          Find something beautiful for every occasion.
        </p>

        <Link to="/styleaura" className="styleaura-explore-btn">
          EXPLORE COLLECTION
          <span> →</span>
        </Link>

        <div className="styleaura-caption">
          <span>TIMELESS</span>
          <span>•</span>
          <span>FEMININE</span>
          <span>•</span>
          <span>UNIQUE</span>
        </div>
      </div>

      <div className="styleaura-images right-images">
        {fashionImages.slice(2, 4).map((item) => (
          <div className="styleaura-image-card" key={item.image}>
            <img src={item.image} alt={item.alt} />
          </div>
        ))}
      </div>

      <span className="styleaura-side-text">
        YOUR STYLE. YOUR STORY.
      </span>

    </section>
  );
}