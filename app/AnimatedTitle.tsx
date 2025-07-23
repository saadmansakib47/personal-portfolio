import { motion } from "framer-motion" ;
import { useState, useEffect, useRef } from "react";
function AnimatedTitle({ text }: { text: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <h2
      ref={ref}
      className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight font-oswald flex justify-center space-x-1"
    >
      {text.split("").map((char, idx) => (
        <motion.span
          key={idx}
          initial={{ x: idx % 2 === 0 ? -50 : 50, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : {}}
          transition={{ delay: idx * 0.1, duration: 0.5 }}
          className="inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </h2>
  );
}

export default AnimatedTitle;