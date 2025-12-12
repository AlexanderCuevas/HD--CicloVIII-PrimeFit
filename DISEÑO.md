# 🎨 Guía de Diseño Visual - HealthyFood

## Paleta de Colores

### Colores Principales
- **Verde Primario:** `#10b981` (Saludable, fresco, natural)
- **Verde Oscuro:** `#059669` (Hover states)
- **Azul:** `#3b82f6` (Secundario)
- **Rojo:** `#ef4444` (Alertas, badges)
- **Amarillo:** `#f59e0b` (Warnings)

### Grises
- **Gris 50:** `#f9fafb` (Fondos sutiles)
- **Gris 100:** `#f3f4f6` (Fondos de sección)
- **Gris 200:** `#e5e7eb` (Bordes)
- **Gris 600:** `#4b5563` (Texto secundario)
- **Gris 800:** `#1f2937` (Texto principal)

## Tipografía

- **Familia:** 'Inter', sans-serif
- **Tamaños:**
  - H1: 48px (Hero)
  - H2: 32px (Secciones)
  - H3: 22px (Títulos de cards)
  - Body: 16px
  - Small: 14px

## Componentes

### Navbar (70px altura)
```
┌─────────────────────────────────────────────────────────┐
│ 🥗 HealthyFood   Inicio  Restaurantes  🛒 Carrito(3)  👤│
└─────────────────────────────────────────────────────────┘
```
- Fijo en la parte superior
- Fondo blanco con sombra
- Badge rojo en carrito con cantidad
- Botón verde para login

### Hero Section
```
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║        🥗 Comida Saludable a Domicilio               ║
║   Los mejores restaurantes fit de la ciudad          ║
║                                                       ║
║          [  Explorar Restaurantes  ]                 ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
```
- Gradiente verde (#10b981 a #059669)
- Texto blanco centrado
- Botón blanco destacado

### Grid de Restaurantes
```
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│   [Imagen]  │  │   [Imagen]  │  │   [Imagen]  │
│             │  │             │  │             │
│ FitGreen    │  │ Protein H.  │  │ Keto K.     │
│ Comida 100% │  │ Especialist │  │ Menú ceto   │
│ vegana...   │  │ as en...    │  │ génico...   │
│             │  │             │  │             │
│ ⭐4.8 🕐30m │  │ ⭐4.9 🕐35m │  │ ⭐4.7 🕐40m │
│ 🚚 $5       │  │ 🚚 $7       │  │ 🚚 $6       │
│             │  │             │  │             │
│ [Vegano]    │  │[Alto Prot.] │  │  [Keto]     │
└─────────────┘  └─────────────┘  └─────────────┘
```
- Cards blancos con bordes redondeados
- Sombra sutil
- Hover: elevar (-8px) y sombra mayor
- Badge de especialidad en color verde

### Card de Plato
```
┌──────────────────────────┐
│      [Imagen Plato]      │
│                          │
│ Buddha Bowl Vegano       │
│ $42.00                   │
│                          │
│ Quinoa, garbanzos...     │
│                          │
│ 🔥450 cal 💪18g 🍞52g   │
│                          │
│ [vegano] [sin gluten]    │
│                          │
│   [ + Agregar ]          │
└──────────────────────────┘
```
- Imagen 400x300px (object-fit: cover)
- Macros con iconos
- Tags como badges pequeños
- Botón verde para agregar

### Carrito
```
┌────────────────────────────────────────┐
│  Carrito de Compras                    │
├────────────────────────────────────────┤
│                                        │
│  [img] Buddha Bowl      [-] 2 [+]  $84│
│        FitGreen                        │
│                                  [🗑]  │
│                                        │
│  [img] Protein Pancakes [-] 1 [+]  $38│
│        Protein House                   │
│                                  [🗑]  │
│                                        │
├────────────────────────────────────────┤
│  Subtotal:              $122           │
│  Envío:                   $5           │
│  ─────────────────────────────         │
│  Total:                 $127           │
│                                        │
│        [ Realizar Pedido ]             │
└────────────────────────────────────────┘
```
- Lista de items con imagen pequeña
- Controles de cantidad (+/-)
- Resumen con totales
- Botón verde grande

### Estados de Pedido
```
┌────────────────────────────────────────┐
│  Pedido #1234                          │
│  ● Pendiente      🕐 12:30 PM          │
│  ─────────────────────────────────────│
│  2 items • $127                        │
│  📍 Av. Principal 123                  │
│                                        │
│  [Ver Detalle] [Cancelar]              │
└────────────────────────────────────────┘
```
- Dot de color según estado:
  - 🔴 Pendiente (rojo)
  - 🟡 Confirmado (amarillo)
  - 🔵 Preparando (azul)
  - 🟢 En camino (verde)
  - ✅ Entregado (verde check)
  - ❌ Cancelado (gris)

## Espaciado

- **Padding contenedor:** 20px
- **Gap grid:** 20-30px
- **Padding card:** 20px
- **Border radius:** 12px
- **Margin secciones:** 60px vertical

## Efectos

### Hover en Cards
```css
transform: translateY(-8px);
box-shadow: 0 10px 15px rgba(0,0,0,0.1);
transition: all 0.3s ease;
```

### Hover en Botones
```css
transform: translateY(-2px);
box-shadow: 0 10px 15px rgba(0,0,0,0.1);
background: #059669; /* más oscuro */
```

## Iconos

Usar emojis para:
- 🥗 Logo / Comida
- 🛒 Carrito
- 👤 Usuario
- ⭐ Calificación
- 🕐 Tiempo
- 🚚 Envío
- 🔥 Calorías
- 💪 Proteínas
- 🍞 Carbohidratos
- 🥑 Grasas
- 📍 Dirección
- ✅ Confirmado

## Responsive

### Desktop (> 768px)
- Grid 3-4 columnas
- Navbar completo
- Sidebar en detalle

### Tablet (768px)
- Grid 2 columnas
- Navbar compacto

### Mobile (< 768px)
- Grid 1 columna
- Navbar con hamburger menu
- Botones full-width

## Inspiración (LlamaFood Style)

### Características a imitar:
1. **Hero grande con imagen de fondo**
2. **Cards de restaurante con imágenes grandes**
3. **Filtros laterales o superiores**
4. **Badges de categorías coloridos**
5. **Footer informativo**
6. **Transiciones suaves**
7. **Diseño limpio y moderno**
8. **Mucho espacio en blanco**
9. **Imágenes de calidad**
10. **Microinteracciones (hover, click)**

## Ejemplo de Layout Completo

```
┌────────────────────────────────────────────────┐
│ NAVBAR: Logo | Links | Carrito | Login        │
├────────────────────────────────────────────────┤
│                                                │
│          HERO SECTION (Verde)                  │
│      Título + Subtítulo + CTA                  │
│                                                │
├────────────────────────────────────────────────┤
│                                                │
│     CATEGORÍAS (4 cards en horizontal)         │
│     🌱 Vegano  💪 Proteína  🥑 Keto  ⚖️ Bal   │
│                                                │
├────────────────────────────────────────────────┤
│                                                │
│        RESTAURANTES DESTACADOS                 │
│                                                │
│  ┌───────┐  ┌───────┐  ┌───────┐  ┌───────┐  │
│  │ REST  │  │ REST  │  │ REST  │  │ REST  │  │
│  │   1   │  │   2   │  │   3   │  │   4   │  │
│  └───────┘  └───────┘  └───────┘  └───────┘  │
│                                                │
├────────────────────────────────────────────────┤
│                                                │
│     FOOTER: Links | Redes | Copyright          │
│                                                │
└────────────────────────────────────────────────┘
```

## Imágenes Sugeridas (Unsplash)

### Restaurantes
- Búsqueda: "healthy food restaurant"
- Tamaño: 800x400px (banner)
- Usar imágenes brillantes y apetitosas

### Platos
- Búsqueda: "healthy bowl", "keto meal", "vegan food", "protein meal"
- Tamaño: 400x300px
- Enfoque en presentación atractiva

### Hero
- Búsqueda: "fresh vegetables", "healthy eating"
- Tamaño: 1920x600px
- Colores vibrantes

## Checklist de Implementación

- [ ] Navbar fijo con todos los elementos
- [ ] Hero section con gradiente verde
- [ ] Grid responsive de restaurantes
- [ ] Cards con hover effect
- [ ] Badges de especialidad
- [ ] Sistema de colores consistente
- [ ] Tipografía Inter
- [ ] Espaciado uniforme
- [ ] Sombras sutiles
- [ ] Transiciones suaves
- [ ] Iconos/emojis consistentes
- [ ] Loading states
- [ ] Estados vacíos (carrito, pedidos)
- [ ] Mensajes de error/éxito
- [ ] Responsive en mobile

¡Sigue esta guía para mantener un diseño consistente y profesional estilo LlamaFood!
