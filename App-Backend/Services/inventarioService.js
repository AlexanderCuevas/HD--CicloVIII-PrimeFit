// inventario simple: mapa platoId -> cantidad disponible
const stock = new Map();

export const setStock = (platoId, cantidad) => {
  stock.set(platoId, Number(cantidad) || 0);
};

export const getStock = (platoId) => stock.get(platoId) ?? 0;

export const disminuirStock = (platoId, cantidad) => {
  const actual = getStock(platoId);
  if (cantidad > actual) throw new Error('stock insuficiente');
  stock.set(platoId, actual - cantidad);
  return stock.get(platoId);
};