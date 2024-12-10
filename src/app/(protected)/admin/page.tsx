// "use client";
import React, { useState, useEffect } from "react";
import Filter from "@/app/components/Filter";
import fetchProducts from "@/app/utils/fetchProducts";
import Pagination from "@/app/components/Pagination";
import { AdminCard } from "./AdminCard";
import fetchStared from "@/app/utils/fetchStaredProducts";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

// Mock function for backend call to star a product

const ProductsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { products: staredProducts } = await fetchStared();
  const { sort = "", filter = "", page = 1, max } = await searchParams;

  const itemsPerPage = 8;

  const { products, count, error } = await fetchProducts({
    page: +page,
    sort,
    name: filter,
    maxPrice: max,
  });
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Products</h1>
      {error && <p className=" text-red-500 text-lg">{error}</p>}

      {/* Search Bar */}
      {/* <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-3 border rounded mb-6"
      /> */}
      <Filter filter={filter} highestPrice={"12000"} currentMax={max} />

      {/* Starred Products */}
      {page == 1 && staredProducts.length > 0 && +page < 2 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Starred Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6 bg-yellow-50 p-2">
            {staredProducts.map((product, index) => (
              <AdminCard
                key={index}
                id={product._id}
                photo={product.photo}
                name={product.name}
                description={product.description}
                price={product.price}
                sizes={product.sizes}
                flavors={product.flavors}
                isStarred={product.isStarred}
              />
            ))}
          </div>
        </div>
      )}

      {/* All Products */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">All Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products?.map((product, index) => (
            <AdminCard
              key={index}
              id={product._id}
              photo={product.photo}
              name={product.name}
              description={product.description}
              price={product.price}
              sizes={product.sizes}
              flavors={product.flavors}
              isStarred={product.isStarred}
            />
          ))}
        </div>
      </div>

      {/* Pagination */}
      <Pagination
        totalItems={count}
        itemsPerPage={itemsPerPage}
        currentPage={+page}
      />
    </div>
  );
};

export default ProductsPage;
