export interface IRegisterValues {
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