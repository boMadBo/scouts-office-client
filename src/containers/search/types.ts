interface ICount {
  players: number | undefined;
  coaches: number | undefined;
  clubs: number | undefined;
  competitions: number | undefined;
  referees: number | undefined;
}

interface IPlayer {
  id: string | undefined;
  playerName: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  alias: string | undefined;
  nationImage: string | undefined;
  club: string | undefined;
  playerImage: string | undefined;
}

interface ICoach {
  coachImage: string | undefined;
  coachName: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  alias: string | undefined;
  currentFunction: string | undefined;
  club: string | undefined;
  nationImage: string | undefined;
}

interface IClub {
  id: string | undefined;
  league: string | undefined;
  competitionID: string | undefined;
  competitionName: string | undefined;
  name: string | undefined;
  logoImage: string | undefined;
}

interface IReferee {
  id: string | undefined;
  refereeImage: string | undefined;
  refereeName: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  alias: string | undefined;
  club: string | undefined;
  nationImage: string | undefined;
}

interface ICompetition {
  id: string | undefined;
  competitionName: string | undefined;
  competitionImage: string | undefined;
  country: string | undefined;
  countryImage: string | undefined;
}

export interface ISearch {
  count?: ICount;
  players?: IPlayer[];
  coaches?: ICoach[];
  clubs?: IClub[];
  referees?: IReferee[];
  competitions?: ICompetition[];
}
