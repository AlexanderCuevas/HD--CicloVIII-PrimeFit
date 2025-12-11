import express from 'express';
import { 
  obtenerRestaurantes, 
  obtenerRestaurantePorId, 
  crearRestaurante, 
  actualizarRestaurante, 
  eliminarRestaurante 
} from '../services/restaurantService.js';
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Obtener todos los restaurantes (público)
router.get('/', (req, res) => {
  try {
    const restaurantes = obtenerRestaurantes(req.query);
    res.json(restaurantes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener restaurante por ID (público)
router.get('/:id', (req, res) => {
  try {
    const restaurante = obtenerRestaurantePorId(parseInt(req.params.id));
    if (!restaurante) {
      return res.status(404).json({ error: 'Restaurante no encontrado' });
    }
    res.json(restaurante);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear restaurante (admin)
router.post('/', authMiddleware, adminMiddleware, (req, res) => {
  try {
    const restaurante = crearRestaurante(req.body);
    res.status(201).json(restaurante);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Actualizar restaurante (admin)
router.put('/:id', authMiddleware, adminMiddleware, (req, res) => {
  try {
    const restaurante = actualizarRestaurante(parseInt(req.params.id), req.body);
    res.json(restaurante);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar restaurante (admin)
router.delete('/:id', authMiddleware, adminMiddleware, (req, res) => {
  try {
    const resultado = eliminarRestaurante(parseInt(req.params.id));
    res.json(resultado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
