const bcrypt = require('bcrypt');

const contraseñaPlana = 'clase2025'; // Cámbiala por la que quieras
const saltRounds = 10;

bcrypt.hash(contraseñaPlana, saltRounds, function(err, hash) {
  if (err) {
    console.error('❌ Error al generar el hash:', err);
    return;
  }
  console.log('✅ Hash generado:');
  console.log(hash);
});
