import express from 'express';
import { registrarUsuario, autenticarUsuario, obtenerUsuarioPorId } from '../services/authService.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Registro de usuario
router.post('/registro', async (req, res) => {
  try {
    const usuario = await registrarUsuario(req.body);
    res.status(201).json({ 
      message: 'Usuario registrado exitosamente', 
      usuario 
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const resultado = await autenticarUsuario(username, password);
    res.json(resultado);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

// Obtener perfil del usuario autenticado
router.get('/perfil', authMiddleware, (req, res) => {
  try {
    const usuario = obtenerUsuarioPorId(req.user.id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verificar token
router.get('/verificar', authMiddleware, (req, res) => {
  res.json({ 
    valid: true, 
    user: req.user 
  });
});

export default router;
