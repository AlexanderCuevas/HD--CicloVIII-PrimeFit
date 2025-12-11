import express from 'express';
import { 
  obtenerPlatos, 
  obtenerPlatoPorId, 
  crearPlato, 
  actualizarPlato, 
  eliminarPlato,
  buscarPlatos
} from '../services/platoService.js';
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Obtener todos los platos (público)
router.get('/', (req, res) => {
  try {
    const platos = obtenerPlatos(req.query);
    res.json(platos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Buscar platos (público)
router.get('/buscar/:query', (req, res) => {
  try {
    const platos = buscarPlatos(req.params.query);
    res.json(platos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener platos por restaurante (público)
router.get('/restaurante/:restauranteId', (req, res) => {
  try {
    const platos = obtenerPlatos({ restauranteId: req.params.restauranteId });
    res.json(platos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener plato por ID (público)
router.get('/:id', (req, res) => {
  try {
    const plato = obtenerPlatoPorId(parseInt(req.params.id));
    if (!plato) {
      return res.status(404).json({ error: 'Plato no encontrado' });
    }
    res.json(plato);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear plato (admin)
router.post('/', authMiddleware, adminMiddleware, (req, res) => {
  try {
    const plato = crearPlato(req.body);
    res.status(201).json(plato);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Actualizar plato (admin)
router.put('/:id', authMiddleware, adminMiddleware, (req, res) => {
  try {
    const plato = actualizarPlato(parseInt(req.params.id), req.body);
    res.json(plato);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar plato (admin)
router.delete('/:id', authMiddleware, adminMiddleware, (req, res) => {
  try {
    const resultado = eliminarPlato(parseInt(req.params.id));
    res.json(resultado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
