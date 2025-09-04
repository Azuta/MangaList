"use client";

import { MediaItem } from "@/context/mediaContext";

type GridMediaProps = {
    media: MediaItem;
};

const Status = ({
    media
}: GridMediaProps) => {
    return (
        <>
            {media.stats?.statusDistribution?.length > 0 && (
                <div data-v-e2bbc000="" data-v-cdf07c88="" className="status-distribution">
                    <h2 data-v-e2bbc000="" className="link">Status Distribution</h2>
                    <div data-v-e2bbc000="" className="status-distribution content-wrap">
                        <div data-v-e2bbc000="" className="statuses">
                            {media.stats.statusDistribution.map((status) => {
                                // Colores opcionales según status
                                const colors = {
                                    CURRENT: 'rgb(104, 214, 57)',
                                    PLANNING: 'rgb(2, 169, 255)',
                                    PAUSED: 'rgb(146, 86, 243)',
                                    DROPPED: 'rgb(247, 121, 164)',
                                    COMPLETED: 'rgb(232, 93, 117)',
                                };
                                const color = colors[status.status] || '#ccc';
                                return (
                                    <div key={status.status} data-v-e2bbc000="" className="status">
                                        <div data-v-e2bbc000="" className="name" style={{ background: color }}>
                                            {status.status.charAt(0) + status.status.slice(1).toLowerCase()}
                                        </div>
                                        <div data-v-e2bbc000="" className="amount" style={{ color }}>
                                            {status.amount} <span data-v-e2bbc000="" className="label">Users</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div data-v-e2bbc000="" className="percentage-bar">
                            {media.stats.statusDistribution.map((status) => {
                                const colors = {
                                    CURRENT: 'rgb(104, 214, 57)',
                                    PLANNING: 'rgb(2, 169, 255)',
                                    PAUSED: 'rgb(146, 86, 243)',
                                    DROPPED: 'rgb(247, 121, 164)',
                                    COMPLETED: 'rgb(232, 93, 117)',
                                };
                                const color = colors[status.status] || '#ccc';
                                const total = media.stats.statusDistribution.reduce((sum, s) => sum + s.amount, 0);
                                const minWidth = total ? `${(status.amount / total) * 100}%` : '0%';
                                return (
                                    <div
                                        key={status.status}
                                        data-v-e2bbc000=""
                                        className={`el-tooltip percentage ${status.status}`}
                                        tabIndex="0"
                                        style={{ minWidth, background: color }}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Status;
