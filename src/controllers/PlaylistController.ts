import { Request, Response } from "express";
import Playlist from "../models/Playlist.js";
import { Schema, Types } from "mongoose";
import Song from "../models/Song.js";
import User from "../models/User.js";

const Create = () => async (req: Request, res: Response) => {
  const namePlaylist = req.body.namePlaylist;

  console.log("name playlist " + namePlaylist);

  const userPlaylist = await Playlist.findOne({ namePlaylist: namePlaylist });

  console.log(userPlaylist);
  if (userPlaylist != null) {
    console.log("user playlist already exists");
    return res.status(400).json({ message: "user playlist already exists" });
  }

  const user = await User.findById(req.params.id);
  if (user == null) {
    return res.status(404).json({ message: "user is not exists" });
  }

  const doc = new Playlist({
    _id: new Types.ObjectId(),
    userId: user.id,
    namePlaylist: namePlaylist,
    songs: [],
  });

  return doc
    .save()
    .then((result: any) => res.status(201).json({ result }))
    .catch((error: any) => res.status(500).json({ error }));
};

const AddSongToPlaylist = () => async (req: Request, res: Response) => {
  const id = req.params.id;
  const songId = req.body.songId;

  try {
    const song = await Song.findById(songId);
    if (song == null) {
      console.log("song is not found");
      return res.status(404).json({ message: "song is not found" });
    }

    console.log("song " + song);

    const playlist = await Playlist.findById(id);
    if (playlist == null) {
      console.log("playlist is not found");
      return res.status(404).json({ message: "playlist is not found" });
    }

    console.log("playlist " + playlist);

    await playlist.updateOne({ $push: { songs: song } });

    return res
      .status(200)
      .json({ message: "adding song to your playlist is success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

const GetPlaylist = (populate: string) => (req: Request, res: Response) => {
  const id = req.params.id;
  console.log("Getting all documents " + id);

  Playlist.findById(id)
    .populate({ path: populate })
    .then((results) => {
      console.log(results);
      return res.status(200).json({ results });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ error });
    });
};

const GetSongFromPlaylist =
  (populate: string) => async (req: Request, res: Response) => {
    const playlistId = req.params.id;

    try {
      const playlist = await Playlist.findById(playlistId);
      // console.log(playlist);
      if (playlist == null) {
        return res.status(404).json({ message: "playlist is not found" });
      }

      const songIdFromPlaylist = playlist.songs.find((song) => {
        return song.toString() == req.query.songId!;
      });
      // console.log(songIdFromPlaylist);
      if (songIdFromPlaylist == null) {
        return res.status(404).json({
          message: `song ${songIdFromPlaylist} is not exists in your playlist`,
        });
      }

      const song = await Song.findById(songIdFromPlaylist).populate({
        path: populate,
      });
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

export default { GetPlaylist, Create, AddSongToPlaylist, GetSongFromPlaylist };
