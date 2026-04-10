import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCountUp } from '../hooks/useCountUp';

const StatCard = ({ label, value }) => {
  const count = useCountUp(value, 2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center text-white"
    >
      <div className="text-5xl sm:text-6xl font-display font-bold mb-2">
        {count.toLocaleString()}
      </div>
      <p className="text-white/80 font-medium">{label}</p>
    </motion.div>
  );
};

const About = () => {
  const timeline = [
    {
      year: '2015',
      title: 'Основание',
      description: 'Luxe Essence была основана как платформа для настоящих ценителей парфюмерии',
    },
    {
      year: '2018',
      title: 'Экспансия',
      description: 'Расширение в Европу и налаживание партнерства с лучшими бондами',
    },
    {
      year: '2021',
      title: 'Инновация',
      description: 'Запуск экологичной линии и программы переработки флаконов',
    },
    {
      year: '2024',
      title: 'Глобальное признание',
      description: 'Победа приз Luxury Retail Award за лучший премиум-сегмент',
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-stone-950">
      {/* Hero */}
      <section className="bg-gradient-to-br from-luxury-100 to-stone-100 dark:from-stone-900 dark:to-stone-950 py-24">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            <h1 className="font-display text-5xl sm:text-6xl font-bold gradient-text">
              История бренда
            </h1>
            <p className="text-xl text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
              Более 10 лет служим ценителям настоящей парфюмерии и подлинного качества
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24">
        <div className="container-luxury grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden aspect-square bg-gradient-to-br from-luxury-100 to-stone-200 dark:from-stone-800 dark:to-stone-900 flex items-center justify-center"
          >
            <img
              src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=600&fit=crop"
              alt="Brand"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h2 className="font-display text-4xl font-bold gradient-text mb-4">
                Наша миссия
              </h2>
              <p className="text-lg text-stone-600 dark:text-stone-400 leading-relaxed mb-4">
                Мы верим, что парфюмерия — это не просто предмет роскоши, это форма самовыражения
                и искусства. Каждый флакон содержит историю, эмоции и мастерство парфюмеров,
                посвятивших годы созданию идеального аромата.
              </p>
              <p className="text-lg text-stone-600 dark:text-stone-400 leading-relaxed">
                Наша цель — сделать премиальную парфюмерию доступной для каждого, кто ценит
                качество и истинный вкус. Мы сотрудничаем только с лучшими брендами мира,
                гарантируя аутентичность каждого продукта.
              </p>
            </div>

            <Link to="/catalog" className="btn-primary group">
              Исследовать коллекцию
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-gradient-to-b from-luxury-50 to-white dark:from-stone-900 dark:to-stone-950">
        <div className="container-luxury">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl font-bold text-center gradient-text mb-16"
          >
            Наш путь
          </motion.h2>

          <div className="max-w-4xl mx-auto space-y-8">
            {timeline.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`flex gap-8 items-center ${idx % 2 === 1 ? 'flex-row-reverse' : ''}`}
              >
                {/* Timeline dot */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-4 h-4 rounded-full bg-luxury-500 mb-4" />
                  {idx !== timeline.length - 1 && (
                    <div className="w-1 h-16 bg-gradient-to-b from-luxury-500 to-luxury-200" />
                  )}
                </div>

                {/* Content */}
                <div className={`card-glass flex-1 ${idx % 2 === 1 ? 'text-right' : ''}`}>
                  <span className="text-luxury-600 dark:text-luxury-400 font-bold text-2xl">
                    {item.year}
                  </span>
                  <h3 className="font-display text-2xl font-semibold text-stone-900 dark:text-stone-100 my-2">
                    {item.title}
                  </h3>
                  <p className="text-stone-600 dark:text-stone-400">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-r from-luxury-600 to-luxury-800">
        <div className="container-luxury">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: 'Довольных клиентов', value: 50000 },
              { label: 'Продано ароматов', value: 150000 },
              { label: 'Партнерских брендов', value: 80 },
              { label: 'Лет на рынке', value: 10 },
            ].map((stat, idx) => (
              <StatCard key={idx} label={stat.label} value={stat.value} />
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="container-luxury">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl font-bold text-center gradient-text mb-12"
          >
            Наши ценности
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Качество',
                description:
                  'Только оригинальные продукты от официальных дистрибьюторов и производителей',
              },
              {
                title: 'Экологичность',
                description:
                  'Переработка флаконов и использование экологичных материалов в упаковке',
              },
              {
                title: 'Сервис',
                description:
                  'Личный консультант для выбора идеального аромата под ваш стиль и настроение',
              },
            ].map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="card-glass text-center space-y-4"
              >
                <h3 className="font-display text-2xl font-semibold text-stone-900 dark:text-stone-100">
                  {value.title}
                </h3>
                <p className="text-stone-600 dark:text-stone-400">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
