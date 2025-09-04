'use client';
import Image from "next/image";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import { useMemo, useState } from "react";
import { MediaItem } from "@/context/mediaContext"; // tipo genérico
import { colorMap, COLORS } from "@/utilities/Data";

type CardProps = {
  media: MediaItem; // ahora es genérico
};

const Card = ({ media }: CardProps) => {
  const [isHovering, setIsHovering] = useState(false);

  // Seleccionamos título según disponibilidad
  const title = media.title.english || media.title.romaji || media.title.native;
  const poster = media.coverImage.large;

  // Colores aleatorios
  const colorClass = useMemo(() => {
    return COLORS[Math.floor(Math.random() * COLORS.length)];
  }, []);

  const colorClasses = colorMap[colorClass];

  return (
    <div
      className="w-full text-center relative group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Badge
        rating={media?.averageScore || 0} 
        title={title}
        description={media.description}
        episodes={media.episodes} // para anime
        status={media.status}
        format={media.format}
        genres={media.genres}
        isHovering={isHovering}
        colorClass={colorClass}
      />

      <div className="p-4 max-w-6xl mx-auto">
        <Link href={`/media/${media.id}`}> {/* cambiado a media */}
          <div className="flex flex-col">
            <Image
              className="h-full mb-3 rounded-sm shadow-txtcatg shadow-sm"
              height={265}
              width={185}
              alt={title}
              src={poster}
              style={{ height: "265px", width: "185px" }}
            />
            <div
              className={`text-sm mb-3 text-left break-all w-[175px] lg:max-w-[100%] ${
                isHovering ? colorClasses.text : "text-txtcard"
              }`}
            >
              {title}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Card;
