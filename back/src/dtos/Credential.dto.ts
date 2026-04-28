export interface LoginDto {
  email: string;
  password: string;
}

export function validateLoginDto(body: Partial<LoginDto>): string | null {
  if (!body.email || !body.email.includes("@")) return "El campo 'email' es obligatorio";
  if (!body.password || body.password.trim() === "") return "El campo 'password' es obligatorio";
  return null;
}
