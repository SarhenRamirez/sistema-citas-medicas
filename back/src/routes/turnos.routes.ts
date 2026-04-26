import { Router } from "express";
import {
  crearTurno,
  obtenerMisTurnos,
  obtenerTurnoPorId,
  cancelarTurno,
  obtenerTodosTurnos,
} from "../controllers/turnos.controller";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.get("/", authMiddleware, obtenerTodosTurnos);
router.get("/mis-turnos", authMiddleware, obtenerMisTurnos);
router.get("/:id", authMiddleware, obtenerTurnoPorId);
router.post("/schedule", authMiddleware, crearTurno);
router.put("/cancel/:id", authMiddleware, cancelarTurno);

export default router;