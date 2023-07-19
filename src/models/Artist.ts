import { Schema, Document, model } from "mongoose";

interface IArtist extends Document {
  name: string;
  age: number;
}

const ArtistSchema = new Schema<IArtist>({
  name: { type: String, required: true },
  age: { type: Number, required: true },
});

const Artist = model<IArtist>("Artist", ArtistSchema);
// module.exports = Artist;
export default Artist;
