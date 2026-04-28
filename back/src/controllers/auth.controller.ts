import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../middleware/error.middleware";
import { enviarEmailBienvenida } from "../services/email.service";
import { validateCreateUserDto } from "../dtos/User.dto";
import { validateLoginDto } from "../dtos/Credential.dto";
import { createUser, getUserByCredentialsId } from "../services/users.service";
import { checkCredentials } from "../services/credentials.service";

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, birthdate, nDni, password } = req.body;

    const userError = validateCreateUserDto({ name, email, birthdate, nDni, password });
    if (userError) throw new AppError(userError, 400);

    const newUser = await createUser({ name, email, birthdate, nDni, password });

    enviarEmailBienvenida(newUser.email, newUser.name);

    res.status(201).json({
      message: "Usuario creado correctamente",
      user: { id: newUser.id, name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const loginError = validateLoginDto({ email, password });
    if (loginError) throw new AppError(loginError, 400);

    const credentialsId = await checkCredentials(email, password);
    if (!credentialsId) throw new AppError("Credenciales invalidas", 401);

    const user = await getUserByCredentialsId(credentialsId);
    if (!user) throw new AppError("Credenciales invalidas", 401);

    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET no definido");

    const token = jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn: "1d" });

    res.json({
      login: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        birthdate: user.birthdate ?? null,
        nDni: user.nDni ?? null,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};
