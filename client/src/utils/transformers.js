export function rtfToTxt(rtf) {
  var basicRtfPattern = /\{\*?\\[^{}]+;}|[{}]|\\[A-Za-z]+\n?(?:-?\d+)?[ ]?/g;
  var newLineSlashesPattern = /\\\n/g;
  var ctrlCharPattern = /\n\\f[0-9]\s/g;

  //Remove RTF Formatting, replace RTF new lines with real line breaks, and remove whitespace
  return rtf
    .replace(ctrlCharPattern, "")
    .replace(basicRtfPattern, "")
    .replace(newLineSlashesPattern, "\n")
    .trim();
}

export function formatToJsonBasic(input) {
  const keys = input.split("\n").filter((line) => line !== "");
  //console.log("keys:",keys);
  let num_actores = parseInt(keys[0]);
  let num_actores_iter = num_actores;
  const num_escenas = parseInt(keys[2]);

  const actores = keys[1];

  let escenas = [];
  let precioHora = [];
  let escena = 3;
  while (num_actores_iter > 0) {
    let escenaArray = keys[escena].split(",").map(Number);
    precioHora.push(escenaArray.pop());
    escenas.push(escenaArray);
    escena = escena + 1;
    num_actores_iter--;
  }

  const duracion = keys[escena].split(",").map(Number);

  let ordenEscenas = [];

  for (let i = 0; i < num_escenas; i++) {
    ordenEscenas.push(i + 1);
  }

  return {
    titulo: "Desconocido",
    numeroActores: num_actores,
    actores: actores.split(","),
    numeroEscenas: num_escenas,
    participacion: escenas,
    precioHora: precioHora,
    duracionEscenas: duracion,
    ordenEscenas: ordenEscenas,
  };
}

export function formatToJsonExtended(input) {
  //console.log("input:",input);
  const lines = input.split("\n").filter((line) => line !== "");
  //console.log("keys:",lines);
  let num_actores = parseInt(lines[0]);
  let num_actores_iter = num_actores;
  const num_escenas = parseInt(lines[2]);

  const actores = lines[1];

  let escenas = [];
  let precioHora = [];
  let escenaIndex = 3;
  while (num_actores_iter > 0) {
    const escenaArray = lines[escenaIndex].split(",").map(Number);
    precioHora.push(escenaArray.pop());
    escenas.push(escenaArray);
    escenaIndex++;
    num_actores_iter--;
  }

  const duracion = lines[escenaIndex].split(",").map(Number);

  let ordenEscenas = [];

  for (let i = 0; i < num_escenas; i++) {
    ordenEscenas.push(i + 1);
  }

  // Nuevo: Agregar la disponibilidad de actores
  const disponibilidadActores = lines[escenaIndex + 1].split(",").map(Number);

  // Nuevo: Obtener el número de parejas
  const numeroParejas = parseInt(lines[escenaIndex + 2]);

  // Nuevo: Obtener las parejas
  const parejas = lines.slice(escenaIndex + 3).map((pair) => pair.split(","));

  return {
    titulo: "Desconocido",
    numeroActores: num_actores,
    actores: actores.split(","),
    numeroEscenas: num_escenas,
    participacion: escenas,
    precioHora: precioHora,
    duracionEscenas: duracion,
    ordenEscenas: ordenEscenas,
    disponibilidadActores: disponibilidadActores,
    numeroParejas: numeroParejas,
    parejas: parejas,
  };
}

// const { RTFJS } = require('rtf-parser');

// // Función para convertir un archivo RTF a texto plano
// const rtfToTxt = (rtf) => {
//   const parser = new RTFJS();
//   parser.parse(Buffer.from(rtf, 'binary'));
//   return parser.plainText;
// };

// // Función para formatear el texto plano a formato DZN
// const formatToDzn = (plainText) => {
//     // Dividir el texto en líneas
//     const lines = plainText.split('\n');

//     // Formatear cada línea según el formato DZN
//     const formattedLines = lines.map((line, index) => {
//       // Aquí puedes aplicar el formato específico que necesites
//       return `linea${index} = "${line}";`;
//     });

//     // Unir las líneas formateadas en un solo string
//     const formattedDzn = formattedLines.join('\n');

//     return formattedDzn;
//   };

// module.exports = { rtfToTxt, formatToDzn };
