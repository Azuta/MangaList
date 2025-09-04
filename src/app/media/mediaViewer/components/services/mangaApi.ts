export interface Chapter {
  volume: number;
  chapter: number;
  pages: string[];
}

export interface Manga {
  title: string;
  chapters: Chapter[];
}

export const fetchManga = async (mangaId: string): Promise<Manga> => {
  // Simulación de datos
  return {
    title: 'Ejemplo Manga',
    chapters: [
      { volume: 1, chapter: 1, pages: ['https://placekitten.com/800/1200', 'https://placekitten.com/801/1200'] },
      { volume: 1, chapter: 2, pages: ['https://placekitten.com/802/1200', 'https://placekitten.com/803/1200'] },
      { volume: 2, chapter: 1, pages: ['https://placekitten.com/804/1200', 'https://placekitten.com/805/1200'] },
    ],
  };
};