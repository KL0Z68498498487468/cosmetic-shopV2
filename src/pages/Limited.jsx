import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';
import data from '../store/data.json';

const Limited = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const endDate = new Date('2026-04-15T23:59:59').getTime();
      const now = new Date().getTime();
      const distance = endDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const limitedProducts = data.products;

  return (
    <div className="min-h-screen bg-white dark:bg-stone-950">
      {/* Hero */}
      <section className="bg-gradient-to-br from-luxury-200 via-amber-100 to-stone-100 dark:from-stone-800 dark:via-stone-900 dark:to-stone-950 py-24 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 w-72 h-72 bg-luxury-300 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-luxury-200 rounded-full blur-3xl" />
        </div>

        <div className="container-luxury relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6 mb-12"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="inline-flex items-center justify-center"
            >
              <Clock className="w-10 h-10 text-luxury-600 dark:text-luxury-400" />
            </motion.div>

            <h1 className="font-display text-5xl sm:text-6xl font-bold gradient-text">
              Лимитированные Коллекции
            </h1>
            <p className="text-xl text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
              Эксклюзивные ароматы, доступные только на время. Спешите, количество товара ограничено!
            </p>
          </motion.div>

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            {[
              { label: 'ДНЕЙ', value: timeLeft.days },
              { label: 'ЧАСОВ', value: timeLeft.hours },
              { label: 'МИНУТ', value: timeLeft.minutes },
              { label: 'СЕКУНД', value: timeLeft.seconds },
            ].map((item) => (
              <motion.div
                key={item.label}
                className="card-glass text-center p-6"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <motion.div
                  key={item.value}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="font-display text-3xl sm:text-4xl font-bold gradient-text mb-2"
                >
                  {String(item.value).padStart(2, '0')}
                </motion.div>
                <p className="text-xs sm:text-sm font-semibold text-stone-600 dark:text-stone-400">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Products */}
      <section className="py-24">
        <div className="container-luxury">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl font-bold text-center gradient-text mb-12"
          >
            Эксклюзивные предложения
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {limitedProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-luxury-600 to-luxury-800">
        <div className="container-luxury text-center text-white space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl font-bold"
          >
            Не пропустите эксклюзивное предложение!
          </motion.h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Коллекция доступна в ограниченном количестве. После завершения обратного отсчета
            цены вернутся к стандартным.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white text-luxury-600 font-semibold rounded-lg hover:bg-luxury-50 transition-colors inline-block"
          >
            Купить сейчас
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default Limited;
