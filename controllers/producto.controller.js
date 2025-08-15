const { Producto } = require('../models');

exports.crearProducto = async (req, res) => {
  try {
    const nuevoProducto = await Producto.create(req.body);
    res.status(201).json({ mensaje: 'Producto creado', producto: nuevoProducto });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear producto' });
  }
};

exports.obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};
