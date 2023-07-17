import { Router } from "express";

// Controllers
import BaseController from "../controllers/BaseController.js";
import User from "../models/User.js";

const router = Router();

router.get("/get-all", BaseController.GetAll(User, "songs"));
router.get("/get-by-id/:id", BaseController.GetById(User, "songs"));
router.post("/create", BaseController.Create(User));
router.delete("/delete/:id", BaseController.Delete(User));

export default router;
