module.exports = (sequelize, DataTypes) => {
  const Vacuna = sequelize.define('Vacuna', {
    nombre: DataTypes.STRING,
    fecha: DataTypes.DATE,
    observaciones: DataTypes.TEXT
  });

  Vacuna.associate = models => {
    Vacuna.belongsTo(models.Mascota, { foreignKey: 'mascota_id' });
  };

  return Vacuna;
};
