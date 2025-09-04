import React, { useEffect, useState } from 'react';
import { fetchManga, Chapter } from '@/app/media/mediaViewer/components/services/mangaApi';
import SideReader from '@/app/media/mediaViewer/components/SideReader';
import './MangaReader.css';

interface MangaReaderProps {
  mangaId: string;
}

const MangaReader: React.FC<MangaReaderProps> = ({ mangaId }) => {
  const [mangaTitle, setMangaTitle] = useState('');
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [currentChapterIdx, setCurrentChapterIdx] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const loadManga = async () => {
      const manga = await fetchManga(mangaId);
      setMangaTitle(manga.title);
      setChapters(manga.chapters);
    };
    loadManga();
  }, [mangaId]);

  const currentChapter = chapters[currentChapterIdx];

  const handleNextPage = () => {
    if (!currentChapter) return;
    if (currentPage < currentChapter.pages.length) {
      setCurrentPage(currentPage + 1);
    } else if (currentChapterIdx + 1 < chapters.length) {
      setCurrentChapterIdx(currentChapterIdx + 1);
      setCurrentPage(1);
    }
  };

  const handlePrevPage = () => {
    if (!currentChapter) return;
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (currentChapterIdx > 0) {
      const prevChapter = chapters[currentChapterIdx - 1];
      setCurrentChapterIdx(currentChapterIdx - 1);
      setCurrentPage(prevChapter.pages.length);
    }
  };

  const selectChapter = (idx: number) => {
    setCurrentChapterIdx(idx);
    setCurrentPage(1);
  };

  return (
    <div className="manga-reader">
      <div className="chapter-header">
        <h2>{mangaTitle}</h2>
        {currentChapter && <h3>Vol. {currentChapter.volume} Ch. {currentChapter.chapter}</h3>}
        <button onClick={() => setMenuOpen(!menuOpen)}>Menu</button>
      </div>

      <div className="chapter-content" onClick={handleNextPage}>
        {currentChapter ? (
          <img src={currentChapter.pages[currentPage - 1]} alt={`page-${currentPage}`} />
        ) : (
          <p>Cargando...</p>
        )}
      </div>

      <SideReader
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        chapters={chapters}
        currentChapterIdx={currentChapterIdx}
        currentPage={currentPage}
        setChapter={selectChapter}
        setPage={setCurrentPage}
      />
    </div>
  );
};

export default MangaReader;