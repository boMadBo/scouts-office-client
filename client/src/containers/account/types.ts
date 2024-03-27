export interface ICity {
  city: string;
  gmt: number;
  currentTimezone?: string;
  order: number;
}

export interface IProfileValues {
  id: number;
  email: string;
  name: string;
  avatar: string;
  birthDate: string;
  country: string;
  observations: string[];
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