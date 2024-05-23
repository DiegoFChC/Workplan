import express, { json } from "express";
import { corsMiddleware } from "./middlewares/cors.js";
import { workPlanRouterBasic } from "./routes/basic.js";

const app = express();
app.use(json());
app.use(corsMiddleware());
app.disable("x-powered-by");

app.use('/basic', workPlanRouterBasic)

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});
