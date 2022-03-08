import React, { Context } from "react";

// types
import { iCart } from "../types/interfaces";

const CartContext: Context<iCart> = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: item => {},
  removeItem: id => {},
  clearCart: () => {},
});

export default CartContext;
