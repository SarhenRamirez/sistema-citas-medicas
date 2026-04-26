import { Request, Response, NextFunction } from "express";
import { validateCreateAppointmentDto } from "../dtos/Appointment.dto";
import { AppError } from "../middleware/error.middleware";
import { enviarEmailTurnoCreado, enviarEmailTurnoCancelado } from "../services/email.service";
import {
  getAllAppointments,
  getAppointmentById,
  getAppointmentsByUserId,
  createAppointment,
  cancelAppointment,
} from "../services/appointments.service";
import { getUserById } from "../services/users.service";

export const crearTurno = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validationError = validateCreateAppointmentDto(req.body);
    if (validationError) throw new AppError(validationError, 400);

    const { date, time } = req.body;
    const userId = req.user!.id;
    const turno = createAppointment(date, time, userId);

    const user = getUserById(userId);
    if (user) enviarEmailTurnoCreado(user.email, user.name, turno.date, turno.time);

    res.status(201).json({ message: "Turno agendado correctamente", turno });
  } catch (error) {
    next(error);
  }
};

export const obtenerMisTurnos = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(getAppointmentsByUserId(req.user!.id));
  } catch (error) {
    next(error);
  }
};

export const obtenerTurnoPorId = (req: Request, res: Response, next: NextFunction) => {
  try {
    const turno = getAppointmentById(Number(req.params.id));
    if (!turno) throw new AppError("Turno no encontrado", 404);
    res.json(turno);
  } catch (error) {
    next(error);
  }
};

export const cancelarTurno = (req: Request, res: Response, next: NextFunction) => {
  try {
    const turno = cancelAppointment(Number(req.params.id), req.user!.id);

    const user = getUserById(req.user!.id);
    if (user) enviarEmailTurnoCancelado(user.email, user.name, turno.date, turno.time);

    res.json({ message: "Turno cancelado correctamente", turno });
  } catch (error) {
    next(error);
  }
};

export const obtenerTodosTurnos = (_req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(getAllAppointments());
  } catch (error) {
    next(error);
  }
};
