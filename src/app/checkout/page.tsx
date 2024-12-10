"use client";
import React, { useState } from "react";
import { useCart } from "@/app/context/CartContext";
import ProductSummary from "./ProductSummary";

interface Order {
  address: string;
  email: string;
  phone: string;
  name: string;
  message?: string;
  products: {
    productId: string;
    count: number;
    size?: string;
    flavor?: string;
  }[];
}

const CheckoutPage = () => {
  const { state, clearCart } = useCart();
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const orderData: Order = {
      ...form,
      products: state.items.map((item) => ({
        productId: item.id,
        count: item.quantity,
        flavor: item.flavor,
        size: item.size,
      })),
    };

    try {
      const response = await fetch(`${backendUrl}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(
          data.message || "Failed to place the order. Please try again."
        );
      }

      setSuccess(true);
      clearCart();
    } catch (err) {
      setError(err?.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {/* Orders Summary */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        {state.items.length > 0 ? (
          <ul className="space-y-2">
            {state.items.map((item) => (
              <ProductSummary
                key={`${item.id}-${item.flavor}-${item.size}`}
                productId={item.id}
                quantity={item.quantity}
                flavor={item.flavor}
                size={item.size}
              />
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">Your cart is empty.</p>
        )}
      </div>

      {/* Checkout Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md space-y-4"
      >
        <h2 className="text-xl font-semibold mb-4">Customer Information</h2>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="address">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="phone">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Error and Success Messages */}
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && (
          <p className="text-green-500 text-sm">Order placed successfully!</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-sm ${
            isSubmitting ? "opacity-50" : "hover:bg-blue-700"
          } transition`}
        >
          {isSubmitting ? "Submitting..." : "Place Order"}
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;
