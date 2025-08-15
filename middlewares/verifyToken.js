const jwt = require('jsonwebtoken');
require('dotenv').config();

const rolMap = {
  1: 'admin',
  2: 'usuario'
};

module.exports = function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    console.warn('🔐 Token no proporcionado');
    return res.status(401).json({
      error: 'Acceso denegado: token ausente',
      emocional: 'No se detectó autenticación. Por favor, inicia sesión para continuar.'
    });
  }

  const token = authHeader.split(' ')[1];

  if (!token || token.trim() === '') {
    console.warn('🔐 Token mal formado');
    return res.status(401).json({
      error: 'Acceso denegado: token mal formado',
      emocional: 'El formato del token es incorrecto. Intenta iniciar sesión nuevamente.'
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.warn('🔐 Token inválido o expirado:', err.message);
      return res.status(403).json({
        error: 'Token inválido o expirado',
        emocional: 'Tu sesión ha expirado o es inválida. Por favor, vuelve a iniciar sesión.'
      });
    }

    const { id, correo, rol_id } = decoded;

    if (!id || !correo || !rol_id) {
      console.error('🔐 Token válido pero incompleto:', decoded);
      return res.status(403).json({
        error: 'Token incompleto: falta información de usuario',
        emocional: 'No se pudo validar tu identidad completamente. Contacta al soporte si el problema persiste.'
      });
    }

    const rol = rolMap[rol_id];

    if (!rol) {
      console.error('🔐 Rol desconocido:', rol_id);
      return res.status(403).json({
        error: 'Rol no reconocido',
        emocional: 'Tu rol no está registrado en el sistema. Solicita acceso al administrador.'
      });
    }

    req.usuario = { id, correo, rol };
    next();
  });
};


