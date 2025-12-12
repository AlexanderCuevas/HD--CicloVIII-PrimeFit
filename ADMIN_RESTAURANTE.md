# Sistema de Administrador de Restaurante

## Resumen
Se ha implementado un sistema de administración específico para restaurantes que permite a cada restaurante gestionar únicamente sus propios pedidos y platos.

## Usuario Administrador de FitGreen

### Credenciales
- **Usuario**: `fitgreen_admin`
- **Email**: `admin@fitgreen.com`
- **Contraseña**: `admin123`
- **Rol**: `restaurant_admin`
- **Restaurante**: FitGreen (ID: 1)

## Permisos y Restricciones

### Restaurant Admin (fitgreen_admin)
✅ **PUEDE**:
- Ver y gestionar pedidos que contengan platos de FitGreen
- Cambiar el estado de pedidos de FitGreen (pendiente → confirmado → preparando → en_camino → entregado)
- Crear nuevos platos para FitGreen
- Editar platos existentes de FitGreen
- Eliminar platos de FitGreen
- Acceder al panel de administración (`/admin`)

❌ **NO PUEDE**:
- Ver pedidos de otros restaurantes (Protein House, Keto Kitchen, etc.)
- Modificar o eliminar platos de otros restaurantes
- Cambiar su restauranteId asignado
- Acceder a funciones de super administrador

### Super Admin
✅ **PUEDE**:
- Todo lo que puede hacer un restaurant_admin
- Ver y gestionar pedidos de TODOS los restaurantes
- Crear/editar/eliminar platos de CUALQUIER restaurante
- Gestionar usuarios y permisos

## Cambios Implementados

### Backend

#### 1. Middleware (`authMiddleware.js`)
```javascript
// Permite acceso a admin y restaurant_admin
export function adminMiddleware(req, res, next)

// Solo permite acceso a super admin
export function superAdminMiddleware(req, res, next)
```

#### 2. Modelo de Usuario (`User.js`)
- Añadido campo `restauranteId` para asociar admin con restaurante
- Campo incluido en `toSafeJSON()` cuando el usuario es `restaurant_admin`

#### 3. Servicio de Pedidos (`pedidoService.js`)
- `obtenerTodosPedidos()` ahora acepta filtro `restauranteId`
- Filtra pedidos que contengan items del restaurante especificado

#### 4. Rutas de Pedidos (`pedidoRoutes.js`)
- GET `/todos`: Automáticamente filtra por `restauranteId` si es `restaurant_admin`

#### 5. Rutas de Platos (`platoRoutes.js`)
- POST `/`: Fuerza `restauranteId` del usuario si es `restaurant_admin`
- PUT `/:id`: Valida que el plato pertenezca al restaurante del admin
- DELETE `/:id`: Valida que el plato pertenezca al restaurante del admin

### Frontend

#### 1. Interfaz de Usuario (`auth.service.ts`)
```typescript
export interface User {
  ...
  restauranteId?: number; // Nuevo campo
}
```

#### 2. Componente Admin (`admin.component.ts`)
- Permite acceso a usuarios con rol `restaurant_admin`
- Automáticamente asigna `restauranteId` al crear platos
- Mantiene el `restauranteId` correcto al limpiar formulario

#### 3. Navbar (`navbar.component.html`)
- Muestra enlace "Admin" para usuarios con rol `admin` o `restaurant_admin`

## Flujo de Uso

### Para Administrador de FitGreen

1. **Iniciar Sesión**
   ```
   Usuario: fitgreen_admin
   Contraseña: admin123
   ```

2. **Acceder al Panel Admin**
   - Hacer clic en "🛠️ Admin" en el navbar
   - Se abre el panel de administración

3. **Gestionar Pedidos**
   - Ver lista de pedidos que contienen platos de FitGreen
   - Cambiar estado de pedidos:
     - Pendiente → Confirmado → Preparando → En Camino → Entregado
   - Ver detalles del cliente (teléfono, dirección, notas)

4. **Agregar Platos**
   - Cambiar a la pestaña "Agregar Platos"
   - Completar formulario:
     - Nombre del plato
     - Descripción
     - Precio (en soles)
     - Categoría
     - Información nutricional (calorías, proteínas, carbohidratos, grasas)
     - Etiquetas (Vegano, Sin Gluten, etc.)
     - URL de imagen
   - El `restauranteId` se asigna automáticamente a FitGreen (ID: 1)

## Seguridad

### Validaciones Backend
- ✅ Validación de token JWT en todas las rutas protegidas
- ✅ Verificación de rol (`restaurant_admin` o `admin`)
- ✅ Validación de propiedad del recurso antes de modificar
- ✅ Filtrado automático de datos por `restauranteId`

### Validaciones Frontend
- ✅ Redirección si no tiene permisos
- ✅ Asignación automática de `restauranteId`
- ✅ Prevención de modificación manual del `restauranteId`

## Datos en `users.json`

```json
{
  "id": 4,
  "username": "fitgreen_admin",
  "email": "admin@fitgreen.com",
  "password": "$2a$10$7ckTCXCqYIfVmlRoAfOabO1oVCJ1WCSD2ludX11SEnHwfJ8M5rSY6",
  "nombre": "Admin",
  "apellido": "FitGreen",
  "role": "restaurant_admin",
  "restauranteId": 1,
  "telefono": "987654321",
  "direccion": "Av. Salaverry 2255, Jesús María"
}
```

## Próximos Pasos Sugeridos

1. **Notificaciones en Tiempo Real**
   - Implementar WebSocket para notificar al admin cuando llegue un nuevo pedido

2. **Estadísticas del Restaurante**
   - Dashboard con métricas de ventas
   - Platos más vendidos
   - Ingresos por período

3. **Gestión de Horarios**
   - Permitir al admin configurar horarios de apertura/cierre
   - Pausar recepción de pedidos temporalmente

4. **Reportes**
   - Exportar pedidos a Excel/PDF
   - Resumen de ventas mensual/semanal

## Soporte

Para crear más administradores de restaurante:
1. Agregar usuario en `users.json` con role `restaurant_admin`
2. Asignar el `restauranteId` correspondiente
3. Hash de contraseña usando bcrypt con 10 rounds

Ejemplo de crear hash de contraseña en Node.js:
```javascript
const bcrypt = require('bcryptjs');
const hash = await bcrypt.hash('tu_contraseña', 10);
console.log(hash);
```
