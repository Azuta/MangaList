'use client';
import Image from "next/image";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import { useMemo, useState } from "react";
import { MediaItem } from "@/context/mediaContext"; // tipo genérico
import { colorMap, COLORS } from "@/utilities/Data";

type CardProps = {
    media: MediaItem; // ahora es genérico
};

const MediaPost = ({ media }: CardProps) => {
    const [isHovering, setIsHovering] = useState(false);

    return (
        <div className="zr-connect zr-connect-list">
            <div className="connecting-list">

                <div className="item">
                    <div className="gi-top d-flex justify-content-between align-items-center">
                        <div className="ztag">
                            <span className="zt-blue mr-2">#General</span>
                            <div className="time d-inline"><span><i className="dot mr-2"></i>3 hours ago</span></div>
                        </div>
                        <div className="gi-stats d-flex align-items-center">
                            <div className="ml-4"><i className="fas fa-comment mr-1"></i>91</div>
                        </div>
                    </div>
                    <h4 className="item-name"><a href="/community/post/why-overflow-is-the-best-anime-ever-better-than-fmab-aot-op-275755" title="Why Overflow is the BEST Anime Ever (Better Than FMAB, AOT, OP!)🔥 💯">Why Overflow is the BEST Anime Ever (Better Than FMAB, AOT, OP!)🔥 💯</a></h4>
                    <div className="subject">
                        <div>OVERFLOW is the peak anime, Ik many of you debate on which is the best anime of all time, but here me out, overflow surpasses all those anime in almost all categories.

                            IT has an amazing story with forbidden love, it's fun, spicy and you can't keep your eyes away from the screen. The animation is literally next level and the plot twists hit hard. Overflow's got that special sauce in it.

                            For all new anime watchers who have not watched this masterpiece, PLEASE GO WATCH IT. It's literally better than all the common anime people suggest : FMAB, AOT, JJK, etc</div>
                    </div>
                    <div className="cn-owner">
                        <div className="profile-avatar">
                            <img src="https://mangadex.org/covers/8754fb67-d7f1-45f8-ad40-e4c218ba5836/605caded-f8d6-483b-a5e7-bd0ead4244b7.png.512.jpg" alt="​ ​" />
                        </div>


                        <a href="/community/user/6490915" target="_blank" className="user-name is-level-x is-level-a">
                            <i className="badg-level level-a up-3"></i>
                            <span>Starfish</span>

                        </a>


                    </div>
                </div>
            </div>
        </div>

    );
};

export default MediaPost;
