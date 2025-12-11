# 🥗 HealthyFood Backend API

Backend API REST para plataforma de comida saludable multi-restaurante.

## 📋 Características

- **API REST** completa con Express.js
- **Autenticación JWT** para seguridad
- **Multi-restaurante** - Múltiples restaurantes con sus menús
- **Gestión de Pedidos** - Sistema completo de pedidos
- **Carrito de Compras** - Carrito persistente por usuario
- **Filtros Avanzados** - Por categoría, tags, restaurante

## 🛠️ Tecnologías

- Node.js + Express.js
- JWT para autenticación
- Bcrypt para passwords
- CORS habilitado
- JSON file-based storage

## 📦 Instalación

```bash
cd App-Backend
npm install
```

## 🚀 Uso

### Desarrollo
```bash
npm run dev
```

### Producción
```bash
npm start
```

El servidor se ejecutará en `http://localhost:3000`

## 🔑 Usuarios de Prueba

### Admin
- **Usuario:** admin
- **Password:** admin123

### Cliente
- **Usuario:** cliente1
- **Password:** cliente123

## 📚 API Endpoints

Ver documentación completa en el código fuente.

### Principales endpoints:
- `/api/auth` - Autenticación
- `/api/restaurantes` - Gestión de restaurantes
- `/api/platos` - Gestión de platos
- `/api/carrito` - Carrito de compras
- `/api/pedidos` - Gestión de pedidos
