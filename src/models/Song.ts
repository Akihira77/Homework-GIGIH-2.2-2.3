import { Schema, Document, model } from "mongoose";

interface ISong extends Document {
  title: string;
  artists: Schema.Types.ObjectId[];
  url: string;
}

const SongSchema = new Schema<ISong>({
  title: { type: String, required: true },
  artists: [{ type: Schema.Types.ObjectId, ref: "Artist" }],
  url: { type: String, required: true },
});

const Song = model<ISong>("Song", SongSchema);
export default Song;
