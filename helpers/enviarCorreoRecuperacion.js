const nodemailer = require('nodemailer');

/**
 * 📩 Envía un correo de recuperación de contraseña con enlace seguro.
 * Incluye diseño emocional, expiración clara y firma cálida.
 * @param {string} destinatario - Correo del usuario
 * @param {string} enlace - Enlace de recuperación con token
 * @param {string} nombre - Nombre del usuario para saludo personalizado
 */
async function enviarCorreoRecuperacion(destinatario, enlace, nombre = '') {
  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mensaje = {
    from: '"AmigoVet 🐾" <no-reply@amigovet.com>',
    to: destinatario,
    subject: 'Recuperación de contraseña - AmigoVet',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #4CAF50;">Hola ${nombre || '👋'},</h2>
        <p>Recibimos una solicitud para restablecer tu contraseña en <strong>AmigoVet</strong>.</p>
        <p>Haz clic en el siguiente botón para continuar:</p>
        <a href="${enlace}" style="display: inline-block; margin: 10px 0; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">
          Restablecer contraseña
        </a>
        <p>Este enlace expirará en <strong>1 hora</strong>.</p>
        <p style="margin-top: 20px; font-size: 0.95em; color: #555;">
          Si no solicitaste este cambio, puedes ignorar este mensaje. Tu cuenta seguirá segura.
        </p>
        <hr style="margin: 20px 0;">
        <p style="font-size: 0.9em; color: #777;">
          Con cariño,<br>
          El equipo de AmigoVet 🐶🐱<br>
          <em>Tu bienestar emocional también importa</em>
        </p>
      </div>
    `
  };

  await transport.sendMail(mensaje);
}

module.exports = enviarCorreoRecuperacion;

