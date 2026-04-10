import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useTheme } from './hooks/useTheme';
import Layout from './components/layout/Layout';

// Pages
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Product from './pages/Product';
import Brands from './pages/Brands';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import About from './pages/About';
import Limited from './pages/Limited';
import NotFound from './pages/NotFound';

const App = () => {
  useTheme();

  return (
    <Router>
      <Layout>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
            <Route path="/limited" element={<Limited />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </Layout>
    </Router>
  );
};

export default App;
