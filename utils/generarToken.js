const jwt = require('jsonwebtoken');
require('dotenv').config();

function generarTokenSeguridad(usuario) {
  const payload = {
    id: usuario.id,
    rol: usuario.rol,
    correo: usuario.correo
  };

  const opciones = {
    expiresIn: '2h' // Puedes ajustar según tu flujo clínico
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, opciones);
  return token;
}

module.exports = { generarTokenSeguridad };
