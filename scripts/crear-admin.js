const crypto = require('crypto');
const { Usuario } = require('.');
const { registrarLog } = require('../helpers/logActividad'); // opcional

async function crearAdmin() {
  const contraseñaPlano = 'clase2025';

  // 🔐 Generar salt único y hash seguro
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(contraseñaPlano, salt, 100000, 64, 'sha512').toString('hex');

  const [usuario, creado] = await Usuario.findOrCreate({
    where: { correo: 'admin@amigovet.com' },
    defaults: {
      nombre_completo: 'María Administradora',
      correo: 'admin@amigovet.com',
      telefono: '963118514',
      contrasena_hash: hash,
      salt: salt,
      direccion: 'Av. Clínica Veterinaria 123',
      fecha_nacimiento: new Date('1990-05-10'),
      dni: '12345678',
      estado_civil: 'Soltera',
      genero: 'Femenino',
      foto_url: '',
      rol: 'admin',
      rol_id: 1,
      requiereCambio: false
    }
  });

  if (creado) {
    console.log('✅ Admin creado con éxito. El sistema respira seguridad y armonía.');

    // 🧠 Registrar acción clínica
    await registrarLog({
      usuarioId: usuario.id,
      accion: 'Creación de administrador por script',
      contexto: 'setup'
    });
  } else {
    console.log('⚠️ El admin ya existía. No se creó uno nuevo. La arquitectura se mantiene íntegra.');
  }
}

crearAdmin();
