import { motion } from 'framer-motion';
import { useFavoritesStore } from '../store/store';
import ProductCard from '../components/ui/ProductCard';

const Profile = () => {
  const favorites = useFavoritesStore((state) => state.favorites);

  const orderHistory = [
    {
      id: 1,
      date: '2026-04-01',
      total: 580,
      status: 'Доставлено',
      items: 2,
    },
    {
      id: 2,
      date: '2026-03-15',
      total: 280,
      status: 'Доставлено',
      items: 1,
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-stone-950 py-12">
      <div className="container-luxury">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="font-display text-5xl font-bold gradient-text mb-2">
            Мой Профиль
          </h1>
          <p className="text-stone-600 dark:text-stone-400">
            Личный кабинет и управление заказами
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 space-y-6"
          >
            <div className="card-glass">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-luxury-500 to-luxury-700 mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                JD
              </div>
              <h2 className="text-center font-display text-2xl font-semibold text-stone-900 dark:text-stone-100 mb-2">
                John Doe
              </h2>
              <p className="text-center text-stone-600 dark:text-stone-400 mb-4">
                john@example.com
              </p>
              <button className="w-full btn-secondary">Редактировать профиль</button>
            </div>

            <div className="card-glass">
              <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-4">
                Статистика
              </h3>
              <div className="space-y-3">
                {[
                  { label: 'Всего заказов', value: '12' },
                  { label: 'Потрачено', value: '$4,850' },
                  { label: 'Избранных товаров', value: favorites.length },
                ].map((stat) => (
                  <div key={stat.label} className="flex justify-between items-center">
                    <span className="text-sm text-stone-600 dark:text-stone-400">
                      {stat.label}
                    </span>
                    <span className="font-semibold text-luxury-600 dark:text-luxury-400">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Order History */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="card-glass">
              <h2 className="font-display text-2xl font-semibold text-stone-900 dark:text-stone-100 mb-6">
                История заказов
              </h2>

              <div className="space-y-4">
                {orderHistory.map((order) => (
                  <div
                    key={order.id}
                    className="p-4 rounded-lg bg-white/50 dark:bg-stone-800/50 border border-luxury-200/20 dark:border-stone-700/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                  >
                    <div>
                      <p className="font-semibold text-stone-900 dark:text-stone-100">
                        Заказ #{order.id}
                      </p>
                      <p className="text-sm text-stone-600 dark:text-stone-400">
                        {order.date} • {order.items} товаров
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <div className="text-right">
                        <p className="font-semibold text-stone-900 dark:text-stone-100">
                          ${order.total}
                        </p>
                        <p className="text-sm text-emerald-600 dark:text-emerald-400">
                          {order.status}
                        </p>
                      </div>
                      <button className="btn-secondary text-sm px-4 py-2">
                        Подробнее
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Favorites */}
        {favorites.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-12"
          >
            <h2 className="font-display text-3xl font-bold text-stone-900 dark:text-stone-100 mb-6">
              Мои избранные
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Profile;
