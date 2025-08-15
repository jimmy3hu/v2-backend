const express = require('express');
const router = express.Router();
const examenController = require('../controllers/examen.controller');

router.post('/', examenController.crearExamen);
router.get('/:mascota_id', examenController.obtenerExamenes);

module.exports = router;
