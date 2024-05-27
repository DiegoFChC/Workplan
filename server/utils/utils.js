import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)

export const readJSON = (path) => require(path)

// Función para convertir json a dzn

// Funcion para convertir resultado a json