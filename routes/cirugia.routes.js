const express = require('express');
const router = express.Router();
const cirugiaController = require('../controllers/cirugia.controller');

router.post('/', cirugiaController.crearCirugia);
router.get('/:mascota_id', cirugiaController.obtenerCirugias);

module.exports = router;
