import { Schema, Document, model } from "mongoose";
import Song from "./Song.js";

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

const User = model<IUser>("User", UserSchema);
// module.exports = User;
export default User;
