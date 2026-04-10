import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Heart } from 'lucide-react';
import { useState } from 'react';
import confetti from 'canvas-confetti';
import data from '../store/data.json';
import { useCartStore, useFavoritesStore } from '../store/store';

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const product = data.products.find((p) => p.id === parseInt(id));
  const addItem = useCartStore((state) => state.addItem);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const favorites = useFavoritesStore((state) => state.favorites);
  const isFav = favorites.some((item) => item.id === product?.id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Товар не найден</h1>
          <button onClick={() => navigate('/catalog')} className="btn-primary">
            Вернуться в каталог
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-stone-950 py-12">
      <div className="container-luxury">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-luxury-600 dark:text-luxury-400 hover:text-luxury-700 dark:hover:text-luxury-300 mb-8 font-medium"
          whileHover={{ gap: '12px' }}
        >
          <ArrowLeft className="w-5 h-5" />
          Назад
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-2xl overflow-hidden bg-gradient-to-br from-luxury-50 to-stone-100 dark:from-stone-900 dark:to-stone-800 aspect-square flex items-center justify-center"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            {/* Header */}
            <div>
              <p className="text-luxury-600 dark:text-luxury-400 font-medium uppercase mb-3">
                {product.brand}
              </p>
              <h1 className="font-display text-5xl font-bold text-stone-900 dark:text-stone-100 mb-4">
                {product.name}
              </h1>
              <p className="text-lg text-stone-600 dark:text-stone-400">
                {product.description}
              </p>
            </div>

            {/* Price */}
            <div className="text-4xl font-display font-bold gradient-text">
              ${product.price}
            </div>

            {/* Fragrance Pyramid */}
            <div className="space-y-4">
              <h3 className="font-display text-2xl font-semibold text-stone-900 dark:text-stone-100">
                Пирамида ароматических нот
              </h3>
              <div className="space-y-3">
                {[
                  {
                    type: 'Верхние ноты',
                    notes: product.notes.top,
                    duration: '10-15 минут',
                  },
                  {
                    type: 'Сердечные ноты',
                    notes: product.notes.heart,
                    duration: '2-4 часа',
                  },
                  {
                    type: 'Базовые ноты',
                    notes: product.notes.base,
                    duration: '6+ часов',
                  },
                ].map((level, idx) => (
                  <div key={idx} className="card-glass">
                    <p className="font-semibold text-stone-900 dark:text-stone-100 mb-2">
                      {level.type}
                    </p>
                    <p className="text-stone-600 dark:text-stone-400 mb-2">
                      {level.notes.join(', ')}
                    </p>
                    <p className="text-xs text-luxury-600 dark:text-luxury-400">
                      Длительность: {level.duration}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity & Actions */}
            <div className="flex gap-4 items-center pt-4">
              <div className="flex items-center border border-luxury-300 dark:border-stone-700 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-luxury-50 dark:hover:bg-stone-800"
                >
                  −
                </button>
                <span className="px-4 py-2 font-semibold min-w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-luxury-50 dark:hover:bg-stone-800"
                >
                  +
                </button>
              </div>

              <motion.button
                onClick={handleAddToCart}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary flex-1 group"
              >
                <ShoppingCart className="w-5 h-5" />
                В корзину
              </motion.button>

              <motion.button
                onClick={() => toggleFavorite(product)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`p-3 rounded-lg transition-all ${
                  isFav
                    ? 'bg-luxury-500 text-white'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 hover:bg-luxury-50'
                }`}
              >
                <Heart
                  className="w-5 h-5"
                  fill={isFav ? 'currentColor' : 'none'}
                />
              </motion.button>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-2 gap-4 pt-8 border-t border-luxury-200/20 dark:border-stone-800/50">
              {[
                { label: 'Объем', value: '100 мл' },
                { label: 'Тип', value: 'Парфюмерная вода' },
                { label: 'Стойкость', value: '6-8 часов' },
                { label: 'Производство', value: 'Франция' },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-xs text-stone-500 dark:text-stone-400 uppercase mb-1">
                    {item.label}
                  </p>
                  <p className="font-semibold text-stone-900 dark:text-stone-100">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Product;
