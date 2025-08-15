const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carrito.controller');

router.post('/', carritoController.agregarAlCarrito);
router.get('/:usuario_id', carritoController.obtenerCarritoPorUsuario);

module.exports = router;
