// models/cita.js
module.exports = (sequelize, DataTypes) => {
  const Cita = sequelize.define('Cita', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false
    },
    hora: {
      type: DataTypes.TIME,
      allowNull: false
    },
    motivo: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    estado: {
      type: DataTypes.ENUM('Pendiente', 'Confirmada', 'Cancelada'),
      defaultValue: 'Pendiente'
    },
    usuario_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: 'usuarios',
        key: 'id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    },
    mascota_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: 'mascotas',
        key: 'id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'citas',
    timestamps: true
  });

  Cita.associate = models => {
    Cita.belongsTo(models.Usuario, {
      foreignKey: 'usuario_id',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });

    Cita.belongsTo(models.Mascota, {
      foreignKey: 'mascota_id',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });
  };

  return Cita;
};



