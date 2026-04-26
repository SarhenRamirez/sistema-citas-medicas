export interface CreateAppointmentDto {
  date: string;
  time: string;
}

export function validateCreateAppointmentDto(body: Partial<CreateAppointmentDto>): string | null {
  if (!body.date) return "El campo 'date' es obligatorio";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(body.date)) return "Formato de date inválido (use YYYY-MM-DD)";
  if (!body.time) return "El campo 'time' es obligatorio";
  if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(body.time)) return "Formato de time inválido (use HH:mm)";
  return null;
}
