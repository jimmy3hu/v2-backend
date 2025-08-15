const express = require('express');
const router = express.Router();
const vacunaController = require('../controllers/vacuna.controller');

router.post('/', vacunaController.crearVacuna);
router.get('/:mascota_id', vacunaController.obtenerVacunas);

module.exports = router;
