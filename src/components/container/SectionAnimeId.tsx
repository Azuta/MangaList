import React from "react";

type SectionAnimeId = {
title: string;
span: string;
}

const SectionAnimeId = ({title, span} : SectionAnimeId) => {
  return (
    <div className="flex flex-col lg:gap-0 xl:gap-1">
      <h6 className="text-titlesec text-sm">{title}</h6>
      <span className="text-xs text-txnav mb-2 lg:mb-4 xl:mb-6">{span}</span>
    </div>
  );
};

export default SectionAnimeId;
