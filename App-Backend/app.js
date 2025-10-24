import promptSync from 'prompt-sync';
import { crearPlato, listarPlatos, buscarPlatoPorId } from './Services/catalogoService.js';
import { crearPedido, agregarItem, listarPedidos } from './Services/pedidoService.js';
import { getStock, setStock, disminuirStock } from './Services/inventarioService.js';
import { autenticar, ensureDefaultUsers } from './Services/authService.js';

const prompt = promptSync({ sigint: true });

// Manejo de Ctrl+C para salir de forma amigable
process.on('SIGINT', () => {
  console.log('\n\nRecibido SIGINT (Ctrl+C). Saliendo...');
  process.exit(0);
});

// Helpers de entrada para mejorar experiencia
function readNonEmpty(promptText) {
  const raw = prompt(promptText).trim();
  return raw;
}

function inputNumber(promptText, allowZero = false) {
  // repite hasta que el usuario introduzca un número válido o deje vacío
  while (true) {
    const raw = prompt(promptText);
    if (raw === undefined) return null; // por si sigint true provoca undefined
    if (raw.trim() === '') return null;
    const n = Number(raw);
    if (Number.isNaN(n)) {
      console.log('Entrada inválida: ingrese un número.');
      continue;
    }
    if (!allowZero && n <= 0) {
      console.log('Valor inválido: ingrese un número mayor que 0.');
      continue;
    }
    return n;
  }
}

function promptYesNo(promptText) {
  while (true) {
    const r = prompt(promptText + ' (s/n): ').trim().toLowerCase();
    if (r === 's' || r === 'si' || r === 'y' || r === 'yes') return true;
    if (r === 'n' || r === 'no') return false;
    console.log('Respuesta inválida — escribe s (sí) o n (no).');
  }
}
function pausa() {
  prompt('\nPresiona ENTER para continuar...');
}

function mostrarPlatos() {
  const platos = listarPlatos();
  if (platos.length === 0) {
    console.log('No hay platos registrados.');
    return;
  }
  console.log('\nLista de platos:');
  platos.forEach(p => {
    const stock = getStock(p.id);
    console.log(`${p.id} | ${p.nombre} - $${p.precio.toFixed(2)} | kcal:${p.kcal} prote:${p.prote}g carb:${p.carb}g grasa:${p.grasa}g | stock:${stock}`);
  });
}

function menu() {
  while (true) {
    console.clear();
    // encabezado decorado
    console.log('=====================================');
    console.log('         PRIMEFIT (Consola)          ');
    console.log('=====================================');
    if (currentUser) console.log(`Usuario: ${currentUser.username} (${currentUser.role})`);
    console.log('1) Registrar plato');
    console.log('2) Listar platos');
    console.log('3) Crear pedido');
    console.log('4) Ver pedidos');
    console.log('5) Ajustar stock (opcional)');
    console.log('0) Salir');
    console.log("(Presiona 'h' para ayuda rápida, Ctrl+C para salir)");
  const opt = prompt('> ').trim();

    try {
      if (opt === '1') {
        if (!currentUser || currentUser.role !== 'admin') {
          console.log('Acceso denegado: se requiere rol admin para registrar platos.');
          pausa();
          continue;
        }
        console.log('\nRegistrar nuevo plato');
        const nombre = readNonEmpty('Nombre: ');
        const kcal = inputNumber('Kcal: ', true) ?? 0;
        const prote = inputNumber('Proteína (g): ', true) ?? 0;
        const carb = inputNumber('Carbohidratos (g): ', true) ?? 0;
        const grasa = inputNumber('Grasa (g): ', true) ?? 0;
        const precio = inputNumber('Precio: ');
        const plato = crearPlato({ nombre, kcal, prote, carb, grasa, precio });
        // opcional: pedir stock inicial
        const stockInitRaw = prompt('Stock inicial (enter para 0): ');
        const stockInit = (stockInitRaw && stockInitRaw.trim() !== '') ? Number(stockInitRaw) || 0 : 0;
        if (!Number.isNaN(stockInit)) setStock(plato.id, stockInit);
        console.log(`Plato registrado con id ${plato.id}`);
        pausa();

      } else if (opt === '2') {
        mostrarPlatos();
        pausa();

      } else if (opt === '3') {
        console.log('\nCrear pedido');
        const clienteRaw = prompt('Nombre cliente: ');
        const cliente = (clienteRaw && clienteRaw.trim() !== '') ? clienteRaw.trim() : 'Cliente';
        const pedido = crearPedido({ cliente });
        console.log(`Pedido creado: ${pedido.id}`);
        while (true) {
          mostrarPlatos();
          const pid = prompt('ID plato (enter para terminar): ').trim();
          if (!pid) break;
          const plato = buscarPlatoPorId(pid);
          if (!plato) {
            console.log('Plato no encontrado.');
            continue;
          }
          const cantidad = inputNumber('Cantidad: ');
          if (cantidad === null) { console.log('Cantidad inválida. Se cancela el agregado.'); continue; }
          // ver stock si existe
          const stockActual = getStock(plato.id);
          if (stockActual !== 0 && cantidad > stockActual) {
            console.log(`Stock insuficiente. Disponible: ${stockActual}`);
            continue;
          }
          agregarItem(pedido.id, plato, cantidad);
          if (stockActual !== 0) disminuirStock(plato.id, cantidad);
          console.log('Item agregado.');
        }
        console.log(`Totales pedido ${pedido.id}`);
        console.log('Precio total: $' + pedido.totalPrecio().toFixed(2));
        console.log('Macros totales:', pedido.totalMacros());
        pausa();

      } else if (opt === '4') {
        const pedidos = listarPedidos();
        if (pedidos.length === 0) {
          console.log('No hay pedidos registrados.');
        } else {
          pedidos.forEach(p => {
            console.log(`\nPedido ${p.id} - ${p.cliente} - $${p.totalPrecio().toFixed(2)} - fecha: ${p.fecha.toLocaleString()}`);
            p.items.forEach(it => {
              console.log(`  - ${it.plato.nombre} x${it.cantidad} = $${it.subtotalPrecio} | kcal:${it.subtotalMacros.kcal}`);
            });
          });
        }
        pausa();

      } else if (opt === '5') {
        if (!currentUser || currentUser.role !== 'admin') {
          console.log('Acceso denegado: se requiere rol admin para ajustar stock.');
          pausa();
          continue;
        }
        mostrarPlatos();
        const pid = prompt('ID plato para ajustar stock: ').trim();
        if (!pid) { console.log('Cancelado'); pausa(); continue; }
        const current = getStock(pid);
        console.log('Stock actual:', current);
        const nuevo = inputNumber('Nuevo stock: ', true);
        if (nuevo === null || nuevo < 0) { console.log('Valor inválido'); pausa(); continue; }
        setStock(pid, nuevo);
        console.log('Stock actualizado.');
        pausa();

      } else if (opt === '0') {
        if (promptYesNo('¿Estás seguro que quieres salir?')) {
          console.log('Saliendo...');
          break;
        } else {
          continue;
        }

      } else if (opt === 'h' || opt === '?' ) {
        console.log('\nAyuda rápida:');
        console.log('Introduce el número de la opción y presiona ENTER.');
        console.log("En algunos prompts puedes dejar vacío y presionar ENTER para aceptar el valor por defecto.");
        pausa();
      } else {
        console.log('Opción no válida.');
        pausa();
      }
    } catch (err) {
      console.log('Error:', err.message);
      pausa();
    }
  }
}

// Antes de iniciar, soportar --show-menu para solo imprimir el menú
function imprimirMenu() {
  console.log('=====================================');
  console.log('         PRIMEFIT (Consola)          ');
  console.log('=====================================');
  console.log('1) Registrar plato');
  console.log('2) Listar platos');
  console.log('3) Crear pedido');
  console.log('4) Ver pedidos');
  console.log('5) Ajustar stock (opcional)');
  console.log('0) Salir');
}

let currentUser = null;

if (process.argv.includes('--show-menu')) {
  imprimirMenu();
  process.exit(0);
}

// Inicializar usuarios por defecto si no existen
ensureDefaultUsers();

// Flujo de login antes de mostrar el menú
function loginFlow() {
  console.log('Inicia sesión para continuar.');
  for (let attempts = 0; attempts < 5; attempts++) {
    const username = prompt('Usuario: ').trim();
    const password = prompt('Password: ');
    const u = autenticar({ username, password });
    if (u) {
      currentUser = u;
      console.log(`Bienvenido ${u.username} (rol: ${u.role})`);
      return true;
    }
    console.log('Credenciales inválidas. Intenta nuevamente.');
  }
  console.log('Demasiados intentos. Saliendo.');
  process.exit(1);
}

loginFlow();

menu();
 