import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import envs from "../config/envs";
import { AppError } from "./error.middleware";

interface JwtPayload {
  id: number;
  email: string;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const [scheme, token] = req.headers.authorization?.split(" ") ?? [];
    if (scheme !== "Bearer" || !token) throw new AppError("Token no proporcionado", 401);

    const decoded = jwt.verify(token, envs.JWT_SECRET) as JwtPayload;
    req.user = { id: decoded.id, email: decoded.email };
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return next(new AppError("Token invalido o expirado", 401));
    }
    next(error);
  }
};