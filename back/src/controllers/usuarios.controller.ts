import { Request, Response, NextFunction } from "express";
import { AppError } from "../middleware/error.middleware";
import { getAllUsers, getUserById } from "../services/users.service";
import { getAppointmentsByUserId } from "../services/appointments.service";

export const getAllUsersController = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(getAllUsers());
  } catch (error) {
    next(error);
  }
};

export const getUserByIdController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = getUserById(Number(req.params.id));
    if (!user) throw new AppError("Usuario no encontrado", 404);

    const turns = getAppointmentsByUserId(user.id);
    res.json({ ...user, turns });
  } catch (error) {
    next(error);
  }
};

export const getPerfil = (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = getUserById(req.user!.id);
    if (!user) throw new AppError("Usuario no encontrado", 404);
    res.json({ message: `Bienvenido ${user.name}`, user });
  } catch (error) {
    next(error);
  }
};
