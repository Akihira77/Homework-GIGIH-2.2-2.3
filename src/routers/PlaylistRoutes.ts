import { Router } from "express";

// Controllers
import BaseController from "../controllers/BaseController.js";
import PlaylistController from "../controllers/PlaylistController.js";
import Playlist from "../models/Playlist.js";

const router = Router();

router.get("/get-playlist/:id", PlaylistController.GetPlaylist("songs"));
router.get(
  "/get-song-from-playlist/:id",
  PlaylistController.GetSongFromPlaylist("artists")
);
router.post("/create/:id", PlaylistController.Create());
router.post("/add-to-playlist/:id", PlaylistController.AddSongToPlaylist());
router.delete("/delete/:id", BaseController.Delete(Playlist));

export default router;
