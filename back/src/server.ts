import "reflect-metadata";
import express from "express";
import cors from "cors";
import morgan from "morgan";

import envs from "./config/envs";
import { AppDataSource } from "./data/app.datasource";
import turnosRoutes from "./routes/turnos.routes";
import usuariosRoutes from "./routes/usuarios.routes";
import { errorMiddleware } from "./middleware/error.middleware";
import { ensureDemoUser } from "./services/demo.service";

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/user", usuariosRoutes);
app.use("/users", usuariosRoutes);
app.use("/turns", turnosRoutes);

app.use(errorMiddleware);

AppDataSource.initialize()
  .then(async () => {
    console.log("📦 Base de datos conectada");
    try {
      await ensureDemoUser();
    } catch (error) {
      console.error("⚠️ No se pudo preparar la cuenta demo:", error);
    }
    app.listen(envs.PORT, () => {
      console.log(`✅ Backend corriendo en http://localhost:${envs.PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Error al conectar la base de datos:", error);
    process.exit(1);
  });
