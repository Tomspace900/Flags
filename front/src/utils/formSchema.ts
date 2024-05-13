import { z } from 'zod';

export type RegisterFormSchema = z.infer<typeof registerFormSchema>;

export const usernameSchema = z
	.string()
	.min(3, { message: 'Username must be at least 3 characters long' })
	.max(30, { message: 'Username must be at most 30 characters long' });

export const passwordSchema = z
	.string()
	.min(8, { message: 'Password must be at least 8 characters long' })
	.max(30, { message: 'Password must be at most 30 characters long' });

export const registerFormSchema = z.object({
	firstname: z.string().max(30, { message: 'Firstname must be at most 30 characters long' }).optional(),
	lastname: z.string().max(30, { message: 'Lastname must be at most 30 characters long' }).optional(),
	username: usernameSchema,
	password: passwordSchema,
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;

export const loginFormSchema = z.object({
	username: usernameSchema,
	password: passwordSchema,
});

export type CountryEditFormSchema = z.infer<typeof countryEditFormSchema>;

export const countryEditFormSchema = z.object({
	continent: z.string().max(30, { message: 'Continent must be at most 30 characters long' }).optional(),
	about: z.string().max(500, { message: 'About must be at most 500 characters long' }).optional(),
	memo: z.string().max(500, { message: 'Memo must be at most 500 characters long' }).optional(),
});
