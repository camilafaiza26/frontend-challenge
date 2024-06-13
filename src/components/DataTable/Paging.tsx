import React from "react";
import Image from "next/image";

interface PagingProps {
  totalPages?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  showPerPage?: number;
  onShowPerPageChange?: (perPage: number) => void;
  totalData?: number;
}

const Pagination = ({ totalPages, currentPage, onPageChange }: PagingProps) => {
  if (!totalPages || !currentPage || !onPageChange) return null;
  return (
    <div className="mt-4 flex justify-end">
      <nav
        className="relative z-0 inline-flex shadow-sm -space-x-px"
        aria-label="Pagination"
      >
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <Image
            src="/images/icon/ic_chevron_left_outline.svg"
            alt="List Alt Icon"
            width={24}
            height={24}
            className="mr-2"
          />
        </button>
        {[...Array(totalPages).keys()].map((index) => (
          <button
            key={index + 1}
            onClick={() => onPageChange(index + 1)}
            className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 ${
              currentPage === index + 1 ? "z-10 bg-gray-100" : ""
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <Image
            src="/images/icon/ic_chevron_right_outline.svg"
            alt="List Alt Icon"
            width={24}
            height={24}
            className="mr-2"
          />
        </button>
      </nav>
    </div>
  );
};

const ShowPage = ({
  showPerPage,
  onShowPerPageChange,
  totalData,
}: PagingProps) => {
  const options = [5, 10, 15, 20];

  if (!showPerPage || !onShowPerPageChange || !totalData) return null;

  return (
    <div className="mt-4 flex justify-end items-center">
      <label className="text-sm text-gray-700 mr-2">Show:</label>
      <select
        value={showPerPage}
        onChange={(e) => onShowPerPageChange(Number(e.target.value))}
        className="w-24 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span className="ml-2 text-sm font-medium text-gray-700">
        per page of {totalData} results
      </span>
    </div>
  );
};

export default function Paging({
  totalPages,
  currentPage,
  onPageChange,
  showPerPage,
  onShowPerPageChange,
  totalData,
}: PagingProps) {
  return (
    <div className="flex flex-row justify-between mt-4">
      <ShowPage
        showPerPage={showPerPage}
        onShowPerPageChange={onShowPerPageChange}
        totalData={totalData}
      />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </div>
  );
}
