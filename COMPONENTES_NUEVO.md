# Componentes de Autenticación y Cuenta - PrimeFit

## Resumen de Cambios

Se han creado e implementado nuevos componentes y servicios para gestionar la autenticación de usuarios y la información de sus cuentas.

---

## 📋 Componentes Creados

### 1. **LoginComponent** 
Ubicación: `src/components/login/login.component.ts`

#### Características:
- **Diseño moderno** con gradiente de fondo
- **Dos modos de funcionamiento:**
  - **Modo Login**: Para usuarios existentes
  - **Modo Registro**: Para crear nuevas cuentas
- **Formularios reactivos** con validación en tiempo real
- **Animaciones suaves** de transición entre modos
- **Mensajes de error y éxito**

#### Campos de Login:
- Email (validado)
- Contraseña (mínimo 6 caracteres)

#### Campos de Registro:
- Nombre Completo
- Email (validado)
- Teléfono (opcional)
- Ciudad
- Dirección
- Contraseña (mínimo 6 caracteres)
- Confirmar Contraseña (validación de coincidencia)

#### Funcionalidades:
- Autenticación de usuarios
- Creación de nuevas cuentas
- Validación de formularios
- Redirección automática a `/cuenta` tras autenticación exitosa
- Indicadores visuales de carga

---

### 2. **CuentaComponent** (Mejorado)
Ubicación: `src/components/cuenta/cuenta.component.ts`

#### Características:
- **Sistema de tabs** con navegación:
  - Pestaña "Perfil": Información de usuario
  - Pestaña "Mis Pedidos": Historial de pedidos
- **Gestión de sesión**: Botón de cerrar sesión
- **Protección de ruta**: Redirige a login si no está autenticado
- **Edición de perfil**: Modo editable para actualizar datos

#### Funcionalidades:

##### Pestaña Perfil:
- Visualización de datos del usuario:
  - Nombre
  - Email
  - Teléfono
  - Ciudad
  - Dirección
- **Modo edición**:
  - Formulario para actualizar información
  - Botones de guardar y cancelar
  - Validación de formulario
  - Guardado en localStorage

##### Pestaña Mis Pedidos:
- Listado de pedidos anteriores
- Para cada pedido se muestra:
  - ID del pedido
  - Fecha de compra
  - Estado (Entregado / En Preparación)
  - Detalle de items:
    - Nombre del producto
    - Cantidad
    - Precio unitario
  - Total del pedido
- **Estadísticas visuales**: Badge con estado del pedido coloreado

#### Estados de Pedido:
- 🟢 **Entregado**: Color verde (completado)
- 🟠 **En Preparación**: Color naranja (en proceso)

---

## 🔐 Servicio de Autenticación

### AuthService
Ubicación: `src/services/auth.service.ts`

#### Métodos Principales:

```typescript
// Iniciar sesión
login(email: string, password: string): Observable<boolean>

// Registrar usuario
registrar(userData: User, password: string): Observable<boolean>

// Cerrar sesión
logout(): void

// Verificar autenticación
estaAutenticado(): boolean

// Obtener usuario actual
obtenerUsuarioActual(): User | null

// Actualizar perfil
actualizarPerfil(usuario: User): Observable<boolean>

// Obtener pedidos del usuario
obtenerPedidos(): Pedido[]
```

#### Observables Expuestos:
```typescript
usuario$: Observable<User | null>    // Observable del usuario autenticado
pedidos$: Observable<Pedido[]>       // Observable de pedidos del usuario
```

#### Interfaces:

```typescript
interface User {
  id?: string;
  nombre: string;
  email: string;
  telefono?: string;
  direccion?: string;
  ciudad?: string;
}

interface Pedido {
  id: string;
  fecha: string;
  total: number;
  estado: string;
  items: any[];
}
```

#### Almacenamiento:
- **localStorage**: Guarda usuario autenticado y token
- **Clave: 'usuarioActual'** - Datos del usuario en JSON
- **Clave: 'token'** - Token de sesión

---

## 🎨 HeaderComponent (Actualizado)

Se ha actualizado el componente header para:
- Mostrar el nombre del usuario si está autenticado
- Mostrar botón "Iniciar Sesión" si no está autenticado
- Acceso rápido a "Mi Cuenta" para usuarios autenticados
- Indicador visual del estado de autenticación

---

## 🛣️ Rutas Configuradas

En `src/app.routes.ts`:

```typescript
{ path: '', component: PlatosComponent },
{ path: 'login', component: LoginComponent },           // 🆕
{ path: 'plato/:id', component: PlatoDetalleComponent },
{ path: 'carrito', component: CarritoComponent },
{ path: 'checkout', component: CheckoutComponent },
{ path: 'cuenta', component: CuentaComponent },
{ path: '**', redirectTo: '' }
```

---

## 🚀 Flujo de Usuario

### Nuevo Usuario:
1. Hace clic en "Iniciar Sesión" (header)
2. Se redirige a `/login`
3. Selecciona "Crear Cuenta"
4. Completa el formulario de registro
5. Crea su cuenta
6. Se redirige automáticamente a `/cuenta`
7. Puede ver su perfil y realizar pedidos

### Usuario Existente:
1. Hace clic en "Iniciar Sesión" (header)
2. Se redirige a `/login`
3. Ingresa email y contraseña
4. Se redirige a `/cuenta`
5. Puede ver su perfil, editar datos y ver sus pedidos

### Cierre de Sesión:
1. En `/cuenta`, hace clic en "Cerrar Sesión"
2. Se confirma la acción
3. Se limpia localStorage
4. Se redirige a `/login`

---

## 💾 Datos de Prueba

El servicio incluye datos simulados de pedidos para demostración:

```javascript
[
  {
    id: '001',
    fecha: '2025-11-15',
    total: 45.99,
    estado: 'Entregado',
    items: [...]
  },
  {
    id: '002',
    fecha: '2025-11-10',
    total: 32.50,
    estado: 'Entregado',
    items: [...]
  },
  {
    id: '003',
    fecha: '2025-11-08',
    total: 28.75,
    estado: 'En Preparación',
    items: [...]
  }
]
```

---

## 🎯 Estilos Implementados

### Tema de Colores:
- **Primario**: Verde (#48bb78) - Botones principales
- **Gradiente**: Púrpura (#667eea → #764ba2) - Login
- **Texto Oscuro**: #2d3748
- **Texto Claro**: #718096
- **Fondo**: #f7fafc

### Características de UX:
- ✅ Animaciones suaves (fade-in, slide-up)
- ✅ Hover effects en botones e items
- ✅ Responsivo para móvil
- ✅ Validación de formularios en tiempo real
- ✅ Estados visuales de carga
- ✅ Mensajes de error y éxito

---

## 📱 Responsividad

Todos los componentes incluyen puntos de ruptura (breakpoints) para:
- 📱 Móvil: `max-width: 640px`
- 💻 Tablet: `max-width: 768px`
- 🖥️ Desktop: Ancho completo

---

## 🔄 Integración con Backend

### Próximas Mejoras Necesarias:

Para pasar a producción, reemplaza las llamadas simuladas en `AuthService` con llamadas HTTP reales:

```typescript
// Actualmente usa setTimeout simulado
login(email: string, password: string): Observable<boolean> {
  // Reemplazar con:
  // return this.http.post('/api/auth/login', { email, password })
}
```

---

## 📦 Dependencias Utilizadas

- `@angular/core` - Core Framework
- `@angular/forms` - Formularios (Reactive Forms)
- `@angular/router` - Routing
- `@angular/common` - CommonModule
- `rxjs` - Observables

---

## ✅ Checklist de Funcionalidades

- [x] Componente Login con tabs (Login/Registro)
- [x] Validación de formularios
- [x] Servicio de autenticación
- [x] Componente Cuenta mejorado
- [x] Pestaña de Perfil con edición
- [x] Pestaña de Pedidos con historial
- [x] Header actualizado
- [x] Rutas configuradas
- [x] Almacenamiento en localStorage
- [x] Protección de rutas
- [x] Diseño responsivo
- [x] Animaciones y transiciones

---

## 🛠️ Instrucciones de Uso

### Para Probar:

1. **Accede a `/login`**
2. **Crea una cuenta nueva:**
   - Email: `usuario@ejemplo.com`
   - Contraseña: `123456` (mínimo 6 caracteres)
3. **Serás redirigido a `/cuenta`**
4. **Explora las pestañas:**
   - Perfil: Ver y editar datos
   - Mis Pedidos: Ver historial de pedidos simulados
5. **Cierra sesión:** Botón "Cerrar Sesión"

---

**Nota**: Los datos actualmente se guardan en localStorage. Para producción, implementa un backend con base de datos real.
