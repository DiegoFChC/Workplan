import { Router } from "express";
import { WorkPlanController } from "../controllers/controller.js";

export const workPlanRouterExtended = Router();

// Basic routes
workPlanRouterExtended.get("/", WorkPlanController.getAllExtended);
workPlanRouterExtended.post("/", WorkPlanController.runExtendedAlgorithm);