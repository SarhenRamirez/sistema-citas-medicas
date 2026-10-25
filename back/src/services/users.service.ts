import { AppDataSource } from "../data/app.datasource";
import { User } from "../entities/User";
import { crearCredencial, usernameExists } from "./credentials.service";
import { AppError } from "../middleware/error.middleware";

const repo = () => AppDataSource.getRepository(User);

export const getAllUsers = async (): Promise<User[]> => repo().find();

export const getUserById = async (id: number): Promise<User | undefined> => {
  const user = await repo().findOne({ where: { id } });
  return user ?? undefined;
};

export const getUserByCredentialsId = async (credentialsId: number): Promise<User | undefined> => {
  const user = await repo().findOne({ where: { credentialsId } });
  return user ?? undefined;
};

export const createUser = async (data: {
  name: string;
  email: string;
  birthdate?: string;
  nDni?: number;
  username: string;
  password: string;
}): Promise<User> => {
  const email = data.email.trim().toLowerCase();
  const username = data.username.trim();

  if (await repo().findOne({ where: { email } }))
    throw new AppError("El email ya esta registrado", 409);

  if (await usernameExists(username))
    throw new AppError("El username ya esta en uso", 409);

  const credentialsId = await crearCredencial(username, data.password);

  const newUser = repo().create({
    name: data.name.trim(),
    email,
    birthdate: data.birthdate ?? null,
    nDni: data.nDni ?? null,
    credentialsId,
  });

  return repo().save(newUser);
};
