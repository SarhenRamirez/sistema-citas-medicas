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
  if (await repo().findOne({ where: { email: data.email } }))
    throw new AppError("El email ya esta registrado", 400);

  if (await usernameExists(data.username))
    throw new AppError("El username ya esta en uso", 400);

  const credentialsId = await crearCredencial(data.username, data.password);

  const newUser = repo().create({
    name: data.name,
    email: data.email,
    birthdate: data.birthdate ?? null,
    nDni: data.nDni ?? null,
    credentialsId,
  });

  return repo().save(newUser);
};
