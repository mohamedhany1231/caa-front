"use client";
import starProduct from "@/app/utils/starProduct";
import updateProduct from "@/app/utils/updateProduct";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";

export const AdminCard = ({
  id,
  photo,
  name,
  description,
  price,
  sizes = [{ size: "Default", price: price }],
  flavors = ["None"],
  isStarred,
}: {
  id: string;
  photo: string;
  name: string;
  description: string;
  price: number;
  sizes?: { size: string; price: number }[];
  flavors?: string[];
  isStarred?: boolean;
}) => {
  const [editMode, setEditMode] = useState(false);
  const [formState, setFormState] = useState({
    name,
    description,
    price,
    photo: null as File | null,
    sizes,
    flavors,
  });
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormState({ ...formState, photo: file });
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

  // TODO: make start api
  const handleStarToggle = async () => {
    await starProduct(id);
    router.refresh();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    // formData.append("_id", id);
    formData.append("name", formState.name);
    formData.append("description", formState.description);
    if (formState.photo) formData.append("photo", formState.photo);
    formData.append("sizes", JSON.stringify(formState.sizes));
    formData.append("flavors", JSON.stringify(formState.flavors));

    await updateProduct(formData, id);
    setEditMode(false);
    router.refresh();
  };
  const handleCancel = () => {
    setFormState({
      name,
      description,
      price,
      photo: null,
      sizes,
      flavors,
    });
    setEditMode(false);
  };

  return (
    <div className="relative border border-gray-300 rounded-lg p-4 shadow-sm bg-gray-50 transition-colors">
      {/* Star Icon */}
      <div
        className="absolute top-2 right-2 cursor-pointer"
        onClick={handleStarToggle}
      >
        {isStarred ? (
          <AiFillStar className="text-yellow-400 text-2xl hover:text-yellow-100 bg-black rounded-full bg-opacity-100 hover:bg-opacity-60" />
        ) : (
          <AiOutlineStar className="text-yellow-100 text-2xl hover:text-yellow-400 bg-black rounded-full bg-opacity-60 hover:bg-opacity-100" />
        )}
      </div>

      {editMode ? (
        // Edit Mode
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-2 text-gray-900">
              Image
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full text-sm text-gray-700 border border-gray-300 rounded px-2 py-1"
            />
            <Image
              height={1000}
              width={1000}
              src={
                formState.photo ? URL.createObjectURL(formState.photo) : photo
              }
              alt={formState.name}
              className="h-40 w-full object-cover rounded mt-2"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-gray-900">
              name
            </label>
            <input
              type="text"
              name="name"
              value={formState.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>

          <div>
            <label className="block text-sm font-bold mb-2 text-gray-900">
              Description
            </label>
            <textarea
              name="description"
              value={formState.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-2 py-1"
            ></textarea>
          </div>

          <div>
            <div className=" grid grid-cols-2">
              <p className="text-sm font-bold mb-2">Size</p>
              <p className="text-sm font-bold mb-2">price</p>
            </div>
            {formState.sizes.map((size, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Size"
                  value={size.size}
                  onChange={(e) =>
                    handleSizeChange(index, "size", e.target.value)
                  }
                  className="w-1/2 border border-gray-300 rounded px-2 py-1"
                />
                <input
                  placeholder="Price"
                  value={size.price}
                  onChange={(e) =>
                    handleSizeChange(index, "price", e.target.value)
                  }
                  className="w-1/2 border border-gray-300 rounded px-2 py-1"
                />
                <button
                  type="button"
                  onClick={() => removeSize(index)}
                  className="text-red-600 text-3xl"
                >
                  <FiMinusCircle />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addSize}
              className="text-blue-600 font-bold flex items-center gap-2"
            >
              <span className=" text-2xl ">
                <FiPlusCircle />
              </span>
              Add Size
            </button>
          </div>

          <div>
            <p className="block text-sm font-bold mb-2 text-gray-900">
              Flavors
            </p>
            {formState.flavors.map((flavor, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Flavor"
                  value={flavor}
                  onChange={(e) => handleFlavorChange(index, e.target.value)}
                  className="grow border border-gray-300 rounded px-2 py-1"
                />
                <button
                  type="button"
                  onClick={() => removeFlavor(index)}
                  className="text-red-600 text-3xl"
                >
                  <FiMinusCircle />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addFlavor}
              className="text-blue-600 font-bold flex items-center gap-2"
            >
              <span className=" text-2xl ">
                <FiPlusCircle />
              </span>
              Add Flavor
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
            <button
              type="button"
              onClick={handleSubmit}
              className="flex-grow sm:flex-grow-0 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="flex-grow sm:flex-grow-0 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        // View Mode
        <div>
          <Image
            width={1000}
            height={1000}
            src={photo}
            alt={name}
            className="h-40 w-full object-cover rounded"
          />

          <h2 className="text-lg font-bold mt-2 text-gray-900">{name}</h2>
          <p className="text-sm text-gray-700">{description}</p>
          <p className="text-sm font-bold text-gray-900 mt-1">${price}</p>
          <button
            type="button"
            onClick={() => setEditMode(true)}
            className="w-full mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};
