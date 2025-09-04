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

const BigCard = ({ id, media }: CardProps) => {
    const title = media.shortName;

    return (

        <div className="swiper-slide item-qtip loaded swiper-slide-active" data-hasqtip="0" aria-describedby="qtip-0">
            <div className="item">
                <div className="number">
                    <span>0{id + 1}</span>
                    <div className="film-title dynamic-name">{title}</div>
                </div>
                <a href="/one-piece-100" className="film-poster">
                    <img src={media.coverImage.large} 
                    className="film-poster-img ls-is-cached lazyloaded"/>
                </a>
                <div className="clearfix"></div>
                <span className="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
            </div>
        </div>



    );
};

export default BigCard;
