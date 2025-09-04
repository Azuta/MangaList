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

const SmallCard = ({ media }: CardProps) => {
    const [isHovering, setIsHovering] = useState(false);

    return (
        <div></div>
    );
};

export default SmallCard;
