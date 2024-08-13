import { z } from "zod";

export const projectSchema = z.object({
	id: z.coerce.number().optional(),
	name: z.string().trim().min(2),
	description: z.string().min(2).trim(),
	userId: z.number().or(z.string()),
});
export type TProject = z.infer<typeof projectSchema>;
