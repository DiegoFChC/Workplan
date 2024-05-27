import { readJSON } from "../utils/utils.js";

const basic = readJSON("../data/basic.json");
const extended = readJSON("../data/extended.json");

export class WorkPlanController {
  static async getAllBasic(req, res) {
    res.json(basic)
  }
  
  static async getAllExtended(req, res) {
    res.json(extended)
  }

  static async runBasicAlgorithm(req, res) {
    const data = req.body
    
    console.log(data)
    // recibe listo
    // guarda en un dzn
    // - llama funcion para convertir a dzn
    // - const dznContent = generateDZNContent(data);
    //   fs.writeFileSync("Datos.dzn", dznContent);


    // corre el mzn con el dzn
    // const { stdout } = await exec(`minizinc --solver COIN-BC PlanTeleBasico Datos.dzn`);


    // convierte el resultado del mzn a json
    // stdout lo convierte a json

    // retorna el json

    res.send('Procesando...')
  }

  static async runExtendedAlgorithm(req, res) {
    const data = req.body
    
    console.log(data)
    // recibe listo
    // guarda en un dzn
    // - llama funcion para convertir a dzn
    // - const dznContent = generateDZNContent(data);
    //   fs.writeFileSync("Datos.dzn", dznContent);


    // corre el mzn con el dzn
    // const { stdout } = await exec(`minizinc --solver COIN-BC PlanTeleBasico Datos.dzn`);


    // convierte el resultado del mzn a json
    // stdout lo convierte a json

    // retorna el json

    res.send('Procesando...')
  }
}
