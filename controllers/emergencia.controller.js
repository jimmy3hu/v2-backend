const { Emergencia } = require('../models');

// 🛠 Crear nueva emergencia
exports.crearEmergencia = async (req, res) => {
  try {
    const {
      nombre_completo,
      correo,
      telefono,
      direccion,
      tipo_mascota,
      motivo,
      fecha,
      usuario_id,
      mascota_id
    } = req.body;

    // Construcción quirúrgica del objeto de emergencia con fecha automática
    const emergenciaData = {
      nombre_completo,
      correo,
      telefono,
      direccion,
      tipo_mascota,
      motivo,
      fecha: fecha || new Date() // ✅ Asignación automática si no se envía
    };

    // Solo asigna si hay valores válidos
    if (usuario_id && usuario_id !== 0) {
      emergenciaData.usuario_id = usuario_id;
    }

    if (mascota_id && mascota_id !== 0) {
      emergenciaData.mascota_id = mascota_id;
    }

    // Log para auditoría técnica
    console.log('📦 Emergencia recibida:', emergenciaData);

    // Registro en base de datos
    const nuevaEmergencia = await Emergencia.create(emergenciaData);

    // Respuesta emocional y técnica
    res.status(201).json({
      mensaje: 'Emergencia registrada exitosamente',
      emergencia: nuevaEmergencia
    });
  } catch (error) {
    console.error('🚨 Error al registrar emergencia:', error.message, error.stack);
    res.status(500).json({ error: 'Error al registrar emergencia' });
  }
};

// 📥 Obtener todas las emergencias
exports.getEmergencias = async (req, res) => {
  try {
    const emergencias = await Emergencia.findAll();
    res.status(200).json(emergencias);
  } catch (error) {
    console.error('🚨 Error al obtener emergencias:', error.message, error.stack);
    res.status(500).json({ error: 'Error al obtener emergencias' });
  }
};




