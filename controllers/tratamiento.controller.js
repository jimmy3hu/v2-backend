const { Tratamiento } = require('../models');

exports.crearTratamiento = async (req, res) => {
  try {
    const nuevoTratamiento = await Tratamiento.create(req.body);
    res.status(201).json({ mensaje: 'Tratamiento registrado', tratamiento: nuevoTratamiento });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar tratamiento' });
  }
};

exports.obtenerTratamientos = async (req, res) => {
  try {
    const tratamientos = await Tratamiento.findAll({ where: { mascota_id: req.params.mascota_id } });
    res.status(200).json(tratamientos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener tratamientos' });
  }
};
