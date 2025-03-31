import { Schema, model, models } from "mongoose"

const CardSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, default: "Untitled Card" },
  design: { type: Object }, // GSAP animation config stored as JSON
  message: String,
  template: String,
  aiGenerated: Boolean,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

export const Card = models.Card || model("Card", CardSchema)

