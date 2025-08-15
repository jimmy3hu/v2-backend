const { Mascota, Vacuna } = require('../models');

exports.crearMascota = async (req, res) => {
  try {
    const nuevaMascota = await Mascota.create(req.body);
    res.status(201).json({ mensaje: 'Mascota registrada', mascota: nuevaMascota });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar mascota' });
  }
};

exports.obtenerMascotasPorUsuario = async (req, res) => {
  try {
    const mascotas = await Mascota.findAll({ where: { usuario_id: req.params.usuario_id } });
    res.status(200).json(mascotas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener mascotas' });
  }
};

exports.obtenerMascotaConVacunas = async (req, res) => {
  try {
    const mascota = await Mascota.findByPk(req.params.id, {
      include: [{ model: Vacuna }]
    });
    if (!mascota) return res.status(404).json({ error: 'Mascota no encontrada' });
    res.status(200).json(mascota);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener mascota' });
  }
};
