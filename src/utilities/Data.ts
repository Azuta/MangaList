

export const FILTER_KEYS = ["Search", "Genres", "Year", "Airing Status", "Format", "Season"];

export const YEARS = [
    1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995,
    1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008,
    2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021,
    2022, 2023, 
  ];
  
export const FORMAT = ["tv", "movie", "special", "ova", "ona", "music"];
  
export const STATUS = ["finished", "current", "unreleased", "tba"];
  
export const GENRES = ['Action', 'Adventure', 'Comedy', 'Drama', 'Ecchi', 'Fantasy', 'Horror', 'Mahou Shoujo', 'Mecha', 'Music', 'Mistery', 'Psychological', 'Romance']
  
export const SEASON = ['All', 'Spring', 'Summer', 'Fall', 'Winter']

export const COLORS = [
  "blue",
  "strawberry",
  "royal",
  "coffee",
  "lavander",
  "grass"
] as const;

export type ColorKey = typeof COLORS[number];

export const colorMap: Record<ColorKey, { text: string; bg: string }> = {
  blue: {
    text: "text-blue",
    bg: "bg-blue",
  },
  strawberry: {
    text: "text-strawberry",
    bg: "bg-strawberry",
  },
  royal: {
    text: "text-royal",
    bg: "bg-royal",
  },
  coffee: {
    text: "text-coffee",
    bg: "bg-coffee",
  },
  lavander: {
    text: "text-lavander",
    bg: "bg-lavander",
  },
  grass: {
    text: "text-grass",
    bg: "bg-grass",
  }

};