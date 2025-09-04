import SectionLanding from "./SectionLanding";
import discover from "../../../assets/apps.svg";
import custom from "../../../assets/custom.svg";
import social from "../../../assets/social.svg";
import stats from "../../../assets/stats.svg";
import CustomTooltip from "../../container/CustomTooltipWrapper";

const Landing = () => {
  return (
    <header className="flex flex-col items-center justify-center">
      <div className="flex flex-col bg-bglanding rounded-2xl w-auto px-12 mt-10 lg:mx-24 xl:mx-48 2xl:mx-[26rem]">
        <div className="flex flex-col items-center gap-4 mt-16 font-bold">
          <h1 className="text-mjtitleldg text-3xl text-center mb-2 break-all max-w-[100%]">
            The next-generation anime platform
          </h1>
          <h4 className="text-spanldg justify-center text-center text-xl max-w-sm font-light mb-10">
            Track, share, and discover your favorite anime and manga with
            Anilist
          </h4>
        </div>
        <div className="flex flex-wrap sm:flex-row justify-evenly items-center mb-16">
        
          <SectionLanding
            svg={stats}
            sectionTitle={"Discover your obsessions"}
            sectionText={
              "What are your highest rated genres or most watched voice actors? Follow your watching habits over time with in-depth statistics"
            }
          />
          <SectionLanding
            svg={discover}
            sectionTitle={"Bring Anilist anywhere"}
            sectionText={
              "keep track your progress on-the-go with one of many Anilist apps across iOS, Android, macOS, and Windows."
            }
          />
          <SectionLanding
            svg={social}
            sectionTitle={"Join the conversation"}
            sectionText={
              "Shake your thoughts with our thriving community, make friends, socialize, and receive recommendations."
            }
          />
          <SectionLanding
            svg={custom}
            sectionTitle={"Tweak it your liking"}
            sectionText={
              "Customize your scoring system, title format, color scheme, and much more! Also, we have a dark mode."
            }
          />
        </div>
      </div>
      <CustomTooltip title="Coming soon" arrow>
        <div className="flex items-center justify-between transition ease-in-out delay-150 hover:scale-110 duration-300 -mt-6 font-semibold mb-24 rounded-3xl w-48 bg-royal shadow-filter hover:shadow-filterblue hover:cursor-pointer text-sectionbtncl py-1.5 px-3">
          <div></div>

          <div className="flex items-center justify-center">Join Now</div>
          <div className="flex items-end justify-end bg-sectioncircle text-royal py-2 px-2 w-9 h-9 rounded-full">
            <svg
              className="flex bg-red w-5 h-5"
              data-v-3428d21c=""
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="chevron-right"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path
                fill="currentColor"
                d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
              ></path>
            </svg>
          </div>
        </div>
      </CustomTooltip>
    </header>
  );
};

export default Landing;
