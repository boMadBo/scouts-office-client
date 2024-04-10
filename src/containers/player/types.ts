export interface ICostRatio {
  title: string;
  value: string | undefined;
}
export interface IPlayerValuesObservation {
  playerId: string;
}

export interface IPlayer {
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
  clubId: string | undefined;
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

export interface IStats {
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

export interface IStatsResult {
  stats: IStats[];
  isGK: boolean;
}

export interface IStatsRequestOptions {
  id: string;
  seasonId: string;
}
export interface ISeason {
  key: string | undefined;
  title: string | undefined;
}

export interface IValueHistory {
  date: string | undefined;
  age: string | undefined;
  marketValue: string | undefined;
  mValueUnform: number | undefined;
  mValueCurr: string | undefined;
  mValueNum: string | undefined;
  clubName: string | undefined;
}

export interface ITransfer {
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
