"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { FILTER_KEYS } from "../../../utilities/Data";
import React from "react";

const SelectedFiltersTags = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleRemove = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    const updatedValues = searchParams.getAll(key).filter((v) => v !== value);
    params.delete(key);
    updatedValues.forEach((v) => params.append(key, v));

    router.push(`/search/anime?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap  mx-2 rounded-lg mt-8">
      {FILTER_KEYS.map((key) => {
        const values = searchParams.getAll(key);
        return values.map((value, idx) => (
          <div
            key={`${key}-${idx}`}
            className="group flex gap-2 m-2 bg-blue text-white items-center justify-center bg-blue-100 text-sm font-medium px-1.5 py-1 rounded-md"
          >
            <span className="mr-0.5">{value}</span>
            <button
              onClick={() => handleRemove(key, value)}
              className=" hidden group-hover:flex text-white"
            >
              &times;
            </button>
          </div>
        ));
      })}
    </div>
  );
};

export default SelectedFiltersTags;
