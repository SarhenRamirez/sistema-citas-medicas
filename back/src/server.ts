import "reflect-metadata";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

import { AppDataSource } from "./data/app.datasource";
import authRoutes from "./routes/auth.routes";
import turnosRoutes from "./routes/turnos.routes";
import usuariosRoutes from "./routes/usuarios.routes";
import { errorMiddleware } from "./middleware/error.middleware";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev")); 

app.use("/api/auth", authRoutes);
app.use("/api/turnos", turnosRoutes);
app.use("/api/usuarios", usuariosRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("📦 Base de datos conectada");
    app.listen(PORT, () => {
      console.log(`✅ Backend corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Error al conectar la base de datos:", error);
    process.exit(1);
  });