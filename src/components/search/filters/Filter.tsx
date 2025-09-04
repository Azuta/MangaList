'use client';
import DropdownContainer from "./DropdownContainer";
import React, { useEffect, useRef, useState } from "react";
import { FORMAT, GENRES, STATUS, YEARS } from "../../../utilities/Data";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useDebounce } from "@/hooks/useDebounce";
import { useMedia } from "@/context/mediaContext"; // <-- cambio aquí

interface FilterProps {
  category: string;
  placeholder?: string;
  queryParams?: { [key: string]: string | string[] };
}

const Filter = ({ category, placeholder }: FilterProps) => {
  const { queryParams } = useMedia(); // <-- cambio aquí
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const [inputValue, setInputValue] = useState(
    typeof queryParams[category] === "string" ? queryParams[category] : ""
  );
  const debouncedValue = useDebounce(inputValue, 500);

  const isSearchFilter = category === "Search";

  const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    router.push(`/search/media?search=${queryParams.Search}`); // <-- cambio aquí
  };

  const mapCategoryIntoContents = (categoryString: string) => {
    if (categoryString === "Genres") return GENRES;
    if (categoryString === "Year") return YEARS;
    if (categoryString === "Format") return FORMAT;
    if (categoryString === "Airing Status") return STATUS;
    return [];
  };

  const contents = mapCategoryIntoContents(category);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isSearchFilter) return;

    const params = new URLSearchParams(searchParams.toString());
    if (debouncedValue) {
      params.set(category, debouncedValue);
      router.push(`/search/media?${params.toString()}`); // <-- cambio aquí
    } else {
      params.delete(category);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  return (
    <div onSubmit={handleSubmit} ref={dropdownRef}>
      <div className="cursor-pointer z-50">
        <h6 className="text-lead text-base font-medium pt-4 mb-1">{category}</h6>
        <div className="flex items-center rounded-md outline-none bg-white shadow-filter box-border font-medium text-sm py-2.5 ">
          {isSearchFilter && (
            <Image
              className="items-center ml-2"
              height={10}
              width={10}
              alt="chevron"
              src={"https://anifinder.netlify.app/static/media/icons-search.aeb48093.svg"}
              style={{ height: "18px", width: "18px" }}
            />
          )}
          <input
            className={`first-letter:flex sm:max-w-[96px] md:max-w-[104px] lg:max-w-36 ml-2 ${
              isSearchFilter ? "cursor-text" : "cursor-pointer"
            } focus:outline-none text-blue`}
            placeholder={placeholder}
            onClick={() => setIsOpen((prev) => !prev)}
            value={isSearchFilter ? inputValue : (queryParams[category] as string)}
            readOnly={!isSearchFilter}
            onChange={(e) => isSearchFilter && setInputValue(e.target.value)}
          />
          {queryParams[category] && (
            <button
              className="text-chevroncol rounded-full font-normal text-[16px] mr-3"
              onClick={() => {
                const params = new URLSearchParams(window.location.search);
                params.delete(category);
                router.push(`/search/media?${params.toString()}`);
                if (isSearchFilter) setInputValue("");
              }}
            >
              <svg className="flex items-center justify-center w-4 h-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
                <path
                  fill="currentColor"
                  d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
                ></path>
              </svg>
            </button>
          )}
          {category && category !== "Search" && !queryParams[category] && (
            <svg
              className="h-4 w-6 mt-[-4px] text-sm mr-1 text-chevroncol"
              onClick={() => setIsOpen(!isOpen)}
            >
              <path
                d="M6.34317 7.75732L4.92896 9.17154L12 16.2426L19.0711 9.17157L17.6569 7.75735L12 13.4142L6.34317 7.75732Z"
                fill="currentColor"
              ></path>
            </svg>
          )}
        </div>
      </div>

      {isOpen && (
        <DropdownContainer contents={contents} category={category} onSelect={() => setIsOpen(false)} />
      )}
    </div>
  );
};

export default Filter;
