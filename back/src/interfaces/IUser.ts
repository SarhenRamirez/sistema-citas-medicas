export interface IUser {
  id: number;
  name: string;
  email: string;
  birthdate: string | null;
  nDni: number | null;
  credentialsId: number;
}
