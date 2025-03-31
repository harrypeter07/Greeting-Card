import { Schema, model, models } from "mongoose"

const UserSchema = new Schema({
  googleId: { type: String, unique: true },
  name: String,
  email: String,
  cards: [{ type: Schema.Types.ObjectId, ref: "Card" }],
})

export const User = models.User || model("User", UserSchema)

