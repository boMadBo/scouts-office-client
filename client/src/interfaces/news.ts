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

interface Text {
  [key: string]: string;
}

interface WidgetData {
  playerMarketValueBox_1187716773: {
    player: {
      id: string | undefined;
      name: string | undefined;
      image: string | undefined;
      position: string | undefined;
      age: null | string;
      contractUntil: null | string;
      isGoalkeeper: boolean;
      slug: string | undefined;
      marketValue: {
        progression: number | undefined;
        unformatted: number | undefined;
        value: string | undefined;
        currency: string | undefined;
        numeral: string | undefined;
      };
    };
    displayChart: boolean;
  };
  socialBox_713798386: {
    embeddedCode: string | undefined;
  };
  gallery_86932159: {
    id: string | undefined;
    url: string | undefined;
    title: string | undefined;
  };
  images: {
    id: string | undefined;
    title: string | undefined;
    description: string | undefined;
    url: string | undefined;
  }[];
}

export interface StartCurrNews {
  id: string | undefined;
  headline: string | undefined;
  source: string | undefined;
  timestamp: number | undefined;
  timestamp_updated: number | undefined;
  firstImage: string | undefined;
  secondImage: string | undefined;
  heroImage: string | undefined;
  heroImageSource: string | undefined;
  categoryID: string | undefined;
  categoryTag: string | undefined;
  threadUrl: string | undefined;
  countReplies: string | undefined;
  updateFlag: string | undefined;
  adFlag: string | undefined;
  transferFlag: string | undefined;
  author: string | undefined;
  text: Text;
  widgetData: WidgetData;
}

export interface FinCurrNews {
  id: string | undefined;
  headline: string | undefined;
  timestamp: number | undefined;
  formdDate: string;
  firstImage: string | undefined;
  secondImage: string | undefined;
  heroImage: string | undefined;
  text: string;
}
