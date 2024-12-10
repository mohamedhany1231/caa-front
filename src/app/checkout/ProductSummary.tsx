"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import useProduct from "../hooks/usePorduct";

interface ProductSummaryProps {
  productId: string;
  quantity: number;
  flavor: string;
  size: string;
}

const ProductSummary: React.FC<ProductSummaryProps> = ({
  productId,
  quantity,
  flavor,
  size,
}) => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const { data, error, isLoading } = useProduct(productId);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">Failed to load product details</p>;
  }

  const productPrice = data?.sizes.find((s) => s.size === size)?.price;

  return (
    <div className="flex justify-between text-sm border-b pb-2">
      <p>
        {data?.name} ({flavor}, {size}) x {quantity}
      </p>
      {productPrice && <p>${(productPrice * quantity).toFixed(2)}</p>}
    </div>
  );
};

export default ProductSummary;
