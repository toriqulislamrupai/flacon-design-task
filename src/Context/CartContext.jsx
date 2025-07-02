import  { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
  setCart((prev) => {
    const exists = prev.find(
      (i) =>
        i.productId === item.productId &&
        i.color === item.color &&
        i.size === item.size
    );
    if (exists) {
      return prev.map((i) =>
        i.productId === item.productId &&
        i.color === item.color &&
        i.size === item.size
          ? {
              ...i,
              quantity: i.quantity + item.quantity,
              price: item.price, // ✅ keep updated price too
              regular_price: item.regular_price, // ✅ add this
              discount_price: item.discount_price, // ✅ ensure this too
            }
          : i
      );
    }
    return [...prev, item];
  });
};


  const updateQuantity = (productId, color, size, quantity) => {
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId &&
        item.color === color &&
        item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const removeFromCart = (productId, color, size) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.productId === productId &&
            item.color === color &&
            item.size === size
          )
      )
    );
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
