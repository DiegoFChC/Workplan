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
export function dzntoJson(input, data) {
  const keys = input.split('\n');
  //console.log("keys:",keys);
  const orden = keys[0].split(',').map(Number);
  //console.log("Orden:",orden);
  const duracion = keys[1].split(',').map(Number);
  //console.log("Duracion:",duracion);
  const costo = parseInt(keys[2]);
  //console.log("Costo:",costo);

  let participacion = []
  let count = 3;
  let numeroActoresIter = data.numeroActores;
  while (numeroActoresIter > 0) {
    let escenaArray = keys[count].split(',').map(Number);
    participacion.push(escenaArray);
    count = count + 1;
    numeroActoresIter--;
  }

  const json={
    "titulo": data.titulo,
    "numeroActores": data.numeroActores,
    "actores": data.actores,
    "numeroEscenas": data.numeroEscenas,
    "participacion": participacion,
    "precioHora": data.precioHora,
    "duracionEscenas": duracion,
    "ordenEscenas": orden,
    "costo": costo,
  }

  console.log("Json:",json)

  //console.log("Participacion:",participacion);
  return json
}