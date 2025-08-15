const express = require('express');
const router = express.Router();

// 📧 Email
router.post('/email', async (req, res) => {
  try {
    const { to, subject, text } = req.body;

    if (!to || !subject || !text) {
      return res.status(400).json({
        success: false,
        mensaje: 'Faltan campos obligatorios para email'
      });
    }

    console.log('📧 Simulación de envío de email:', { to, subject, text });

    return res.status(200).json({
      success: true,
      mensaje: 'Email enviado correctamente 🐾'
    });
  } catch (err) {
    console.error('❌ Error interno en email:', err.message);
    return res.status(500).json({
      success: false,
      mensaje: err.message || 'Error interno al enviar email'
    });
  }
});

// 📲 Push
router.post('/push', async (req, res) => {
  try {
    const { tipo, titulo, mensaje, activo, destinatario, estado, usuarioId } = req.body;

    const camposFaltantes = [];
    if (!tipo) camposFaltantes.push('tipo');
    if (!titulo) camposFaltantes.push('titulo');
    if (!mensaje) camposFaltantes.push('mensaje');
    if (!destinatario) camposFaltantes.push('destinatario');
    if (!estado) camposFaltantes.push('estado');
    if (!usuarioId) camposFaltantes.push('usuarioId');

    if (camposFaltantes.length > 0) {
      return res.status(400).json({
        success: false,
        mensaje: `Faltan campos para push: ${camposFaltantes.join(', ')}`
      });
    }

    console.log('📲 Simulación de envío de push:', { tipo, titulo, mensaje });

    return res.status(200).json({
      success: true,
      mensaje: 'Push enviado correctamente 🐾'
    });
  } catch (err) {
    console.error('❌ Error interno en push:', err.message);
    return res.status(500).json({
      success: false,
      mensaje: err.message || 'Error interno al enviar push'
    });
  }
});

// 💬 WhatsApp
router.post('/whatsapp', async (req, res) => {
  try {
    const { telefono, mensaje } = req.body;

    if (!telefono || !mensaje) {
      return res.status(400).json({
        success: false,
        mensaje: 'Faltan campos obligatorios para WhatsApp'
      });
    }

    console.log('💬 Simulación de envío de WhatsApp:', { telefono, mensaje });

    return res.status(200).json({
      success: true,
      mensaje: 'WhatsApp enviado correctamente 🐾'
    });
  } catch (err) {
    console.error('❌ Error interno en WhatsApp:', err.message);
    return res.status(500).json({
      success: false,
      mensaje: err.message || 'Error interno al enviar WhatsApp'
    });
  }
});

module.exports = router;
