const fs = require('fs');
const path = require('path');

const baseDir = '.';

const consonantes = [
  'B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M',
  'N', 'Ñ', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z', 'CH', 'LL', 'RR'
];
consonantes.forEach((letra) => {
  const fileName = `${letra}practice.tsx`;
  const filePath = path.join(baseDir, fileName);

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '');
    console.log(`Archivo creado: ${fileName}`);
  } else {
    console.log(`Ya existe: ${fileName}`);
  }
});
