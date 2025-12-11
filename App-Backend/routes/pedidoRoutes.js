import express from 'express';
import { 
  crearPedido, 
  obtenerPedidosUsuario, 
  obtenerTodosPedidos, 
  obtenerPedidoPorId, 
  actualizarEstadoPedido, 
  cancelarPedido 
} from '../services/pedidoService.js';
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Todas las rutas requieren autenticación
router.use(authMiddleware);

// Crear pedido desde carrito
router.post('/', (req, res) => {
  try {
    const { items, direccionEntrega, costoEnvio, subtotal, total } = req.body;
    
    // Crear pedido con items directamente
    const pedido = crearPedido(req.user.id, items, direccionEntrega, costoEnvio, subtotal, total);
    res.status(201).json(pedido);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener pedidos del usuario
router.get('/mis-pedidos', (req, res) => {
  try {
    const pedidos = obtenerPedidosUsuario(req.user.id);
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener todos los pedidos (admin)
router.get('/todos', adminMiddleware, (req, res) => {
  try {
    const pedidos = obtenerTodosPedidos(req.query);
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener pedido por ID
router.get('/:id', (req, res) => {
  try {
    const usuarioId = req.user.role === 'admin' ? null : req.user.id;
    const pedido = obtenerPedidoPorId(parseInt(req.params.id), usuarioId);
    
    if (!pedido) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }
    
    res.json(pedido);
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
});

// Actualizar estado del pedido (admin)
router.patch('/:id/estado', adminMiddleware, (req, res) => {
  try {
    const { estado } = req.body;
    const pedido = actualizarEstadoPedido(parseInt(req.params.id), estado);
    res.json(pedido);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Cancelar pedido
router.post('/:id/cancelar', (req, res) => {
  try {
    const pedido = cancelarPedido(parseInt(req.params.id), req.user.id);
    res.json(pedido);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
