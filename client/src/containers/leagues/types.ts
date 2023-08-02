export interface ICompetition {
  id: string;
  title: string;
  image: string;
  country: string;
}

export interface ITeam {
  clubImage: string;
  clubName: string;
  draw: number;
  goalDifference: number;
  goals: number;
  goalsConceded: number;
  group: null;
  id: string;
  losses: number;
  markClass: string;
  markColor: string;
  markDescription: string;
  markID: string;
  matches: number;
  oldRank: number;
  points: number;
  rank: number;
  wins: number;
}

interface Injury {
  id: string;
  description: string;
  until: null;
  category: string;
  rehabilitation: string;
  clubIdStart: null;
  clubIdEnd: null;
}

interface IPositionGroup {
  first: IPosition;
  second: IPosition | null;
  third: IPosition | null;
}

interface IPosition {
  id: string;
  name: string;
  shortName: string;
  group: string;
}

interface INationality {
  id: number;
  name: string;
  image: string;
}

interface IMarket {
  value: number;
  currency: string;
  progression: null;
}

export interface IStartSquad {
  height: string;
  foot: string;
  injury: Injury | null;
  suspension: null;
  joined: number;
  contractUntil: number;
  captain: boolean;
  lastClub: null;
  isLoan: null;
  wasLoan: null;
  id: string;
  name: string;
  image: string;
  imageLarge: null;
  imageSource: string;
  shirtNumber: string;
  age: number;
  dateOfBirth: number;
  heroImage: string;
  isGoalkeeper: boolean;
  positions: IPositionGroup;
  nationalities: INationality[];
  marketValue: IMarket;
}

export interface IFinSquad {
  age: number;
  dateOfBirth: string;
  flag: string;
  id: string;
  image: string;
  name: string;
  positionFull: string;
  positionGroup: string;
  positionShort: string;
  shirtNumber: string;
  value: string;
}
