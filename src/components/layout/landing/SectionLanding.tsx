import Image from "next/image";
import React from "react";

type SectionLandingProps = {
  sectionTitle: string;
  sectionText: string;
  svg: string;
}

const SectionLanding = ({ sectionTitle, sectionText, svg }: SectionLandingProps) => {
  return (
    <div className="flex flex-wrap items-center justify-center sm:justify-evenly mt-8 my-6">
      <Image
        className="h-24 w-20"
        alt="landings"
        width={20}
        height={20}
        src={svg}
        style={{ height: "80 px", width: "74.72 px" }}
      />
      <div className="flex flex-col ml-8 mx-w-[100%] break-all">
        <h6 className="text-mjtitleldg text-lg w-64 flex items-center">{sectionTitle}</h6>
        <span className=" flex items-center justify-center text-spanldg break-all max-w-[100%] w-[250px] sm:w-[300px] mt-2 text-[12px] sm:text-[14px] font-light leading-6">
          {sectionText}
        </span>
      </div>
    </div>
  );
};

export default SectionLanding;
