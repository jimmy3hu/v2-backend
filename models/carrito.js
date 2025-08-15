module.exports = (sequelize, DataTypes) => {
  const Carrito = sequelize.define('Carrito', {
    cantidad: DataTypes.INTEGER,
    fecha_agregado: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  });

  Carrito.associate = models => {
    Carrito.belongsTo(models.Usuario, { foreignKey: 'usuario_id' });
    Carrito.belongsTo(models.Producto, { foreignKey: 'producto_id' });
  };

  return Carrito;
};
