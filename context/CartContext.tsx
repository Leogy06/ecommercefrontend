"use client";

import { CartItems } from "@/types";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface CarContextType {
  cartItems: CartItems[];
  addItem: (item: CartItems) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CarContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItems[]>([]);

  useEffect(() => {
    const savedCartitems = localStorage.getItem("guest_cart");
    if (savedCartitems) setCartItems(JSON.parse(savedCartitems));
  }, []);

  const addItem = (item: CartItems) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find(
        (i) => i.menu_item_id === item.menu_item_id
      );
      if (existing) {
        return prevItems.map((i) =>
          i.menu_item_id === item.menu_item_id
            ? { ...i, quantity: i.quantity + item.quantity } // add quantity
            : i
        );
      }
      return [...prevItems, item];
    });
  };

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((i) => i.menu_item_id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("guest_cart");
  };

  return (
    <CartContext.Provider value={{ cartItems, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
