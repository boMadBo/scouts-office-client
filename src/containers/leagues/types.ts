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

export interface ISquad {
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
