# 🚀 Guía de Instalación y Ejecución - HealthyFood

## ✅ COMPLETADO

### Backend
- ✅ API REST completa con Express.js
- ✅ 5 Modelos de datos (Restaurante, Plato, User, Pedido, Carrito)
- ✅ 5 Servicios de negocio
- ✅ 5 Rutas API (auth, restaurantes, platos, carrito, pedidos)
- ✅ Middleware de autenticación JWT
- ✅ Datos de ejemplo: 5 restaurantes saludables, 20 platos fit
- ✅ Usuarios de prueba (admin/cliente)

### Frontend
- ✅ Configuración Angular 17 completa
- ✅ 5 Servicios HTTP (auth, restaurante, plato, carrito, pedido)
- ✅ Routing configurado
- ✅ Componentes base creados (Navbar, Home, Login)
- ✅ Estilos globales profesionales

## 📋 PASOS PARA EJECUTAR

### 1. Instalar Backend

```bash
cd App-Backend
npm install
```

**Dependencias que se instalarán:**
- express
- cors
- bcryptjs
- jsonwebtoken
- dotenv
- nodemon (dev)

### 2. Ejecutar Backend

```bash
npm start
# o para desarrollo con auto-reload:
npm run dev
```

✅ El backend estará en `http://localhost:3000`  
✅ Probar: `http://localhost:3000/api/health`

### 3. Instalar Frontend

```bash
cd App-Front
npm install
```

**Dependencias que se instalarán:**
- @angular/core, common, forms, router, etc.
- rxjs
- typescript
- Angular CLI

### 4. Ejecutar Frontend

```bash
npm start
# o
ng serve
```

✅ El frontend estará en `http://localhost:4200`

## 🔧 VERIFICACIÓN

### Backend
1. Abre `http://localhost:3000/api/health`
2. Deberías ver: `{"status":"ok","message":"HealthyFood API funcionando correctamente",...}`
3. Prueba: `http://localhost:3000/api/restaurantes` (verás 5 restaurantes)
4. Prueba: `http://localhost:3000/api/platos` (verás 20 platos)

### Frontend
1. Abre `http://localhost:4200`
2. Verás la página Home con:
   - Navbar superior
   - Hero section verde
   - Categorías de especialidades
   - Grid de restaurantes destacados

## 🎮 PROBANDO LA APLICACIÓN

### Login
1. Ve a `http://localhost:4200/login`
2. Usa credenciales:
   - **Admin:** admin / admin123
   - **Cliente:** cliente1 / cliente123
3. Después del login, verás tu nombre en el navbar

### Navegación
- **Home (/):** Página principal con restaurantes destacados
- **Restaurantes (/restaurantes):** Todos los restaurantes (placeholder)
- **Carrito (/carrito):** Tu carrito de compras (placeholder)
- **Pedidos (/pedidos):** Tus pedidos (placeholder, requiere login)

## 🎨 COMPONENTES CREADOS

### ✅ Completamente Funcionales
1. **NavbarComponent** - Navegación completa con:
   - Logo HealthyFood
   - Links de navegación
   - Carrito con badge de cantidad
   - Menú de usuario / login

2. **HomeComponent** - Página principal con:
   - Hero section
   - Categorías de comida
   - Grid de restaurantes (consume API)

3. **LoginComponent** - Login funcional con:
   - Formulario de autenticación
   - Integración con JWT
   - Credenciales demo visibles

### 📝 Placeholders (Para Completar)
- RestaurantesComponent
- RestauranteDetailComponent  
- CarritoComponent
- PedidosComponent
- RegisterComponent

## 🛠️ PRÓXIMOS PASOS PARA COMPLETAR

### Componente Restaurantes
Crear grid completo con:
- Filtros por especialidad
- Búsqueda
- Cards clickeables

### Componente RestauranteDetail
- Mostrar banner y logo del restaurante
- Grid de platos del restaurante
- Botón "Agregar al carrito" por cada plato

### Componente Carrito
- Lista de items con imagen
- Controles +/- para cantidad
- Botón eliminar
- Resumen: subtotal, envío, total
- Botón "Realizar pedido"

### Componente Pedidos
- Lista de pedidos del usuario
- Estados con colores (pendiente, confirmado, etc.)
- Detalle expandible

### Componente Register
- Formulario de registro
- Validaciones
- Integración con API

## 📚 ESTRUCTURA DE ARCHIVOS CREADOS

```
App-Backend/
├── data/
│   ├── restaurantes.json ✅ 5 restaurantes
│   ├── platos.json ✅ 20 platos
│   ├── users.json ✅ 2 usuarios
│   └── pedidos.json ✅ vacío
├── middleware/
│   └── authMiddleware.js ✅
├── Model/
│   ├── Restaurante.js ✅
│   ├── Plato.js ✅
│   ├── User.js ✅
│   ├── Pedido.js ✅
│   ├── ItemPedido.js ✅
│   └── Carrito.js ✅
├── routes/
│   ├── authRoutes.js ✅
│   ├── restaurantRoutes.js ✅
│   ├── platoRoutes.js ✅
│   ├── carritoRoutes.js ✅
│   └── pedidoRoutes.js ✅
├── services/
│   ├── authService.js ✅
│   ├── restaurantService.js ✅
│   ├── platoService.js ✅
│   ├── carritoService.js ✅
│   └── pedidoService.js ✅
├── .env ✅
├── server.js ✅
└── package.json ✅

App-Front/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── navbar/ ✅ COMPLETO
│   │   │   ├── home/ ✅ COMPLETO
│   │   │   ├── login/ ✅ COMPLETO
│   │   │   ├── restaurantes/ 📝 placeholder
│   │   │   ├── restaurante-detail/ 📝 placeholder
│   │   │   ├── carrito/ 📝 placeholder
│   │   │   ├── pedidos/ 📝 placeholder
│   │   │   └── register/ 📝 placeholder
│   │   ├── services/
│   │   │   ├── auth.service.ts ✅
│   │   │   ├── restaurante.service.ts ✅
│   │   │   ├── plato.service.ts ✅
│   │   │   ├── carrito.service.ts ✅
│   │   │   └── pedido.service.ts ✅
│   │   ├── app.component.ts ✅
│   │   └── app.module.ts ✅
│   ├── styles.css ✅
│   └── index.html ✅
├── angular.json ✅
├── tsconfig.json ✅
└── package.json ✅
```

## 🎯 ENDPOINTS API DISPONIBLES

### Públicos (sin auth)
- `GET /api/health` - Estado del servidor
- `POST /api/auth/registro` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/restaurantes` - Listar restaurantes
- `GET /api/restaurantes/:id` - Detalle restaurante
- `GET /api/platos` - Listar platos
- `GET /api/platos/:id` - Detalle plato
- `GET /api/platos/buscar/:query` - Buscar platos

### Con Autenticación (requieren token JWT)
- `GET /api/auth/perfil` - Perfil del usuario
- `GET /api/carrito` - Obtener carrito
- `POST /api/carrito/items` - Agregar al carrito
- `PUT /api/carrito/items/:id` - Actualizar cantidad
- `DELETE /api/carrito/items/:id` - Eliminar del carrito
- `POST /api/pedidos` - Crear pedido
- `GET /api/pedidos/mis-pedidos` - Mis pedidos
- `GET /api/pedidos/:id` - Detalle pedido
- `POST /api/pedidos/:id/cancelar` - Cancelar pedido

### Solo Admin
- `POST /api/restaurantes` - Crear restaurante
- `PUT /api/restaurantes/:id` - Actualizar restaurante
- `DELETE /api/restaurantes/:id` - Eliminar restaurante
- `POST /api/platos` - Crear plato
- `PUT /api/platos/:id` - Actualizar plato
- `DELETE /api/platos/:id` - Eliminar plato

## 🐛 SOLUCIÓN DE PROBLEMAS

### Backend no inicia
- Verifica que Node.js esté instalado: `node --version`
- Verifica que estés en `App-Backend/`
- Ejecuta `npm install` de nuevo
- Verifica que el puerto 3000 esté libre

### Frontend no compila
- Verifica que Angular CLI esté instalado: `ng version`
- Si no: `npm install -g @angular/cli`
- Ejecuta `npm install` en `App-Front/`
- Borra `node_modules` y reinstala si persiste

### Errores CORS
- Verifica que el backend esté corriendo
- El backend tiene CORS habilitado para desarrollo

### Token inválido
- Cierra sesión y vuelve a hacer login
- Los tokens expiran en 24 horas

## 📖 RECURSOS ADICIONALES

- Ver `App-Backend/README.md` para documentación detallada del backend
- Ver `README.md` principal para resumen del proyecto
- Código documentado con comentarios

## 🎉 ¡LISTO!

Tu plataforma HealthyFood está lista para ejecutarse. El backend funciona al 100% y el frontend tiene la base lista para continuar desarrollando los componentes restantes.

**¿Qué puedes hacer ahora?**
1. ✅ Ejecutar backend y frontend
2. ✅ Hacer login
3. ✅ Ver restaurantes en Home
4. ✅ Navegar por la app
5. 📝 Completar los componentes placeholder siguiendo el patrón de Home/Navbar
