"use client";

import Link from "next/link";

type ChaptersProps = {
  episodes: { id: number; title: string }[];
};

const Chapters = ({ episodes }: ChaptersProps) => {
  return (
    <div className="chapter-list">
      <h2>Chapters</h2>
      <ul>
        {episodes.map((ep) => (
          <li key={ep.id}>
            <Link href={`/media/lectorMedia/${ep.id}`}>
              {ep.title}
            </Link>
          </li>
        ))}
      </ul>

      <style jsx>{`
        .chapter-list {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
        }

        ul {
          list-style: none;
          padding: 0;
        }

        li {
          margin: 0.5rem 0;
        }

        a {
          display: block;
          padding: 0.6rem 1rem;
          background: #3db4f2;
          color: white;
          border-radius: 0.3rem;
          text-decoration: none;
          cursor: pointer;
          transition: background 0.2s;
        }

        a:hover {
          background: #36a0d8;
        }
      `}</style>
    </div>
  );
};

export default Chapters;
