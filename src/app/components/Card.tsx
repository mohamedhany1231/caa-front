import Link from "next/link";
import React from "react";
import { FaCartPlus } from "react-icons/fa";
import AddToCart from "./AddToCart";
import Image from "next/image";

export default function Card({
  photo,
  title,
  description,
  price,
  id,
}: {
  photo: string;
  title: string;
  description: string;
  price: number;
  id: string | number;
}) {
  return (
    <Link
      href={`/products/${id}`}
      className="cursor-pointer group flex flex-col rounded-md max-w-sm w-full border   drop-shadow-md "
    >
      {/* Image */}
      <div className="h-44 md:h-64 overflow-hidden bg-gray-100">
        {/* FIXME: use IMAGE  */}
        <div className=" relative w-full h-44 md:h-64 ">
          <Image
            src={photo}
            fill
            className="object-cover transition duration-700 ease-out group-hover:scale-105 w-full h-full object-center"
            alt={title}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4 py-4 px-3 sm:p-6 bg-gradient-to-b from-red-50 from-[-10%] to-gray-50 to-[20%]">
        {/* Title and Price */}
        <div className="">
          <div className="flex flex-col">
            <h3
              className="line-clamp-2 text-lg md:text-xl lg:text-2xl font-bold  h-[2lh]"
              aria-describedby="productDescription"
            >
              {title}
            </h3>
          </div>
          <span className="text-lg md:text-2xl font-bold text-red-600">
            <span className="sr-only">Price</span> {price} EGP
          </span>
        </div>

        {/* Description */}
        <p
          id="productDescription"
          className="mb-2 text-sm text-gray-600 text-ellipsis line-clamp-3 h-[3lh]"
        >
          {description}
        </p>
      </div>
    </Link>
  );
}
