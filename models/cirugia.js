module.exports = (sequelize, DataTypes) => {
  const Cirugia = sequelize.define('Cirugia', {
    tipo: DataTypes.STRING,
    fecha: DataTypes.DATE
  });

  Cirugia.associate = models => {
    Cirugia.belongsTo(models.Mascota, { foreignKey: 'mascota_id' });
  };

  return Cirugia;
};
