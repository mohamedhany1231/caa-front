"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
}

export default function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const router = useRouter();

  const goToPage = (page: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  // Function to generate the pagination range
  const generatePaginationRange = (): {
    previous: (string | number)[];
    after: (string | number)[];
  } => {
    const previous: (number | string)[] = [];
    const after: (number | string)[] = [];

    // Always include the first page
    if (currentPage >= 3) previous.push(1);
    if (currentPage >= 4) previous.push("...");
    if (currentPage > 1) previous.push(currentPage - 1);

    // Include one page before, the current page, and two after
    for (
      let i = currentPage + 1;
      i <= Math.min(totalPages, currentPage + 2);
      i++
    ) {
      after.push(i);
    }

    // Always include the last page
    if (currentPage < totalPages - 3) after.push("...");
    if (currentPage < totalPages - 2) after.push(totalPages);

    return { previous, after };
  };

  const { previous, after } = generatePaginationRange();

  return (
    <div className="flex justify-center mt-6">
      <div className="flex gap-2">
        {currentPage > 1 && (
          <PaginationButton
            label={<IoIosArrowBack />}
            navToPage={goToPage}
            pageNumber={currentPage - 1}
          />
        )}

        {/* Page Numbers */}
        {previous.map((item, index) =>
          item == "..." ? (
            <PaginationButton
              label={item}
              pageNumber={currentPage - 2}
              navToPage={goToPage}
              key={`${item}-${index}`}
            />
          ) : (
            <PaginationButton
              label={item}
              pageNumber={+item}
              navToPage={goToPage}
              key={`${item}-${index}`}
            />
          )
        )}

        <PaginationButton label={currentPage} />

        {after.map((item, index) =>
          item == "..." ? (
            <PaginationButton
              label={item}
              pageNumber={currentPage + 3}
              navToPage={goToPage}
              key={`${item}-${index}`}
            />
          ) : (
            <PaginationButton
              label={item}
              pageNumber={+item}
              navToPage={goToPage}
              key={`${item}-${index}`}
            />
          )
        )}

        {/* Next Button */}
        {currentPage > totalPages && (
          <PaginationButton
            label={<IoIosArrowForward />}
            navToPage={goToPage}
            pageNumber={currentPage + 1}
          />
        )}
      </div>
    </div>
  );
}

function PaginationButton({
  label,
  pageNumber,
  navToPage,
}: {
  label: ReactNode | number | string;
  pageNumber?: number;
  navToPage?: (number: number) => void;
}) {
  return (
    <button
      className={`px-4 py-2 rounded-full bg-gray-50   ${
        !pageNumber
          ? " !bg-red-500 cursor-default text-white"
          : " border border-gray-200 hover:border-transparent  hover:bg-red-500 hover:scale-105 hover:text-white transition-all"
      }`}
      onClick={
        navToPage && pageNumber ? () => navToPage(pageNumber) : undefined
      }
    >
      {label}
    </button>
  );
}
