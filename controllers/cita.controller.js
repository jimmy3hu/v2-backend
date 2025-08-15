const { Cita } = require('../models');

exports.crearCita = async (req, res) => {
  try {
    const nuevaCita = await Cita.create(req.body);
    res.status(201).json({ mensaje: 'Cita agendada', cita: nuevaCita });
  } catch (error) {
    res.status(500).json({ error: 'Error al agendar cita' });
  }
};

exports.obtenerCitasPorUsuario = async (req, res) => {
  try {
    const citas = await Cita.findAll({ where: { usuario_id: req.params.usuario_id } });
    res.status(200).json(citas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener citas' });
  }
};
