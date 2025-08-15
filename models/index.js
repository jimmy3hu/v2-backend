const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// 🧩 Importación de modelos clínicos
const Usuario = require('./usuario')(sequelize, DataTypes);
const Mascota = require('./mascota')(sequelize, DataTypes);
const Cita = require('./cita')(sequelize, DataTypes);
const Cirugia = require('./cirugia')(sequelize, DataTypes);
const Emergencia = require('./emergencia')(sequelize, DataTypes);
const Examen = require('./examen')(sequelize, DataTypes);
const Tratamiento = require('./tratamiento')(sequelize, DataTypes);
const Vacuna = require('./vacuna')(sequelize, DataTypes);
const Producto = require('./producto')(sequelize, DataTypes);
const Carrito = require('./carrito')(sequelize, DataTypes);
const Campania = require('./campania.model')(sequelize, DataTypes);
const Notificacion = require('./notificacion.model')(sequelize, DataTypes);

// 🧩 Asociación emocional entre modelos
function associateModels() {
  // Usuario → Mascota
  Usuario.hasMany(Mascota, { foreignKey: 'usuario_id' });
  Mascota.belongsTo(Usuario, {
    foreignKey: 'usuario_id',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  });

  // Usuario → Cita
  Usuario.hasMany(Cita, { foreignKey: 'usuario_id' });
  Cita.belongsTo(Usuario, {
    foreignKey: 'usuario_id',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  });

  // Usuario → Emergencia
  Usuario.hasMany(Emergencia, { foreignKey: 'usuario_id' });
  Emergencia.belongsTo(Usuario, {
    foreignKey: 'usuario_id',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  });

  // Mascota → Emergencia
  Mascota.hasMany(Emergencia, { foreignKey: 'mascota_id' });
  Emergencia.belongsTo(Mascota, {
    foreignKey: 'mascota_id',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  });

  // Usuario → Carrito
  Usuario.hasMany(Carrito, { foreignKey: 'usuario_id' });
  Carrito.belongsTo(Usuario, {
    foreignKey: 'usuario_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  });

  // Mascota → Cita
  Mascota.hasMany(Cita, { foreignKey: 'mascota_id' });
  Cita.belongsTo(Mascota, {
    foreignKey: 'mascota_id',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  });

  // Mascota → Vacuna
  Mascota.hasMany(Vacuna, { foreignKey: 'mascota_id' });
  Vacuna.belongsTo(Mascota, {
    foreignKey: 'mascota_id',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  });

  // Mascota → Examen
  Mascota.hasMany(Examen, { foreignKey: 'mascota_id' });
  Examen.belongsTo(Mascota, {
    foreignKey: 'mascota_id',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  });

  // Mascota → Tratamiento
  Mascota.hasMany(Tratamiento, { foreignKey: 'mascota_id' });
  Tratamiento.belongsTo(Mascota, {
    foreignKey: 'mascota_id',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  });

  // Mascota → Cirugia
  Mascota.hasMany(Cirugia, { foreignKey: 'mascota_id' });
  Cirugia.belongsTo(Mascota, {
    foreignKey: 'mascota_id',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  });

  // Usuario → Notificacion (corregido)
  Usuario.hasMany(Notificacion, { foreignKey: 'usuarioId' });
  Notificacion.belongsTo(Usuario, {
    foreignKey: 'usuarioId',
    as: 'usuario',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  });

  // Campania → Notificacion (corregido)
  Campania.hasMany(Notificacion, { foreignKey: 'campaniaId' });
  Notificacion.belongsTo(Campania, {
    foreignKey: 'campaniaId',
    as: 'campania',
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE'
  });
}

// 🧩 Sincronización emocional y segura
async function initModels({ sync = false } = {}) {
  try {
    await sequelize.authenticate();
    console.log('🗸 Conexión con la base de datos establecida');

    associateModels();

    if (sync) {
      await sequelize.sync(); // sin alter
      console.log('🗸 Modelos clínicos sincronizados correctamente');
    }
  } catch (err) {
    console.error('✗ Error al inicializar modelos:', err.message || err);
  }
}

// 🧩 Exportación modular
module.exports = {
  initModels,
  sequelize,
  Usuario,
  Mascota,
  Cita,
  Cirugia,
  Emergencia,
  Examen,
  Tratamiento,
  Vacuna,
  Producto,
  Carrito,
  Campania,
  Notificacion
};
