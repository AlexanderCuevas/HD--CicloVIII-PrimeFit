# PrimeFIT - Módulo Backend (Consola)

Este directorio contiene un módulo en Node.js (ESM) que simula, por consola, las funcionalidades básicas de un sistema de pedidos y catálogo de platos para el proyecto PrimeFIT.

## Resumen

Funcionalidades principales:
- Registrar platos con macros (kcal, proteína, carbohidratos, grasa) y precio.
- Listar platos registrados.
- Crear pedidos seleccionando platos y cantidades.
- Calcular totales de pedido (precio y macros agregadas).
- Manejar un inventario simple (stock por plato).
- Persistencia ligera de platos en `data/platos.json` (persisten entre ejecuciones).

El sistema está pensado como una simulación en memoria con persistencia en archivos JSON para facilitar pruebas sin base de datos.

## Tecnologías y dependencias

- Runtime: Node.js (LTS) - JavaScript (ESM - `"type": "module"` en `package.json`).
- Dependencias principales:
  - `prompt-sync` - para entrada por consola (sin promesas, simple y directa).
- Dependencias de desarrollo:
  - `nodemon` - recarga automática durante desarrollo (opcional).

Ningún framework web está incluido en este avance (no hay Express). La estructura está preparada para migrar a una API REST en el siguiente avance.

## Estructura de archivos (Importante)

```
App-Backend/
  app.js                      # Menú principal (consola)
  package.json
  data/
    platos.json               # Platos de ejemplo (persistencia)
  Model/
    Plato.js                  # Clase Plato (id, nombre, kcal, prote, carb, grasa, precio)
    ItemPedido.js             # Item de pedido (plato, cantidad, subtotales)
    Pedido.js                 # Pedido (id, cliente, items[], métodos totales)
  Services/
    catalogoService.js       # CRUD en memoria + carga/guarda en data/platos.json
    pedidoService.js         # Crear pedidos, agregar items, listar pedidos
    inventarioService.js     # Stock simple (map platoId -> cantidad)
  Scripts/
    testCatalogo.js          # Script de prueba rápido
  README.md
```

## Descripción de clases y responsabilidades

- `Model/Plato.js`
  - Representa un plato.
  - Propiedades: `id`, `nombre`, `kcal`, `prote`, `carb`, `grasa`, `precio`.
  - Validaciones básicas en el constructor (nombre requerido, precio numérico).

- `Model/ItemPedido.js`
  - Un elemento de pedido que referencia un `Plato` y una `cantidad`.
  - Métodos/propiedades calculadas: `subtotalPrecio` y `subtotalMacros` (kcal/prote/carb/grasa multiplicados por cantidad).

- `Model/Pedido.js`
  - Representa un pedido con `id`, `cliente`, `items` y `fecha`.
  - Métodos para calcular `totalPrecio()` y `totalMacros()` agregando los subtotales de los items.

## Servicios

- `Services/catalogoService.js`
  - Almacenamiento en memoria para los platos.
  - Al iniciar, carga `data/platos.json` si existe.
  - `crearPlato(data)`: crea un plato, asigna un id secuencial y guarda en el JSON.
  - `listarPlatos()`: devuelve el listado actual en memoria.
  - `buscarPlatoPorId(id)`: busca por id (comparación robusta string/number).
  - `_resetCatalogo()`: helper para pruebas (reinicia en memoria y guarda el archivo).

- `Services/pedidoService.js`
  - Mantiene pedidos en memoria.
  - `crearPedido({cliente})`: crea un pedido con id secuencial.
  - `agregarItem(pedidoId, plato, cantidad)`: agrega items (usa `ItemPedido`).
  - `listarPedidos()`, `buscarPedido(id)`.
  - Nota: los pedidos no se persisten a disco en este avance (queda como mejora opcional).

- `Services/inventarioService.js`
  - Implementa un `Map` platoId -> cantidad disponible.
  - `setStock(platoId, cantidad)`, `getStock(platoId)`, `disminuirStock(platoId, cantidad)`.
  - Convención: stock `0` significa "sin control de stock" (ilimitado) para facilitar pruebas.

## app.js - Menú de consola

`app.js` orquesta la interacción por consola usando `prompt-sync`. Opciones principales:
- Registrar plato: pide nombre, macros, precio y stock inicial (opcional).
- Listar platos: muestra todos los platos con su stock.
- Crear pedido: crea pedido, permite añadir items por ID y cantidad; valida stock y muestra totales al terminar.
- Ver pedidos: lista pedidos del día con detalles y totales.
- Ajustar stock: modificar stock de un plato existente.

Mensajes y validaciones están en español.

## Cómo instalar y ejecutar

1. Ir al directorio del backend:
```pwsh
cd App-Backend
```
2. Instalar dependencias (solo la primera vez):
```pwsh
npm install
```
3. Ejecutar la app en consola:
```pwsh
node .\app.js
```

### Mostrar solo el menú (modo no interactivo)

Si quieres imprimir únicamente la lista de opciones en la consola (útil para scripts o CI), hay un modo no interactivo:

```pwsh
# Usando node directamente
node .\app.js --show-menu

# o usando el script npm
npm run show-menu
```

## Autenticación y roles

Se añadió un sistema de autenticación simple con roles (`admin` y `user`). Al iniciar la aplicación en modo interactivo se solicita login antes de mostrar el menú. El archivo de usuarios se encuentra en `data/users.json`.

- Usuarios por defecto: si `data/users.json` está vacío, el servicio crea automáticamente dos usuarios de prueba:
  - `admin` / `admin`  (rol: `admin`)
  - `user` / `user`    (rol: `user`)

- Roles y permisos:
  - `admin`: puede registrar platos y ajustar stock (opciones 1 y 5).
  - `user`: puede listar platos, crear pedidos y ver pedidos.

- Hashing de contraseñas: el servicio intentará usar `bcryptjs` si está instalado. Si no, utiliza un fallback seguro basado en `crypto.pbkdf2Sync` para que la autenticación funcione sin pasos extra.

### Crear usuarios

Por ahora hay dos formas de crear usuarios:

1) Manual — editar `App-Backend/data/users.json` directamente con objetos que tengan `username`, `passwordHash` y `role` (no recomendado sin hashing).

2) Programático — ejecutar un pequeño script Node que use el servicio `authService`. Ejemplo (ejecutar desde `App-Backend`):

```pwsh
node -e "import('./Services/authService.js').then(s=>s.crearUsuario({ username: 'miadmin', password: 'secreto', role: 'admin'})).then(console.log).catch(e=>console.error(e.message))"
```

Nota: el snippet anterior usa dynamic import y crea el usuario con el password hasheado correctamente.

## Scripts disponibles (package.json)

- `npm start` — Ejecuta `node app.js` (modo interactivo: pide login y muestra menú).
- `npm run dev` — Ejecuta `nodemon index.js` (si lo configuras).
- `npm run test:catalogo` — Ejecuta `node Scripts/testCatalogo.js` (script de prueba que crea un plato y lista).
- `npm run show-menu` — Ejecuta `node app.js --show-menu` (imprime solo la lista de opciones y sale).

## Scripts de prueba útiles

- `Scripts/testCatalogo.js` — script que crea un plato de prueba y muestra la lista (útil para pruebas rápidas).
- `Scripts/testAuth.js` — script que verifica la existencia de usuarios por defecto y prueba autenticaciones (`admin/admin`, `user/user`). Ejecuta:

```pwsh
node Scripts/testAuth.js
```

## Dependencias y notas de seguridad

- `bcryptjs` está listado como dependencia opcional. Si deseas usar `bcryptjs` (recomendado en producción) instala:

```pwsh
npm install bcryptjs
```

- Si no instalas `bcryptjs`, la aplicación seguirá funcionando usando el fallback con `crypto` (pbkdf2). Para producción, instala `bcryptjs` o usa una estrategia de gestión de secretos más robusta.

## Flujo rápido para probar (recomendado)

1. Instalar dependencias (si no se han instalado):

```pwsh
cd App-Backend
npm install
```

2. Ejecutar test de autenticación:

```pwsh
node Scripts/testAuth.js
```

3. Iniciar la app e iniciar sesión con el usuario admin:

```pwsh
node app.js
# Usuario: admin
# Password: admin
```

4. Probar acciones (1 = registrar plato, 2 = listar, 3 = crear pedido, 4 = ver pedidos, 5 = ajustar stock).

## Notas finales
Estas mejoras agregan autenticación y control de roles sin añadir infra compleja. Si quieres que añada un comando CLI para crear usuarios (`npm run user:add`) o un endpoint REST protegido con JWT, puedo implementarlo a continuación.

### Mostrar solo el menú (modo no interactivo)

Si quieres imprimir únicamente la lista de opciones en la consola (útil para scripts o CI), hay un modo no interactivo:

```pwsh
# Usando node directamente
node .\app.js --show-menu

# o usando el script npm
npm run show-menu
```

Este comando muestra el encabezado y la lista de opciones y sale inmediatamente, sin requerir entrada del usuario.
4. Ejecutar el script de prueba del catálogo:
```pwsh
npm run test:catalogo
# o
node .\Scripts\testCatalogo.js
```

## Pruebas sugeridas (manuales)

- Listar platos ya cargados (opción 2) - verificar que aparecen los del `data/platos.json`.
- Registrar un nuevo plato (opción 1) - verificar que el nuevo plato se guarda en `data/platos.json` y recibe ID secuencial.
- Crear un pedido (opción 3): seleccionar varios platos, ingresar cantidades y verificar el total de precio y macros.
- Verificar control de stock: registrar un plato con stock limitado (ej. 5), intentar pedir más y ver el mensaje "stock insuficiente".
- Ajustar stock (opción 5) para probar actualizaciones en caliente.

## Consideraciones y mejoras posibles

- Persistir pedidos en disco (JSON) o usar una DB ligera (SQLite) para mantener pedidos entre reinicios.
- Migrar la lógica de `Services/*` a una API REST con Express y exponer endpoints para `platos` y `pedidos`.
- Añadir pruebas automatizadas (Jest) para modelos y servicios.
- Mejorar validaciones con esquemas (Joi) y manejo de errores consistente.

## Evidencias Git y entrega

Sugerencia de flujo Git para evidencias:
1. Crear ramas por feature:
```pwsh
git checkout -b feature/catalogo
git checkout -b feature/pedidos
git checkout -b feature/inventario
```
2. Commits con mensajes claros por cada cambio (ej.: `(catalogo): persistencia en data/platos.json`).
3. Mostrar capturas de:
  - `git branch --all`
  - `git log --oneline --graph --decorate --all`
  - `git show <commit>` para un commit importante
4. Crear Pull Requests en la plataforma remota y cerrarlos (merge) o, si se trabaja local, documentar en `EVIDENCIAS.md` los comandos y salidas de `git log`.

## Contacto / Notas finales

Este módulo está pensado como una base para el Avance 2 del curso. Si quieres, puedo:
- Commitear los cambios y crear una rama `feature/catalogo-data` con el nuevo `platos.json`.
- Añadir persistencia para pedidos.
- Preparar la migración a Express (estructura de controllers y rutas).


-- Fin del README --
