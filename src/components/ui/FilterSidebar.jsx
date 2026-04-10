import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

const FilterSidebar = ({ onFilterChange, filters }) => {
  const [expandedCategories, setExpandedCategories] = useState({
    notes: true,
    price: true,
    brand: true,
  });

  const noteOptions = [
    { value: 'citrus', label: 'Цитрусовые' },
    { value: 'floral', label: 'Цветочные' },
    { value: 'oriental', label: 'Восточные' },
    { value: 'woody', label: 'Древесные' },
    { value: 'aquatic', label: 'Акватические' },
  ];

  const priceRanges = [
    { value: '0-100', label: 'До $100' },
    { value: '100-200', label: '$100 - $200' },
    { value: '200-300', label: '$200 - $300' },
    { value: '300+', label: 'Выше $300' },
  ];

  const brands = ['Maison Luxe', 'Lumière', 'Heritage', 'Éternel', 'Thalassa', 'Nuit'];

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleCheckboxChange = (category, value) => {
    const currentValues = filters[category] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    onFilterChange(category, newValues);
  };

  return (
    <div className="space-y-6">
      {/* Notes Filter */}
      <div className="card-glass">
        <button
          onClick={() => toggleCategory('notes')}
          className="w-full flex items-center justify-between mb-4"
        >
          <h3 className="font-semibold text-stone-900 dark:text-stone-100">Ноты аромата</h3>
          <motion.div
            animate={{ rotate: expandedCategories.notes ? 180 : 0 }}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </button>

        {expandedCategories.notes && (
          <div className="space-y-3">
            {noteOptions.map((option) => (
              <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={(filters.notes || []).includes(option.value)}
                  onChange={() => handleCheckboxChange('notes', option.value)}
                  className="w-4 h-4 accent-luxury-500 cursor-pointer"
                />
                <span className="text-sm text-stone-600 dark:text-stone-400">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="card-glass">
        <button
          onClick={() => toggleCategory('price')}
          className="w-full flex items-center justify-between mb-4"
        >
          <h3 className="font-semibold text-stone-900 dark:text-stone-100">Цена</h3>
          <motion.div
            animate={{ rotate: expandedCategories.price ? 180 : 0 }}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </button>

        {expandedCategories.price && (
          <div className="space-y-3">
            {priceRanges.map((range) => (
              <label key={range.value} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={(filters.price || []).includes(range.value)}
                  onChange={() => handleCheckboxChange('price', range.value)}
                  className="w-4 h-4 accent-luxury-500 cursor-pointer"
                />
                <span className="text-sm text-stone-600 dark:text-stone-400">
                  {range.label}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Brand Filter */}
      <div className="card-glass">
        <button
          onClick={() => toggleCategory('brand')}
          className="w-full flex items-center justify-between mb-4"
        >
          <h3 className="font-semibold text-stone-900 dark:text-stone-100">Бренд</h3>
          <motion.div
            animate={{ rotate: expandedCategories.brand ? 180 : 0 }}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </button>

        {expandedCategories.brand && (
          <div className="space-y-3">
            {brands.map((brand) => (
              <label key={brand} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={(filters.brand || []).includes(brand)}
                  onChange={() => handleCheckboxChange('brand', brand)}
                  className="w-4 h-4 accent-luxury-500 cursor-pointer"
                />
                <span className="text-sm text-stone-600 dark:text-stone-400">
                  {brand}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Clear Filters */}
      {Object.values(filters).some((v) => v && v.length > 0) && (
        <button
          onClick={() => onFilterChange({}, {})}
          className="w-full btn-secondary !flex"
        >
          Очистить фильтры
        </button>
      )}
    </div>
  );
};

export default FilterSidebar;
