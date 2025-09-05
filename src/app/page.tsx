"use client";
import { useMedia } from "@/context/mediaContext";
import Navbar from "@/components/layout/Navbar";
import SliderMediaContainer from "./media/SliderMediaContainer";
import GridMediaContainer from "./media/gridMediaContainer";
import UserLastChapterSidebar from "./media/userLastChapterSidebar";

const Home = () => {
  const { mediaRows, isLoading } = useMedia();

  if (isLoading) return <div>Loading...</div>;
  if (!mediaRows.length) return <div>No media found</div>;

  return (
    <>
      <Navbar />

      <div className="pt-[10px]">
        <SliderMediaContainer title="Trending" media={mediaRows[0].data} />
        <div id="main-wrapper">
          <div className="container">
            <div id="main-content">
              <GridMediaContainer
                title="Latest Episode"
                media={mediaRows[0].data}
              />
              <GridMediaContainer title="Popular" media={mediaRows[1].data} />
            </div>
            <div id="main-sidebar">
              <UserLastChapterSidebar
                title="Last Chapters"
                media={mediaRows[2].data}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
