export interface ICostRatio {
  [key: string]: string;
}

export interface IPlayerIdValuesObserve {
  _id?: string;
  id: string | undefined;
  userId?: string;
}

export interface IPlayerObserve {
  _id: string | undefined;
  playerID: string | undefined;
  playerName: string | undefined;
  age: string | undefined;
  position: string | undefined;
  clubId: string | undefined;
  club: string | undefined;
  marketValue: string | undefined;
  currency: string | undefined;
  numeral: string | undefined;
  agent: string | undefined;
}


interface ILoanData {
  loan: string;
  loanStart: string;
  loanUntil: string;
  contractOptions: string;
  ownerName: string;
  ownerID: string;
  ownerImage: string;
  ownerContractUntil: string;
}

interface IRelatedness {
  id: string;
  personName: string;
  personGroup: string;
  personID: string;
  degreeOfRelationship: string;
}

interface IInjuryData {
  id: string;
  title: string;
  until: string;
  rehabilitationFlag: string;
}

interface IAbsenceData {
  id: string;
  title: string;
  until: string;
  competitionID: string;
  matches: string;
}

export interface StartPlayer {
  playerID: string;
  playerImage: string;
  playerName: string;
  playerFullName: string;
  birthplace: string;
  dateOfBirth: string;
  dateOfDeath: null;
  playerShirtNumber: string;
  birthplaceCountry: string;
  birthplaceCountryImage: string;
  age: string;
  height: string;
  foot: string;
  internationalTeam: string;
  internationalTeamImage: string;
  internationalTeamStatus: string;
  internationalGames: string;
  internationalGoals: string;
  internationalTeamShortTag: string;
  internationalShirtNumber: string;
  internationalWmMember: boolean;
  internationalValueRank: number;
  country: string;
  countryImage: string;
  countryShortName: string;
  secondCountry: string;
  secondCountryImage: string;
  league: string;
  leagueLogo: string;
  clubImage: string;
  club: string;
  clubID: string;
  loan: ILoanData;
  contractExpiryDate: string;
  agent: string;
  agentId: string;
  outfitter: string;
  positionGroup: string;
  playerMainPosition: string;
  playerSecondPosition: string;
  playerThirdPosition: string;
  marketValue: string;
  marketValueCurrency: string;
  marketValueNumeral: string;
  marketValueLastChange: string;
  relatedness: IRelatedness[];
  injury: IInjuryData;
  absence: IAbsenceData;
  allSuspensions: [];
}

export interface FinPlayer {
  playerID: string | undefined;
  playerImage: string | undefined;
  playerName: string | undefined;
  dateOfBirth: string | undefined;
  playerShirtNumber: string | undefined;
  age: string | undefined;
  height: string | undefined;
  foot: string | undefined;
  country: string | undefined;
  countryImage: string | undefined;
  internationalGames: string | undefined;
  internationalGoals: string | undefined;
  league: string | undefined;
  leagueLogo: string | undefined;
  clubImage: string | undefined;
  club: string | undefined;
  loanUntil: string | undefined;
  LoanOwnerName: string | undefined;
  ownerImage: string | undefined;
  contractExpiryDate: string | undefined;
  agent: string | undefined;
  agentId: string | undefined;
  playerMainPosition: string | undefined;
  playerSecondPosition: string | undefined;
  playerThirdPosition: string | undefined;
  marketValue: string | undefined;
  marketValueNumeral: string | undefined;
  marketValueCurrency: string | undefined;
  injuryTitle: string | undefined;
  injuryUntil: string | undefined;
}

export interface StartStats {
  competition: {
    id: string;
    name: string;
    shortName: string;
    image: string;
    leagueLevel: null;
    isTournament: null;
  };
  performance: {
    ownGoals: string;
    yellowCards: string;
    yellowRedCards: string;
    redCards: string;
    minutesPlayed: number;
    penaltyGoals: string;
    minutesPerGoal: number;
    matches: string;
    goals: string;
    assists: string;
    toNil: number;
    concededGoals: number;
    isGoalkeeper: null | true;
  };
  clubs: {
    id: string;
    name: string;
    fullName: string;
    image: string;
    nationalTeam: string;
    flag: null;
    marketValue: null;
    mainCompetition: null;
  }[];
}

export interface FinStats {
  compId: string | undefined;
  compName: string | undefined;
  compImage: string | undefined;
  yellowCards: string | undefined;
  redCards: string | undefined;
  minutesPlayed: number | undefined;
  penaltyGoals: string | undefined;
  minutesPerGoal: number | undefined;
  matches: string | undefined;
  goals: string | undefined;
  assists: string | undefined;
  toNil: number | undefined;
  concededGoals: number | undefined;
  isGoalkeeper: null | boolean | undefined;
}

export interface Seasons {
  key: string | undefined;
  title: string | undefined;
}

export interface StartValue {
  date: string | undefined;
  unformattedDate: string | undefined;
  age: string | undefined;
  marketValue: string | undefined;
  marketValueUnformatted: number | undefined;
  marketValueCurrency: string | undefined;
  marketValueNumeral: string | undefined;
  clubID: string | undefined;
  clubName: string | undefined;
  clubShortName: string | undefined;
  clubImage: string | undefined;
  seasonID: string | undefined;
}

export interface FinValue {
  date: string | undefined;
  age: string | undefined;
  marketValue: string | undefined;
  mValueUnform: number | undefined;
  mValueCurr: string | undefined;
  mValueNum: string | undefined;
  clubName: string | undefined;
}

export interface StartTransfers {
  playerID: string | undefined;
  oldClubID: string | undefined;
  oldClubName: string | undefined;
  oldClubImage: string | undefined;
  newClubID: string | undefined;
  newClubName: string | undefined;
  newClubImage: string | undefined;
  transferFeeValue: string | undefined;
  transferFeeCurrency: string | undefined;
  transferFeeNumeral: string | undefined;
  playerName: string | undefined;
  playerImage: string | undefined;
  countryID: string | undefined;
  countryImage: string | undefined;
  loan: string | undefined;
  date: string | undefined;
  season: string | undefined;
  newClubCountryName: string | undefined;
  newClubCountryImage: string | undefined;
}

export interface FinTransfers {
  playerID: string | undefined;
  oldClubID: string | undefined;
  oldClubName: string | undefined;
  oldClubImage: string | undefined;
  newClubID: string | undefined;
  newClubName: string | undefined;
  newClubImage: string | undefined;
  feeValue: string | undefined;
  feeCurrency: string | undefined;
  feeNumeral: string | undefined;
  loan: string | undefined;
  date: string | undefined;
  season: string | undefined;
}
