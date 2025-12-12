import bcrypt from 'bcryptjs';

// Verificar si el hash actual corresponde a "admin123"
const hashActual = '$2a$10$7ckTCXCqYIfVmlRoAfOabO1oVCJ1WCSD2ludX11SEnHwfJ8M5rSY6';
const password = 'admin123';

console.log('Verificando hash actual...');
bcrypt.compare(password, hashActual, (err, resultado) => {
  if (err) {
    console.error('Error al verificar:', err);
    return;
  }
  console.log(`Hash actual ${resultado ? 'ES CORRECTO' : 'NO ES CORRECTO'} para "admin123"`);
  
  // Generar nuevo hash
  bcrypt.hash(password, 10, (err, nuevoHash) => {
    if (err) {
      console.error('Error al generar hash:', err);
      return;
    }
    console.log('\nNuevo hash generado para "admin123":');
    console.log(nuevoHash);
  });
});
