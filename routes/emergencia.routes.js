const express = require('express');
const router = express.Router();
const emergenciaController = require('../controllers/emergencia.controller');

router.post('/', emergenciaController.crearEmergencia); // 🆕 Registrar emergencia

module.exports = router;
