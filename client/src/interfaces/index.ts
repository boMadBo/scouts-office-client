export interface City {
  city: string;
  gmt: number;
  currentTimezone?: string;
  order: number;
}

export interface Hours {
  temperature_2m: number[];
  time: string[];
  rain: number[];
  snowfall: number[];
}

export interface Elements {
  temperature_2m: string;
  time: string;
  rain: string;
  snowfall: string;
}

export interface Weather {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  hourly_units: Elements;
  hourly: Hours;
}

export interface IRegister {
  email: string;
  password: string;
  fullName: string;
  birthDate: string;
  country: string;
  avatarUrl: File | null;
}

export interface ISignInValues {
  email: string;
  password: string;
  token?: string;
}

export interface IProfileValues {
  _id: string;
  email: string;
  password: string;
  fullName: string;
  avatarUrl: string;
  birthDate: string;
  country: string;
}

export interface IProfileUpdate {
  _id: string;
  password: string;
  fullName: string;
  email: string;
  avatarUrl: File | null;
}

export interface ITasks {
  _id?: string;
  text: string;
  completed: boolean;
}

export interface Competition {
  id: string;
  title: string;
  image: string;
  country: string;
}

export interface Team {
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

// ==== dev ==== ///

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
  // progression: null;
}

export interface ISquad {
  height: string;
  foot: string;
  injury: Injury | null;
  // suspension: null;
  // joined: number;
  contractUntil: number;
  captain: boolean;
  // lastClub: null;
  isLoan: null;
  // wasLoan: null;
  id: string;
  name: string;
  image: string;
  // imageLarge: null;
  // imageSource: string;
  shirtNumber: string;
  age: number;
  dateOfBirth: number;
  // heroImage: string;
  isGoalkeeper: boolean;
  positions: Position;
  nationalities: Nationalities[];
  marketValue: Market;
}
