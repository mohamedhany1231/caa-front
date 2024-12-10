"use client";
import React from "react";
import useProduct from "@/app/hooks/usePorduct";
import Image from "next/image";

export function OrderProductRow({
  id,
  size,
  flavor,
  count,
}: {
  id: string;
  size: string;
  flavor: string;
  count: number;
}) {
  const { data: product, error, isLoading } = useProduct(id);
  if (isLoading) return;
  const flavorIndex = product?.flavors.indexOf(flavor) as number;
  const sizeIndex = product?.sizes.findIndex((a) => a?.size == size) as number;
  const price: number =
    sizeIndex >= 0 ? (product?.sizes[sizeIndex].price as number) : 0;
  if (!product?.name)
    return (
      <p className=" text-red-500 text-center">
        item couldn&apos;t be found size : {size} flavor : {flavor} count :{" "}
        {count}
      </p>
    );
  return (
    <li className="flex items-center justify-between">
      {/* Product image and description */}
      <div className="flex items-center sm:space-x-3 space-x-2">
        <Image
          width={48}
          height={48}
          src={product?.photo}
          alt={product?.name}
          className="object-cover rounded-md"
        />
        <div>
          <p className="  font-bold">
            {product?.name} (x{count})
          </p>
          <p className=" text-sm">
            {flavor} - {size}{" "}
          </p>
          <span className="text-red-500 text-sm flex gap-4">
            {sizeIndex < 0 && <span> {` size ${size} doesn't exist`}</span>}
            {flavorIndex < 0 && (
              <span> {` flavor ${flavor} doesn't exist`}</span>
            )}
          </span>
        </div>
      </div>
      {/* Product total */}
      <span className="text-sm font-semibold">{price * count} EGP</span>
    </li>
  );
}
