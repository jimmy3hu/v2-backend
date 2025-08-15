module.exports = (sequelize, DataTypes) => {
  const Campania = sequelize.define('Campania', {
    tipo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mensaje: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    fecha_inicio: {
      type: DataTypes.DATE,
      allowNull: true
    },
    fecha_fin: {
      type: DataTypes.DATE,
      allowNull: true
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    tableName: 'Campanias',
    timestamps: true,
    underscored: true
  });

  // Asociación emocional con Notificacion
  Campania.associate = models => {
    Campania.hasMany(models.Notificacion, {
      foreignKey: 'campaniaId',
      as: 'notificaciones'
    });
  };

  return Campania;
};

