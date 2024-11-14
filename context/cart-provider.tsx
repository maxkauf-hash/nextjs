"use client";

import { useLocalStorage } from "@/hooks/use-local-storage";
import { CartContextType, CartItem } from "@/lib/types";
import { revalidateTag } from "next/cache";
import { createContext, useContext } from "react";

const ShoppingCartContext = createContext({} as CartContextType);

export function useCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  );

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  function getItemQuantity(id: string) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  function increaseCartQuantity(id: string) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseCartQuantity(id: string) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 }; // Correct state update
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeFromCart(id: string) {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  }

  function removeCart() {
    localStorage.removeItem("shopping-cart");
    setCartItems([]);
  }
  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        cartItems,
        cartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        removeCart,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
