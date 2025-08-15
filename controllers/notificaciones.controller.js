const db = require('../models');
const { Notificacion } = db;

const enviarNotificacion = async (req, res) => {
  const { tipo, titulo, mensaje, activo, destinatario, campaniaId, usuarioId } = req.body;

  try {
    // Persistencia emocional
    const nueva = await Notificacion.create({
      tipo,
      titulo,
      mensaje,
      activo,
      destinatario,
      estado: 'pendiente',
      campaniaId,
      usuarioId
    });

    // Simulación de envío por canal
    switch (tipo) {
      case 'email':
        console.log(`📧 Enviando email a ${destinatario}: ${titulo} - ${mensaje}`);
        break;
      case 'push':
        console.log(`📲 Enviando push a ${destinatario}: ${titulo} - ${mensaje}`);
        break;
      case 'whatsapp':
        console.log(`💬 Enviando WhatsApp a ${destinatario}: ${titulo} - ${mensaje}`);
        break;
      default:
        return res.status(400).json({ success: false, mensaje: 'Tipo de notificación no válido' });
    }

    res.status(200).json({
      success: true,
      mensaje: `Notificación ${tipo} enviada con éxito`,
      data: nueva
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      mensaje: err.message || 'Error interno al enviar notificación'
    });
  }
};

module.exports = {
  enviarNotificacion
};




