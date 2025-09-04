import React from 'react';
import { Chapter } from '@/app/media/mediaViewer/components/services/mangaApi';
import './SideReader.css';

interface SideReaderProps {
  open: boolean;
  onClose: () => void;
  chapters: Chapter[];
  currentChapterIdx: number;
  currentPage: number;
  setChapter: (idx: number) => void;
  setPage: (page: number) => void;
}

const SideReader: React.FC<SideReaderProps> = ({
  open, onClose, chapters, currentChapterIdx, currentPage, setChapter, setPage
}) => {
  return (
    <div className={`side-reader ${open ? 'open' : ''}`}>
      <button className="close-btn" onClick={onClose}>X</button>

      <h4>Chapters</h4>
      <div className="chapter-list">
        {chapters.map((ch, idx) => (
          <div
            key={idx}
            className={idx === currentChapterIdx ? 'active' : ''}
            onClick={() => setChapter(idx)}
          >
            Vol. {ch.volume} Ch. {ch.chapter}
          </div>
        ))}
      </div>

      {chapters[currentChapterIdx] && (
        <>
          <h4>Pages</h4>
          <div className="page-list">
            {chapters[currentChapterIdx].pages.map((_, idx) => (
              <div
                key={idx}
                className={currentPage === idx + 1 ? 'active' : ''}
                onClick={() => setPage(idx + 1)}
              >
                {idx + 1}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SideReader;
