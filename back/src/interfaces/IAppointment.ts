export type AppointmentStatus = "active" | "cancelled";

export interface IAppointment {
  id: number;
  date: string;
  time: string;
  userId: number;
  status: AppointmentStatus;
}
