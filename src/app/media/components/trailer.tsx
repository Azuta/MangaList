"use client";

import { MediaItem } from "@/context/mediaContext";

type GridMediaProps = {
    media: MediaItem;
};

const Trailer = ({
    media
}: GridMediaProps) => {
    return (
        <>
            {media?.trailer?.site && media.trailer.id && (
                <div data-v-cdf07c88="" className="grid-section-wrap">
                    <div data-v-cc58dc40="" data-v-cdf07c88="" className="trailer">
                        <h2 data-v-cc58dc40="" className="link">Trailer</h2>
                        <iframe
                            data-v-cc58dc40=""
                            src={`https://www.youtube.com/embed/${media.trailer.id}`}
                            frameBorder="0"
                            allowFullScreen
                            className="video"
                        ></iframe>
                    </div>
                </div>
            )}
        </>
    );
};

export default Trailer;
