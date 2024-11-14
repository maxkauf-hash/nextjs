"use client";

import { useCart } from "@/context/cart-provider";
import { useSession } from "@/context/session-provider";
import { ProductsType } from "@/lib/types";
import { useEffect, useState } from "react";
import Payement from "@/components/payement";

interface CartListProps {
  products: ProductsType[];
}

const CartList: React.FC<CartListProps> = ({ products }) => {
  const { cartItems, removeFromCart, removeCart } = useCart();
  const [totalAmount, setTotalAmount] = useState(0);

  const { user } = useSession();

  // Find the products that are in the cart
  const cartProducts = products.filter((product) =>
    cartItems.find((item) => item.id === product.id)
  );

  useEffect(() => {
    const amount = 0;
    const sum = cartProducts.reduce(
      (accumulator, currentValue) => accumulator + currentValue.price,
      amount
    );
    setTotalAmount(sum);
  }, [cartProducts]);

  return (
    <div>
      <h1>Cart Items</h1>
      {cartProducts.length > 0 ? (
        <>
          <ul>
            {cartProducts.map((product) => (
              <li key={product.id}>
                <h2>{product.name}</h2>
                <p>Price: ${product.price}</p>
                <p>
                  Quantity:{" "}
                  {cartItems.find((item) => item.id === product.id)?.quantity}
                </p>
                <button onClick={() => removeFromCart(product.id)}>
                  Remove
                </button>
              </li>
            ))}
            <button onClick={() => removeCart()}>Remove Cart</button>
          </ul>
        </>
      ) : (
        <p>No items in the cart.</p>
      )}
    </div>
  );
};

export default CartList;
