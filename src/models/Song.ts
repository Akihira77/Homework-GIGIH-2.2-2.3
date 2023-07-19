import { Schema, Document, model } from "mongoose";
import Artist from "./Artist.js";

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

const Song = model<ISong>("Song", SongSchema);
export default Song;
