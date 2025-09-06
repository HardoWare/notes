import {z} from 'zod'

export const registerValidator = z.object({
	email: z.email(),
	password: z.string().min(8).max(64),
	login: z.string().min(3).max(39).regex(/^[A-Za-z\d](?:[A-Za-z\d]|-(?=[A-Za-z\d])){2,38}$/, 'Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen.'),
	avatar: z.url().optional(),
})

export  const loginValidator = z.object({
  email: z.email(),
  password: z.string().min(8).max(64),
})

export const noteCreateValidator = z.object({
	title: z.string().max(255).optional(),
	description: z.string().min(1),
	isCheckList: z.boolean().optional(),
	tags: z.array(z.number()).optional(),
	image: z.array(z.url()).optional(),
})
