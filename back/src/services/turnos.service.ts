import { AppDataSource } from "../data/app.datasource";
import { Turno } from "../entities/Turno";
import { User } from "../entities/User";
import { AppError } from "../middleware/error.middleware";

const getTurnoRepo = () => AppDataSource.getRepository(Turno);
const getUserRepo = () => AppDataSource.getRepository(User);

const esFormatoFechaValido = (fecha: string): boolean => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(fecha)) return false;
  const date = new Date(fecha);
  return date instanceof Date && !isNaN(date.getTime());
};

const esFormatoHoraValido = (hora: string): boolean => {
  const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
  return regex.test(hora);
};

export const crearTurnoService = async (
  userId: number,
  fecha: string,
  hora: string
): Promise<Turno> => {
  if (!fecha || !hora) {
    throw new AppError("Fecha y hora son obligatorias", 400);
  }

  if (!esFormatoFechaValido(fecha)) {
    throw new AppError("Formato de fecha invalido. Use YYYY-MM-DD", 400);
  }

  if (!esFormatoHoraValido(hora)) {
    throw new AppError("Formato de hora invalido. Use HH:mm", 400);
  }

  const [anio, mes, dia] = fecha.split("-").map(Number);
  const fechaTurno = new Date(anio, mes - 1, dia);

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  if (fechaTurno <= hoy) {
    throw new AppError("Solo se pueden agendar turnos a partir de manana", 400);
  }

  const diaSemana = fechaTurno.getDay();
  if (diaSemana === 0 || diaSemana === 6) {
    throw new AppError("No se permiten turnos los fines de semana", 400);
  }

  const [horaTurno, minutoTurno] = hora.split(":").map(Number);
  if (horaTurno < 6 || horaTurno > 17 || (horaTurno === 17 && minutoTurno > 0)) {
    throw new AppError("El horario permitido es de 06:00 a 17:00", 400);
  }

  const userRepo = getUserRepo();
  const turnoRepo = getTurnoRepo();

  const user = await userRepo.findOne({ where: { id: userId } });
  if (!user) throw new AppError("Usuario no encontrado", 404);

  const turnoExistente = await turnoRepo.findOne({ where: { fecha, hora } });
  if (turnoExistente) throw new AppError("Ese horario ya se encuentra ocupado", 400);

  const nuevoTurno = turnoRepo.create({ fecha, hora, estado: "agendado", user });
  return await turnoRepo.save(nuevoTurno);
};

export const obtenerTurnosUsuarioService = async (userId: number): Promise<Turno[]> => {
  return await getTurnoRepo().find({
    where: { user: { id: userId } },
    order: { fecha: "ASC", hora: "ASC" },
  });
};

export const cancelarTurnoService = async (
  turnoId: number,
  userId: number
): Promise<Turno> => {
  const turnoRepo = getTurnoRepo();

  const turno = await turnoRepo.findOne({
    where: { id: turnoId, user: { id: userId } },
  });

  if (!turno) throw new AppError("Turno no encontrado o no autorizado", 404);
  if (turno.estado === "cancelado") throw new AppError("El turno ya esta cancelado", 400);

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  const [a, m, d] = turno.fecha.split("-").map(Number);
  if (new Date(a, m - 1, d) < hoy) {
    throw new AppError("No se puede cancelar un turno pasado", 400);
  }

  turno.estado = "cancelado";
  return await turnoRepo.save(turno);
};

export const obtenerTurnoPorIdService = async (
  turnoId: number,
  userId: number
): Promise<Turno> => {
  const turno = await getTurnoRepo().findOne({
    where: { id: turnoId, user: { id: userId } },
  });

  if (!turno) throw new AppError("Turno no encontrado o no autorizado", 404);
  return turno;
};