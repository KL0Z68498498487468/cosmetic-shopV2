import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-stone-900 dark:bg-black text-stone-100 py-12">
      <div className="container-luxury">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-display text-xl font-semibold mb-4 gradient-text">
              Luxe Essence
            </h3>
            <p className="text-stone-400 text-sm leading-relaxed">
              Премиальный парфюм и косметика класса люкс для истинных ценителей красоты и элегантности.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold mb-4 text-stone-100">Магазин</h4>
            <ul className="space-y-2 text-stone-400 text-sm">
              <li>
                <Link to="/catalog" className="hover:text-luxury-500 transition-colors">
                  Каталог
                </Link>
              </li>
              <li>
                <Link to="/brands" className="hover:text-luxury-500 transition-colors">
                  Бренды
                </Link>
              </li>
              <li>
                <Link to="/limited" className="hover:text-luxury-500 transition-colors">
                  Лимитированные
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-luxury-500 transition-colors">
                  О нас
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4 text-stone-100">Поддержка</h4>
            <ul className="space-y-2 text-stone-400 text-sm">
              <li>
                <a href="#" className="hover:text-luxury-500 transition-colors">
                  Доставка
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-luxury-500 transition-colors">
                  Возврат
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-luxury-500 transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-luxury-500 transition-colors">
                  Контакты
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-stone-100">Контакты</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-stone-400 text-sm">
                <Mail className="w-4 h-4" />
                <a href="mailto:hello@luxeessence.com" className="hover:text-luxury-500">
                  hello@luxeessence.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-stone-400 text-sm">
                <Phone className="w-4 h-4" />
                <a href="tel:+33123456789" className="hover:text-luxury-500">
                  +33 (1) 23 45 67 89
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-stone-700 my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-stone-400 text-sm">
            © 2026 Luxe Essence. Все права защищены.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a href="#" className="text-stone-400 hover:text-luxury-500 transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-stone-400 hover:text-luxury-500 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-stone-400 hover:text-luxury-500 transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
          </div>

          {/* Legal */}
          <div className="flex items-center gap-4 text-stone-400 text-sm">
            <a href="#" className="hover:text-luxury-500 transition-colors">
              Конфиденциальность
            </a>
            <a href="#" className="hover:text-luxury-500 transition-colors">
              Условия
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
