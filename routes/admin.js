const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Usuario } = require('../models');

router.post('/crear-admin', async (req, res) => {
  try {
    const { nombre_completo, correo, contraseña } = req.body;

    // Validación básica
    if (!nombre_completo || !correo || !contraseña) {
      return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    // Verificar si el correo ya existe
    const existente = await Usuario.findOne({ where: { correo } });
    if (existente) {
      return res.status(409).json({ mensaje: 'El correo ya está registrado' });
    }

    // Generar hash seguro
    const hash = await bcrypt.hash(contraseña, 10);

    // Crear nuevo admin con campo correcto
    const nuevoAdmin = await Usuario.create({
      nombre_completo,
      correo,
      contrasena_hash: hash, // ✅ Campo correcto
      rol: 'admin',
      rol_id: 1 // Si estás usando roles por ID
    });

    // Respuesta emocionalmente clara
    res.status(201).json({
      mensaje: 'Administrador creado con éxito 🛡️',
      usuario: {
        id: nuevoAdmin.id,
        nombre_completo: nuevoAdmin.nombre_completo,
        correo: nuevoAdmin.correo,
        rol: nuevoAdmin.rol
      }
    });
  } catch (error) {
    console.error('Error al crear admin:', error);
    res.status(500).json({ mensaje: 'Error interno al crear administrador' });
  }
});

module.exports = router;

