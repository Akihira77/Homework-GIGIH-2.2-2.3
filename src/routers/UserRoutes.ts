import { Router } from "express";
import IRouter from "./IRouter.js";

// Controllers
import UserController from "../controllers/UserController.js";

class UserRoutes implements IRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public routes(): void {
    this.router.get("/", UserController.GetAll);
    this.router.get("/:id", UserController.Get);
    this.router.post("/", UserController.Create);
    this.router.put("/:id", UserController.Update);
    this.router.delete("/:id", UserController.Delete);
  }
}

export default new UserRoutes().router;
