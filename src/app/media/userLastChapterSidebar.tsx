'use client';
import MediumCard from "@/components/ui/cards/MediumCard";
import { MediaItem, useMedia } from "../../context/mediaContext";
import SidebarListCard from "@/components/ui/cards/SidebarListCard";

const name = "Capítulo 23: HasdasdHasdasdHasdasdHasdasdHasdasdHasdasdHasdasdHasdasdHasdasdHasdasdHasdasdHasdasdHasdasdHasdasdHasdasdHasdasdHasdasdHasdasdHasdasdHasdasdHasdasd";

function shortenAnimeName(name: string) {
    // Limita a 15 caracteres y agrega "…" si se corta
    const shortName = name.length > 25 ? name.slice(0, 25) + "…" : name;
    return shortName;
}

const shortName = shortenAnimeName(name);
const isVisible = true;
const img = "https://mangadex.org/covers/8754fb67-d7f1-45f8-ad40-e4c218ba5836/605caded-f8d6-483b-a5e7-bd0ead4244b7.png.512.jpg"

type GridMediaProps = {
    title: string;
    media: any;
};

const UserLastChapterSidebar = ({
    title,
    media
}: GridMediaProps) => {
    return (
        <section className="block_area block_area_sidebar block_area-realtime">
            <div className="block_area-header">
                <div className="float-left bah-heading mr-2">
                    <h2 className="cat-heading">{title}</h2>
                </div>
                <div className="clearfix"></div>
            </div>
            <div className="block_area-content">
                <div className="cbox cbox-list cbox-realtime">
                    <div className="cbox-content">
                        <div className="tab-content">
                            <div id="top-viewed-day" className="anif-block-ul anif-block-chart tab-pane active">
                                <ul className="ulclear">
                                    {(media || []).slice(0, 5).map((item, idx) => (
                                        <SidebarListCard key={item.id} id={idx} media={item} />
                                    ))}
                                </ul>
                            </div>
                            <div className="clearfix"></div>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                </div>
            </div>
        </section>);
};

export default UserLastChapterSidebar;
