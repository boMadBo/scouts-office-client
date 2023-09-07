export interface StartNews {
  id: string | undefined;
  newsHeadline: string | undefined;
  timestamp: number | undefined;
  newsSecondImage: string | undefined;
  newsDate: string | undefined;
  fullNewsDate: string | undefined;
  newsTime: string | undefined;
  newsSource: string | undefined;
  newsStartPageFlag: string | null;
  newsShortMessageFlag: string | null;
  newsTeaser: string | undefined;
  newsFirstImage: string | undefined;
  newsSpotlightFirstImage: string | undefined;
  newsSpotlightSecondImage: string | undefined;
  newsCategoryID: string | undefined;
  newsCategoryTag: string | undefined;
  newsTickerFlag: string | undefined;
  newsUpdateFlag: string | undefined;
  newsAdFlag: string | undefined;
  spotlightPriority: string | undefined;
}

export interface FinNews {
  id: string | undefined;
  newsHead: string | undefined;
  newsHeadline: string | undefined;
  timestamp: number | undefined;
  newsPlayerImage: string | undefined;
  newsClubImage: string | undefined;
  newsSpotlightImage: string | undefined;
  newsDate: string | undefined;
  newsTime: string | undefined;
  newsSource: string | undefined;
  newsTeaser: string | undefined;
}
