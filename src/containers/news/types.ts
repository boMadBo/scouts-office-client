export interface INews {
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

export interface INewsResult {
  headNews: INews[];
  tapeNews: INews[];
}

export interface IRevealNews {
  id: string | undefined;
  headline: string | undefined;
  timestamp: number | undefined;
  formdDate: string;
  firstImage: string | undefined;
  secondImage: string | undefined;
  heroImage: string | undefined;
  text: string;
}
