import express, { Application } from "express";
import morgan from "morgan";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import UserRoutes from "./routers/UserRoutes.js";
import db from "./data/db.js";
import SongRoutes from "./routers/SongRoutes.js";
import PlaylistRoutes from "./routers/PlaylistRoutes.js";

const app: Application = express();
const port: Number = 3000;

// Db Connect
db();

// Middleware
// body parser
app.use(express.urlencoded({ extended: false }));

// pass JSON
app.use(express.json());

// logging
app.use(morgan("dev"));

// compression response
app.use(compression());

// helmet
app.use(helmet());

// cors
app.use(cors());

// Routes
app.use("/api/v1/users", UserRoutes);
app.use("/api/v1/songs", SongRoutes);
app.use("/api/v1/playlists", PlaylistRoutes);

app.listen(port, () => {
  console.log(`server is running on port ${3000}`);
});
