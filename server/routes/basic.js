import { Router } from "express";
import { WorkPlanController } from "../controllers/controller.js";

export const workPlanRouterBasic = Router();

// Basic routes
workPlanRouterBasic.get("/", WorkPlanController.getAllBasic);
workPlanRouterBasic.post("/", WorkPlanController.runBasicAlgorithm);

// Extended routes