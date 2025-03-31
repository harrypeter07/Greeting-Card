import { z } from "zod";

export const cardSchema = z.object({
	title: z.string().min(1, "Title is required").max(100, "Title is too long"),
	content: z
		.string()
		.min(1, "Content is required")
		.max(1000, "Content is too long"),
	imageUrl: z.string().url("Invalid image URL").optional(),
	category: z.enum([
		"birthday",
		"anniversary",
		"graduation",
		"wedding",
		"other",
	]),
	isPublic: z.boolean().default(false),
	recipientName: z
		.string()
		.min(1, "Recipient name is required")
		.max(100, "Recipient name is too long"),
	recipientEmail: z.string().email("Invalid email address").optional(),
	scheduledDate: z.string().datetime().optional(),
	theme: z.string().min(1, "Theme is required").max(50, "Theme is too long"),
	font: z.string().min(1, "Font is required").max(50, "Font is too long"),
	colors: z
		.array(z.string())
		.min(1, "At least one color is required")
		.max(5, "Too many colors"),
	userId: z.string().min(1, "User ID is required"),
});

export type CardSchema = z.infer<typeof cardSchema>;
