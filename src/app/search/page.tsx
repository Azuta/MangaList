"use client";

import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import MediumCardSearch from "@/components/ui/cards/MediumCardSearch";
import { useMedia } from "@/context/mediaContext";

// 🔹 Mockdata
const mockData = {
    groups: ["Kimetsu Scanlation", "MangaWorld", "ScanTeam", "AnimeManga Fans"],
    authors: ["Koyoharu Gotouge", "Masashi Kishimoto", "Eiichiro Oda", "Tite Kubo"],
};

const tabs = ["Titles", "Groups", "Authors"];

export default function Home() {
    const { mediaRows, isLoading } = useMedia();

    if (isLoading) return <div>Loading...</div>;
    if (!mediaRows.length) return <div>No media found</div>;

    const searchParams = useSearchParams();
    const queryParam = searchParams.get("query") ?? "";

    const [searchQuery, setSearchQuery] = useState(queryParam);
    const [activeTab, setActiveTab] = useState("Titles");


    useEffect(() => {
        setSearchQuery(queryParam);
    }, [queryParam]);

    // 🔹 Filtrado de resultados
    const getFilteredResults = () => {
        const query = searchQuery.toLowerCase();

        if (activeTab === "Titles") {
            return (mediaRows[0]?.data || []).filter((item) =>
                item.shortName?.toLowerCase().includes(query)
            );
        }

        if (activeTab === "Groups") {
            return mockData.groups.filter((g) =>
                g.toLowerCase().includes(query)
            );
        }

        if (activeTab === "Authors") {
            return mockData.authors.filter((a) =>
                a.toLowerCase().includes(query)
            );
        }

        // 🔹 All → combinamos Titles + mockData
        return [
            ...(mediaRows[0]?.data || []).filter((item) =>
                item.shortName?.toLowerCase().includes(query)
            ),
            ...mockData.groups.filter((g) => g.toLowerCase().includes(query)),
            ...mockData.authors.filter((a) => a.toLowerCase().includes(query)),
        ];
    };

    const results = getFilteredResults();

    return (
        <>
            <Navbar />

            <div className="container mx-auto px-4 py-6">
                {/* 🔹 Input de búsqueda */}
                <div className="flex items-center w-full mb-4">
                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 px-4 py-2 rounded-l-md border border-gray-300 outline-none"
                        style={{
                            backgroundColor: "rgb(43 45 66 / var(--tw-bg-opacity))",
                            border: "transparent",
                        }}
                    />
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-r-md flex items-center justify-center">
                        <FiSearch size={20} />
                    </button>
                </div>

                {/* 🔹 Tabs */}
                <div className="flex gap-4 border-b mb-4">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-2 ${activeTab === tab
                                    ? "border-blue-600 text-blue-600 font-semibold"
                                    : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* 🔹 Resultados */}
                <div>
                    {results.length > 0 ? (
                        activeTab === "Titles" ? (
                            <div className="tab-content">
                                <div className="block_area-content block_area-list film_list film_list-grid">
                                    <div className="film_list-wrap">
                                        {results.map((item) => (
                                            <MediumCardSearch key={item.id} media={item} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ): (
                            // Otros tabs simples
                            <ul className="space-y-2">
                                {results.map((item, i) => (
                                    <li
                                        key={i}
                                        className="p-3 bg-gray-100 rounded-md hover:bg-gray-200 cursor-pointer"
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        )
                    ) : (
                        <p className="text-gray-500">No se encontraron resultados.</p>
                    )}
                </div>
            </div>
        </>
    );
}
