const express = require('express');
const router = express.Router();
const tratamientoController = require('../controllers/tratamiento.controller');

router.post('/', tratamientoController.crearTratamiento);
router.get('/:mascota_id', tratamientoController.obtenerTratamientos);

module.exports = router;
