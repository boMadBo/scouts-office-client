interface Injury {
  id: string;
  description: string;
  until: null;
  category: string;
  rehabilitation: string;
  clubIdStart: null;
  clubIdEnd: null;
}

interface Position {
  first: Pos;
  second: Pos | null;
  third: Pos | null;
}

interface Pos {
  id: string;
  name: string;
  shortName: string;
  group: string;
}

interface Nationalities {
  id: number;
  name: string;
  image: string;
}

interface Market {
  value: number;
  currency: string;
  progression: null;
}

export interface StartSquad {
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
  positions: Position;
  nationalities: Nationalities[];
  marketValue: Market;
}

export interface FinSquad {
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
