import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";

import "./CurtainSplitHero.css";

const IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
    alt: "TechNova Laptop",
  },
  {
    src: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500",
    alt: "Gaming Laptop",
  },
  {
    src: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500",
    alt: "Professional Laptop",
  },
  {
    src: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
    alt: "Business Laptop",
  },
  {
    src: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500",
    alt: "Gaming Series",
  },
  {
    src: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500",
    alt: "UltraBook",
  },
  {
    src: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
    alt: "TechNova Pro",
  },
  {
    src: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500",
    alt: "NextGen Laptop",
  },
];

const SPRING_CONFIG = {
  stiffness: 65,
  damping: 22,
  mass: 0.5,
};

function CurtainCard({
  item,
  index,
  total,
  progress,
  pointerX,
  pointerY,
  stage,
  isSpreadActive,
}) {
  const half = total / 2;
  const isLeft = index % 2 === 0;
  const wingIndex = Math.floor(index / 2);
  const norm = wingIndex / (half - 1) - 0.5;
  const side = isLeft ? -1 : 1;

  const cardWidth = stage.isMobile ? 75 : 105;
  const cardHeight = stage.isMobile ? 100 : 140;

  const targetX =
    side * (stage.width * (stage.isMobile ? 0.32 : 0.34));

  const targetY = norm * stage.height * 0.58;
  const targetRotate = side * norm * 18;

  const initialX = side * wingIndex * 4;
  const initialY = norm * 10;
  const initialRotate = side * wingIndex * 2;

  const translate = useTransform(
    [progress, pointerX, pointerY],
    ([p, px, py]) => {
      const ease = 1 - Math.pow(1 - p, 3);

      const x = initialX + (targetX - initialX) * ease;
      const y = initialY + (targetY - initialY) * ease;

      return `calc(-50% + ${
        x + px * (isLeft ? -12 : 12) * ease
      }px) calc(-50% + ${y + py * 10 * ease}px)`;
    }
  );

  const rotate = useTransform(
    progress,
    [0, 0.45, 1],
    [initialRotate, isLeft ? -14 : 14, targetRotate]
  );

  const scale = useTransform(progress, [0, 0.5, 1], [1, 0.96, 0.92]);

  return (
    <motion.div
      className="curtain-card"
      style={{
        width: cardWidth,
        height: cardHeight,
        translate,
        rotate,
        scale,
        zIndex: isLeft ? index + 1 : total - index,
      }}
      whileHover={
        isSpreadActive
          ? { scale: 1.08, rotate: 0, zIndex: 50 }
          : { scale: 0.98 }
      }
    >
      <img src={item.src} alt={item.alt} draggable="false" />
    </motion.div>
  );
}

export default function CurtainSplitHero() {
  const stageRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const [stage, setStage] = useState({
    width: 1000,
    height: 500,
    isMobile: false,
  });

  const rawProgress = useMotionValue(0);
  const progress = useSpring(rawProgress, SPRING_CONFIG);

  const [isSpreadActive, setIsSpreadActive] = useState(false);

  useMotionValueEvent(progress, "change", (value) => {
    setIsSpreadActive(value > 0.65);
  });

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const pointerX = useSpring(rawX, SPRING_CONFIG);
  const pointerY = useSpring(rawY, SPRING_CONFIG);

  useEffect(() => {
    const element = stageRef.current;
    if (!element) return;

    const updateSize = () => {
      const rect = element.getBoundingClientRect();

      setStage({
        width: rect.width,
        height: rect.height,
        isMobile: rect.width < 768,
      });
    };

    updateSize();

    const observer = new ResizeObserver(updateSize);
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const element = stageRef.current;
    if (!element) return;

    const handleWheel = (event) => {
      const current = rawProgress.get();

      if (
        (event.deltaY > 0 && current < 1) ||
        (event.deltaY < 0 && current > 0)
      ) {
        event.preventDefault();

        rawProgress.set(
          Math.max(
            0,
            Math.min(1, current + event.deltaY * 0.002)
          )
        );
      }
    };

    element.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    return () => {
      element.removeEventListener("wheel", handleWheel);
    };
  }, [rawProgress]);

  const handlePointerMove = (event) => {
    if (reduceMotion) return;

    const rect = event.currentTarget.getBoundingClientRect();

    rawX.set(((event.clientX - rect.left) / rect.width - 0.5) * 2);
    rawY.set(((event.clientY - rect.top) / rect.height - 0.5) * 2);
  };

  const handlePointerLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const toggleCurtain = () => {
    rawProgress.set(rawProgress.get() > 0.5 ? 0 : 1);
  };

  const textY = useTransform(progress, [0.25, 0.85], [30, 0]);
  const textOpacity = useTransform(progress, [0.3, 0.8], [0, 1]);
  const lineScale = useTransform(progress, [0.35, 0.85], [0, 1]);

  return (
    <section className="technova-curtain-section">
      <div
        className="technova-curtain-stage"
        ref={stageRef}
        onClick={toggleCurtain}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <div className="curtain-dot-pattern"></div>

        <motion.div
          className="curtain-center-text"
          style={{
            y: textY,
            opacity: textOpacity,
          }}
        >
          <span>THE NEXT GENERATION</span>

          <h1>
            TECH<span>NOVA.</span>
          </h1>

          <motion.div
            className="curtain-center-line"
            style={{ scaleX: lineScale }}
          />

          <p>Power Your Digital World.</p>

          <span className="curtain-subtitle">
            PERFORMANCE. INNOVATION. YOU.
          </span>
        </motion.div>

        <div className="curtain-cards-layer">
          {IMAGES.map((item, index) => (
            <CurtainCard
              key={`${item.alt}-${index}`}
              item={item}
              index={index}
              total={IMAGES.length}
              progress={progress}
              pointerX={pointerX}
              pointerY={pointerY}
              stage={stage}
              isSpreadActive={isSpreadActive}
            />
          ))}
        </div>

        <div className="curtain-status">
          <span
            className={
              isSpreadActive ? "curtain-status-dot active" : "curtain-status-dot"
            }
          />

          {isSpreadActive
            ? "Click to close curtain"
            : "Scroll or click to explore"}
        </div>
      </div>
    </section>
  );
}