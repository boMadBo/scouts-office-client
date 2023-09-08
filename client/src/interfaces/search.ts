interface Count {
  players: number | undefined;
  coaches: number | undefined;
  clubs: number | undefined;
  competitions: number | undefined;
  referees: number | undefined;
}

interface Players {
  id: string | undefined;
  playerName: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  alias: string | undefined;
  nationImage: string | undefined;
  club: string | undefined;
  playerImage: string | undefined;
}

interface Coaches {
  coachImage: string | undefined;
  coachName: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  alias: string | undefined;
  currentFunction: string | undefined;
  club: string | undefined;
  nationImage: string | undefined;
}

interface Clubs {
  id: string | undefined;
  league: string | undefined;
  competitionID: string | undefined;
  competitionName: string | undefined;
  name: string | undefined;
  logoImage: string | undefined;
}

interface Referees {
  id: string | undefined;
  refereeImage: string | undefined;
  refereeName: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  alias: string | undefined;
  club: string | undefined;
  nationImage: string | undefined;
}

interface Competitions {
  id: string | undefined;
  competitionName: string | undefined;
  competitionImage: string | undefined;
  country: string | undefined;
  countryImage: string | undefined;
}

export interface ISearch {
  count?: Count;
  players?: Players[];
  coaches?: Coaches[];
  clubs?: Clubs[];
  referees?: Referees[];
  competitions?: Competitions[];
}
