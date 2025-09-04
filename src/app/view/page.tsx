"use client";
import { MediaItem, useMedia } from "@/context/mediaContext";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Sidebar from "@/app/media/ui/sidebar";
import MediaHeader from "@/app/media/components/mediaHeader";
import Overview from "@/app/media/components/overview";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Chapters from "@/app/media/ui/chapters";
import SocialSection from "@/app/media/ui/socialSection";
import UserLastChapterSidebar from "../media/userLastChapterSidebar";
import GridMediaContainer from "../media/gridMediaContainer";

const MediaPage = () => {
  const searchParams = useSearchParams();
  const source = searchParams.get("source"); // Ya slug

  const { mediaRows, isLoading } = useMedia();
  const [data, setData] = useState<MediaItem[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoading) return;

    if (mediaRows && mediaRows.length > 0) {
      // Buscamos el row correspondiente usando source directamente
      const row =
        mediaRows.find((r) => r.title.toLowerCase().replace(/\s+/g, "-") === source) ||
        mediaRows[0]; // fallback al primero (Trending)

      setData(row?.data?.length ? row.data : null);
    } else {
      setData(null);
    }

    setLoading(false);
  }, [mediaRows, isLoading, source]);

  if (loading) return <div>Loading...</div>;
  if (!data || data.length === 0) return <div>No media found</div>;

  return (
    <>
      <Navbar />
      <div id="main-wrapper">
        <div className="container">
          <div id="main-content">
            <GridMediaContainer
              title={source || "Trending"}
              media={data}
              isViewPageVisible={true}
            />
          </div>
          <div id="main-sidebar">
            <UserLastChapterSidebar title="Last Chapters" media={mediaRows[2].data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MediaPage;
