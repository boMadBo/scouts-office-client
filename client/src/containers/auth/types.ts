export interface IRegistrationValues {
  email: string;
  password: string;
  name: string;
  birthDate: string;
  country: string;
  avatar: File | null;
}

export interface ISignInValues {
  email: string;
  password: string;
  accessToken?: string;
  refreshToken?: string;
  expiresIn?: string;
}

export interface ISignInResponseValues {
  id: number;
  name: string;
  accessToken?: string;
  refreshToken?: string;
  expiresIn?: string;
}