module.exports = (sequelize, DataTypes) => {
  const Producto = sequelize.define('Producto', {
    nombre: DataTypes.STRING,
    descripcion: DataTypes.TEXT,
    precio: DataTypes.DECIMAL,
    marca: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    garantia: DataTypes.TEXT,
    envio: DataTypes.TEXT,
    sku: DataTypes.STRING,
    dimensiones: DataTypes.STRING,
    peso: DataTypes.DECIMAL,
    imagen_url: DataTypes.TEXT
  });

  Producto.associate = models => {
    Producto.hasMany(models.Carrito, { foreignKey: 'producto_id' });
  };

  return Producto;
};
