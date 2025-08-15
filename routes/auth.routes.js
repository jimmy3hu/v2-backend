const express = require('express');
const router = express.Router();
const { login } = require('../controllers/auth.controller');
const { Usuario } = require('../models');
const { generarTokenSeguridad } = require('../helpers/generarTokenSeguridad');
const { enviarCorreoRecuperacion } = require('../helpers/enviarCorreoRecuperacion');
const { registrarLog } = require('../helpers/logActividad'); // 🧠 Auditoría emocional

//
// 🛡️ Ruta de login
//
router.post('/login', login);

//
// 🛡️ Ruta para recuperación de contraseña
//
router.post('/recuperar-password', async (req, res) => {
  try {
    const { email } = req.body;

    // 🧪 Validación visual del campo
    if (!email) {
      return res.status(400).json({
        mensaje: 'Por favor ingresa tu correo 🐾',
        tipo: 'error',
        contexto: 'recuperación'
      });
    }

    // 🧠 Validación de formato
    const esCorreoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!esCorreoValido) {
      return res.status(400).json({
        mensaje: 'Ese correo no parece válido 🐾',
        tipo: 'error',
        contexto: 'recuperación'
      });
    }

    // 🔍 Buscar usuario
    const usuario = await Usuario.findOne({ where: { correo: email } });

    if (!usuario) {
      return res.status(404).json({
        mensaje: 'No encontramos ese correo en AmigoVet 🐾',
        tipo: 'error',
        contexto: 'recuperación'
      });
    }

    // 🔐 Generar token de seguridad
    const token = generarTokenSeguridad();
    usuario.tokenRecuperacion = token;
    usuario.expiraToken = Date.now() + 3600000; // 1 hora
    await usuario.save();

    // 📩 Enviar correo con enlace
    const enlace = `https://amigovet.com/restablecer/${token}`;
    await enviarCorreoRecuperacion(email, enlace);

    // 🧠 Registrar acción clínica
    await registrarLog({
      usuarioId: usuario.id,
      accion: 'Recuperación de contraseña',
      contexto: 'auth'
    });

    // ✅ Feedback emocional
    res.json({
      mensaje: '📩 Te enviamos instrucciones a tu correo. Revisa tu bandeja y sigue el enlace 🐾',
      tipo: 'info',
      contexto: 'recuperación'
    });

  } catch (error) {
    console.error('🩺 Error en recuperación:', error.message || error);
    res.status(500).json({
      mensaje: 'Algo no salió bien al recuperar tu contraseña 🐾. Intenta más tarde.',
      tipo: 'error',
      contexto: 'recuperación'
    });
  }
});

module.exports = router;

