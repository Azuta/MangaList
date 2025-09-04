'use client';
import BigCard from "@/components/ui/cards/BigCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

type GridMediaProps = {
    title: string;
    media: any;
};

const SliderMediaContainer = ({
    title,
    media
}: GridMediaProps) => {

    return (
        <div id="anime-trending">
            <div className="container">
                <section className="block_area block_area_trending">
                    <div className="block_area-header">
                        <div className="bah-heading">
                            <h2 className="cat-heading">{title}</h2>
                        </div>
                        <div className="clearfix"></div>
                    </div>
                    <div className="block_area-content">
                        <div className="trending-list" id="trending-home" >
                            <Swiper
                                spaceBetween={9} // equivale a margin-right de cada slide
                                slidesPerView={6} // puedes cambiar cuántos slides se ven
                                grabCursor={true}
                                loop={true} // para que el slider vuelva al inicio infinitamente
                            >
                                {(media || []).slice(0, 9).map((item, idx) => (
                                    <SwiperSlide
                                        key={item.id}
                                        className="swiper-slide item-qtip swiper-slide-active loaded w-[256px]"
                                    >
                                        <BigCard media={item} id={idx} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default SliderMediaContainer;
