module.exports = (sequelize, DataTypes) => {
  const Examen = sequelize.define('Examen', {
    tipo: DataTypes.STRING,
    fecha: DataTypes.DATE,
    resultado: DataTypes.TEXT
  });

  Examen.associate = models => {
    Examen.belongsTo(models.Mascota, { foreignKey: 'mascota_id' });
  };

  return Examen;
};
