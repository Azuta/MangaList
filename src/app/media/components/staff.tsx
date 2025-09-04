"use client";

import { MediaItem } from "@/context/mediaContext";

type GridMediaProps = {
    media: MediaItem;
};

const Staff = ({
    media
}: GridMediaProps) => {
    return (
        <>
            {media.staff?.edges?.length > 0 && (
                <div data-v-cdf07c88="" className="staff">
                    <h2 className="link">Staff</h2>
                    <div className="grid-wrap">
                        {media.staff.edges.map((staff) => (
                            <div key={staff.id} data-v-f92815d6="" className="role-card view-staff small">
                                <div data-v-f92815d6="" className="staff">
                                    <a
                                        data-v-f92815d6=""
                                        href={`/staff/${staff.node.id}/${staff.node.name.full.replace(/\s+/g, "-")}`}
                                        className="cover"
                                        style={{ backgroundImage: `url('${staff.node.image?.large || "https://s4.anilist.co/file/anilistcdn/staff/large/default.jpg"}')` }}
                                    />
                                    <a
                                        data-v-f92815d6=""
                                        href={`/staff/${staff.node.id}/${staff.node.name.full.replace(/\s+/g, "-")}`}
                                        className="content"
                                    >
                                        <div data-v-f92815d6="" className="name">{staff.node.name.full}</div>
                                        <div data-v-f92815d6="" className="role">{staff.role}</div>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </>
    );
};

export default Staff;
