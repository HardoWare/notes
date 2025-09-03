import {z} from 'zod'

export const registerValidator = z.object({
	username: z.string().min(4).max(24),
	email: z.email(),
	password: z.string().min(8).max(64),
	avatar: z.url().optional(),
})

export  const loginValidator = z.object({
  email: z.email(),
  password: z.string().min(8),
})

