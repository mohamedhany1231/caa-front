import React from "react";

export default function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`${className} flex flex-col items-center px-[2%] md:px-[5%] py-8`}
    >
      {children}
    </section>
  );
}
