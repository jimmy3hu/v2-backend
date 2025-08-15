const { Usuario } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { enviarCorreoRecuperacion } = require('../service/email.service');
const { generarTokenSeguridad } = require('../utils/generarToken');
const { registrarLog } = require('../service/logs.service'); // ✅ Corrección: desestructuración
require('dotenv').config();

// 🔐 Login quirúrgico
exports.login = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;

    if (!correo || !contrasena) {
      console.warn('🔐 Login fallido: campos vacíos');
      await registrarLog({
        accion: 'Login fallido',
        correo,
        exito: false,
        motivo: 'Campos vacíos',
        fecha: new Date()
      });
      return res.status(400).json({ error: 'Por favor completa todos los campos 🐾' });
    }

    const usuario = await Usuario.findOne({ where: { correo } });

    if (!usuario) {
      console.warn(`🔐 Login fallido: correo no registrado (${correo})`);
      await registrarLog({
        accion: 'Login fallido',
        correo,
        exito: false,
        motivo: 'Correo no registrado',
        fecha: new Date()
      });
      return res.status(404).json({ error: 'Ups... no encontramos ese correo en AmigoVet 🐾' });
    }

    if (!usuario.contrasena_hash) {
      console.warn(`🔐 Login fallido: usuario sin contraseña definida (${correo})`);
      await registrarLog({
        accion: 'Login fallido',
        usuario_id: usuario.id,
        correo,
        exito: false,
        motivo: 'Contraseña no registrada',
        fecha: new Date()
      });
      return res.status(500).json({ error: 'El usuario no tiene contraseña registrada 🐾' });
    }

    const contrasenaValida = await bcrypt.compare(contrasena, usuario.contrasena_hash);

    if (!contrasenaValida) {
      console.warn(`🔐 Login fallido: contraseña incorrecta para ${correo}`);
      await registrarLog({
        accion: 'Login fallido',
        usuario_id: usuario.id,
        correo,
        exito: false,
        motivo: 'Contraseña incorrecta',
        fecha: new Date()
      });
      return res.status(401).json({ error: 'Mmm... esa contraseña no coincide 🐶' });
    }

    const token = jwt.sign(
      { id: usuario.id, rol_id: usuario.rol_id },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    const requiereCambio = usuario.requiereCambio === true;

    await registrarLog({
      accion: 'Login exitoso',
      usuario_id: usuario.id,
      correo: usuario.correo,
      exito: true,
      fecha: new Date()
    });

    res.json({
      usuario: {
        id: usuario.id,
        nombre_completo: usuario.nombre_completo,
        correo: usuario.correo,
        rol_id: usuario.rol_id,
        requiereCambio
      },
      token
    });
  } catch (error) {
    console.log(typeof registrarLog); // 🩺 Diagnóstico: ¿es una función?
    console.error('🧠 Error interno en login:', error);
    await registrarLog({
      accion: 'Login fallido',
      correo: req.body.correo,
      exito: false,
      motivo: 'Error interno',
      fecha: new Date()
    });
    res.status(500).json({ error: 'Algo no salió bien en nuestra clínica virtual 🐾. Intenta más tarde.' });
  }
};