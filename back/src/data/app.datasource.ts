import { DataSource } from "typeorm";
import envs from "../config/envs";
import { User } from "../entities/User";
import { Turno } from "../entities/Turno";
import { Credential } from "../entities/Credential";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: envs.DB_HOST,
  port: envs.DB_PORT,
  username: envs.DB_USERNAME, 
  password: envs.DB_PASSWORD,
  database: envs.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User, Turno, Credential],
});
