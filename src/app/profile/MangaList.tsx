"use client";
import React, { useState } from 'react';
import { List, Grid3x3, Search } from 'lucide-react';

// --- Datos de ejemplo (reemplazar con los datos reales del usuario) ---
const mockMangaList = [
  { id: 1, title: "Berserk", cover: "https://mangadex.org/covers/8754fb67-d7f1-45f8-ad40-e4c218ba5836/605caded-f8d6-483b-a5e7-bd0ead4244b7.png.512.jpg", score: 10, status: "Reading", progress: 364, totalChapters: 370 },
  { id: 2, title: "Vagabond", cover: "https://mangadex.org/covers/8754fb67-d7f1-45f8-ad40-e4c218ba5836/605caded-f8d6-483b-a5e7-bd0ead4244b7.png.512.jpg", score: 9, status: "Completed", progress: 327, totalChapters: 327 },
  { id: 3, title: "One Piece", cover: "https://mangadex.org/covers/8754fb67-d7f1-45f8-ad40-e4c218ba5836/605caded-f8d6-483b-a5e7-bd0ead4244b7.png.512.jpg", score: 9, status: "Reading", progress: 1050, totalChapters: 1100 },
  { id: 4, title: "Oyasumi Punpun", cover: "https://mangadex.org/covers/8754fb67-d7f1-45f8-ad40-e4c218ba5836/605caded-f8d6-483b-a5e7-bd0ead4244b7.png.512.jpg", score: 10, status: "Completed", progress: 147, totalChapters: 147 },
  { id: 5, title: "Jujutsu Kaisen", cover: "https://mangadex.org/covers/8754fb67-d7f1-45f8-ad40-e4c218ba5836/605caded-f8d6-483b-a5e7-bd0ead4244b7.png.512.jpg", score: 8, status: "Paused", progress: 150, totalChapters: 230 },
  { id: 6, title: "Chainsaw Man", cover: "https://mangadex.org/covers/8754fb67-d7f1-45f8-ad40-e4c218ba5836/605caded-f8d6-483b-a5e7-bd0ead4244b7.png.512.jpg", score: 8, status: "Plan to Read", progress: 0, totalChapters: 150 },
];
// --- Fin de los datos de ejemplo ---

const StatusBadge = ({ status }: { status: string }) => {
  const statusStyles: { [key: string]: string } = {
    "Reading": "bg-blue-500 text-white",
    "Completed": "bg-green-500 text-white",
    "Paused": "bg-yellow-500 text-black",
    "Plan to Read": "bg-gray-600 text-white",
  };
  return (
    <span className={`px-2 py-1 text-sm font-semibold rounded-full ${statusStyles[status] || 'bg-gray-400'}`}>
      {status}
    </span>
  );
};

const MangaCard = ({ manga }: { manga: (typeof mockMangaList)[0] }) => {
  const progressPercent = manga.totalChapters > 0 ? (manga.progress / manga.totalChapters) * 100 : 0;
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden flex transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#b368e6]/20">
      <img src={manga.cover} alt={manga.title} className="w-48 h-72 object-cover flex-shrink-0" />
      <div className="p-6 flex flex-col justify-between flex-grow min-w-0">
        <div>
          <h3 className="text-3xl font-bold text-white mb-2 truncate">{manga.title}</h3>
          <div className="flex items-center space-x-4 mb-4">
            <StatusBadge status={manga.status} />
            <span className="text-xl text-gray-300">Score: <span className="font-bold text-[#b368e6]">{manga.score}/10</span></span>
          </div>
        </div>
        <div>
          <div className="text-xl text-gray-400 mb-2 truncate">
            Progress: {manga.progress} / {manga.totalChapters || '?'}
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div className="bg-[#b368e6] h-3 rounded-full" style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MangaListProfile = () => {
  const [view, setView] = useState<'list' | 'grid'>('list');
  const [filter, setFilter] = useState('All');

  const filterButtons = ['All', 'Reading', 'Completed', 'Paused', 'Plan to Read'];

  const filteredManga = mockMangaList.filter(manga => 
    filter === 'All' || manga.status === filter
  );

  return (
    <div className="w-full">
      {/* Panel de Controles con fondo oscuro y semitransparente */}
      <div className="bg-gray-900/70 backdrop-blur-sm p-4 rounded-lg mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="bg-gray-800 p-1 rounded-lg flex-shrink-0">
            {filterButtons.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${filter === f ? 'bg-[#b368e6] text-white' : 'text-gray-300 hover:bg-gray-700'}`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search in your list..."
                className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#b368e6]"
              />
            </div>
            <div className="flex bg-gray-800 p-1 rounded-lg">
              <button onClick={() => setView('list')} className={`p-1.5 rounded-md ${view === 'list' ? 'bg-[#b368e6] text-white' : 'text-gray-400 hover:bg-gray-700'}`}><List size={20}/></button>
              <button onClick={() => setView('grid')} className={`p-1.5 rounded-md ${view === 'grid' ? 'bg-[#b368e6] text-white' : 'text-gray-400 hover:bg-gray-700'}`}><Grid3x3 size={20}/></button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido: Lista o Cuadrícula */}
      {view === 'list' ? (
        <div className="grid grid-cols-1 gap-6">
          {filteredManga.map(manga => <MangaCard key={manga.id} manga={manga} />)}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredManga.map(manga => (
              <div key={manga.id} className="group relative overflow-hidden rounded-lg">
                <img src={manga.cover} alt={manga.title} className="rounded-lg aspect-[2/3] object-cover w-full h-full transform transition-transform duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-end p-4">
                    <p className="text-white text-xl font-bold line-clamp-2">{manga.title}</p>
                </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MangaListProfile;
