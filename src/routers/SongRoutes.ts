import { Router } from "express";

// Controllers
import BaseController from "../controllers/BaseController.js";
import Song from "../models/Song.js";
import PlaylistController from "../controllers/PlaylistController.js";
import SongController from "../controllers/SongController.js";

const router = Router();

router.get("/get-all", BaseController.GetAll(Song, "artists"));
router.get("/get-playlist/:name", PlaylistController.GetPlaylist("songs"));
router.get("/get-by-id/:id", SongController.GetSongById("artists"));
router.get("/get-sorted-songs", SongController.GetListOfSongBeSorted());
router.post("/create", BaseController.Create(Song));
router.delete("/delete/:id", BaseController.Delete(Song));

export default router;
