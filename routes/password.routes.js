const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');
const generarTokenSeguridad = require('../helpers/generarTokenSeguridad');
const enviarCorreoRecuperacion = require('../helpers/enviarCorreoRecuperacion');

router.post('/recuperar-password', async (req, res) => {
  try {
    const correoNormalizado = req.body.email?.trim().toLowerCase();

    // 🧠 Validación visual y emocional
    const esCorreoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correoNormalizado);
    if (!esCorreoValido) {
      return res.status(400).json({
        mensaje: 'Ese correo no parece válido 🐾',
        tipo: 'error',
        contexto: 'recuperación'
      });
    }

    // 🔍 Buscar usuario por correo
    const usuario = await Usuario.findOne({ where: { correo: correoNormalizado } });

    if (!usuario) {
      return res.status(404).json({
        mensaje: 'No encontramos ese correo en AmigoVet 🐾',
        tipo: 'error',
        contexto: 'recuperación'
      });
    }

    // 🔐 Generar token y asignar expiración
    const token = generarTokenSeguridad();
    usuario.tokenRecuperacion = token;
    usuario.expiraToken = Date.now() + 3600000;
    await usuario.save();

    // 📩 Enviar correo emocional
    const enlace = `https://amigovet.com/restablecer/${token}`;
    await enviarCorreoRecuperacion(correoNormalizado, enlace, usuario.nombre_completo);

    res.json({
      mensaje: '📩 Te enviamos instrucciones a tu correo. Revisa tu bandeja y sigue el enlace 🐾',
      tipo: 'info',
      contexto: 'recuperación'
    });

  } catch (error) {
    console.error('🩺 Error en recuperación:', error);
    res.status(500).json({
      mensaje: 'Algo no salió bien al recuperar tu contraseña 🐾. Intenta más tarde.',
      tipo: 'error',
      contexto: 'recuperación'
    });
  }
});

module.exports = router;
