exports.send = async ({ title, body }) => {
  console.log('📲 Simulación de envío push:', { title, body });
  return Promise.resolve({ success: true });
};
