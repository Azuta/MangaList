'use client';
import Link from "next/link";
import { useMemo, useState } from "react";
import { MediaItem } from "@/context/mediaContext"; // tipo genérico

type CardProps = {
    media: MediaItem; // ahora es genérico
};

const shortName = "Test";
const isVisible = true;

const MediumCard = ({ media }: CardProps) => {
    const title = media.shortName;

    function capitalizeFirst(text: string) {
        return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    }

    return (
        <div className="flw-item">
            <div className="film-poster">

                {isVisible && (
                    <div className="tick tick-rate" style={{ textTransform: "capitalize" }}>
                        {capitalizeFirst(media.format) || "Manga"}
                    </div>
                )}

                <div className="tick ltr">
                    <div className="tick-item tick-dub">
                        <i className="fas fa-closed-captioning mr-1"></i>
                        Shonen
                    </div>
                </div>

                <img
                    className="film-poster-img lazyloaded"
                    alt={title}
                    src={media.coverImage.large}
                />

                <Link href={{
                    pathname: `/media/${media.id}`,
                    query: { source: title }
                }} className="film-poster-ahref item-qtip">
                </Link>
            </div>

            <div className="film-detail">
                <h3 className="film-name">
                    <a
                        href="/detectives-these-days-are-crazy-19756"
                        className="dynamic-name"
                    >
                        {title}
                    </a>
                </h3>
            </div>
        </div>
    );
};

export default MediumCard;
