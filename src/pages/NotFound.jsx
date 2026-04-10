import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-stone-950 flex items-center justify-center py-12">
      <div className="container-luxury text-center space-y-8">
        {/* Animated 404 */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: 'elastic.out' }}
          className="relative"
        >
          <h1 className="font-display text-9xl sm:text-[120px] font-bold gradient-text">
            404
          </h1>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 opacity-10"
          >
            <div className="w-96 h-96 rounded-full border-4 border-luxury-500 mx-auto" />
          </motion.div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <h2 className="font-display text-4xl font-bold text-stone-900 dark:text-stone-100">
            Страница не найдена
          </h2>
          <p className="text-xl text-stone-600 dark:text-stone-400 max-w-xl mx-auto">
            К сожалению, страница которую вы ищете, не существует или была перемещена.
            Попробуйте вернуться на главную страницу.
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/" className="btn-primary group">
            <Home className="w-5 h-5" />
            На главную
          </Link>
          <Link to="/catalog" className="btn-secondary group">
            <ArrowLeft className="w-5 h-5" />
            В каталог
          </Link>
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-luxury-400 rounded-full opacity-50"
              animate={{
                x: [0, Math.sin(i) * 100, 0],
                y: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                delay: i * 0.2,
              }}
              style={{
                left: `${20 + i * 15}%`,
                top: '50%',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotFound;
