"use client";
import { useCart, CartActionType } from "@/app/context/CartContext";
import React, { useState } from "react";
import { FaCartPlus } from "react-icons/fa6";
import QuantitySelector from "./QunatitySelector";
import { useRouter } from "next/navigation";

export default function AddToCart({
  id,
  flavor,
  size,
}: {
  id: string;
  flavor: string;
  size: string;
}) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState<number>(1);
  const router = useRouter();

  return (
    <div className=" flex flex-col items-start gap-6 ">
      <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
      <button
        onClick={() => {
          addItem({ flavor, id, quantity, size });
          router.push("/products");
        }}
        type="button"
        className="  bg-red-600 hover:bg-red-700 flex items-center justify-center gap-2 px-4 py-2 text-center text-sm font-medium tracking-wide text-white transition  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black active:opacity-100 active:outline-offset-0 h-fit  w-full rounded-full "
      >
        <FaCartPlus />
        Add to Cart
      </button>
    </div>
  );
}
