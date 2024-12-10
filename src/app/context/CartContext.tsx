"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

// Define a unique identifier for cart items by combining `id`, `flavor`, and `size`

type CartParams = {
  id: string;
  flavor: string;
  size: string;
  quantity: number;
};
type CartItem = {
  id: string;
  flavor: string;
  size: string;
  quantity: number;
  key: string; // Adding unique key
};
// Define the cart state
type CartState = {
  items: CartItem[];
};

// Create the cart context
const CartContext = createContext<{
  state: CartState;
  addItem: (item: CartParams) => void;
  removeItem: (key: string) => void;
  increaseQuantity: (key: string) => void;
  decreaseQuantity: (key: string) => void;
  clearCart: () => void;
}>({
  state: { items: [] },
  addItem: () => undefined,
  removeItem: () => undefined,
  increaseQuantity: () => undefined,
  decreaseQuantity: () => undefined,
  clearCart: () => undefined,
});

// Cart provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<CartState>({ items: [] });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Once the component is mounted, load the cart from localStorage
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        const cartData: CartState = JSON.parse(storedCart);
        setState(cartData);
      }
    }
  }, [isMounted]);

  // Sync state with local storage
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("cart", JSON.stringify(state));
    }
  }, [state, isMounted]);

  // Helper function to generate a unique key for cart items
  const generateUniqueKey = (id: string, flavor: string, size: string) =>
    `${id}-${flavor}-${size}`;

  // Helper functions for cart actions
  const addItem = (item: CartItem) => {
    const uniqueKey = generateUniqueKey(item.id, item.flavor, item.size);
    setState((prevState) => {
      console.log("adding items");
      const existingItemIndex = prevState.items.findIndex(
        (i) => i.key === uniqueKey
      );

      if (existingItemIndex !== -1) {
        const updatedItems = [...prevState.items];
        console.log(updatedItems[existingItemIndex].quantity, item.quantity);
        const i = updatedItems[existingItemIndex];
        updatedItems[existingItemIndex] = {
          ...i,
          quantity: i.quantity + item.quantity,
        };
        return { ...prevState, items: updatedItems };
      }
      // Add the unique key to the item
      return {
        ...prevState,
        items: [...prevState.items, { ...item, key: uniqueKey }],
      };
    });
  };

  const removeItem = (key: string) => {
    setState((prevState) => ({
      ...prevState,
      items: prevState.items.filter((item) => item.key !== key),
    }));
  };

  const increaseQuantity = (key: string) => {
    setState((prevState) => ({
      ...prevState,
      items: prevState.items.map((item) =>
        item.key === key ? { ...item, quantity: item.quantity + 1 } : item
      ),
    }));
  };

  const decreaseQuantity = (key: string) => {
    setState((prevState) => ({
      ...prevState,
      items: prevState.items
        .map((item) =>
          item.key === key
            ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
            : item
        )
        .filter((item) => item.quantity > 0),
    }));
  };

  const clearCart = () => {
    setState({ items: [] });
  };

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => useContext(CartContext);
