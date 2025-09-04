'use client';
import Card from "@/components/ui/Card";
import Link from "next/link";
import Skeleton from '@mui/material/Skeleton';
import { MediaItem, useMedia } from "../../context/mediaContext";

const MediaContainer = () => {
  const { isLoading, rowsData } = useMedia(); // <-- debe estar dentro del componente

  return (
    <>
      {(isLoading ? Array(3).fill(null) : rowsData)?.map((row, index) => (
        <div
          key={index}
          className="group items-center justify-center flex flex-wrap 2xl:px-24 mt-16 grid-cols-1 gap-2 ml-90"
        >
          <div className="flex flex-col xl:mx-48">
            {/* Aquí se aplica el font que pediste */}
            <h2
              className="ml-3 sm:-mb-5 text-wrap"
              style={{
                fontSize: "22px",
                lineHeight: "1.3",
                fontWeight: 600,
                color: "#ffbade",
                fontFamily: "Roboto, sans-serif",
              }}
            >
              {row?.title}
            </h2>

            <Link href={`/media?`}>
              <span className="flex cursor-pointer align-bottom justify-end mr-6 -mb-2 xs:text-xs sm:text-sm relative text-viewall hover:text-txtcard">
                view all
              </span>
            </Link>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6">
              {(isLoading ? Array(12).fill(null) : row?.data?.slice(0, 12) as MediaItem[]).map(
                (media, idx) =>
                  isLoading ? (
                    <Skeleton
                      key={idx}
                      variant="rectangular"
                      width={150}
                      height={220}
                      className="m-2 rounded-md"
                    />
                  ) : (
                    <Card key={media.id} media={media} />
                  )
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default MediaContainer;
