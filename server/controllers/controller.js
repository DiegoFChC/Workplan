import { readJSON } from "../utils/utils.js";

const basic = readJSON("../data/basic.json");
const extended = readJSON("../data/extended.json");

export class WorkPlanController {
  static async getAllBasic(req, res) {
    res.json(basic)
  }

  static async runBasicAlgorithm(req, res) {
    const data = req.body
    
    console.log(data)

    res.send('Procesando...')
  }
}
