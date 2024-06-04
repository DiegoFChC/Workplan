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
    
    const dznContent = jsontoDzn(data)
    fs.writeFileSync("./models/DatosBasico.dzn", dznContent);

    // const solver = "OR Tools CP-SAT"
    const solver = "Gecode"

    const stdout = await exec(`minizinc --solver ${solver} ${modelPath} ${dataPath} --time-limit 30000`);

    const json = dzntoJson(stdout.stdout,data);

    res.json(json)
  }

  static async runExtendedAlgorithm(req, res) {
    const data = req.body
    const dznContent = jsontoDznEx(data)
    fs.writeFileSync("./models/DatosExtendido.dzn", dznContent);

    const stdout = await exec(`minizinc --solver Gecode ${modelExPath} ${dataExPath} --time-limit 30000`);

    const json = dzntoJsonEx(stdout.stdout,data);

    res.json(json)
  }
}
