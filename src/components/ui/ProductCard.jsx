import { Heart, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { use3DTilt } from '../../hooks/use3DTilt';
import { useCartStore, useFavoritesStore } from '../../store/store';

const ProductCard = ({ product }) => {
  const { ref, style } = use3DTilt();
  const addItem = useCartStore((state) => state.addItem);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const favorites = useFavoritesStore((state) => state.favorites);
  const isFav = favorites.some((item) => item.id === product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addItem(product);
  };

  const handleFavorite = (e) => {
    e.preventDefault();
    toggleFavorite(product);
  };

  return (
    <Link to={`/product/${product.id}`}>
      <motion.div
        ref={ref}
        style={style}
        className="card-glass h-full"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Image Container */}
        <div className="relative mb-4 rounded-xl overflow-hidden bg-gradient-to-br from-luxury-50 to-stone-200 dark:from-stone-800 dark:to-stone-700 aspect-square flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />

          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-black/0 hover:bg-black/40 transition-colors duration-300 flex items-center justify-center gap-4 opacity-0 hover:opacity-100">
            <motion.button
              onClick={handleFavorite}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={`p-3 rounded-full backdrop-blur-md ${
                isFav
                  ? 'bg-luxury-500 text-white'
                  : 'bg-white/20 text-white hover:bg-white/40'
              }`}
            >
              <Heart className="w-5 h-5" fill={isFav ? 'currentColor' : 'none'} />
            </motion.button>

            <motion.button
              onClick={handleAddToCart}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-full bg-luxury-500 text-white hover:bg-luxury-600 backdrop-blur-md"
            >
              <ShoppingCart className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Badge */}
          <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-luxury-500 text-white text-xs font-semibold">
            {product.category}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <p className="text-xs text-stone-500 dark:text-stone-400 font-medium uppercase tracking-wider">
            {product.brand}
          </p>
          <h3 className="font-display text-lg font-semibold text-stone-900 dark:text-stone-100 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-sm text-stone-600 dark:text-stone-400 line-clamp-2">
            {product.description}
          </p>

          {/* Price */}
          <div className="pt-3 border-t border-luxury-200/20 dark:border-stone-700/50">
            <span className="text-xl font-display font-semibold gradient-text">
              ${product.price}
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;
