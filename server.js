require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const { initModels } = require('./models'); // 🧩 Inicializa Sequelize

const app = express();

// 🛡️ Middlewares globales con límite aumentado
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// 🖼️ Servir imágenes subidas por usuarios
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 🧩 Importar rutas clínicas
const authRoutes = require('./routes/auth.routes'); // 🛡️ Ruta de login
const usuarioRoutes = require('./routes/usuario.routes');
const mascotaRoutes = require('./routes/mascota.routes');
const productoRoutes = require('./routes/producto.routes');
const carritoRoutes = require('./routes/carrito.routes');
const citaRoutes = require('./routes/cita.routes');
const emergenciaRoutes = require('./routes/emergencia.routes');
const vacunaRoutes = require('./routes/vacuna.routes');
const examenRoutes = require('./routes/examen.routes');
const tratamientoRoutes = require('./routes/tratamiento.routes');
const cirugiaRoutes = require('./routes/cirugia.routes');
const notificacionesRoutes = require('./routes/notificaciones.routes');

// 📥 Montar rutas clínicas
app.use('/api', authRoutes); // 🛡️ Activar /api/login
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/mascotas', mascotaRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/carrito', carritoRoutes);
app.use('/api/citas', citaRoutes);
app.use('/api/emergencias', emergenciaRoutes);
app.use('/api/vacunas', vacunaRoutes);
app.use('/api/examenes', examenRoutes);
app.use('/api/tratamientos', tratamientoRoutes);
app.use('/api/cirugias', cirugiaRoutes);
app.use('/api/notificaciones', notificacionesRoutes);

// 🧾 Servir Angular compilado
const angularPath = path.join(__dirname, '../Front End/dist/front-end');
app.use(express.static(angularPath));

// ⚠️ Evitar que Angular intercepte rutas de imágenes
app.get('*', (req, res) => {
  if (req.originalUrl.startsWith('/uploads')) {
    return res.status(404).send('Archivo no encontrado');
  }
  res.sendFile(path.join(angularPath, 'index.html'));
});

// 🔌 Conectar modelos y levantar servidor
(async () => {
  try {
    await initModels({ sync: true }); // ✅ Sincroniza todos los modelos clínicos
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Error al inicializar modelos:', err.message || err);
  }
})();







