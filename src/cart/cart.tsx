import CartItem from "../cartItem/cartItem";
//styles
import { Wrapper } from "./cart.style";
// types
import { CartItemType } from "../App";
import React from "react";

type Props = {
  cartItems: CartItemType[];
  addToCart: (itemAdd: CartItemType) => void;
  remoteFromCart: (id: number) => void;
};

const Cart: React.FC<Props> = ({ cartItems, addToCart, remoteFromCart }) => {
  const calTotal = (items: CartItemType[]) =>
    items.reduce((cur: number, item) => cur + item.price * item.amount, 0);

  return (
    <Wrapper>
      <h2>Your shopping cart</h2>
      {cartItems.length === 0 ? <p>There's no item in cart</p> : null}
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          remoteFromCart={remoteFromCart}
        />
      ))}
      <h2>Total: {calTotal(cartItems).toFixed(2)}</h2>
    </Wrapper>
  );
};
export default Cart;
