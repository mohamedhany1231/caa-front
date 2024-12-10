import Image from "next/image";
import React from "react";

export default function Hero() {
  return (
    <div
      className="relative w-full h-[40vh] md:h-[70vh] text-gray-50 "
      id="home"
    >
      <div className="absolute inset-0 opacity-90 ">
        <Image
          fill
          src="/creatine.jpg"
          alt="Background Image"
          className="object-cover object-center w-full h-full brightness-[0.1] "
        />
      </div>
      <div className="  inset-x-4 inset-y-9  md:px-12 absolute sm:inset-9 flex flex-col md:flex-row items-center justify-center">
        <div className=" mx-auto lg:w-1/3 mb-4 md:mb-0 text-center">
          <h1 className="  text-5xl sm:text-7xl md:text-9xl leading-tight mb-2 font-bold">
            C
            <span
              className="relative text-transparent bg-clip-text"
              style={{
                backgroundImage:
                  "linear-gradient(to bottom right, #f9fafb 49%, #dc262625 50%)",
              }}
            >
              AA
            </span>
          </h1>

          <p className="font-regular  sm:text-xl mb-8 mt-4">
            Boost your performance and recovery with our top-quality creatine,
            protein, and more. Fuel your fitness journey today!{" "}
          </p>
          {/* <a
            href="#contactUs"
            className="px-6 py-3 bg-[#c8a876] text-white font-medium rounded-full hover:bg-[#c09858]  transition duration-200"
          >
            Contact Us
          </a> */}
        </div>
      </div>
    </div>
  );
}
