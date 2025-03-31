import { z } from "zod";

export const cardSchema = z.object({
	title: z.string().min(1, "Title is required").max(100, "Title is too long"),
	message: z
		.string()
		.min(1, "Message is required")
		.max(1000, "Message is too long"),
	template: z.string().min(1, "Template is required"),
	design: z
		.object({
			colors: z.array(z.string()).optional(),
			font: z.string().optional(),
			layout: z.string().optional(),
			background: z.string().optional(),
		})
		.required(),
	aiGenerated: z.boolean().default(false),
	imageUrl: z.string().url("Invalid image URL").optional(),
	category: z
		.enum(["eid", "birthday", "anniversary", "wedding", "other"])
		.default("eid"),
	isPublic: z.boolean().default(false),
	recipientName: z.string().optional(),
	recipientEmail: z.string().email("Invalid email").optional(),
	scheduledDate: z.date().optional(),
	theme: z.string().optional(),
	font: z.string().optional(),
	colors: z.array(z.string()).optional(),
	userId: z.string().optional(),
});

export type CardSchema = z.infer<typeof cardSchema>;
