'use client';
import Image from "next/image";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import { useMemo, useState } from "react";
import { MediaItem } from "@/context/mediaContext"; // tipo genérico
import { colorMap, COLORS } from "@/utilities/Data";


type CardProps = {
    id: number;
    media: MediaItem; // ahora es genérico
};

const SidebarListCard = ({id, media }: CardProps) => {
    const title = media.shortName;

    return (
        <li className="item-top">
            <div className="film-number"><span>0{id+1}</span></div>
            <div className="film-poster item-qtip loaded" data-id="100" data-hasqtip="66" aria-describedby="qtip-66">
                <img
                    src={media.coverImage.large}
                    className="film-poster-img"
                    alt={title}
                />
            </div>
            <div className="film-detail">
                <h3 className="film-name">
                    <a href="/one-piece-100" title={title} className="dynamic-name" data-jname={title}>{title}</a>
                </h3>
                <div className="fd-infor">
                    <div className="tick" style={{
                        overflowWrap: "break-word",  // rompe palabras largas
                        wordBreak: "break-word",     // soporte adicional
                        maxWidth: "100%"             // no exceda el contenedor
                    }}>{title}</div>
                </div>
            </div>
            <div className="clearfix"></div>
        </li>
    );
};

export default SidebarListCard;
