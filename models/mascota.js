// models/mascota.js
module.exports = (sequelize, DataTypes) => {
  const Mascota = sequelize.define('Mascota', {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    especie: {
      type: DataTypes.STRING,
      allowNull: true
    },
    raza: {
      type: DataTypes.STRING,
      allowNull: true
    },
    sexo: {
      type: DataTypes.ENUM('Macho', 'Hembra'),
      allowNull: true
    },
    edad: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    peso: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    observaciones: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    foto_url: {
      type: DataTypes.TEXT,
      allowNull: true
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
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'mascotas',
    timestamps: true
  });

  Mascota.associate = models => {
    Mascota.belongsTo(models.Usuario, {
      foreignKey: 'usuario_id',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });

    Mascota.hasMany(models.Cita, {
      foreignKey: 'mascota_id',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });
  };

  return Mascota;
};



