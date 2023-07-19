# Model

### User

```TS
interface IUser extends Document {
  name: string;
  age: number;
  songs: Schema.Types.ObjectId[];
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  songs: [{ type: Schema.Types.ObjectId, ref: Song }],
});
```

### Song

```TS
interface ISong extends Document {
  title: string;
  artists: Schema.Types.ObjectId[];
  url: string;
  countPlayed: number;
}

const SongSchema = new Schema<ISong>({
  title: { type: String, required: true },
  artists: [{ type: Schema.Types.ObjectId, ref: Artist }],
  url: { type: String, required: true },
  countPlayed: { type: Number },
});
```

### Artist

```TS
interface IArtist extends Document {
  name: string;
  age: number;
}

const ArtistSchema = new Schema<IArtist>({
  name: { type: String, required: true },
  age: { type: Number, required: true },
});
```

### Playlist

```TS
interface IPlaylist extends Document {
  namePlaylist: string;
  userId: Schema.Types.ObjectId;
  songs: Schema.Types.ObjectId[];
}

const PlaylistSchema = new Schema<IPlaylist>({
  namePlaylist: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, required: true },
  songs: [{ type: Schema.Types.ObjectId, ref: Song }],
});
```

# Endpoints & Controller

### Create Playlist

```
router.post("/create/:id", PlaylistController.Create());
```

```TS
const Create = () => async (req: Request, res: Response) => {
  const namePlaylist = req.body.namePlaylist;

  const userPlaylist = await Playlist.findOne({ namePlaylist: namePlaylist });

  if (userPlaylist != null) {
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
```

### Get Playlist

```TS
router.get("/get-playlist/:id", PlaylistController.GetPlaylist("songs"));
```

```TS
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
```

### Play Song or Get Song From Playlist

```TS
router.get("/get-song-from-playlist/:id",
  PlaylistController.GetSongFromPlaylist("artists")
);
```

```TS
const GetSongFromPlaylist =
  (populate: string) => async (req: Request, res: Response) => {
    const playlistId = req.params.id;

    try {
      const playlist = await Playlist.findById(playlistId);
      if (playlist == null) {
        return res.status(404).json({ message: "playlist is not found" });
      }

      const songIdFromPlaylist = playlist.songs.find((song) => {
        return song.toString() == req.query.songId!;
      });
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
```

### Get List of Songs Sorted by Count Played

```TS
router.get("/get-sorted-songs", SongController.GetListOfSongBeSorted());
```

```TS
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
```
