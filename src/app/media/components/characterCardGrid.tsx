"use client";

import { MediaItem } from "@/context/mediaContext";

type GridMediaProps = {
  media: MediaItem;
};

const Characters = ({
  media
}: GridMediaProps) => {
  return (
    <>
      {media.characters?.edges?.length > 0 && (
        <div data-v-cdf07c88="" className="characters">
          <h2 className="link">Characters</h2>
          <div className="grid-wrap">
            {media.characters.edges.map((char) => (
              <div key={char.id} data-v-f92815d6="" className="role-card view-character">
                <div data-v-f92815d6="" className="character">
                  <a
                    data-v-f92815d6=""
                    href={`/character/${char.node.id}/${char.node.name.full.replace(/\s+/g, "-")}`}
                    className="cover"
                    style={{ backgroundImage: `url('${char.node.image.large}')` }}
                  />
                  <a
                    data-v-f92815d6=""
                    href={`/character/${char.node.id}/${char.node.name.full.replace(/\s+/g, "-")}`}
                    className="content"
                  >
                    <div data-v-f92815d6="" className="name">{char.node.name.full}</div>
                    <div data-v-f92815d6="" className="role">{char.role}</div>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Characters;
