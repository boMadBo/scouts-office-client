export interface ICity {
  city: string;
  gmt: number;
  currentTimezone?: string;
  order: number;
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

export interface IProfileUpdateValues {
  _id: string;
  password: string;
  fullName: string;
  email: string;
  avatarUrl: File | null;
}

export interface ITask {
  _id?: string;
  userId?: string | undefined;
  text: string;
  completed: boolean;
}

interface IHour {
  temperature_2m: number[];
  time: string[];
  rain: number[];
  snowfall: number[];
}

interface IHourUnit {
  temperature_2m: string;
  time: string;
  rain: string;
  snowfall: string;
}

export interface IWeather {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  hourly_units: IHourUnit;
  hourly: IHour;
}