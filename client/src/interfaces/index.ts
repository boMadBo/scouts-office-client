export interface City {
  city: string;
  gmt: number;
  currentTimezone?: string;
  order: number;
}

<<<<<<< HEAD
<<<<<<< HEAD
=======
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

>>>>>>> 8673b67 (add server and start auth)
=======
>>>>>>> dfd4232 (create squad page)
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 266d9e0 (add profile editor)

export interface IProfileUpdate {
  _id: string;
  password: string;
  fullName: string;
  email: string;
  avatarUrl: File | null;
}
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 590496a (todo on server)

export interface ITasks {
  _id?: string;
  userId?: string | undefined;
  text: string;
  completed: boolean;
}
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 431f668 (dev leagues)

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

<<<<<<< HEAD
<<<<<<< HEAD
export interface Columns {
  title: string;
}

export interface Rates {
  [key: string]: string;
}

export interface Observe {
  _id?: string;
  id: string | undefined;
  userId?: string;
}

export interface ObservePlayers {
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> a40623b (add messages logic)

export interface IConversations {
  _id: string;
  members: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IConversationNames {
  _id: string;
  members: string[];
  sender: {
    id: string | undefined;
    senderName: string | undefined;
  };
  receiver: {
    id: string | undefined;
    receiverName: string | undefined;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IMessages {
  _id: string;
  conversationId: string;
  sender: string;
  text: string;
  createdAt: string;
<<<<<<< HEAD
  isReaded: boolean;
=======
>>>>>>> a40623b (add messages logic)
  updatedAt: string;
  __v: number;
}

export interface IMessagesNames {
  _id: string;
  conversationId: string;
  sender: string;
  text: string;
<<<<<<< HEAD
  isReaded: boolean;
=======
>>>>>>> a40623b (add messages logic)
  createdAt: string;
  updatedAt: string;
  __v: number;
  senderName: string | undefined;
}

export interface IMessage {
<<<<<<< HEAD
<<<<<<< HEAD
  _id?: string | undefined;
  sender: string | undefined;
  text: string | undefined;
  conversationId: string | undefined;
  createdAt?: string | undefined;
  senderName?: string | undefined;
  isReaded?: boolean;
}
=======
>>>>>>> 8673b67 (add server and start auth)
=======
>>>>>>> 266d9e0 (add profile editor)
=======
>>>>>>> 590496a (todo on server)
=======
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
=======
export interface Columns {
  title: string;
>>>>>>> dfd4232 (create squad page)
}
>>>>>>> 431f668 (dev leagues)
=======
>>>>>>> ee96416 (add usd,btc, in process observe)
=======
=======
  _id?: string | undefined;
>>>>>>> b6a0b5c (start ws)
  sender: string | undefined;
  text: string | undefined;
  conversationId: string | undefined;
  createdAt?: string | undefined;
  senderName?: string | undefined;
}
>>>>>>> a40623b (add messages logic)
