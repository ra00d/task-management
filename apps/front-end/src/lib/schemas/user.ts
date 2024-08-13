import { z } from "zod";

export const userSchema = z.object({
	id: z.coerce.number(),
	email: z.string().email(),
	name: z.string(),
	role: z.string(),
	active: z.coerce.boolean(),
	lastLogin: z.coerce.date(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),
});

export type TUser = z.infer<typeof userSchema>;
