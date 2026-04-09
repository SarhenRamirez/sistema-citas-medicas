import { Router } from "express";
import {
  crearTurno,
  obtenerMisTurnos,
  obtenerTurnoPorId,
  cancelarTurno,
} from "../controllers/turnos.controller";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.post("/", authMiddleware, crearTurno);
router.get("/mis-turnos", authMiddleware, obtenerMisTurnos);
router.get("/:id", authMiddleware, obtenerTurnoPorId);
router.patch("/:id/cancelar", authMiddleware, cancelarTurno);

export default router;