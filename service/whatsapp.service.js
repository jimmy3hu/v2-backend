// whatsapp.service.js
exports.send = async ({ phone, message }) => {
  console.log(`📱 Simulado: WhatsApp a ${phone}: ${message}`);
  return true;
};

