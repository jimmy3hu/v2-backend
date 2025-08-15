const nodemailer = require('nodemailer');

/**
 * 📩 Envía un correo de recuperación de contraseña
 * @param {string} destinatario - Correo del usuario
 * @param {string} enlace - Enlace de recuperación
 * @param {string} nombre - Nombre del usuario
 */
async function enviarCorreoRecuperacion(destinatario, enlace, nombre = 'usuario') {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.CORREO_AMIGOVET,
        pass: process.env.CLAVE_CORREO_AMIGOVET,
      },
    });

    const mensajeHTML = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color: #0077cc;">Hola ${nombre}, desde AmigoVet 🐶🐱</h2>
        <p>Recibimos una solicitud para restablecer tu contraseña.</p>
        <p>Haz clic en el siguiente enlace para continuar:</p>
        <p>
          <a href="${enlace}" style="background-color: #0077cc; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px;">
            Restablecer contraseña
          </a>
        </p>
        <p style="font-size: 0.9rem; color: #666;">Este enlace expirará en 1 hora por seguridad.</p>
        <hr />
        <p style="font-size: 0.85rem; color: #999;">Si no solicitaste este cambio, puedes ignorar este mensaje.</p>
      </div>
    `;

    await transporter.sendMail({
      from: '"AmigoVet 🐾" <${process.env.CORREO_AMIGOVET}>',
      to: destinatario,
      subject: 'Recupera tu contraseña',
      html: mensajeHTML,
    });

    console.log(`📨 Correo de recuperación enviado a ${destinatario}`);
  } catch (error) {
    console.error('❌ Error al enviar correo de recuperación:', error.message || error);
    throw new Error('No se pudo enviar el correo de recuperación');
  }
}

module.exports = { enviarCorreoRecuperacion };


