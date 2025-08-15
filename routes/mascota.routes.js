const express = require('express');
const router = express.Router();
const mascotaController = require('../controllers/mascota.controller');

router.post('/', mascotaController.crearMascota);
router.get('/usuario/:usuario_id', mascotaController.obtenerMascotasPorUsuario);
router.get('/:id', mascotaController.obtenerMascotaConVacunas);

module.exports = router;

