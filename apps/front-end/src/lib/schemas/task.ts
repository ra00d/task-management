import { z } from "zod";
import { userSchema } from "./user";
import { projectSchema } from "./project";

export const taskSchema = z.object({
	id: z.coerce.number().optional().nullable(),

	title: z.string().min(1).trim(),

	description: z.string().min(1).trim(),

	status: z.enum(["completed", "overDue", "pending"]),

	dueDate: z.coerce.date(),
	user: z.optional(userSchema).nullable(),
	project: z.optional(projectSchema).nullable(),
	userId: z.coerce.number({ required_error: "user is required" }),
	projectId: z.coerce.number({ required_error: "project is required" }),
});

export type TTask = z.infer<typeof taskSchema>;
