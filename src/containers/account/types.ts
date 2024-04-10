export interface IUtcZone {
  id: number;
  city: string;
  time?: string;
  order: number;
  isActive: boolean;
}

export interface IUpdateUtcZone {
  id: number;
  isActive?: boolean;
  order?: number;
}

export interface IProfileValues {
  id: number;
  email: string;
  name: string;
  avatar: string;
  birthDate: string;
  country: string;
  observations: string[];
  token: string;
  refreshToken: string;
  utcZones: IUtcZone[];
}

export interface IProfileUpdateValues {
  id: string;
  password: string;
  name: string;
  email: string;
  // avatar: string;
}

export interface ITask {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  text: string;
  completed: boolean;
}

export interface ICreateTask {
  text: string;
  completed: boolean;
}

export interface ICountryFlag {
  flag: string;
}

export interface IWeatherResult {
  temperature: number;
  rain: number;
  snowfall: number;
}

export interface IBtcAndUsdCurrency {
  BTC: string;
  USD: string;
}