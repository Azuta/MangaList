// context/MediaContext.tsx
"use client";
import { createContext, ReactNode, useContext, useState, useEffect } from "react";

export type MediaItem = {
  id: number;
  idMal?: number;
  type?: string;
  format?: string;
  status?: string;
  description?: string;
  startDate?: { year: number; month: number; day: number };
  endDate?: { year: number; month: number; day: number };
  season?: string;
  seasonYear?: number;
  source?: string;
  averageScore?: number;
  meanScore?: number;
  popularity?: number;
  favourites?: number;
  countryOfOrigin?: string;
  synonyms?: string[];
  genres?: string[];
  hashtag?: string;
  shortName?: string;

  title: { romaji: string; english?: string; native?: string };
  coverImage: { extraLarge?: string; large: string; medium?: string; color?: string };
  bannerImage?: string;

  rankings?: { rank: number; type: string; allTime: boolean }[];

  relations?: {
    edges: {
      id: number;
      relationType: string;
      node: {
        id: number;
        type: string;
        title: { romaji: string; english?: string; native?: string };
        coverImage: { large: string };
      };
    }[];
  };

  characters?: {
    edges: {
      id: number;
      role: string;
      voiceActors: {
        id: number;
        name: { full: string };
        language: string;
        image: { medium: string };
      }[];
      node: { id: number; name: { full: string }; image: { large: string; medium: string } };
    }[];
  };

  staff?: {
    edges: {
      id: number;
      role: string;
      node: { id: number; name: { full: string }; image: { large: string } };
    }[];
  };

  stats?: {
    statusDistribution: { status: string; amount: number }[];
    scoreDistribution: { score: number; amount: number }[];
  };

  streamingEpisodes?: { title: string; thumbnail: string; url: string; site: string }[];

  recommendations?: {
    edges: {
      node: {
        id: number;
        mediaRecommendation: {
          id: number;
          title: { romaji: string; english?: string };
          coverImage: { large: string };
        };
      };
    }[];
  };

  trailer?: { id: string; site: string; thumbnail: string };

  tags?: { name: string; rank: number; isAdult: boolean }[];

  externalLinks?: { site: string; url: string; icon: string }[];

  // Si quieres, también puedes meter studios y producers aquí
  studios?: {
    edges: { node: { name: string } }[];
  };
  producers?: string[];
};
export type MediaRow = {
  title: string;
  data: MediaItem[];
}[];

type MediaContextType = {
  isLoading: boolean;
  mediaRows: MediaRow;
  mediaDetail: MediaItem | null;
  refreshMedia: () => Promise<void>;
  fetchMediaById: (id: number) => Promise<MediaItem | null>;
};

const MediaContext = createContext<MediaContextType | undefined>(undefined);

export const useMedia = () => {
  const context = useContext(MediaContext);
  if (!context) throw new Error("useMedia must be used within MediaProvider");
  return context;
};

// Cache temporal del servidor para reducir fetch externo
let cachedRows: MediaRow | null = null;
let lastFetch = 0;
const CACHE_TIME = 60 * 1000; // 1 minuto

function shortenAnimeName(name: string) {
  const shortName = name.length > 30 ? name.slice(0, 30) + "…" : name;
  return shortName;
}

function processMediaArray(mediaArray: any[]) {
  return mediaArray.map(item => ({
    ...item,
    shortName: shortenAnimeName(
      item.title.english || item.title.romaji || item.title.native
    ),
  }));
}

export const MediaProvider = ({ children }: { children: ReactNode }) => {
  const [mediaRows, setMediaRows] = useState<MediaRow>([]);
  const [mediaDetail, setMediaDetail] = useState<MediaItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch listas de anime
  const fetchMediaRows = async (): Promise<MediaRow> => {
    const now = Date.now();
    if (cachedRows && now - lastFetch < CACHE_TIME) return cachedRows;

    try {
      const res = await fetch("/api/anilist");
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);

      const data = await res.json();

      const rows: MediaRow = [
        { title: "Trending", data: processMediaArray(data.data.trending?.media || []) },
        { title: "Popular", data: processMediaArray(data.data.popular?.media || []) },
        { title: "Upcoming", data: processMediaArray(data.data.upcoming?.media || []) },
      ];

      cachedRows = rows;
      lastFetch = now;
      return rows;
    } catch (err) {
      console.error("Failed to fetch MediaList data:", err);
      return [];
    }
  };

  // Refrescar listas
  const refreshMedia = async () => {
    setIsLoading(true);
    const rows = await fetchMediaRows();
    setMediaRows(rows);
    setIsLoading(false);
  };

  // Fetch detalle por ID
  const fetchMediaById = async (id: number): Promise<MediaItem | null> => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/anilist?id=${id}`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);

      const data = await res.json();
      if (!data.success) return null;

      const processed: MediaItem = {
        ...data.data.Media,
        shortName: shortenAnimeName(
          data.data.Media.title.english ||
            data.data.Media.title.romaji ||
            data.data.Media.title.native
        ),
      };

      setMediaDetail(processed);
      return processed;
    } catch (err) {
      console.error("Failed to fetch Media detail:", err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!mediaRows.length) refreshMedia();
  }, []);

  return (
    <MediaContext.Provider
      value={{ mediaRows, mediaDetail, isLoading, refreshMedia, fetchMediaById }}
    >
      {children}
    </MediaContext.Provider>
  );
};
