"use client";

import { useState } from "react";
import Link from "next/link";
import { MediaItem } from "@/context/mediaContext";

const mockEpisodes: { id: number; title: string; group: string; user: string; read: boolean; timeAgo: string }[] = [];

const block1 = [1,2,3,4,5,5.5,6,7,7.5,8,9,10];
block1.forEach((id,i)=>{
  for(let g=1; g<=5; g++){
    mockEpisodes.push({
      id,
      title: `Capítulo ${id} - Título largo de ejemplo`,
      group: `Fansub ${g}`,
      user: `Usuario${(i+g)%10+1}`,
      read: Math.random()>0.5,
      timeAgo: `${12-i} horas`
    })
  }
});

for(let i=11;i<=100;i++){
  const extras = Math.random()<0.15 ? parseFloat(Math.random().toFixed(1)) : 0;
  const id = parseFloat((i+extras).toFixed(1));
  const fansubCount = 5 + Math.floor(Math.random()*3); // 5-7 fansubs
  for(let g=1; g<=fansubCount; g++){
    mockEpisodes.push({
      id,
      title: `Capítulo ${id} - Título largo de ejemplo`,
      group: `Fansub ${g}`,
      user: `Usuario${(i+g)%10+1}`,
      read: Math.random()>0.5,
      timeAgo: `${i%24+1} horas`
    })
  }
}

type GridMediaProps = {
  media: MediaItem;
};

const truncateText = (text:string,maxLength:number)=> text.length>maxLength ? text.slice(0,maxLength)+"..." : text;

function groupByChapter(episodes: typeof mockEpisodes){
  const map = new Map<number, typeof mockEpisodes>();
  episodes.forEach(ep=>{
    const chapterId = Math.floor(ep.id);
    const list = map.get(chapterId) ?? [];
    list.push(ep);
    map.set(chapterId,list);
  });
  return map;
}

const MediaChapters = ({media}: GridMediaProps)=>{
  const rangeSize = 10;

  const sortedEpisodes = [...mockEpisodes].sort((a,b)=>b.id-a.id);

  const ranges:{start:number,end:number,episodes: typeof mockEpisodes}[] = [];
  let currentRangeStart = 1;
  let currentRangeEpisodes: typeof mockEpisodes = [];

  sortedEpisodes.forEach(ep=>{
    const mainInt = Math.ceil(ep.id);
    const blockStart = Math.floor((mainInt-1)/rangeSize)*rangeSize+1;

    if(blockStart!==currentRangeStart){
      if(currentRangeEpisodes.length>0){
        ranges.push({
          start: currentRangeStart,
          end: currentRangeStart+rangeSize-1,
          episodes: currentRangeEpisodes
        });
      }
      currentRangeEpisodes=[];
      currentRangeStart=blockStart;
    }
    currentRangeEpisodes.push(ep);
  })

  if(currentRangeEpisodes.length>0){
    ranges.push({
      start: currentRangeStart,
      end: currentRangeStart+rangeSize-1,
      episodes: currentRangeEpisodes
    });
  }

  const [openRanges,setOpenRanges] = useState<number[]>([0]);
  const [openChapters,setOpenChapters] = useState<number[]>([]);

  const toggleRange = (index:number)=>{
    setOpenRanges(prev => prev.includes(index) ? prev.filter(i=>i!==index) : [...prev,index]);
  }

  const toggleChapter = (chapterId:number)=>{
    setOpenChapters(prev => prev.includes(chapterId) ? prev.filter(i=>i!==chapterId) : [...prev,chapterId]);
  }

  return(
    <div className="episodes-list-section" style={{background:"rgb(21, 31, 46)",padding:"20px",borderRadius:"10px"}}>
      <h2>Listado de Episodios</h2>
      <ul className="episodes-list">
        {ranges.map((range,index)=>(
          <li key={index} className="episode-range">
            <div className="range-header"
                 onClick={()=>toggleRange(index)}
                 style={{cursor:"pointer",display:"flex",justifyContent:"space-between",padding:"6px 10px",background:"rgb(40, 50, 70)",borderRadius:"4px",marginBottom:"4px"}}>
              <span>Cap. {range.start} - {range.end}</span>
              <span>{openRanges.includes(index) ? "▼" : "▶"}</span>
            </div>

            {openRanges.includes(index) && (
              <ul>
                {Array.from(groupByChapter(range.episodes))
                  .sort((a,b)=>b[0]-a[0])
                  .map(([chapterId,eps])=>(
                    <li key={chapterId}>
                      {/* Capítulo con borde según leído/no leído */}
                      <div onClick={()=>toggleChapter(chapterId)}
                           style={{borderLeft:`4px solid ${eps[0].read?"red":"green"}`,cursor:"pointer",display:"flex",justifyContent:"space-between",padding:"6px 10px",background:"rgb(30, 40, 60)",borderRadius:"4px",marginBottom:"2px"}}>
                        <div className="row-left">
                          <span className="row-icon">🎬</span>
                          <span className="episode-title">{truncateText(eps[0].title,40)}</span>
                        </div>
                        <div className="row-right">
                          <span>{openChapters.includes(chapterId) ? "▼" : "▶"}</span>
                        </div>
                      </div>

                      {/* Segundo nivel: fansubs sin borde */}
                      {openChapters.includes(chapterId) && (
                        <ul style={{paddingLeft:"20px"}}>
                          {eps.map(ep=>(
                            <Link key={ep.id} href={{pathname:`/media/lectorMedia/${ep.id}`}}>
                              <li className="episode-item" style={{padding:"4px 8px",margin:"2px 0"}}>
                                <div className="episode-row">
                                  <div className="row-left">
                                    <span className="row-icon">👥</span>
                                    <span className="episode-group">{truncateText(ep.group,30)}</span>
                                  </div>
                                  <div className="row-right">
                                    <span className="episode-user">{ep.user}</span>
                                    <span className="row-icon">ℹ️</span>
                                  </div>
                                </div>
                              </li>
                            </Link>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MediaChapters;
