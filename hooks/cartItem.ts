import { CartItems, MenuItem } from "@/types";
import { useEffect, useState } from "react";

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItems[]>([]);

  //load the cart from local storage
  useEffect(() => {
    const savedCartitems = localStorage.getItem("guest_cart");
    if (savedCartitems) setCartItems(JSON.parse(savedCartitems));
  }, []);

  //save to cart whenever cart items changes
  useEffect(() => {
    localStorage.setItem("guest_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  //adding item to cart method
  const addItem = (item: CartItems) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find(
        (i) => i.menu_item_id === item.menu_item_id
      );

      //just add quantity if user already added
      if (existing) {
        return prevItems.map((i) =>
          i.menu_item_id === item.menu_item_id
            ? { ...i, quantity: i.quantity + 1 }
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

  //   const mergeUserCart = async(userId:string) {

  //   }

  return {
    cartItems,
    addItem,
    removeItem,
    clearCart,
  };
}
