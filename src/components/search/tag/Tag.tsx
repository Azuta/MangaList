"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import SelectedFiltersTags from "./SelectedFiltersTag";
import { FILTER_KEYS } from "../../../utilities/Data";

const Tag = () => {
  const searchParams = useSearchParams();

  const hasTags = FILTER_KEYS.some(
    (key) => searchParams.getAll(key).length > 0
  );

  return (
    <div className="flex items-center justify-start mx-[52px] sm:ml-2 sm:mx-[66px] md:min-mx-[16px] lg:mx-[18px] 2xl:ml-[320px] xl:ml-[210px] xl:mx-[160px] 2xl:max-w-[700px] 2xl:mx-32">
      {hasTags && (
        <div className="flex items-center mt-12 w-7 h-7">
          <svg
            className="flex text-chevroncol"
            data-icon="tags"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 700 800"
          >
            <path
              data-v-cd1dc2b6=""
              fill="currentColor"
              d="M497.941 225.941L286.059 14.059A48 48 0 0 0 252.118 0H48C21.49 0 0 21.49 0 48v204.118a48 48 0 0 0 14.059 33.941l211.882 211.882c18.744 18.745 49.136 18.746 67.882 0l204.118-204.118c18.745-18.745 18.745-49.137 0-67.882zM112 160c-26.51 0-48-21.49-48-48s21.49-48 48-48 48 21.49 48 48-21.49 48-48 48zm513.941 133.823L421.823 497.941c-18.745 18.745-49.137 18.745-67.882 0l-.36-.36L527.64 323.522c16.999-16.999 26.36-39.6 26.36-63.64s-9.362-46.641-26.36-63.64L331.397 0h48.721a48 48 0 0 1 33.941 14.059l211.882 211.882c18.745 18.745 18.745 49.137 0 67.882z"
            ></path>
          </svg>
        </div>
      )}
      <SelectedFiltersTags />
    </div>
  );
};

export default Tag;
