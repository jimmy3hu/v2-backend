const { Cirugia } = require('../models');

exports.crearCirugia = async (req, res) => {
  try {
    const nuevaCirugia = await Cirugia.create(req.body);
    res.status(201).json({ mensaje: 'Cirugía registrada', cirugia: nuevaCirugia });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar cirugía' });
  }
};

exports.obtenerCirugias = async (req, res) => {
  try {
    const cirugias = await Cirugia.findAll({ where: { mascota_id: req.params.mascota_id } });
    res.status(200).json(cirugias);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener cirugías' });
  }
};

