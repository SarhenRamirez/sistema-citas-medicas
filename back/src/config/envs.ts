import "dotenv/config";

interface EnvVars {
  PORT: number;
  DB_HOST: string;
  DB_PORT: number;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  JWT_SECRET: string;
}

const envs: EnvVars = {
  PORT: Number(process.env.PORT) || 3000,
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_PORT: Number(process.env.DB_PORT) || 5432,
  DB_USERNAME: process.env.DB_USER || "postgres",
  DB_PASSWORD: process.env.DB_PASSWORD || "",
  DB_NAME: process.env.DB_NAME || "meditom",
  JWT_SECRET: process.env.JWT_SECRET!,
};

if (!envs.JWT_SECRET) {
  throw new Error("❌ JWT_SECRET no está definido en las variables de entorno");
}

export default envs;