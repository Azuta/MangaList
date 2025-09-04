"use client";

import { MediaItem } from "@/context/mediaContext";
import { useState } from "react";

type GridMediaProps = {
  media: MediaItem;
};

const Sidebar = ({
  media
}: GridMediaProps) => {
  const popularRanking = media.rankings.find(
    (r) => r.type === "POPULAR" && r.allTime
  );

  const ratedRanking = media.rankings.find(
    (r) => r.type === "RATED" && r.allTime
  );


  return (
    <>
      <div data-v-2ac54308 className="sidebar" style={{ marginTop: media?.bannerImage ? "0px" : "107px" }}>
        <div data-v-7cc43fc4 data-v-2ac54308 className="rankings">
          {ratedRanking && (
            <a
              data-v-a6e466b2
              data-v-7cc43fc4
              href="/search/manga?sort=SCORE_DESC&format=MANGA"
              className="ranking rated"
            >
              <svg
                data-v-a6e466b2
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="star"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                className="icon svg-inline--fa fa-star fa-w-18 fa-xs"
              >
                <path
                  data-v-a6e466b2
                  fill="currentColor"
                  d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 
        36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 
        23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 
        12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 
        8.5-50.8-17.7-54.6L382 150.2 
        316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
                ></path>
              </svg>
              <span data-v-a6e466b2 className="rank-text">
                #{ratedRanking.rank} Mejor valorado
              </span>
            </a>
          )}

          {popularRanking && (
            <a
              data-v-a6e466b2
              data-v-7cc43fc4
              href="/search/manga?sort=POPULARITY_DESC&format=MANGA"
              className="ranking popular"
            >
              <svg
                data-v-a6e466b2
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="heart"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="icon svg-inline--fa fa-heart fa-w-16 fa-xs"
              >
                <path
                  data-v-a6e466b2
                  fill="currentColor"
                  d="M462.3 62.6C407.5 15.9 326 24.3 
        275.7 76.2L256 96.5l-19.7-20.3C186.1 
        24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 
        149.8-9.9 207.9l193.5 199.8c12.5 12.9 
        32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 
        53-154.3-9.8-207.9z"
                ></path>
              </svg>
              <span data-v-a6e466b2 className="rank-text">
                #{popularRanking.rank} Más popular
              </span>
            </a>
          )}
        </div>

        <div data-v-d3a518a6 data-v-2ac54308 className="data">

          {media.format && (
            <div data-v-d3a518a6 className="data-set">
              <div data-v-d3a518a6 className="type">Format</div>
              <div data-v-d3a518a6 className="value">
                {media.format}
                <br />
                ({media.countryOfOrigin})
              </div>
            </div>
          )}


          {media.status && (
            <div data-v-d3a518a6 className="data-set">
              <div data-v-d3a518a6 className="type">Status</div>
              <div data-v-d3a518a6 className="value">{media.status}</div>
            </div>
          )}

          {media.startDate && (
            <div data-v-d3a518a6 className="data-set">
              <div data-v-d3a518a6 className="type">Start Date</div>
              <div data-v-d3a518a6 className="value">
                {new Date(
                  `${media.startDate.year}-${media.startDate.month}-${media.startDate.day}`
                ).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </div>
            </div>
          )}

          {media.averageScore && (
            <div data-v-d3a518a6 className="el-tooltip data-set">
              <div data-v-d3a518a6 className="type">Average Score</div>
              <div data-v-d3a518a6 className="value">{media.averageScore}%</div>
            </div>
          )}

          {media.meanScore && (
            <div data-v-d3a518a6 className="data-set">
              <div data-v-d3a518a6 className="type">Mean Score</div>
              <div data-v-d3a518a6 className="value">{media.meanScore}%</div>
            </div>
          )}

          {media.popularity && (
            <div data-v-d3a518a6 className="data-set">
              <div data-v-d3a518a6 className="type">Popularity</div>
              <div data-v-d3a518a6 className="value">{media.popularity}</div>
            </div>
          )}

          {media.favourites && (
            <div data-v-d3a518a6 className="data-set">
              <div data-v-d3a518a6 className="type">Favorites</div>
              <div data-v-d3a518a6 className="value">{media.favourites}</div>
            </div>
          )}

          {media.source && (
            <div data-v-d3a518a6 className="data-set">
              <div data-v-d3a518a6 className="type">Source</div>
              <div data-v-d3a518a6 className="value">{media.source}</div>
            </div>
          )}

          {media.genres?.length > 0 && (
            <div data-v-d3a518a6 className="data-set data-list">
              <div data-v-d3a518a6 className="type">Genres</div>
              <div data-v-d3a518a6 className="value">
                {media.genres.map((genre) => (
                  <span key={genre} data-v-d3a518a6>
                    <a data-v-d3a518a6 href={`/search/manga/${genre}`}>
                      {genre}
                    </a>
                    <br />
                  </span>
                ))}
              </div>
            </div>
          )}

          {media.title?.romaji && (
            <div data-v-d3a518a6 className="data-set">
              <div data-v-d3a518a6 className="type">Romaji</div>
              <div data-v-d3a518a6 className="value">{media.title.romaji}</div>
            </div>
          )}

          {media.title?.english && (
            <div data-v-d3a518a6 className="data-set">
              <div data-v-d3a518a6 className="type">English</div>
              <div data-v-d3a518a6 className="value">{media.title.english}</div>
            </div>
          )}

          {media.title?.native && (
            <div data-v-d3a518a6 className="data-set">
              <div data-v-d3a518a6 className="type">Native</div>
              <div data-v-d3a518a6 className="value">{media.title.native}</div>
            </div>
          )}

          {media.synonyms?.length > 0 && (
            <div data-v-d3a518a6 className="data-set data-list">
              <div data-v-d3a518a6 className="type">Synonyms</div>
              <div data-v-d3a518a6 className="value">
                {media.synonyms.map((syn, idx) => (
                  <span key={idx} data-v-d3a518a6>
                    {syn}
                    <br />
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Tags */}
        {media.tags?.length > 0 && (
          <div data-v-6982c53d data-v-2ac54308 className="tags">
            <h2 data-v-6982c53d>Tags</h2>
            {media.tags.slice(0, 10).map((tag) => (
              <div key={tag.name} data-v-c403a904 data-v-6982c53d className="tag">
                <a
                  data-v-c403a904
                  href={`/search/manga?genres=${encodeURIComponent(tag.name)}`}
                  className="el-tooltip name"
                >
                  {tag.name}
                </a>
                {tag.rank !== undefined && (
                  <div data-v-c403a904 className="rank">{tag.rank}%</div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* External & Streaming Links */}
        {media.externalLinks?.length > 0 && (
          <div data-v-c1b7ee7c data-v-2ac54308 className="external-links">
            <h2 data-v-c1b7ee7c>External & Streaming links</h2>
            <div data-v-c1b7ee7c className="external-links-wrap">
              {media.externalLinks.map((link, idx) => (
                <a
                  key={idx}
                  data-v-c1b7ee7c
                  href={link.url}
                  target="_blank"
                  className="external-link"
                  style={{ '--link-color': '#07A3D7e0' } as React.CSSProperties}
                >
                  <div
                    data-v-c1b7ee7c
                    className="icon-wrap"
                    style={{ background: 'rgb(7, 163, 215)' }}
                  >
                    <img
                      data-v-c1b7ee7c
                      src={link.icon || "/default-icon.png"}
                      className="icon"
                    />
                  </div>
                  <span data-v-c1b7ee7c className="name">
                    {link.site}
                    {link.language && <span data-v-c1b7ee7c className="language">{link.language}</span>}
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
