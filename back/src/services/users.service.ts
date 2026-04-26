import { IUser } from "../interfaces/IUser";
import { crearCredencial, usernameExists } from "./credentials.service";
import { AppError } from "../middleware/error.middleware";

const users: IUser[] = [
  { id: 1, name: "Carlos Gómez",   email: "carlos@mail.com",  birthdate: "1990-05-15", nDni: 12345678, credentialsId: 1 },
  { id: 2, name: "Ana García",     email: "ana@mail.com",     birthdate: "1985-11-30", nDni: 87654321, credentialsId: 2 },
  { id: 3, name: "Miguel Torres",  email: "miguel@mail.com",  birthdate: "1995-03-22", nDni: 11223344, credentialsId: 3 },
];

let nextId = users.length + 1;

export const getAllUsers = (): IUser[] => users;

export const getUserById = (id: number): IUser | undefined =>
  users.find((u) => u.id === id);

export const getUserByCredentialsId = (credentialsId: number): IUser | undefined =>
  users.find((u) => u.credentialsId === credentialsId);

export const createUser = async (data: {
  name: string;
  email: string;
  birthdate?: string;
  nDni?: number;
  username: string;
  password: string;
}): Promise<IUser> => {
  if (users.some((u) => u.email === data.email))
    throw new AppError("El email ya está registrado", 400);
  if (usernameExists(data.username))
    throw new AppError("El username ya está en uso", 400);

  const credentialsId = await crearCredencial(data.username, data.password);
  const newUser: IUser = {
    id: nextId++,
    name: data.name,
    email: data.email,
    birthdate: data.birthdate ?? null,
    nDni: data.nDni ?? null,
    credentialsId,
  };
  users.push(newUser);
  return newUser;
};
