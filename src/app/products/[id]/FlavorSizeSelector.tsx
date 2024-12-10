"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

interface FlavorSizeSelectorProps {
  flavors: string[];
  sizes: { size: string; price: string }[];
}
export const FlavorSizeSelector: React.FC<FlavorSizeSelectorProps> = ({
  flavors,
  sizes,
}) => {
  const router = useRouter();
  const params = useSearchParams();
  const searchParams = new URLSearchParams(params);

  const selectedFlavor = params.get("flavor") || flavors[0];
  const selectedSize = params.get("size") || sizes[0].size;

  const pathName = usePathname();

  function update(key: string, value: string) {
    searchParams.set(key, value);
    router.replace(`${pathName}?${searchParams}`, { scroll: false });
  }

  return (
    <div>
      {/* Flavors */}
      <div className="mb-6">
        <span className="font-bold text-gray-900">Select Flavor:</span>
        <div className="flex items-center mt-2 gap-3 flex-wrap">
          {flavors.map((flavor) => (
            <button
              key={flavor}
              onClick={() => update("flavor", flavor)}
              className={`py-2 px-4 rounded-full font-bold transition duration-400 ${
                selectedFlavor === flavor
                  ? "bg-red-600 text-white cursor-default"
                  : "bg-gray-200 hover:bg-red-600 hover:opacity-100 opacity-50 hover:text-white "
              }`}
            >
              {flavor}
            </button>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div className="mb-6">
        <span className="font-bold text-gray-900">Select Size:</span>
        <div className="flex items-center mt-2 gap-3 flex-wrap">
          {sizes.map((s) => (
            <button
              key={s.size}
              onClick={() => update("size", s.size)}
              className={`py-2 px-4 rounded-full font-bold transition duration-400 ${
                selectedSize === s.size
                  ? "bg-red-600 text-white cursor-default"
                  : "bg-gray-200 hover:bg-red-600 hover:opacity-100 opacity-50 hover:text-white "
              }`}
            >
              {s.size}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
export default FlavorSizeSelector;
