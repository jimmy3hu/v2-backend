module.exports = (sequelize, DataTypes) => {
  const Tratamiento = sequelize.define('Tratamiento', {
    nombre: DataTypes.STRING,
    fecha_inicio: DataTypes.DATE,
    fecha_fin: DataTypes.DATE,
    veterinario: DataTypes.STRING,
    observaciones: DataTypes.TEXT
  });

  Tratamiento.associate = models => {
    Tratamiento.belongsTo(models.Mascota, { foreignKey: 'mascota_id' });
  };

  return Tratamiento;
};
