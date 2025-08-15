const express = require('express');
const router = express.Router();
const citaController = require('../controllers/cita.controller');

router.post('/', citaController.crearCita);
router.get('/usuario/:usuario_id', citaController.obtenerCitasPorUsuario);

module.exports = router;
