'use client';
import MediaPost from "@/components/ui/mediaPost";
import { MediaItem, useMedia } from "../../context/mediaContext";
MediaPost

const GridMediaPost = () => {
    const { isLoading, rowsData } = useMedia();

    return (

        <div className="block_area block_area_sidebar block_area-connecting">
            <div className="block_area-header">
                <div className="float-left bah-heading mr-2">
                    <h2 className="cat-heading">Trending Posts</h2>
                </div>
                <div className="float-right viewmore"><a className="btn" href="/community/board" title="View more">View more<i className="fas fa-angle-right ml-2"></i></a></div>
                <div className="clearfix"></div>
            </div>

            <div className="block_area-content">
                {[...Array(4)].map((_, index) => (
                    <MediaPost key={index} media={rowsData[index]} />
                ))}
            </div>

        </div>




    );
};

export default GridMediaPost;
