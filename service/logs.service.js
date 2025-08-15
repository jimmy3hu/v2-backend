// 📁 service/logs.service.js
const { Log } = require('../models'); // Asegúrate de tener el modelo Log definido

const registrarLog = async ({ accion, usuario_id = null, correo = '', exito = false, motivo = '', fecha = null }) => {
  try {
    const fechaFinal = fecha || new Date();

    // 🧬 Registro en base de datos
    await Log.create({
      accion,
      usuario_id,
      correo,
      exito,
      motivo: motivo || 'Acción registrada sin incidentes',
      fecha: fechaFinal
    });

    // 💬 Log emocional en consola
    console.log(`[LOG] ${accion} | ${correo} | ${exito ? '✅' : '❌'} | ${motivo || 'OK'} | ${fechaFinal.toLocaleString('es-PE', { timeZone: 'America/Lima' })}`);
  } catch (error) {
    console.error(`[LOG ERROR] No se pudo registrar la acción "${accion}" para ${correo}: ${error.message}`);
  }
};

module.exports = { registrarLog };

