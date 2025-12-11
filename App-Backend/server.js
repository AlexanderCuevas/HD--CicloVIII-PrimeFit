import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import restaurantRoutes from './routes/restaurantRoutes.js';
import platoRoutes from './routes/platoRoutes.js';
import pedidoRoutes from './routes/pedidoRoutes.js';
import carritoRoutes from './routes/carritoRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger simple
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/restaurantes', restaurantRoutes);
app.use('/api/platos', platoRoutes);
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/carrito', carritoRoutes);

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'PrimeFit API funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Error interno del servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`╔═══════════════════════════════════════════╗`);
  console.log(`║   🥗 PrimeFit API Server Running        ║`);
  console.log(`║   Puerto: ${PORT}                            ║`);
  console.log(`║   Entorno: ${process.env.NODE_ENV}              ║`);
  console.log(`╚═══════════════════════════════════════════╝`);
  console.log(`\nAPI Health: http://localhost:${PORT}/api/health\n`);
});
