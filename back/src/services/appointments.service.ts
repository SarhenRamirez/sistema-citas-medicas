import { AppDataSource } from "../data/app.datasource";
import { Turno } from "../entities/Turno";
import { User } from "../entities/User";
import { IAppointment } from "../interfaces/IAppointment";
import { AppError } from "../middleware/error.middleware";

const repo = () => AppDataSource.getRepository(Turno);

export const getAllAppointments = async (): Promise<Turno[]> => repo().find();

export const getAppointmentById = async (id: number): Promise<Turno | undefined> => {
  const turno = await repo().findOne({ where: { id } });
  return turno ?? undefined;
};

export const getAppointmentsByUserId = async (userId: number): Promise<Turno[]> =>
  repo().find({ where: { user: { id: userId } } });

export const createAppointment = async (
  date: string,
  time: string,
  userId: number
): Promise<Turno> => {
  if (!userId) throw new AppError("No se puede crear un turno sin ID de usuario", 400);

  const [anio, mes, dia] = date.split("-").map(Number);
  const fechaTurno = new Date(anio, mes - 1, dia);
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  if (fechaTurno <= hoy)
    throw new AppError("Solo se pueden agendar turnos a partir de manana", 400);

  const diaSemana = fechaTurno.getDay();
  if (diaSemana === 0 || diaSemana === 6)
    throw new AppError("No se permiten turnos los fines de semana", 400);

  const [hora, minuto] = time.split(":").map(Number);
  if (hora < 6 || hora > 17 || (hora === 17 && minuto > 0))
    throw new AppError("El horario permitido es de 06:00 a 17:00", 400);

  const conflict = await repo().findOne({ where: { date, time, status: "active" } });
  if (conflict) throw new AppError("Ese horario ya se encuentra ocupado", 400);

  const newTurno = repo().create({
    date,
    time,
    status: "active",
    user: { id: userId } as User,
  });

  return repo().save(newTurno);
};

export const cancelAppointment = async (id: number, userId: number): Promise<Turno> => {
  const turno = await repo().findOne({ where: { id } });
  if (!turno) throw new AppError("Turno no encontrado", 404);
  if (!turno.user || turno.user.id !== userId) throw new AppError("No autorizado", 403);
  if (turno.status === "cancelled") throw new AppError("El turno ya esta cancelado", 400);
  turno.status = "cancelled";
  return repo().save(turno);
};
