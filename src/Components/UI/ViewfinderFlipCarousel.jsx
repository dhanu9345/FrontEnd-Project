import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./ViewfinderFlipCarousel.css";

const items = [
  {
    title: "Kitchen Essentials",
    src: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=900",
  },
  {
    title: "Cookware Collection",
    src: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=900",
  },
  {
    title: "Modern Kitchen",
    src: "https://images.unsplash.com/photo-1556911261-6bd341186b2f?w=900",
  },
  {
    title: "Cooking Made Easy",
    src: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=900",
  },
];



export default function ViewfinderFlipCarousel() {
  const [active, setActive] = useState(0);

  const next = () =>
    setActive((prev) => (prev + 1) % items.length);

  const previous = () =>
    setActive((prev) => (prev - 1 + items.length) % items.length);

  useEffect(() => {
  const timer = setInterval(() => {
    setActive((prev) => (prev + 1) % items.length);
  }, 2000);

  return () => clearInterval(timer);
}, []);

return (
  <section className="cookora-hero">
    {/* Left side content */}
    <div className="cookora-hero-content">
      <span className="cookora-tag">THE ART OF COOKING</span>

      <h1>
        Make Your Kitchen
        <span> Beautiful</span>
      </h1>

      <p>
        Discover beautiful kitchen essentials and cookware
        designed to make every cooking moment special.
      </p>

      <button
        className="cookora-shop-btn"
        onClick={() => {
          window.location.href = "/cookora";
        }}
      >
        Explore Cookora →
      </button>
    </div>

    {/* Right side rotating images */}
    <div className="flip-stage">
      {items.map((item, index) => {
        const offset =
          (index - active + items.length) % items.length;

        const isActive = offset === 0;
        const isNext = offset === 1;
        const isPrevious = offset === items.length - 1;

        let x = 0;
        let rotateY = 0;
        let scale = 0.7;
        let opacity = 0;
        let zIndex = 0;

        if (isActive) {
          scale = 1;
          opacity = 1;
          zIndex = 3;
        } else if (isNext) {
          x = 125;
          rotateY = -35;
          scale = 0.78;
          opacity = 0.65;
          zIndex = 2;
        } else if (isPrevious) {
          x = -125;
          rotateY = 35;
          scale = 0.78;
          opacity = 0.65;
          zIndex = 2;
        }

        return (
          <motion.div
            key={item.title}
            className="flip-card"
            initial={false}
            animate={{ x, rotateY, scale, opacity, zIndex }}
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <img src={item.src} alt={item.title} />
          </motion.div>
        );
      })}
    </div>    
    </section>
  );
}