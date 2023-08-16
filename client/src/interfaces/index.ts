export interface City {
  city: string;
  gmt: number;
  currentTimezone?: string;
  order: number;
}

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

export interface Columns {
  title: string;
}

export interface Rates {
  [key: string]: string;
}

export interface Observe {
  _id?: string;
  id: string | undefined;
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
  isReaded: boolean;
  updatedAt: string;
  __v: number;
}

export interface IMessagesNames {
  _id: string;
  conversationId: string;
  sender: string;
  text: string;
  isReaded: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  senderName: string | undefined;
}

export interface IMessage {
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
