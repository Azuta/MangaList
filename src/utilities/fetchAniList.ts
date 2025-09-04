// src/utilities/fetchAniList.ts
const ANILIST_API = "https://graphql.anilist.co";

export const fetchAniList = async (query: string, retries = 3): Promise<any> => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(ANILIST_API, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`HTTP ${res.status}: ${text}`);
      }

      const data = await res.json();
      return data.data;
    } catch (err) {
      if (attempt === retries) throw err;
      console.warn(`Attempt ${attempt} failed, retrying...`);
      await new Promise((r) => setTimeout(r, 500 * attempt));
    }
  }
};
