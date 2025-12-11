import express from 'express';
import { 
  obtenerCarrito, 
  agregarItemCarrito, 
  actualizarCantidadItem, 
  eliminarItemCarrito, 
  vaciarCarrito 
} from '../services/carritoService.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Todas las rutas requieren autenticación
router.use(authMiddleware);

// Obtener carrito del usuario
router.get('/', (req, res) => {
  try {
    const carrito = obtenerCarrito(req.user.id);
    res.json(carrito);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Agregar item al carrito
router.post('/items', (req, res) => {
  try {
    const carrito = agregarItemCarrito(req.user.id, req.body);
    res.json(carrito);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Actualizar cantidad de un item
router.put('/items/:platoId', (req, res) => {
  try {
    const { cantidad } = req.body;
    const carrito = actualizarCantidadItem(req.user.id, parseInt(req.params.platoId), cantidad);
    res.json(carrito);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar item del carrito
router.delete('/items/:platoId', (req, res) => {
  try {
    const carrito = eliminarItemCarrito(req.user.id, parseInt(req.params.platoId));
    res.json(carrito);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Vaciar carrito
router.delete('/', (req, res) => {
  try {
    const carrito = vaciarCarrito(req.user.id);
    res.json(carrito);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
