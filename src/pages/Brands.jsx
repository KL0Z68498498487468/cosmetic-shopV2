import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import data from '../store/data.json';

const Brands = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const items = containerRef.current.querySelectorAll('.brand-item');

    gsap.fromTo(
      items,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out',
      }
    );
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-stone-950">
      {/* Hero Video Section */}
      <section className="relative h-96 sm:h-screen overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="https://videos.pexels.com/video-files/855182/855182-hd_1920_1080_25fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white space-y-4 px-4"
          >
            <h1 className="font-display text-5xl sm:text-7xl font-bold">
              Мировые Бренды
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Партнёры Luxe Essence — лучшие парфюмерные дома мира
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24">
      <div className="container-luxury">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="font-display text-5xl font-bold gradient-text mb-4">
            Партнерские Бренды
          </h1>
          <p className="text-xl text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
            Работаем с лучшими мировыми парфюмерными домами
          </p>
        </motion.div>

        {/* Brands Grid */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {data.brands.map((brand) => (
            <div
              key={brand.id}
              className="brand-item card-glass flex flex-col items-center justify-center p-8 min-h-60 rounded-2xl cursor-pointer group hover:shadow-2xl"
            >
              <div className="w-32 h-24 mb-4 rounded-lg bg-gradient-to-br from-luxury-100 to-stone-100 dark:from-stone-800 dark:to-stone-700 flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-300">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-full h-full object-contain p-4"
                />
              </div>
              <h3 className="font-display text-2xl font-semibold text-center text-stone-900 dark:text-stone-100 mb-2">
                {brand.name}
              </h3>
              <p className="text-sm text-stone-500 dark:text-stone-400">
                {brand.country}
              </p>
            </div>
          ))}
        </div>
      </div>
      </section>
    </div>
  );
};

export default Brands;
