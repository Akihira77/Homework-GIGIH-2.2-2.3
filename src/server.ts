import express, { Application } from "express";
import morgan from "morgan";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import UserRoutes from "./routers/UserRoutes.js";

class App {
  public app: Application;
  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
  }

  protected routes(): void {
    this.app.use("/api/v1/users", UserRoutes);
  }

  protected middleware(): void {
    // body parser
    this.app.use(express.urlencoded({ extended: false }));

    // pass JSON
    this.app.use(express.json());

    // logging
    this.app.use(morgan("dev"));

    // compression response
    this.app.use(compression());

    // helmet
    this.app.use(helmet());

    // cors
    this.app.use(cors());
  }
}

const port: Number = 3000;
const app = new App().app;

app.listen(port, () => {
  console.log(`server is running on port ${3000}`);
});
