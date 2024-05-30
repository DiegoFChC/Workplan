import { readJSON, jsontoDzn, exec, dzntoJson, jsontoDznEx, dzntoJsonEx } from "../utils/utils.js";
import fs from "fs";


const basic = readJSON("../data/basic.json");
const extended = readJSON("../data/extended.json");

const modelPath = '../server/models/PlanTeleBasico.mzn';
const modelExPath = '../server/models/PlanTeleExtendido.mzn';
const dataPath = '../server/models/Datosbasico.dzn';
const dataExPath = '../server/models/DatosExtendido.dzn';

export class WorkPlanController {
  static async getAllBasic(req, res) {
    res.json(basic)
  }
  
  static async getAllExtended(req, res) {
    res.json(extended)
  }

  static async runBasicAlgorithm(req, res) {
    const data = req.body
    
    //console.log(data)
    // recibe listo
    // guarda en un dzn
    // - llama funcion para convertir a dzn
    const dznContent = jsontoDzn(data)
    fs.writeFileSync("./models/DatosBasico.dzn", dznContent);
    // - const dznContent = generateDZNContent(data);
    //   fs.writeFileSync("Datos.dzn", dznContent);


    // corre el mzn con el dzn
    const stdout = await exec(`minizinc --solver Gecode ${modelPath} ${dataPath} --time-limit 10000`);
    //console.log("duegio", stdout.stdout);

    // convierte el resultado del mzn a json
    // stdout lo convierte a json
    // retorna el json
    const json = dzntoJson(stdout.stdout,data);

    res.json(json)
  }

  static async runExtendedAlgorithm(req, res) {
    const data = req.body
    // recibe listo
    // guarda en un dzn
    // - llama funcion para convertir a dzn
    const dznContent = jsontoDznEx(data)
    fs.writeFileSync("./models/DatosExtendido.dzn", dznContent);
    // - const dznContent = generateDZNContent(data);
    //   fs.writeFileSync("Datos.dzn", dznContent);


    // corre el mzn con el dzn
    const stdout = await exec(`minizinc --solver Gecode ${modelExPath} ${dataExPath} --time-limit 10000`);
    // const { stdout } = await exec(`minizinc --solver COIN-BC PlanTeleBasico Datos.dzn`);


    // convierte el resultado del mzn a json
    // stdout lo convierte a json
    // retorna el json
    const json = dzntoJsonEx(stdout.stdout,data);

    res.json(json)
  }
}
