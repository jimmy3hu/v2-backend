module.exports = (sequelize, DataTypes) => {
  const Emergencia = sequelize.define('Emergencia', {
    nombre_completo: DataTypes.STRING,
    correo: DataTypes.STRING,
    telefono: DataTypes.STRING,
    direccion: DataTypes.STRING,
    tipo_mascota: DataTypes.STRING,
    motivo: DataTypes.STRING,
    descripcion: DataTypes.TEXT, 
    prioridad: DataTypes.STRING, 
    fecha: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    usuario_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: 'Usuarios',
        key: 'id'
      }
    },
    mascota_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: 'Mascotas',
        key: 'id'
      }
    }
  });

  Emergencia.associate = function(models) {
    Emergencia.belongsTo(models.Usuario, { foreignKey: 'usuario_id' });
    Emergencia.belongsTo(models.Mascota, { foreignKey: 'mascota_id' });
  };

  return Emergencia;
};
