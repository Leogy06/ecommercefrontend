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
  adjustQuantity: (id: string, adjust: "add" | "reduce") => void;
  getSubtotal: () => number;
  getAddOnsSubtotal: () => number;
}

const CartContext = createContext<CarContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItems[]>([]);

  //load the guest cart from the storage
  useEffect(() => {
    const savedCartitems = localStorage.getItem("guest_cart");
    if (savedCartitems) setCartItems(JSON.parse(savedCartitems));
  }, []);

  // save cart whenever cartitems changes
  useEffect(() => {
    localStorage.setItem("guest_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addItem = (item: CartItems) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find(
        (p) =>
          p.menu_item_id === item.menu_item_id &&
          checkExistingSelectedOption(p.selectedOptions, item.selectedOptions)
      );

      if (existing) {
        return prevItems.map((p) =>
          p.menu_item_id === existing.menu_item_id &&
          checkExistingSelectedOption(
            p.selectedOptions,
            existing.selectedOptions
          )
            ? { ...p, quantity: p.quantity + item.quantity }
            : p
        );
      }

      return [...prevItems, item];
    });
  };

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("guest_cart");
  };

  const adjustQuantity = (id: string, adjust: "reduce" | "add") => {
    if (!id) return;

    setCartItems((prevItems) => {
      const updated = prevItems.map((i) => {
        if (i.menu_item_id !== id) return i;

        if (adjust === "add") {
          return { ...i, quantity: i.quantity + 1 };
        }

        // adjust === "reduce"
        return { ...i, quantity: i.quantity - 1 };
      });

      //remove product when zero qty
      return updated.filter((i) => i.quantity > 0);
    });
  };

  const getSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + (item.item?.price ?? 0) * item.quantity,
      0
    );
  };

  const getAddOnsSubtotal = () => {
    return cartItems.reduce(
      (sum, item) =>
        sum +
        (item.selectedOptions?.reduce(
          (total, option) => total + (option.choices.price ?? 0),
          0
        ) ?? 0),
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        adjustQuantity,
        cartItems,
        addItem,
        removeItem,
        clearCart,
        getSubtotal,
        getAddOnsSubtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}

//helper functions
// check if selected options are already existed

function checkExistingSelectedOption(
  existingOptions: CartItems["selectedOptions"],
  newOptions: CartItems["selectedOptions"]
) {
  if (!existingOptions || !newOptions) return false;

  return existingOptions.every((o) =>
    newOptions.some(
      (n) => o.label === n.label && o.choices.label === n.choices.label
    )
  );
}
