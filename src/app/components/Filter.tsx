"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ReactNode, useEffect, useRef, useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import useMaxPrice from "../hooks/useMaxPrice";
// import getMaxPrice from "../utils/getMaxPrice";

export default function Filter({
  filter,
  sort,
  highestPrice,
  currentMax,
}: {
  filter?: string;
  sort?: string;
  highestPrice?: string;
  currentMax?: string;
}) {
  const router = useRouter();
  const params = useSearchParams();
  const searchParams = new URLSearchParams(params);

  const [Price, setPrice] = useState<number>(
    Number(currentMax || highestPrice) || 300
  );

  const pathName = usePathname();

  function update(key: string, value: string) {
    searchParams.set(key, value);
    router.replace(`${pathName}?${searchParams}`, { scroll: false });
  }

  let x: string | number | NodeJS.Timeout | undefined;
  function changeRange(value: number) {
    clearTimeout(x);
    setPrice(value);
    x = setTimeout(() => {
      update("max", `${value}`);
    }, 1000);
  }

  const options = [
    { value: "", label: "Sort by" },
    { value: "price", label: "Price (Low to High)", icon: <FaArrowUp /> },
    {
      value: "-price",
      label: "Price (High to Low)",
      icon: <FaArrowDown />,
    },
    { value: "name", label: "A-Z", icon: <FaArrowUp /> },
    { value: "-name", label: "Z-A", icon: <FaArrowDown /> },
  ];
  const { data, isLoading, error } = useMaxPrice();
  if (isLoading) return;
  const max = data?.max || 0;
  const min = data?.min || 0;
  return (
    <div className=" grid lg:grid-cols-2 items-center justify-items-stretch lg:gap-14 gap-2 ">
      {/* Filter */}
      <input
        type="text"
        name="filter"
        placeholder="Search products..."
        className=" block border border-gray-300 rounded-2xl px-4 py-2 w-full  "
        defaultValue={filter || ""}
        onChange={(e) => update("filter", e.target.value)}
      />

      <div className=" flex items-center justify-around gap-6">
        <div className="rounded-lg md:min-w-80  grow lg:grow-0 ">
          <div className="price-range p-4">
            <span className="text-sm md:text-base ">{Price}</span>
            <span className="text-sm md:text-base"> EGP </span>
            <input
              className="w-full accent-red-800 cursor-pointer   "
              type="range"
              value={Price}
              min={min}
              max={max}
              onChange={(e) => {
                changeRange(+e.target.value);
              }}
              style={{}}
            />
            <div className="-mt-2 flex w-full justify-between">
              <span className="text-sm md:text-base text-gray-600">{min}</span>
              <span className="text-sm md:text-base text-gray-600">{max}</span>
            </div>
          </div>
        </div>
        {/* Sort */}
        {/* 
        <select
          name="sort"
          className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-1/3 max-w-24 cursor-pointer  "
          defaultValue={sort || ""}
          onChange={(e) => update("sort", e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="price-asc">
            Price <FaArrowUp />
          </option>
          <option value="price-desc">
            Price{" "}
            <span className=" h-4 w-4">
              <FaArrowDown />
            </span>
          </option>
          <option value="alpha">A-Z</option>
          <option value="reverse-alpha"> Z-A</option>
        </select> */}
        <CustomSelect
          options={options}
          onChange={(val: string) => update("sort", val)}
          selected={sort}
        />
      </div>
    </div>
  );
}

const CustomSelect = ({
  options,
  onChange,
  selected = options[0].label,
}: {
  options: { label: string; value: string; icon?: ReactNode }[];
  onChange: (e: string) => void;
  selected?: string;
}) => {
  // const [selected, setSelected] = useState(sort || "");
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleSelect = (value: string) => {
    if (value != "") onChange(value);
    setIsOpen(false); // Close dropdown when an option is selected
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const closeDropdown = (e: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
      setIsOpen(false); // Close dropdown if clicked outside
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeDropdown);
    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

  return (
    <div className="relative inline-block w-full md:w-1/3" ref={selectRef}>
      <button
        className=" text-sm  sm:text-base border border-gray-300 rounded-md px-4 py-2 w-full text-left"
        type="button"
        onClick={toggleDropdown}
      >
        {options.find((opt) => opt.value === selected)?.label || "Sort by"}
      </button>
      {isOpen && (
        <ul className=" text-sm  sm:text-base absolute left-0 right-0 bg-white border border-gray-300 rounded-md mt-2 z-10">
          {options.map((option) => (
            <li
              key={option.value}
              className={`px-4 py-2   cursor-pointer flex items-center gap-2 ${
                option.value == ""
                  ? " bg-gray-300 text-gray-500 !cursor-default"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => handleSelect(option.value)}
            >
              <span className="w-4 h-4">{option.icon && option.icon}</span>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
