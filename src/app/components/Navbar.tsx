"use client";
import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { FaCartShopping } from "react-icons/fa6";
import useMe from "../hooks/useMe";
import { MobileNavButton } from "./MobileNavButton";
import { NavButton } from "./NavButton";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

const paths: { label: string; to: string }[] = [
  { label: "Home", to: "/" },
  { label: "products", to: "/products" },
  { label: "About", to: "/about" },
];

const adminNav = [
  { to: "/admin", label: "admin" },
  { to: "/admin/add-products", label: "Add product" },
  // { to: "/addUser", label: "Add user" },
  { to: "/orders", label: "orders" },
];
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Navbar() {
  const { state } = useCart();
  const cartCount = state.items.length;
  const [isOpen, setIsOpen] = useState(false);
  const path = usePathname();
  const { me } = useMe();
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    try {
      const response = await fetch(`${backendUrl}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        toast.error("Logout failed. Please try again.");
        return;
      }

      toast.success("Logout successful!");
      router.push("/"); // Redirect to login page
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    }
  };

  return (
    <>
      <nav className="   bg-black z-20 w-full relative ">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* <!-- Mobile menu button--> */}
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
                onClick={() => setIsOpen((o) => !o)}
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>
                {/* <!-- */}
                {/* Icon when menu is closed.
  
  Menu open: "hidden", Menu closed: "block"
  --> */}
                <svg
                  className="block size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
                {/* <!--  Icon when menu is open.
  
  Menu open: "block", Menu closed: "hidden"
  --> */}
                <svg
                  className="hidden size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center  sm:justify-between ">
              <div className=" flex items-center">
                <div className="flex  items-center relative h-12 aspect-square   ">
                  <Image
                    fill
                    className="h-12 w-12"
                    src="/a.jpeg"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4 items-center h-full">
                    {/* <!-- Current: "bg-red-900 text-white", Default: "text-gray-300 hover:bg-red-700 hover:text-white" --> */}

                    {paths.map((p) => (
                      <NavButton
                        to={p.to}
                        label={p.label}
                        key={p.label}
                        selected={path === p.to}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <Link
                href={"/cart"}
                className=" text-white text-3xl  hover:text-red-500 transition-colors absolute top-4 right-4  "
              >
                {cartCount > 0 && (
                  <span className=" w-4 text-center aspect-square text-white absolute bg-red-500    -top-2 -right-2 text-xs rounded-full  ">
                    {cartCount}
                  </span>
                )}
                <FaCartShopping />
              </Link>
            </div>
          </div>
        </div>

        {/* <!-- Mobile menu, show/hide based on menu state. --> */}
        <div className="sm:hidden" id="mobile-menu">
          <div
            className={`${isOpen ? "" : "hidden"}  space-y-1 px-2 pb-3 pt-2`}
          >
            {/* <!-- Current: "bg-red-900 text-white", Default: "text-gray-300 hover:bg-red-700 hover:text-white" --> */}

            {paths.map((p) => (
              <MobileNavButton
                to={p.to}
                label={p.label}
                key={p.label}
                selected={path === p.to}
                handleClick={() => setIsOpen(false)}
              />
            ))}
            {me?._id && (
              <>
                {adminNav.map((p) => (
                  <MobileNavButton
                    to={p.to}
                    label={p.label}
                    key={p.label}
                    selected={path === p.to}
                    handleClick={() => setIsOpen(false)}
                  />
                ))}

                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                  className={`  block   capitalize rounded-md  text-lg font-bold    px-3  pt-6 pb-2  text-red-700 hover:text-red-500`}
                >
                  logut
                </button>
              </>
            )}
          </div>
        </div>
        {/* mask */}
        {isOpen && (
          <div
            className=" h-screen w-screen bg-black fixed z-10 bg-opacity-50"
            onClick={() => setIsOpen(false)}
          ></div>
        )}
        {me?._id && (
          <div className=" absolute w-[90%] hidden sm:block bg-gradient-to-r from-black via-gray-950 to-black left-[5%] ">
            <AdminNav handleLogout={handleLogout} />
          </div>
        )}
      </nav>
    </>
  );
}

function AdminNav({ handleLogout }: { handleLogout: () => void }) {
  const pathname = usePathname();

  // Logout function

  // Highlighted styles for active buttons

  return (
    <>
      <div className=" max-w-5xl     sm:p-3   sm:block hidden mx-auto z-0 ">
        <div className="container flex mx-auto   justify-between items-center  ">
          {/* Left Buttons */}
          <div className="flex space-x-4 flex-nowrap ">
            {adminNav.map((nav) => (
              <NavButton
                to={nav.to}
                label={nav.label}
                key={nav.to}
                selected={pathname === nav.to}
              />
            ))}
          </div>

          {/* Logout Button */}
          <div>
            <button
              onClick={handleLogout}
              className={`bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors`}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
