import { create } from 'zustand';

export const useThemeStore = create((set) => ({
  isDark: false,
  toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
  setDarkMode: (isDark) => set({ isDark }),
}));

export const useCartStore = create((set) => ({
  items: [],
  addItem: (product) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.id === product.id);
      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      }
      return {
        items: [...state.items, { ...product, quantity: 1 }],
      };
    }),
  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== productId),
    })),
  updateQuantity: (productId, quantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      ),
    })),
  clearCart: () => set({ items: [] }),
  getTotalPrice: () => {
    return 0;
  },
}));

export const useFavoritesStore = create((set) => ({
  favorites: [],
  toggleFavorite: (product) =>
    set((state) => {
      const exists = state.favorites.find((item) => item.id === product.id);
      if (exists) {
        return {
          favorites: state.favorites.filter((item) => item.id !== product.id),
        };
      }
      return {
        favorites: [...state.favorites, product],
      };
    }),
  isFavorite: (productId) => (state) =>
    state.favorites.some((item) => item.id === productId),
}));
