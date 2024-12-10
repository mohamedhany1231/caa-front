"use client";
import postProduct from "@/app/utils/postProduct";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";

const AddAdminProduct = () => {
  const [formState, setFormState] = useState({
    name: "",
    description: "",
    photoFile: null as File | null,
    sizes: [{ size: "", price: 0 }],
    flavors: [""],
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormState({ ...formState, photoFile: file });
  };

  const handleSizeChange = (
    index: number,
    key: string,
    value: string | number
  ) => {
    const updatedSizes = [...formState.sizes];

    if (key == "price" && isNaN(value as number)) return;
    if (key == "price") value = +value;
    updatedSizes[index] = { ...updatedSizes[index], [key]: value };
    setFormState({ ...formState, sizes: updatedSizes });
  };

  const addSize = () => {
    setFormState((prev) => ({
      ...prev,
      sizes: [...prev.sizes, { size: "", price: 0 }],
    }));
  };

  const removeSize = (index: number) => {
    if (formState.sizes.length > 1) {
      const updatedSizes = formState.sizes.filter((_, i) => i !== index);
      setFormState({ ...formState, sizes: updatedSizes });
    }
  };

  const handleFlavorChange = (index: number, value: string) => {
    const updatedFlavors = [...formState.flavors];
    updatedFlavors[index] = value;
    setFormState({ ...formState, flavors: updatedFlavors });
  };

  const addFlavor = () => {
    setFormState((prev) => ({
      ...prev,
      flavors: [...prev.flavors, ""],
    }));
  };

  const removeFlavor = (index: number) => {
    if (formState.flavors.length > 1) {
      const updatedFlavors = formState.flavors.filter((_, i) => i !== index);
      setFormState({ ...formState, flavors: updatedFlavors });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    if (isLoading) return;
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", formState.name);
    formData.append("description", formState.description);

    if (formState.photoFile) {
      formData.append("photo", formState.photoFile);
    }

    formData.append("sizes", JSON.stringify(formState.sizes));
    formData.append("flavors", JSON.stringify(formState.flavors));

    const response = await postProduct(formData);
    if (response?.error) {
      setError(response.message);
    } else {
      setFormState({
        name: "",
        description: "",
        photoFile: null as File | null,
        sizes: [{ size: "", price: 0 }],
        flavors: [""],
      });
      toast.success("product successfully created", { duration: 3000 });
    }

    setIsLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto  p-6 border rounded shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <p className=" text-red-500">{error} </p>
      <form onSubmit={handleSubmit}>
        {/* name */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">name</label>
          <input
            type="text"
            name="name"
            value={formState.name}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Description</label>
          <textarea
            name="description"
            value={formState.description}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
          ></textarea>
        </div>

        {/* Photo */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Product Image</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full border rounded px-4 py-2"
          />
        </div>

        {/* Sizes */}
        <div className="mb-4">
          <div className=" grid grid-cols-2">
            <p className="text-sm font-bold mb-2">Size</p>
            <p className="text-sm font-bold mb-2">price</p>
          </div>
          {formState.sizes.map((size, index) => (
            <div key={index} className="flex gap-4 mb-2">
              <input
                type="text"
                placeholder="Size"
                value={size.size}
                onChange={(e) =>
                  handleSizeChange(index, "size", e.target.value)
                }
                className="w-1/2 border rounded px-4 py-2"
              />
              <input
                placeholder="Price"
                value={size.price}
                onChange={(e) =>
                  handleSizeChange(index, "price", e.target.value)
                }
                className="w-1/2 border rounded px-4 py-2"
              />
              <button
                type="button"
                onClick={() => removeSize(index)}
                className="text-red-600 text-xl"
              >
                <FiMinusCircle />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addSize}
            className="text-blue-600 flex items-center gap-2 mt-6 mb-8"
          >
            <FiPlusCircle /> Add Size
          </button>
        </div>

        {/* Flavors */}
        <div className="mb-4">
          <p className="text-sm font-bold mb-2">Flavors</p>
          {formState.flavors.map((flavor, index) => (
            <div key={index} className="flex gap-4 mb-2">
              <input
                type="text"
                placeholder="Flavor"
                value={flavor}
                onChange={(e) => handleFlavorChange(index, e.target.value)}
                className="w-1/2 border rounded px-4 py-2"
              />
              <button
                type="button"
                onClick={() => removeFlavor(index)}
                className="text-red-600 text-xl"
              >
                <FiMinusCircle />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addFlavor}
            className="text-blue-600 flex items-center gap-2 mt-6 mb-8"
          >
            <FiPlusCircle /> Add Flavor
          </button>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className={`px-6 py-2 bg-green-600 text-white rounded   ${
              isLoading ? "opacity-50 cursor-wait" : "hover:bg-green-700"
            } `}
          >
            {isLoading ? "Loading..." : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAdminProduct;
