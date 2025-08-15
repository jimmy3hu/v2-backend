// backend/helpers/logActividad.js
function logActividad(usuario, accion) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] 🐾 Usuario: ${usuario} realizó: ${accion}`);
}
module.exports = logActividad;
