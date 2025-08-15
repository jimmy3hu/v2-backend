const { Usuario } = require('../models');
const bcrypt = require('bcrypt');

// 🧬 Crear usuario con imagen y cifrado emocional
exports.crearUsuario = async (req, res) => {
  try {
    const { contrasena, ...datosUsuario } = req.body;

    // 🛡️ Validación quirúrgica de contraseña
    if (!contrasena || typeof contrasena !== 'string' || contrasena.trim().length < 8) {
      return res.status(400).json({
        error: 'La contraseña es obligatoria y debe tener al menos 8 caracteres 🛡️'
      });
    }

    // 🔐 Cifrado emocional
    const contrasenaCifrada = await bcrypt.hash(contrasena, 10);

    // 🖼️ Validar imagen subida
    let foto_url = null;
    if (req.file) {
      foto_url = req.file.filename;
    }

    // 🧬 Crear usuario con imagen y contraseña cifrada
    const nuevoUsuario = await Usuario.create({
      ...datosUsuario,
      contrasena_hash: contrasenaCifrada,
      foto_url
    });

    // 🧠 Detectar si es contraseña temporal
    const requiereCambio = contrasena === 'temporal123';

    // 🎯 Respuesta emocionalmente clara
    res.status(201).json({
      mensaje: 'Usuario creado con éxito 🐾',
      usuario: {
        id: nuevoUsuario.id,
        nombre_completo: nuevoUsuario.nombre_completo,
        correo: nuevoUsuario.correo,
        rol_id: nuevoUsuario.rol_id,
        foto_url: nuevoUsuario.foto_url
      },
      requiereCambio
    });
  } catch (error) {
    console.error('🩺 Error al crear usuario:', error);
    res.status(500).json({
      error: 'Error interno al crear usuario. Intenta nuevamente o contacta al administrador 🛠️'
    });
  }
};

// 📋 Obtener todos los usuarios
exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.status(200).json({ usuarios });
  } catch (error) {
    console.error('❌ Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error al obtener usuarios 🛠️' });
  }
};

// 🔒 Cambiar contraseña con validación de sesión
exports.cambiarContrasena = async (req, res) => {
  try {
    const { nueva } = req.body;
    const usuarioId = req.usuario.id;

    // 🛡️ Validación quirúrgica
    if (!nueva || typeof nueva !== 'string' || nueva.trim().length < 8) {
      return res.status(400).json({
        error: 'La nueva contraseña debe tener al menos 8 caracteres 🛡️'
      });
    }

    // 🔐 Cifrado emocional
    const nuevaCifrada = await bcrypt.hash(nueva, 10);

    // 🧬 Actualizar en base de datos
    const resultado = await Usuario.update(
      { contrasena_hash: nuevaCifrada },
      { where: { id: usuarioId } }
    );

    if (resultado[0] === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado 🕵️‍♀️' });
    }

    // 🎯 Respuesta emocionalmente clara
    res.status(200).json({
      mensaje: 'Contraseña actualizada correctamente 🐾',
      requiereReautenticacion: true
    });
  } catch (error) {
    console.error('🩺 Error al cambiar contraseña:', error);
    res.status(500).json({
      error: 'Error interno al cambiar contraseña. Intenta nuevamente o contacta al administrador 🛠️'
    });
  }
};
