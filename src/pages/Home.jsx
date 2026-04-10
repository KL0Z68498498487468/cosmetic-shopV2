import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BottlePreview from '../components/ui/BottlePreview';
import ProductCard from '../components/ui/ProductCard';
import data from '../store/data.json';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(data.products.slice(0, 6));
  }, []);

  useEffect(() => {
    // Параллакс эффект для баннера
    const heroSection = document.querySelector('.hero-banner');
    if (heroSection) {
      gsap.to(heroSection, {
        scrollTrigger: {
          trigger: heroSection,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
        y: 100,
        ease: 'none',
      });
    }
  }, []);

  return (
    <div className="w-full">
      {/* Hero Banner with Parallax */}
      <section className="hero-banner relative w-full h-screen overflow-hidden bg-gradient-to-br from-luxury-100 via-white to-stone-100 dark:from-stone-900 dark:via-stone-950 dark:to-black flex items-center justify-center">
        {/* Background Video/Blur */}
        <div className="absolute inset-0 opacity-50">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="https://videos.pexels.com/video-files/4534658/4534658-hd_1080_2048_30fps.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-stone-950" />
        </div>

        {/* Content */}
        <div className="container-luxury relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="flex items-center justify-center gap-2 text-luxury-600 dark:text-luxury-400"
            >
              <Sparkles className="w-5 h-5" />
              <span className="font-medium">Премиальная парфюмерия класса люкс</span>
              <Sparkles className="w-5 h-5" />
            </motion.div>

            <h1 className="font-display text-6xl sm:text-7xl font-bold leading-tight">
              <span className="gradient-text">Luxe Essence</span>
              <br />
              <span className="text-stone-900 dark:text-stone-100">Ароматы Вашей Мечты</span>
            </h1>

            <p className="max-w-2xl mx-auto text-lg text-stone-600 dark:text-stone-400">
              Откройте для себя коллекцию эксклюзивных ароматов от лучших парфюмеров мира.
              Каждый флакон — это произведение искусства, созданное для тех, кто ценит
              истинную элегантность и качество.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link to="/catalog" className="btn-primary group inline-flex gap-2">
                Исследовать коллекцию
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="btn-secondary">
                Посмотреть видео
              </button>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="w-6 h-10 border-2 border-luxury-500 rounded-full flex items-center justify-center">
            <div className="w-1 h-2 bg-luxury-500 rounded-full animate-pulse" />
          </div>
        </motion.div>
      </section>

      {/* 3D Bottle Preview Section */}
      <section className="py-24 bg-white dark:bg-stone-950">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Bottle */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <BottlePreview image="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop" />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div>
                <p className="text-luxury-600 dark:text-luxury-400 font-medium uppercase tracking-wider mb-2">
                  Избранное изделие
                </p>
                <h2 className="font-display text-4xl sm:text-5xl font-bold text-stone-900 dark:text-stone-100 mb-4">
                  L'Essence Dorée
                </h2>
                <p className="text-stone-600 dark:text-stone-400 text-lg leading-relaxed">
                  Наш флагманский аромат воплощает сущность роскоши. Сочетание благородных ингредиентов
                  создает композицию, которая рассказывает историю элегантности и утонченного вкуса.
                </p>
              </div>

              {/* Fragrance Pyramid */}
              <div className="space-y-4">
                <h3 className="font-semibold text-stone-900 dark:text-stone-100">Пирамида ароматических нот</h3>
                <div className="space-y-3">
                  {[
                    { type: 'Верхние ноты', notes: ['Бергамот', 'Грейпфрут'], duration: '15 минут' },
                    { type: 'Сердечные ноты', notes: ['Роза', 'Жасмин'], duration: '2-4 часа' },
                    { type: 'Базовые ноты', notes: ['Амбра', 'Мускус'], duration: '6+ часов' },
                  ].map((level, idx) => (
                    <div key={idx} className="glass dark:glass-dark p-4 rounded-lg">
                      <p className="font-semibold text-stone-900 dark:text-stone-100 mb-2">
                        {level.type}
                      </p>
                      <p className="text-sm text-stone-600 dark:text-stone-400 mb-2">
                        {level.notes.join(', ')}
                      </p>
                      <p className="text-xs text-luxury-600 dark:text-luxury-400">
                        Длительность: {level.duration}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <Link to="/product/1" className="btn-primary group">
                Подробнее о продукте
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Collection Showcase */}
      <section className="py-24 bg-gradient-to-b from-white to-luxury-50 dark:from-stone-950 dark:to-stone-900">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-luxury-600 dark:text-luxury-400 font-medium uppercase tracking-wider mb-2">
              Коллекция
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold gradient-text mb-4">
              Лучшие Ароматы
            </h2>
            <p className="max-w-2xl mx-auto text-stone-600 dark:text-stone-400">
              Выбранные вручную ароматы, которые определяют тренды мировой парфюмерии
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center mt-12"
          >
            <Link to="/catalog" className="btn-primary group inline-flex gap-2">
              Просмотреть весь каталог
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-stone-900 dark:bg-black">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center space-y-8"
          >
            <div>
              <h2 className="font-display text-4xl font-bold text-white mb-4">
                Получайте эксклюзивные предложения
              </h2>
              <p className="text-stone-300 text-lg">
                Подпишитесь на рассылку и получайте первым информацию о новых коллекциях и ограниченных изданиях
              </p>
            </div>

            <form className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Ваш email"
                className="flex-1 px-6 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-stone-400 focus:outline-none focus:border-luxury-500"
              />
              <button
                type="submit"
                className="btn-primary whitespace-nowrap"
              >
                Подписаться
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
