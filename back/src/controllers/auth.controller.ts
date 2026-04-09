import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data/app.datasource";
import { User } from "../entities/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppError } from "../middleware/error.middleware";

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
      throw new AppError("Todos los campos son obligatorios", 400);
    }

    const userRepo = AppDataSource.getRepository(User);
    const existe = await userRepo.findOne({ where: { email } });
    if (existe) throw new AppError("El usuario ya existe", 400);

    const hashedPassword = await bcrypt.hash(password, 10);
    const nuevoUsuario = userRepo.create({ nombre, email, password: hashedPassword });
    await userRepo.save(nuevoUsuario);

    res.status(201).json({
      message: "Usuario creado correctamente",
      user: { id: nuevoUsuario.id, nombre: nuevoUsuario.nombre, email: nuevoUsuario.email },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) throw new AppError("Email y password son obligatorios", 400);

    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo
      .createQueryBuilder("user")
      .addSelect("user.password")
      .where("user.email = :email", { email })
      .getOne();

    if (!user) throw new AppError("Credenciales inválidas", 401);

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new AppError("Credenciales inválidas", 401);

    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET no definido en variables de entorno");

    const token = jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn: "1d" });

    res.json({
      message: "Login exitoso",
      token,
      user: { id: user.id, nombre: user.nombre, email: user.email },
    });
  } catch (error) {
    next(error);
  }
};