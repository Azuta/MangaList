'use client';
import MediumCard from "@/components/ui/cards/MediumCard";
import { MediaItem, useMedia } from "../../context/mediaContext";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";

type GridMediaProps = {
    title: string;
    isViewPageVisible?: boolean;
    media: MediaItem[]
};

function createSlug(text: string) {
  return text
    .toLowerCase() // todo en minúsculas
    .normalize("NFD") // separa acentos de letras
    .replace(/[\u0300-\u036f]/g, "") // elimina acentos
    .replace(/[^a-z0-9]+/g, "-") // reemplaza todo lo que no sea letra/número por guión
    .replace(/^-+|-+$/g, ""); // elimina guiones al inicio y al final
}

const GridMediaContainer = ({
    title,
    isViewPageVisible = false,
    media,
}: GridMediaProps) => {
    const [visibleItems, setVisibleItems] = useState<MediaItem[]>([]);
    const [loading, setLoading] = useState(false);
    const loaderRef = useRef<HTMLDivElement | null>(null);
    
    useEffect(() => {
        if (isViewPageVisible) {
            // Carga inicial
            setLoading(true);
            setTimeout(() => {
                setVisibleItems(media.slice(0, 18));
                setLoading(false);
            }, 1000);
        } else {
            setVisibleItems(media.slice(0, 6));
        }
    }, [isViewPageVisible]);

    useEffect(() => {
        if (!isViewPageVisible) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const target = entries[0];
                if (target.isIntersecting && !loading) {
                    loadMore();
                }
            },
            { threshold: 1.0 }
        );

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => {
            if (loaderRef.current) observer.unobserve(loaderRef.current);
        };
    }, [loading, visibleItems, isViewPageVisible]);

    const loadMore = () => {
        if (visibleItems.length >= media.length) return; // No más items
        setLoading(true);
        setTimeout(() => {
            const newLength = visibleItems.length + 18;
            setVisibleItems(media.slice(0, newLength));
            setLoading(false);
        }, 1000);
    };

    return (
        <section className="block_area block_area_home">
            <div className="block_area-header">
                <div className="float-left bah-heading mr-4">
                    <h2 className="cat-heading">{title}</h2>
                </div>
                {!isViewPageVisible && (
                    <div className="float-right viewmore">
                        <Link href={{
                            pathname: "/view",
                            query: { source:  createSlug(title) }
                        }} className="btn" style={{
                            color: "#aaa",
                            padding: "4px 0",
                            fontSize: "12px",
                            margin: "5px 0",
                        }}>
                        
                            View more <i className="fas fa-angle-right ml-2"></i></Link>
                    </div>
                )}
            </div>

            <div className="tab-content">
                <div className="block_area-content block_area-list film_list film_list-grid">
                    <div className="film_list-wrap">
                        {(visibleItems || []).map((item) => (
                            <MediumCard key={item.id} media={item} />
                        ))}
                    </div>

                    {isViewPageVisible && (
                        <div ref={loaderRef} className="flex justify-center mt-5">
                            {loading && <div className="loader">Loading...</div>}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default GridMediaContainer;