export interface CreateUserDto {
  name: string;
  email: string;
  birthdate?: string;
  nDni?: number;
  username: string;
  password: string;
}

export function validateCreateUserDto(body: Partial<CreateUserDto>): string | null {
  if (!body.name || body.name.trim() === "") return "El campo 'name' es obligatorio";
  if (!body.email || !body.email.includes("@")) return "El campo 'email' debe ser un email válido";
  if (!body.username || body.username.trim() === "") return "El campo 'username' es obligatorio";
  if (!body.password || body.password.length < 6) return "La contraseña debe tener al menos 6 caracteres";
  if (body.birthdate && !/^\d{4}-\d{2}-\d{2}$/.test(body.birthdate)) return "Formato de birthdate inválido (use YYYY-MM-DD)";
  return null;
}
