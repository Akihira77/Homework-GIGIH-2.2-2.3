import { Document, Schema, model } from "mongoose";
import Song from "./Song.js";

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

const Playlist = model<IPlaylist>("Playlist", PlaylistSchema);

export default Playlist;
