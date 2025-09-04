// src/app/api/anilist/route.ts
import { NextRequest, NextResponse } from "next/server";
import { fetchAniList } from "@/utilities/fetchAniList";

export async function GET(req: NextRequest) {
  const animeIdParam = req.nextUrl.searchParams.get("id");

  try {
    if (animeIdParam) {
      const animeId = parseInt(animeIdParam, 10);
      if (isNaN(animeId) || animeId <= 0) {
        return NextResponse.json(
          { success: false, error: "Invalid anime ID" },
          { status: 400 }
        );
      }

      const query = `
        query {
          Media(id: ${animeId}, type: MANGA) {
            rankings { rank type allTime}
            id
            idMal
            type
            format
            status
            description(asHtml: true)
            startDate { year month day }
            endDate { year month day }
            source
            averageScore
            popularity
            countryOfOrigin
            synonyms
            genres
            title { romaji english native }
            coverImage { extraLarge large medium color }
            bannerImage
            relations { edges { id relationType node { id type title { romaji english native } coverImage { large } } } }
            characters { edges { id role voiceActors { id name { full } language image { medium } } node { id name { full } image { large medium } } } }
            staff { edges { id role node { id name { full } image { large } } } }
            stats { statusDistribution { status amount } scoreDistribution { score amount } }
            streamingEpisodes { title thumbnail url site }
            recommendations { edges { node { id mediaRecommendation { id title { romaji english } coverImage { large } } } } }
            trailer { id site thumbnail }
            tags { name rank isAdult }
            externalLinks { site url icon}
          }
        }
      `;

      let result;
      try {
        result = await fetchAniList(query);
      } catch (fetchErr: any) {
        console.error("AniList API error:", fetchErr);
        // Manejo de errores según status
        if (fetchErr.message?.includes("429")) {
          return NextResponse.json(
            { success: false, error: "Rate limit exceeded. Try again later." },
            { status: 429 }
          );
        }
        if (fetchErr.message?.includes("400")) {
          return NextResponse.json(
            { success: false, error: "Bad request. Check your query or ID." },
            { status: 400 }
          );
        }
        return NextResponse.json(
          { success: false, error: fetchErr.message || "Unknown fetch error" },
          { status: 500 }
        );
      }

      if (!result?.Media) {
        return NextResponse.json(
          { success: false, error: "Anime not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({ success: true, data: { Media: result.Media } });

    } else {
      // Listas de manga
      const values = `
        id
        title { romaji english native }
        description
        status
        genres
        coverImage { large }
        format
      `;

      const listQuery = `
        query {
          trending: Page(page: 1, perPage: 10) { media(type: MANGA, sort: TRENDING_DESC) { ${values} } }
          popular: Page(page: 1, perPage: 10) { media(type: MANGA, sort: POPULARITY_DESC, status: RELEASING) { ${values} } }
          upcoming: Page(page: 1, perPage: 10) { media(type: MANGA, sort: START_DATE_DESC, status: NOT_YET_RELEASED) { ${values} } }
          allTime: Page(page: 1, perPage: 10) { media(type: MANGA, sort: SCORE_DESC) { ${values} } }
        }
      `;

      let data;
      try {
        data = await fetchAniList(listQuery);
      } catch (listErr: any) {
        console.error("AniList list fetch error:", listErr);
        return NextResponse.json(
          { success: false, error: listErr.message || "Failed to fetch list" },
          { status: 500 }
        );
      }

      return NextResponse.json({ success: true, data });
    }
  } catch (err: any) {
    console.error("Unhandled error in route:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Unknown error" },
      { status: 500 }
    );
  }
}
