import { createContext } from "react";

// types
import { iCart, itemType } from "../types/interfaces";

const CartContext = createContext({
  items: [],
  totalAmount: 0,
  addItem: (item: itemType) => {},
  removeItem: (id: number) => {},
  clearCart: () => {},
} as iCart);

export default CartContext;
