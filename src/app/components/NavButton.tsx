"use client";
import React from "react";
import Link from "next/link";

export function NavButton({
  to,
  label,
  selected,
}: {
  to: string;
  label: string;
  selected: boolean;
}) {
  return (
    <Link
      href={to}
      className={`rounded-md px-3 font-bold py-2 text-sm  text-white 
        ${selected ? "bg-red-900" : ""}
    
      `}
      aria-current="page"
    >
      {label}
    </Link>
  );
}
