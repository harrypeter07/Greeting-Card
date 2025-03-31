import mongoose from "mongoose";

const CardSchema = new mongoose.Schema(
	{
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		message: {
			type: String,
			required: true,
		},
		template: {
			type: String,
			required: true,
		},
		design: {
			type: mongoose.Schema.Types.Mixed,
			required: true,
		},
		aiGenerated: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

export const Card = mongoose.models.Card || mongoose.model("Card", CardSchema);
