const { Carrito } = require('../models');

exports.agregarAlCarrito = async (req, res) => {
  try {
    const nuevoItem = await Carrito.create(req.body);
    res.status(201).json({ mensaje: 'Producto agregado al carrito', item: nuevoItem });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar producto al carrito' });
  }
};

exports.obtenerCarritoPorUsuario = async (req, res) => {
  try {
    const items = await Carrito.findAll({ where: { usuario_id: req.params.usuario_id } });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener carrito' });
  }
};
