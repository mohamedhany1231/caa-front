"use client";
import Image from "next/image";
import { FaPlus, FaMinus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import useProduct from "../hooks/usePorduct";
import Spinner from "../components/Spinner";
import { useCart } from "../context/CartContext";

const CartItemCard = ({
  id,
  name,
  quantity,
  onRemove,
  uniqueKey,
  decrease,
  increase,
  size,
  flavor,
}: {
  id: string;
  name: string;
  quantity: number;
  uniqueKey: string;
  size: string;
  flavor: string;
  imageUrl: string; // Add imageUrl prop
  onRemove: (id: string) => void;
  increase: (key: string) => void;
  decrease: (key: string) => void;
}) => {
  const { data: product, error, isLoading } = useProduct(id);
  const { removeItem } = useCart();
  if (isLoading)
    return (
      <div className="h-8">
        <Spinner />;
      </div>
    );
  else if (!product?.name) {
    return removeItem(uniqueKey);
  }
  const price = product?.sizes.find((s) => s.size == size)?.price || 0;
  return (
    <div className=" grid md:grid-cols-2 grid-cols-1    items-center justify-between p-4 bg-white shadow-md rounded-lg mb-4 gap-4">
      {/* Image and Details */}
      <div className="flex items-center gap-4">
        {product?.photo && (
          <Image
            width={16}
            height={16}
            src={product?.photo}
            alt={name}
            className="w-16 h-16 object-cover rounded-lg"
          />
        )}
        <div>
          <h3 className="text-lg font-bold capitalize">{product.name}</h3>
          <p className="text-sm text-gray-600">
            {flavor} - {size} <br />
            {price.toFixed(2)} <span className=" text-xs">EGP</span> x{" "}
            {quantity}
          </p>
        </div>
      </div>
      {/* Actions */}
      <div className="grid grid-cols-1  sm:grid-cols-2  items-center gap-4 justify-between flex-wrap">
        {/* Quantity Selector */}
        <div className="flex items-stretch mx-auto ">
          <button
            onClick={() => decrease(uniqueKey)}
            className="bg-gray-100 hover:bg-gray-200 transition-colors border border-gray-300 p-2 first-letter:focus:outline-none"
          >
            <FaMinus />
          </button>
          <input
            value={quantity}
            readOnly
            className=" md:w-12 w-10 text-center border border-gray-300 focus:outline-none"
          />
          <button
            onClick={() => increase(uniqueKey)}
            className="bg-gray-100 hover:bg-gray-200 transition-colors border  border-gray-300 p-2 focus:outline-none"
          >
            <FaPlus />
          </button>
        </div>
        {/* Price and Remove Button */}
        <div className="flex items-center gap-8 ml-auto ">
          <p className="text-lg font-bold">
            {(price * quantity).toFixed(2)}{" "}
            <span className="text-sm font-semibold">EGP</span>
          </p>
          <button
            className="bg-red-500 text-white w-8 flex items-center justify-center   aspect-square text-2xl font-bold rounded-lg hover:bg-red-600 transition"
            onClick={() => onRemove(uniqueKey)}
          >
            <MdDelete />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
