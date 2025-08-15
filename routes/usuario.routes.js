const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');
const verifyToken = require('../middlewares/verifyToken');

// Validaciones quirúrgicas
if (typeof usuarioController.crearUsuario !== 'function') {
  throw new Error('usuarioController.crearUsuario no está definido o no es una función');
}
if (typeof usuarioController.obtenerUsuarios !== 'function') {
  throw new Error('usuarioController.obtenerUsuarios no está definido o no es una función');
}
if (typeof usuarioController.cambiarContrasena !== 'function') {
  throw new Error('usuarioController.cambiarContrasena no está definido o no es una función');
}

// Rutas trazables
router.post('/', usuarioController.crearUsuario);
router.get('/', usuarioController.obtenerUsuarios);
router.post('/cambiar-contrasena', verifyToken, usuarioController.cambiarContrasena);

// ✅ Exportación final
module.exports = router;
