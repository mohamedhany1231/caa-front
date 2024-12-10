import React, { useState } from "react";

const QuantitySelector = ({ quantity, setQuantity }) => {
  // Handle increment
  const increment = () => {
    if (quantity < 20) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  // Handle decrement
  const decrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  // Handle manual input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!value) return setQuantity(1);
    if (value >= 1 && value <= 20) {
      setQuantity(value);
    }
  };

  return (
    <div className="max-w-xs  flex items-center gap-4">
      <label
        htmlFor="quantity-input"
        className="block mb-2 text-lg  text-gray-900 capitalize font-bold"
      >
        quantity
      </label>
      <div className="relative grid grid-cols-3 items-center max-w-[8rem]">
        <button
          type="button"
          onClick={decrement}
          className="bg-gray-100 hover:bg-gray-200  transition-colors border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none"
        >
          <svg
            className="w-3 h-3 text-gray-900"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 2"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h16"
            />
          </svg>
        </button>
        <input
          id="quantity-input"
          value={quantity}
          onChange={handleChange}
          style={{ WebkitAppearance: "none" }}
          className="  bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block  py-2.5 placeholder-gray-400 focus:outline-none"
          min="1"
          max="20"
        />
        <button
          type="button"
          onClick={increment}
          className="bg-gray-100 hover:bg-gray-200  transition-colors border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none"
        >
          <svg
            className="w-3 h-3 text-gray-900"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 1v16M1 9h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default QuantitySelector;
