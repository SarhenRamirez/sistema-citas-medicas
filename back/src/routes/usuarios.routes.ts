import { Router } from "express";
import { authMiddleware } from "../middleware/auth";
import { getAllUsersController, getUserByIdController, getPerfil } from "../controllers/usuarios.controller";
import { login, register } from "../controllers/auth.controller";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/", authMiddleware, getAllUsersController);
router.get("/perfil", authMiddleware, getPerfil);
router.get("/:id", authMiddleware, getUserByIdController);

export default router;
