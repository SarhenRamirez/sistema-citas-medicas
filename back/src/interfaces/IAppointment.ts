export type AppointmentStatus = "active" | "cancelled";

export interface IAppointment {
  id: number;
  date: string;
  time: string;
  specialty: string;
  userId: number;
  status: AppointmentStatus;
}
