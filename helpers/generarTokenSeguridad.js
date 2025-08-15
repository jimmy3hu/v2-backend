const crypto = require('crypto');

/**
 * 🧬 Genera un token hexadecimal seguro para recuperación de contraseña.
 * Este token se usará en el enlace enviado por correo y expirará en 1 hora.
 * Ideal para flujos sensibles donde se requiere trazabilidad emocional y seguridad.
 */
function generarTokenSeguridad() {
  return crypto.randomBytes(32).toString('hex');
}

module.exports = generarTokenSeguridad;
