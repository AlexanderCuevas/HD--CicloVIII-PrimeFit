import promptSync from 'prompt-sync';
import { crearPlato, listarPlatos, buscarPlatoPorId } from './Services/catalogoService.js';
import { crearPedido, agregarItem, listarPedidos } from './Services/pedidoService.js';
import { getStock, setStock, disminuirStock } from './Services/inventarioService.js';

const prompt = promptSync({ sigint: true });

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

function inputNumber(promptText, allowZero = false) {
  const raw = prompt(promptText);
  const n = Number(raw);
  if (raw.trim() === '') return null;
  if (Number.isNaN(n) || (!allowZero && n <= 0)) {
    throw new Error('Valor numérico inválido');
  }
  return n;
}

function menu() {
  while (true) {
    console.clear();
    console.log('--- PRIMEFIT (Consola) ---');
    console.log('1) Registrar plato');
    console.log('2) Listar platos');
    console.log('3) Crear pedido');
    console.log('4) Ver pedidos');
    console.log('5) Ajustar stock (opcional)');
    console.log('0) Salir');
    const opt = prompt('> ').trim();

    try {
      if (opt === '1') {
        console.log('\nRegistrar nuevo plato');
        const nombre = prompt('Nombre: ').trim();
        const kcal = inputNumber('Kcal: ', true) ?? 0;
        const prote = inputNumber('Proteína (g): ', true) ?? 0;
        const carb = inputNumber('Carbohidratos (g): ', true) ?? 0;
        const grasa = inputNumber('Grasa (g): ', true) ?? 0;
        const precio = inputNumber('Precio: ');
        const plato = crearPlato({ nombre, kcal, prote, carb, grasa, precio });
        // opcional: pedir stock inicial
        const stockInit = prompt('Stock inicial (enter para 0): ').trim();
        if (stockInit !== '') setStock(plato.id, Number(stockInit) || 0);
        console.log(`Plato registrado con id ${plato.id}`);
        pausa();

      } else if (opt === '2') {
        mostrarPlatos();
        pausa();

      } else if (opt === '3') {
        console.log('\nCrear pedido');
        const cliente = prompt('Nombre cliente: ').trim() || 'Cliente';
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
          const cantidad = Number(prompt('Cantidad: ').trim());
          if (Number.isNaN(cantidad) || cantidad <= 0) {
            console.log('Cantidad inválida.');
            continue;
          }
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
        mostrarPlatos();
        const pid = prompt('ID plato para ajustar stock: ').trim();
        if (!pid) { console.log('Cancelado'); pausa(); continue; }
        const current = getStock(pid);
        console.log('Stock actual:', current);
        const nuevo = Number(prompt('Nuevo stock: ').trim());
        if (Number.isNaN(nuevo) || nuevo < 0) { console.log('Valor inválido'); pausa(); continue; }
        setStock(pid, nuevo);
        console.log('Stock actualizado.');
        pausa();

      } else if (opt === '0') {
        console.log('Saliendo...');
        break;

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

menu();