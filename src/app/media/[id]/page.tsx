"use client";
import { useMedia } from "@/context/mediaContext";
import { useEffect, useState } from "react";
import Sidebar from "@/app/media/ui/sidebar";
import MediaHeader from "@/app/media/components/mediaHeader";
import { useSearchParams } from "next/navigation";
import Overview from "../components/overview";
import MediaChapters from "../components/mediaChapters";
import Navbar from "@/components/layout/Navbar";
import "@/app/media/Style/mediaStyle.css";
import NavbarMedia from "@/components/layout/NavbarMedia";

type MediaIdProps = { params: { id: string } };

const MediaPage = ({ params }: MediaIdProps) => {
  const { mediaDetail, fetchMediaById, isLoading } = useMedia();
  const [activeTab, setActiveTab] = useState<"chapters" | "overview">("chapters");

  const searchParams = useSearchParams();
  const source = searchParams.get("source"); // Ya slug

  useEffect(() => {
    fetchMediaById(Number(params.id));
  }, [params.id]);

  if (isLoading) return <div>Loading...</div>;
  if (!mediaDetail) return <div>No media found</div>;

  console.log(source);

  return (
    <>
      <Navbar/>

        <div className="page-content">

          <div data-v-2ac54308 className="media media-page-unscoped media-manga">

            <MediaHeader media={mediaDetail} activeTab={activeTab} setActiveTab={setActiveTab} />

            <div data-v-2ac54308 className="content container">

              <Sidebar media={mediaDetail} />

              {activeTab === "chapters" &&
                <MediaChapters media={mediaDetail} />
              }

              {activeTab === "overview" && <Overview media={mediaDetail} />}

            </div>

          </div>
        </div>
    </>
  );
};

export default MediaPage;
