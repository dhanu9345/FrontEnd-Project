import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import "./PerspectiveTunnelHero.css";

const images = [
  {
    src: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600",
    title: "UltraBook Pro",
  },
  {
    src: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600",
    title: "Gaming Laptop",
  },
  {
    src: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600",
    title: "TechNova Air",
  },
  {
    src: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600",
    title: "Laptop Pro",
  },
  {
    src: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600",
    title: "Gaming Series",
  },
  {
    src: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600",
    title: "NextGen Book",
  },
];

export default function PerspectiveTunnelHero() {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = (event) => {
      event.preventDefault();

      setProgress((previous) =>
        Math.max(0, Math.min(1, previous + event.deltaY * 0.0008))
      );
    };

    const element = containerRef.current;

    element?.addEventListener("wheel", handleScroll, {
      passive: false,
    });

    return () => {
      element?.removeEventListener("wheel", handleScroll);
    };
  }, []);

  const handleMouseMove = (event) => {
    if (reduceMotion) return;

    const rect = event.currentTarget.getBoundingClientRect();

    setPointer({
      x: (event.clientX - rect.left - rect.width / 2) / 20,
      y: (event.clientY - rect.top - rect.height / 2) / 20,
    });
  };

  const handleMouseLeave = () => {
    setPointer({ x: 0, y: 0 });
  };

  return (
    <section
      className="tech-tunnel"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="tunnel-grid"></div>

      <div className="tunnel-ring tunnel-ring-one"></div>
      <div className="tunnel-ring tunnel-ring-two"></div>

      <motion.div
        className="tunnel-heading"
        animate={{
          scale: 0.8 + progress * 0.5,
          opacity: 1 - progress * 0.3,
        }}
      >
        <p>POWER YOUR DIGITAL WORLD</p>
        <h1>
          TECH<span>NOVA.</span>
        </h1>
        <h3>THE FUTURE IS IN YOUR HANDS</h3>
      </motion.div>

      <div className="tunnel-cards">
        {images.map((item, index) => {
          const angle = (index / images.length) * Math.PI * 2;
          const distance = 100 + (index % 3) * 65;
          const depth = -500 + progress * 1100 + index * 65;

          return (
            <motion.div
              key={`${item.title}-${index}`}
              className="tunnel-card"
              animate={{
                x: Math.cos(angle) * distance + pointer.x,
                y: Math.sin(angle) * distance * 0.7 + pointer.y,
                z: depth,
                rotateZ: index % 2 === 0 ? -5 : 5,
                opacity:
                  depth < -400 || depth > 550
                    ? 0
                    : 1,
                scale: 0.7 + Math.max(0, depth) / 1200,
              }}
              transition={{
                type: "spring",
                stiffness: 55,
                damping: 20,
              }}
              style={{
                zIndex: index + 1,
              }}
            >
              <img src={item.src} alt={item.title} />
              <div className="tunnel-card-title">
                {item.title}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="tunnel-footer">
        <span>SCROLL TO EXPLORE</span>
        <span className="tunnel-arrow">↓</span>
      </div>

      <div className="tunnel-progress">
        <div
          style={{
            width: `${progress * 100}%`,
          }}
        ></div>
      </div>
    </section>
  );
}