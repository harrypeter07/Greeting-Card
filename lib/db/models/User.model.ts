import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
	{
		googleId: {
			type: String,
			required: true,
			unique: true,
		},
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		cards: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Card",
			},
		],
	},
	{
		timestamps: true,
	}
);

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
