import { Fragment, useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

// types
import { itemType, iConfirm } from "../../types/interfaces";

interface iProps {
  onCloseCart: () => void;
}

const Cart = (props: iProps) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [httpError, setHttpError] = useState("");

  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id: number) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item: itemType) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData: iConfirm) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(
        "https://react-food-order-app-alireza-default-rtdb.firebaseio.com/orders.json",
        {
          method: "POST",
          body: JSON.stringify({ user: userData, orderedItems: cartCtx.items }),
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      setIsSubmitting(false);
      setDidSubmit(true);
      cartCtx.clearCart();
    } catch (error: any) {
      // fix any
      setHttpError(error.message);
      setIsSubmitting(false);
      setDidSubmit(false);
    }
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map(item => (
        <CartItem
          {...item}
          key={item.id}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onCloseCart}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onCloseCart} />}
      {!isCheckout && modalActions}
    </Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmitModalContent = (
    <Fragment>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onCloseCart}>
          Close
        </button>
      </div>
    </Fragment>
  );

  return (
    <Modal onCloseCart={props.onCloseCart}>
      {!isSubmitting && !didSubmit && !httpError && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
      {httpError && <p>{httpError}</p>}
    </Modal>
  );
};

export default Cart;
