"use client";

import { MediaItem } from "@/context/mediaContext";
import React from "react";

type GridMediaProps = {
  media: MediaItem;
};

const Score = ({
  media
}: GridMediaProps) => {
  return (
    <>
      {media?.stats?.scoreDistribution?.length > 0 && (
        <div data-v-cdf07c88="">
          <h2 className="link">Score Distribution</h2>
          <div className="chart media-score-distribution">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="103px"
              className="ct-chart-bar"
              style={{ width: "100%", height: "103px" }}
            >
              <g className="ct-grids"></g>
              <g>
                <g className="ct-series ct-series-a">
                  {media.stats.scoreDistribution.map((item, index) => (
                    <React.Fragment key={index}>
                      <line
                        x1={35.05 + index * 50.1}
                        x2={35.05 + index * 50.1}
                        y1="78"
                        y2={78 - item.amount / 10} // Ajusta según tu escala
                        className="ct-bar"
                        ct-value={item.amount}
                        style={{ stroke: `hsl(${index * 10}, 65%, 50%)` }}
                        strokeLinecap="round"
                      />
                      <text
                        x={35.05 + index * 50.1}
                        y={78 - item.amount / 10 - 10} // Ajusta según tu escala
                        style={{ textAnchor: "middle" }}
                        className="label-text"
                      >
                        {item.amount}
                      </text>
                    </React.Fragment>
                  ))}
                </g>
              </g>
              <g className="ct-labels">
                {Array.from({ length: 10 }, (_, i) => (
                  <foreignObject
                    key={i}
                    style={{ overflow: "visible" }}
                    x={10 + i * 50.1}
                    y="88"
                    width="50"
                    height="10"
                  >
                    <span className="ct-label ct-horizontal ct-end">{(i + 1) * 10}</span>
                  </foreignObject>
                ))}
              </g>
            </svg>
          </div>
        </div>
      )}
    </>
  );
};

export default Score;
