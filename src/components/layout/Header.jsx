import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, ShoppingBag } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useCartStore } from '../../store/store';
import { motion } from 'framer-motion';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const items = useCartStore((state) => state.items);
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { label: 'Главная', href: '/' },
    { label: 'Каталог', href: '/catalog' },
    { label: 'Бренды', href: '/brands' },
    { label: 'О нас', href: '/about' },
    { label: 'Лимитированные', href: '/limited' },
  ];

  const isActive = (href) => location.pathname === href;

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-stone-950/80 backdrop-blur-md border-b border-luxury-200/20 dark:border-stone-800/50">
      <nav className="container-luxury py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <motion.div
            className="w-10 h-10 rounded-full bg-gradient-to-br from-luxury-400 to-luxury-700 flex items-center justify-center text-white font-display font-bold text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            L
          </motion.div>
          <span className="hidden sm:inline font-display text-xl font-semibold gradient-text">
            Luxe Essence
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                isActive(link.href)
                  ? 'bg-luxury-100 dark:bg-luxury-900/30 text-luxury-700 dark:text-luxury-300'
                  : 'text-stone-600 dark:text-stone-300 hover:bg-luxury-50 dark:hover:bg-stone-800/50'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <motion.button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-luxury-50 dark:hover:bg-stone-800/50 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-stone-600" />
            )}
          </motion.button>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative p-2 rounded-lg hover:bg-luxury-50 dark:hover:bg-stone-800/50 transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-0 right-0 w-5 h-5 bg-luxury-500 text-white text-xs rounded-full flex items-center justify-center font-semibold"
              >
                {cartCount}
              </motion.span>
            )}
          </Link>

          {/* Profile */}
          <Link
            to="/profile"
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-luxury-500 to-luxury-600 text-white font-medium hover:shadow-lg hover:shadow-luxury-500/50 transition-all hidden sm:block"
          >
            Аккаунт
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-luxury-50 dark:hover:bg-stone-800/50"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-t border-luxury-200/20 dark:border-stone-800/50"
        >
          <div className="container-luxury py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  isActive(link.href)
                    ? 'bg-luxury-100 dark:bg-luxury-900/30 text-luxury-700'
                    : 'text-stone-600 dark:text-stone-300 hover:bg-luxury-50 dark:hover:bg-stone-800/50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/profile"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-luxury-500 to-luxury-600 text-white font-medium text-center"
              onClick={() => setIsOpen(false)}
            >
              Аккаунт
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
