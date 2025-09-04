"use client";

import { MediaItem } from "@/context/mediaContext";
import Characters from "./characterCardGrid";
import Staff from "./staff";
import Status from "./status";
import Score from "./scoreDistribution";
import Trailer from "./trailer";
import Recommendations from "./recomendation";

type GridMediaProps = {
    media: MediaItem;
};

const Overview = ({
    media
}: GridMediaProps) => {
    return (
        <>
            <div data-v-cdf07c88 data-v-2ac54308 className="overview">

                <Characters media={media} />


                <Staff media={media} />

                <div data-v-cdf07c88="" className="grid-section-wrap">
                    <Status media={media} />

                    <Score media={media} />
                </div>

                <Trailer media={media} />

                <Recommendations media={media} />
            </div>
        </>
    );
};

export default Overview;
