import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Filter, X } from 'lucide-react';
import ProductCard from '../components/ui/ProductCard';
import FilterSidebar from '../components/ui/FilterSidebar';
import data from '../store/data.json';

const Catalog = () => {
  const [filters, setFilters] = useState({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('newest');

  const filteredProducts = useMemo(() => {
    let result = data.products;

    // Filter by category (notes)
    if (filters.notes && filters.notes.length > 0) {
      result = result.filter((p) => filters.notes.includes(p.category));
    }

    // Filter by brand
    if (filters.brand && filters.brand.length > 0) {
      result = result.filter((p) => filters.brand.includes(p.brand));
    }

    // Filter by price
    if (filters.price && filters.price.length > 0) {
      result = result.filter((p) => {
        return filters.price.some((range) => {
          if (range === '0-100') return p.price < 100;
          if (range === '100-200') return p.price >= 100 && p.price < 200;
          if (range === '200-300') return p.price >= 200 && p.price < 300;
          if (range === '300+') return p.price >= 300;
          return false;
        });
      });
    }

    // Sort
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [filters, sortBy]);

  const handleFilterChange = (category, values) => {
    setFilters((prev) => ({
      ...prev,
      [category]: values,
    }));
  };

  const handleClearAllFilters = () => {
    setFilters({});
  };

  return (
    <div className="w-full min-h-screen bg-white dark:bg-stone-950">
      {/* Header */}
      <section className="bg-gradient-to-br from-luxury-100 to-stone-100 dark:from-stone-900 dark:to-stone-950 py-12 border-b border-luxury-200/20 dark:border-stone-800/50">
        <div className="container-luxury">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h1 className="font-display text-5xl font-bold gradient-text">
              Каталог Ароматов
            </h1>
            <p className="text-stone-600 dark:text-stone-400 max-w-2xl text-lg">
              Откройте для себя нашу полную коллекцию премиальных ароматов от ведущих мировых брендов
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <div className="container-luxury py-12">
        <div className="flex gap-8 lg:gap-12">
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <FilterSidebar onFilterChange={handleFilterChange} filters={filters} />
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-luxury-200/20 dark:border-stone-800/50">
              <div className="flex items-center gap-2">
                <span className="text-stone-600 dark:text-stone-400">
                  Найдено товаров:
                </span>
                <span className="font-semibold text-stone-900 dark:text-stone-100">
                  {filteredProducts.length}
                </span>
              </div>

              {/* Sort */}
              <div className="flex gap-4 items-center flex-wrap sm:flex-nowrap">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 rounded-lg bg-white dark:bg-stone-800 border border-luxury-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-luxury-500"
                >
                  <option value="newest">Новинки</option>
                  <option value="price-low">Цена: по возрастанию</option>
                  <option value="price-high">Цена: по убыванию</option>
                  <option value="name">Название</option>
                </select>

                {/* Filter Toggle Mobile */}
                <motion.button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-lg bg-luxury-100 dark:bg-luxury-900/30 text-luxury-700 dark:text-luxury-300 font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Filter className="w-4 h-4" />
                  Фильтры
                </motion.button>
              </div>
            </div>

            {/* Active Filters */}
            {Object.values(filters).some((v) => v && v.length > 0) && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 flex flex-wrap gap-2"
              >
                {Object.entries(filters).map(
                  ([category, values]) =>
                    values &&
                    values.length > 0 &&
                    values.map((value) => (
                      <motion.div
                        key={`${category}-${value}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-2 px-3 py-1 rounded-full bg-luxury-100 dark:bg-luxury-900/30 text-luxury-700 dark:text-luxury-300 text-sm font-medium"
                      >
                        {value}
                        <button
                          onClick={() => {
                            const newValues = values.filter((v) => v !== value);
                            handleFilterChange(
                              category,
                              newValues.length > 0 ? newValues : undefined
                            );
                          }}
                          className="hover:opacity-70"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </motion.div>
                    ))
                )}
                <button
                  onClick={handleClearAllFilters}
                  className="px-3 py-1 text-sm text-stone-500 dark:text-stone-400 hover:text-luxury-500 transition-colors"
                >
                  Очистить все
                </button>
              </motion.div>
            )}

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-12 text-center"
              >
                <p className="text-stone-600 dark:text-stone-400 text-lg mb-4">
                  По вашим фильтрам ничего не найдено
                </p>
                <button
                  onClick={handleClearAllFilters}
                  className="btn-primary"
                >
                  Очистить фильтры
                </button>
              </motion.div>
            )}
          </div>

          {/* Mobile Sidebar */}
          {isFilterOpen && (
            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm p-4 overflow-y-auto"
              onClick={() => setIsFilterOpen(false)}
            >
              <motion.div
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-stone-900 rounded-lg p-6 max-w-xs"
              >
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="absolute top-4 right-4 p-2 hover:bg-luxury-50 dark:hover:bg-stone-800 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
                <FilterSidebar
                  onFilterChange={(category, values) => {
                    handleFilterChange(category, values);
                  }}
                  filters={filters}
                />
              </motion.div>
            </motion.aside>
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
