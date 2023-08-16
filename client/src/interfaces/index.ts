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
