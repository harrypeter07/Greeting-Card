import { z } from "zod";

export const cardSchema = z.object({
	title: z.string().min(1, "Title is required"),
	description: z.string().min(1, "Description is required"),
	imageUrl: z.string().min(1, "Image URL is required"),
	animation: z.string().min(1, "Animation is required"),
	likes: z.number().default(0),
	likedBy: z.array(z.string()).default([]),
	userId: z.string(),
	createdAt: z.date().default(() => new Date()),
	updatedAt: z.date().default(() => new Date()),
});

export type Card = z.infer<typeof cardSchema>;

export const animations = [
	{
		id: "fade",
		name: "Fade In",
		description: "Smooth fade in animation",
	},
	{
		id: "slide",
		name: "Slide In",
		description: "Slide in from the side",
	},
	{
		id: "bounce",
		name: "Bounce",
		description: "Bouncy entrance animation",
	},
	{
		id: "zoom",
		name: "Zoom In",
		description: "Zoom in from center",
	},
	{
		id: "flip",
		name: "Flip",
		description: "3D flip animation",
	},
	{
		id: "rotate",
		name: "Rotate",
		description: "Rotating entrance",
	},
] as const;
