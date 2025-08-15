const { Examen } = require('../models');

exports.crearExamen = async (req, res) => {
  try {
    const nuevoExamen = await Examen.create(req.body);
    res.status(201).json({ mensaje: 'Examen registrado', examen: nuevoExamen });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar examen' });
  }
};

exports.obtenerExamenes = async (req, res) => {
  try {
    const examenes = await Examen.findAll({ where: { mascota_id: req.params.mascota_id } });
    res.status(200).json(examenes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener exámenes' });
  }
};
