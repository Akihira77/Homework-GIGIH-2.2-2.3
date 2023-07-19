import { Request, Response } from "express";
import Song from "../models/Song.js";

const GetListOfSongBeSorted = () => async (req: Request, res: Response) => {
  try {
    const songs = await Song.find().sort({ countPlayed: "desc" });
    console.log(songs);
    return res.status(200).json({ songs });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

const GetSongById =
  (populate: string) => async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const song = await Song.findById(id).populate({ path: populate });
      if (song == null) {
        return res.status(404).json({ message: "song is not found" });
      }

      song.countPlayed = song.countPlayed + 1;
      await song.save();

      return res.status(200).json({ song });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };

// const Create = () => (req: Request, res: Response) => {
//   const artistsId = req.body.artists;

//   }

export default { GetListOfSongBeSorted, GetSongById };
