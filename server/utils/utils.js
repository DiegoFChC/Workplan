import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)

export const readJSON = (path) => require(path)
const util = require('util');
export const exec = util.promisify(require("child_process").exec);
// Función para convertir json a dzn
export function jsontoDzn(data){
  let dznContent= `ACTORES={${data.actores.join(', ')}};\n`;

  dznContent+= `Escenas= [|`; 
  data.participacion.forEach((escena, index) => {
    dznContent += `  ${escena.join(', ')}`;
    if (index < data.participacion.length - 1) {
      dznContent += `, ${data.precioHora[index]}|\n`;
    }
  });
  dznContent += `, ${data.precioHora[data.numeroActores-1]}|];\n`;

  dznContent += `Duracion = [${data.duracionEscenas.join(', ')}];\n`;

  return dznContent;
}

// Funcion para convertir resultado a json