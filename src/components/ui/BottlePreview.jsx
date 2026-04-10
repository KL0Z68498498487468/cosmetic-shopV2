import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const BottlePreview = ({ image }) => {
  const containerRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientY - rect.top) / rect.height * 30 - 15;
      const y = (e.clientX - rect.left) / rect.width * 30 - 15;

      setRotation({ x, y });
    };

    const handleMouseLeave = () => {
      setRotation({ x: 0, y: 0 });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-square flex items-center justify-center rounded-3xl overflow-hidden bg-gradient-to-br from-luxury-50 via-white to-luxury-100 dark:from-stone-800 dark:via-stone-900 dark:to-stone-800 perspective"
    >
      {/* Background Light Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/2 w-96 h-96 bg-luxury-300 rounded-full blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-luxury-200 rounded-full blur-3xl opacity-20" />
      </div>

      {/* Bottle Container */}
      <motion.div
        animate={{
          rotateX: rotation.x,
          rotateY: rotation.y,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        style={{
          transformStyle: 'preserve-3d',
          perspective: 1000,
        }}
        className="relative z-10"
      >
        <img
          src={image}
          alt="Bottle Preview"
          className="w-64 h-96 object-contain filter drop-shadow-2xl"
          style={{
            filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.3))',
          }}
        />
      </motion.div>

      {/* Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 opacity-0 hover:opacity-50 transition-opacity duration-500 pointer-events-none" />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-luxury-400 rounded-full opacity-50"
            animate={{
              y: [0, -20, 0],
              x: [0, Math.sin(i * Math.PI / 2.5) * 20, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              delay: i * 0.2,
            }}
            style={{
              left: `${20 + i * 15}%`,
              top: `${50 + (i % 2) * 30}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default BottlePreview;
