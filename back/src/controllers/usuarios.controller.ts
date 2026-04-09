import { Request, Response, NextFunction } from "express";

export const getPerfil = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({
      message: `Bienvenido ${req.user?.email}`,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};