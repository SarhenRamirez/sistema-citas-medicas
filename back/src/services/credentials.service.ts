import bcrypt from "bcryptjs";
import { ICredential } from "../interfaces/ICredential";

const credentials: ICredential[] = [
  { id: 1, username: "carlos_gomez",   password: bcrypt.hashSync("123456", 10) },
  { id: 2, username: "ana_garcia",     password: bcrypt.hashSync("123456", 10) },
  { id: 3, username: "miguel_torres",  password: bcrypt.hashSync("123456", 10) },
];

let nextId = credentials.length + 1;

export const usernameExists = (username: string): boolean =>
  credentials.some((c) => c.username === username);

export const crearCredencial = async (username: string, password: string): Promise<number> => {
  const hashed = await bcrypt.hash(password, 10);
  const nueva: ICredential = { id: nextId++, username, password: hashed };
  credentials.push(nueva);
  return nueva.id;
};

export const checkCredentials = async (username: string, password: string): Promise<number | null> => {
  const credencial = credentials.find((c) => c.username === username);
  if (!credencial) return null;
  const isValid = await bcrypt.compare(password, credencial.password);
  return isValid ? credencial.id : null;
};
