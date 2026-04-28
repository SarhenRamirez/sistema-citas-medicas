export interface LoginDto {
  username: string;
  password: string;
}

export function validateLoginDto(body: Partial<LoginDto>): string | null {
  if (!body.username || body.username.trim() === "") return "El campo 'username' es obligatorio";
  if (!body.password || body.password.trim() === "") return "El campo 'password' es obligatorio";
  return null;
}
