module.exports = (sequelize, DataTypes) => {
  const Notificacion = sequelize.define('Notificacion', {
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
    },
    destinatario: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estado: {
      type: DataTypes.STRING,
      defaultValue: 'pendiente'
    },
    campaniaId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Campanias',
        key: 'id'
      }
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Usuarios',
        key: 'id'
      }
    }
  }, {
    tableName: 'Notificaciones',
    timestamps: true,
    underscored: true
  });

  Notificacion.associate = models => {
    Notificacion.belongsTo(models.Campania, {
      foreignKey: 'campaniaId',
      as: 'campania',
      onDelete: 'SET NULL'
    });

    Notificacion.belongsTo(models.Usuario, {
      foreignKey: 'usuarioId',
      as: 'usuario',
      onDelete: 'SET NULL'
    });
  };

  return Notificacion;
};
