const { Vacuna } = require('../models');

exports.crearVacuna = async (req, res) => {
  try {
    const nuevaVacuna = await Vacuna.create(req.body);
    res.status(201).json({ mensaje: 'Vacuna registrada', vacuna: nuevaVacuna });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar vacuna' });
  }
};

exports.obtenerVacunas = async (req, res) => {
  try {
    const vacunas = await Vacuna.findAll({ where: { mascota_id: req.params.mascota_id } });
    res.status(200).json(vacunas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener vacunas' });
  }
};

