"use client";

import { MediaItem } from "@/context/mediaContext";
import React from "react";

type GridMediaProps = {
  media: MediaItem;
};

const Recommendations = ({ media }: GridMediaProps) => {
  return (
    <>
      {media?.recommendations?.edges?.length > 0 && (
        <div data-v-597da2e4="" data-v-cdf07c88="" className="recommendations">
          <h2 data-v-597da2e4="">
            Recommendations
            <div data-v-597da2e4="" className="view-all">
              <div data-v-597da2e4="" className="toggle">
                View All Recommendations
              </div>
            </div>
          </h2>
          <div data-v-597da2e4="" className="wrap">
            {media.recommendations.edges.map((rec) => {
              const recommendation = rec.node.mediaRecommendation; // ✅ Aquí usamos mediaRecommendation
              return (
                <div
                  key={recommendation.id}
                  data-v-38341878=""
                  data-v-597da2e4=""
                  className="recommendation-card"
                >
                  <div
                    data-v-38341878=""
                    className="cover"
                    data-src={recommendation.coverImage.medium || recommendation.coverImage.large}
                    style={{ backgroundImage: `url('${recommendation.coverImage.medium || recommendation.coverImage.large}')` }}
                  >
                    <a
                      data-v-38341878=""
                      href={`/${recommendation.type?.toLowerCase() || "anime"}/${recommendation.id}/${recommendation.title.romaji.replace(/\s+/g, "-")}/`}
                      className="cover-link"
                    ></a>
                  </div>
                  <a
                    data-v-38341878=""
                    href={`/${recommendation.type?.toLowerCase() || "anime"}/${recommendation.id}/${recommendation.title.romaji.replace(/\s+/g, "-")}/`}
                    className=""
                  >
                    <div data-v-38341878="" className="title">
                      <div data-v-38341878="" style={{ overflow: "hidden" }}>
                        <span style={{ boxShadow: "transparent 0px 0px" }}>
                          <span aria-label={recommendation.title.romaji}>
                            {recommendation.title.romaji}
                          </span>
                        </span>
                      </div>
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </>
  );
};

export default Recommendations;
