import bcrypt from "bcryptjs";
import { AppDataSource } from "../data/app.datasource";
import { Credential } from "../entities/Credential";

const repo = () => AppDataSource.getRepository(Credential);

export const usernameExists = async (username: string): Promise<boolean> => {
  const count = await repo().count({ where: { username } });
  return count > 0;
};

export const crearCredencial = async (username: string, password: string): Promise<number> => {
  const hashed = await bcrypt.hash(password, 10);
  const nueva = repo().create({ username, password: hashed });
  const saved = await repo().save(nueva);
  return saved.id;
};

export const checkCredentials = async (username: string, password: string): Promise<number | null> => {
  const credencial = await repo().findOne({ where: { username } });
  if (!credencial) return null;
  const isValid = await bcrypt.compare(password, credencial.password);
  return isValid ? credencial.id : null;
};
