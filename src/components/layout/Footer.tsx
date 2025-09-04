import React from "react";
import CustomTooltip from "../container/CustomTooltipWrapper";

const Footer = () => {
  const sections = [
    {
      title: "Donate",
      links: ["AniLand.co", "AniChart.net"],
      extraClasses: "xl:ml-80",
    },
    {
      title: "Apps",
      links: ["Site Stats", "ARecomendations", "API"],
      extraClasses: "xl:ml-52",
    },
    {
      title: "Discord",
      links: ["Twitter", "Facebook", "GitHub"],
      extraClasses: "xl:ml-36",
    },
    {
      title: "App Data",
      links: ["Moderators", "Contact", "Terms & Privacy", "Site Map"],
    },
  ];

  return (
    <footer className=" grid mt-10 font-bold bg-footerbg">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 2xl:mt-10 ml-8 sm:ml-48">
        <div>
          <div className="flex mt-6 mb-4 text-blue">Site Theme</div>
          <div className="flex gap-2 mb-8">
            {["bg-bgcbody", "text-footertxt"].map((style, index) => (
                <CustomTooltip key={index} arrow title="Coming soon" placement={"top"}>
              <div
                
                className={`px-3 py-3 w-2 h-2 rounded-sm inline-block border-2 border-bordersq ${style}`}
              >
              
                  <span className="flex text-left font-light -mt-1.5 -ml-2.5">
                    A
                  </span>
                
              </div>
              </CustomTooltip>
            ))}
          </div>
        </div>

        {sections.map(({ title, links, extraClasses }, index) => (
          <div key={index} className={`${extraClasses} mb-6`}>
            <h2 className="cursor-pointer text-footertxt hover:text-blue mt-6 mb-2">
              <CustomTooltip arrow title="Coming soon" placement={"top"}>
                <span>{title}</span>
              </CustomTooltip>
            </h2>
            {links.map((link, i) => (
              <h2
                key={i}
                className="cursor-pointer text-footertxt hover:text-blue mb-2"
              >
                <CustomTooltip arrow title="Coming soon" placement={"top"}>
                  <span>{link}</span>
                </CustomTooltip>
              </h2>
            ))}
          </div>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
