"use client";
import React, { MouseEventHandler } from "react";
import Link from "next/link";

export function MobileNavButton({
  to,
  label,
  selected,
  handleClick,
}: {
  to: string;
  label: string;
  selected: boolean;
  handleClick: MouseEventHandler;
}) {
  return (
    <Link href={to} aria-current="page">
      <div
        onClick={handleClick}
        className={`  block rounded-md   px-3 py-2 text-base font-medium text-white ${
          selected ? "bg-red-900" : " hover:bg-red-700"
        }`}
      >
        {label}
      </div>
    </Link>
  );
}
