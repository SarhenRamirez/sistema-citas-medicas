import { Request, Response, NextFunction } from "express";
import {
  crearTurnoService,
  obtenerTurnosUsuarioService,
  cancelarTurnoService,
  obtenerTurnoPorIdService,
} from "../services/turnos.service";

export const crearTurno = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { fecha, hora } = req.body;
    const userId = req.user!.id;
    const turno = await crearTurnoService(userId, fecha, hora);
    res.status(201).json({
      message: "Turno agendado correctamente",
      turno: { id: turno.id, fecha: turno.fecha, hora: turno.hora, estado: turno.estado },
    });
  } catch (error) {
    next(error);
  }
};

export const obtenerMisTurnos = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const turnos = await obtenerTurnosUsuarioService(req.user!.id);
    res.json(
      turnos.map((t) => ({ id: t.id, fecha: t.fecha, hora: t.hora, estado: t.estado }))
    );
  } catch (error) {
    next(error);
  }
};

export const obtenerTurnoPorId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const turno = await obtenerTurnoPorIdService(Number(req.params.id), req.user!.id);
    res.json({ id: turno.id, fecha: turno.fecha, hora: turno.hora, estado: turno.estado });
  } catch (error) {
    next(error);
  }
};

export const cancelarTurno = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const turno = await cancelarTurnoService(Number(req.params.id), req.user!.id);
    res.json({
      message: "Turno cancelado correctamente",
      turno: { id: turno.id, fecha: turno.fecha, hora: turno.hora, estado: turno.estado },
    });
  } catch (error) {
    next(error);
  }
};