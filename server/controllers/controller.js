// import { readJSON, jsontoDzn } from "../utils/utils.js";
// import fs from "fs";
// import path from "path";
// import { exec } from "child_process";
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const basic = readJSON("../data/basic.json");
// const extended = readJSON("../data/extended.json");

// const modelPath = path.join(__dirname, '../models/PlanTeleBasico.mzn');
// const dataPath = path.join(__dirname, '../models/DatosBasico.dzn');

// export class WorkPlanController {
//   static async getAllBasic(req, res) {
//     res.json(basic);
//   }
  
//   static async getAllExtended(req, res) {
//     res.json(extended);
//   }

//   static async runBasicAlgorithm(req, res) {
//     const data = req.body;
    
//     // Convert data to DZN format and save to file
//     const dznContent = jsontoDzn(data);
//     fs.writeFileSync(dataPath, dznContent);

//     try {
//       // Run MiniZinc model with a timeout of 10 seconds
//       const { stdout } = await new Promise((resolve, reject) => {
//         exec(`minizinc --solver Gecode ${modelPath} ${dataPath}`, { timeout: 10000 }, (error, stdout, stderr) => {
//           if (error) {
//             if (error.killed) {
//               reject(new Error('Execution time exceeded 10 seconds'));
//             } else {
//               reject(error);
//             }
//           } else {
//             resolve({ stdout, stderr });
//           }
//         });
//       });

//       // Process the output and convert to JSON if needed
//       // const result = processOutput(stdout);
      
//       res.json({ message: 'Success', output: stdout });
//     } catch (error) {
//       res.status(500).json({ message: 'Error running model', error: error.message });
//     }
//   }

//   static async runExtendedAlgorithm(req, res) {
//     const data = req.body;
    
//     console.log(data);
//     // Additional processing for extended algorithm...

//     res.send('Procesando...');
//   }
// }



import { readJSON, jsontoDzn, exec, dzntoJson } from "../utils/utils.js";
import fs from "fs";


const basic = readJSON("../data/basic.json");
const extended = readJSON("../data/extended.json");

const modelPath = '../server/models/PlanTeleBasico.mzn';
const dataPath = '../server/models/Datosbasico.dzn';

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
    dzntoJson(stdout.stdout,data);

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
