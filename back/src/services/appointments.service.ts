import { IAppointment } from "../interfaces/IAppointment";
import { AppError } from "../middleware/error.middleware";

const appointments: IAppointment[] = [
  { id: 1, date: "2026-04-28", time: "09:00",  userId: 1, status: "active"    },
  { id: 2, date: "2026-04-29", time: "10:20",  userId: 2, status: "active"    },
  { id: 3, date: "2026-04-30", time: "14:00",  userId: 1, status: "cancelled" },
  { id: 4, date: "2026-05-02", time: "08:00",  userId: 3, status: "active"    },
  { id: 5, date: "2026-05-05", time: "16:40",  userId: 2, status: "cancelled" },
];

let nextId = appointments.length + 1;

export const getAllAppointments = (): IAppointment[] => appointments;

export const getAppointmentById = (id: number): IAppointment | undefined =>
  appointments.find((a) => a.id === id);

export const getAppointmentsByUserId = (userId: number): IAppointment[] =>
  appointments.filter((a) => a.userId === userId);

export const createAppointment = (date: string, time: string, userId: number): IAppointment => {
  if (!userId) throw new AppError("No se puede crear un turno sin ID de usuario", 400);

  const [anio, mes, dia] = date.split("-").map(Number);
  const fechaTurno = new Date(anio, mes - 1, dia);
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  if (fechaTurno <= hoy)
    throw new AppError("Solo se pueden agendar turnos a partir de mañana", 400);

  const diaSemana = fechaTurno.getDay();
  if (diaSemana === 0 || diaSemana === 6)
    throw new AppError("No se permiten turnos los fines de semana", 400);

  const [hora, minuto] = time.split(":").map(Number);
  if (hora < 6 || hora > 17 || (hora === 17 && minuto > 0))
    throw new AppError("El horario permitido es de 06:00 a 17:00", 400);

  if (appointments.some((a) => a.date === date && a.time === time && a.status === "active"))
    throw new AppError("Ese horario ya se encuentra ocupado", 400);

  const newAppointment: IAppointment = { id: nextId++, date, time, userId, status: "active" };
  appointments.push(newAppointment);
  return newAppointment;
};

export const cancelAppointment = (id: number, userId: number): IAppointment => {
  const appointment = appointments.find((a) => a.id === id);
  if (!appointment) throw new AppError("Turno no encontrado", 404);
  if (appointment.userId !== userId) throw new AppError("No autorizado", 403);
  if (appointment.status === "cancelled") throw new AppError("El turno ya está cancelado", 400);
  appointment.status = "cancelled";
  return appointment;
};
