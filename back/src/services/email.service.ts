import nodemailer from "nodemailer";
import envs from "../config/envs";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: envs.EMAIL_USER,
    pass: envs.EMAIL_PASS,
  },
});

const baseStyle = `
  font-family: Arial, sans-serif;
  max-width: 560px;
  margin: 0 auto;
  background: #f8fafc;
  border-radius: 12px;
  overflow: hidden;
`;

const header = (color: string) => `
  <div style="background: ${color}; padding: 32px 40px;">
    <h1 style="margin: 0; color: white; font-size: 22px; font-weight: 800;">MediTom</h1>
    <p style="margin: 6px 0 0; color: rgba(255,255,255,0.8); font-size: 14px;">Gestión de turnos médicos</p>
  </div>
`;

const footer = `
  <div style="padding: 20px 40px; background: #e2e8f0; text-align: center;">
    <p style="margin: 0; color: #94a3b8; font-size: 12px;">
      Este es un correo automático, por favor no respondas a este mensaje.
    </p>
  </div>
`;

const enviarEmail = async (to: string, subject: string, html: string) => {
  if (!envs.EMAIL_USER || !envs.EMAIL_PASS) return;
  try {
    await transporter.sendMail({ from: `"MediTom" <${envs.EMAIL_USER}>`, to, subject, html });
  } catch (err) {
    console.error("Error al enviar email:", err);
  }
};

export const enviarEmailBienvenida = (to: string, name: string) => {
  const html = `
    <div style="${baseStyle}">
      ${header("linear-gradient(135deg, #1d4ed8, #4338ca)")}
      <div style="padding: 32px 40px; background: white;">
        <h2 style="color: #0f172a; font-size: 20px; margin: 0 0 12px;">¡Bienvenido/a, ${name}!</h2>
        <p style="color: #475569; line-height: 1.7; margin: 0 0 20px;">
          Tu cuenta en <strong>MediTom</strong> fue creada correctamente.
          Ya podés iniciar sesión y gestionar tus turnos médicos de forma rápida y segura.
        </p>
        <div style="background: #eff6ff; border-left: 4px solid #1d4ed8; padding: 16px 20px; border-radius: 8px;">
          <p style="margin: 0; color: #1d4ed8; font-weight: 600; font-size: 14px;">
            Accedé desde <a href="http://localhost:5173/login" style="color: #1d4ed8;">MediTom</a>
          </p>
        </div>
      </div>
      ${footer}
    </div>
  `;
  return enviarEmail(to, "Bienvenido/a a MediTom 🎉", html);
};

export const enviarEmailTurnoCreado = (to: string, name: string, fecha: string, hora: string) => {
  const html = `
    <div style="${baseStyle}">
      ${header("#16a34a")}
      <div style="padding: 32px 40px; background: white;">
        <h2 style="color: #0f172a; font-size: 20px; margin: 0 0 12px;">Turno confirmado</h2>
        <p style="color: #475569; line-height: 1.7; margin: 0 0 24px;">
          Hola <strong>${name}</strong>, tu turno médico fue agendado correctamente.
        </p>
        <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 20px 24px; margin-bottom: 20px;">
          <p style="margin: 0 0 8px; color: #64748b; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Detalle del turno</p>
          <p style="margin: 0 0 6px; color: #0f172a; font-size: 16px;">📅 <strong>Fecha:</strong> ${fecha}</p>
          <p style="margin: 0; color: #0f172a; font-size: 16px;">🕐 <strong>Hora:</strong> ${hora} hs</p>
        </div>
        <p style="color: #94a3b8; font-size: 13px; margin: 0;">
          Si necesitás cancelar el turno, podés hacerlo desde la aplicación.
        </p>
      </div>
      ${footer}
    </div>
  `;
  return enviarEmail(to, "Turno confirmado en MediTom ✅", html);
};

export const enviarEmailTurnoCancelado = (to: string, name: string, fecha: string, hora: string) => {
  const html = `
    <div style="${baseStyle}">
      ${header("#dc2626")}
      <div style="padding: 32px 40px; background: white;">
        <h2 style="color: #0f172a; font-size: 20px; margin: 0 0 12px;">Turno cancelado</h2>
        <p style="color: #475569; line-height: 1.7; margin: 0 0 24px;">
          Hola <strong>${name}</strong>, tu turno médico fue cancelado.
        </p>
        <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 12px; padding: 20px 24px; margin-bottom: 20px;">
          <p style="margin: 0 0 8px; color: #64748b; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Turno cancelado</p>
          <p style="margin: 0 0 6px; color: #0f172a; font-size: 16px;">📅 <strong>Fecha:</strong> ${fecha}</p>
          <p style="margin: 0; color: #0f172a; font-size: 16px;">🕐 <strong>Hora:</strong> ${hora} hs</p>
        </div>
        <p style="color: #94a3b8; font-size: 13px; margin: 0;">
          Podés agendar un nuevo turno cuando quieras desde la aplicación.
        </p>
      </div>
      ${footer}
    </div>
  `;
  return enviarEmail(to, "Turno cancelado en MediTom ❌", html);
};
