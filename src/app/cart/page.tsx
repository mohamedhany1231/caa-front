"use client";
import React from "react";
import { useCart } from "@/app/context/CartContext";
import CartItemCard from "./CartItemCard";
import Link from "next/link";

const CartPage = () => {
  const { state, removeItem, clearCart, decreaseQuantity, increaseQuantity } =
    useCart();

  // const handleRemoveItem = (id: string) => {
  //   dispatch({ type: CartActionType.REMOVE_ITEM, payload: id });
  // };

  // const handleClearCart = () => {
  //   dispatch({ type: CartActionType.CLEAR_CART });
  // };

  const totalPrice =
    (state.items[0] &&
      state.items?.reduce(
        (total, item) => total + (item?.price || 400) * item.quantity,
        0
      )) ||
    0;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {state.items.length > 0 ? (
        <>
          <div className="mb-14">
            {state.items.map((item, i) => (
              <CartItemCard
                // FIXME: change key
                key={item.key}
                size={item.size}
                flavor={item.flavor}
                id={item.id}
                name="place holder"
                // name={item.name}
                // price={item.price}
                quantity={item.quantity}
                onRemove={removeItem}
                uniqueKey={item.key}
                decrease={decreaseQuantity}
                increase={increaseQuantity}
              />
            ))}
          </div>

          <div className="flex justify-between items-center my-6 ">
            <p className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</p>
            <button
              onClick={clearCart}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition"
            >
              Clear Cart
            </button>
          </div>

          <div className=" w-full flex items-center justify-center mt-20">
            <Link
              href={"/checkout"}
              className="bg-gray-800   text-white px-6 py-3 rounded-lg text-lg font-bold hover:bg-gray-700 transition"
            >
              Proceed to Checkout
            </Link>
          </div>
        </>
      ) : (
        <p className="text-gray-600 text-center text-lg">
          Your cart is empty. Start adding items to see them here!
        </p>
      )}
    </div>
  );
};

export default CartPage;
