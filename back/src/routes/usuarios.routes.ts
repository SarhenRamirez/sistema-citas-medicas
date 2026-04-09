import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import { getPerfil } from "../controllers/usuarios.controller";

const router = Router();

router.get("/perfil", authMiddleware, getPerfil);

export default router;