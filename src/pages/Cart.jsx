import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/store';

const Cart = () => {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white dark:bg-stone-950 py-12">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="font-display text-5xl font-bold gradient-text mb-2">
            Корзина
          </h1>
          <p className="text-stone-600 dark:text-stone-400">
            {totalItems} товаров в корзине
          </p>
        </motion.div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="card-glass flex gap-6"
                >
                  {/* Image */}
                  <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-luxury-100 to-stone-100 dark:from-stone-800 dark:to-stone-700 flex-shrink-0 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <h3 className="font-semibold text-stone-900 dark:text-stone-100 truncate">
                        {item.name}
                      </h3>
                      <p className="text-sm text-stone-600 dark:text-stone-400">
                        {item.brand}
                      </p>
                    </div>
                    <p className="font-display text-lg font-semibold gradient-text">
                      ${item.price}
                    </p>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center border border-luxury-300 dark:border-stone-700 rounded-lg">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, Math.max(1, item.quantity - 1))
                        }
                        className="px-2 py-1 hover:bg-luxury-50 dark:hover:bg-stone-800"
                      >
                        −
                      </button>
                      <span className="px-3 py-1 font-semibold min-w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="px-2 py-1 hover:bg-luxury-50 dark:hover:bg-stone-800"
                      >
                        +
                      </button>
                    </div>
                    <motion.button
                      onClick={() => removeItem(item.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-1"
            >
              <div className="card-glass sticky top-24 space-y-4">
                <h2 className="font-display text-2xl font-semibold text-stone-900 dark:text-stone-100">
                  Итоговая стоимость
                </h2>

                <div className="space-y-3 text-sm">
                  {[
                    { label: 'Сумма товаров', value: `$${totalPrice.toFixed(2)}` },
                    { label: 'Доставка', value: 'Бесплатно' },
                    { label: 'Налог', value: `$${(totalPrice * 0.1).toFixed(2)}` },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex justify-between text-stone-600 dark:text-stone-400"
                    >
                      <span>{item.label}</span>
                      <span className="font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-luxury-200/20 dark:border-stone-700/50 pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-semibold text-stone-900 dark:text-stone-100">
                      Итого
                    </span>
                    <span className="font-display text-2xl font-bold gradient-text">
                      ${(totalPrice * 1.1).toFixed(2)}
                    </span>
                  </div>

                  <button className="btn-primary w-full group">
                    Оформить заказ
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <Link
                    to="/catalog"
                    className="block text-center mt-3 text-luxury-600 dark:text-luxury-400 hover:text-luxury-700 font-medium text-sm"
                  >
                    Продолжить покупки
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-stone-300 dark:text-stone-700" />
            <h2 className="font-display text-3xl font-semibold text-stone-900 dark:text-stone-100 mb-2">
              Корзина пуста
            </h2>
            <p className="text-stone-600 dark:text-stone-400 mb-8">
              Начните покупки, выбрав любой аромат из нашей коллекции
            </p>
            <Link to="/catalog" className="btn-primary group">
              Перейти в каталог
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Cart;
