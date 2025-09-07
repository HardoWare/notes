import {z} from 'zod'

const zodEmail = z.email({
	error: (iss) => iss.input === undefined ? 'validator.required' : 'validator.email-invalid'
})

const zodPassword = z.string({
	error: (iss) => iss.input === undefined ? 'validator.required' : 'validator.password-invalid'
}).min(8, {
	error: 'validator.password-minimal'
}).max(64, {
	error: 'validator.password-minimal'
}).regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, {
	error: 'validator.password-regex'
})

const zodLogin =  z.string({
	error: (iss) =>  iss.input === undefined ? 'validator.required' : 'validator.login-invalid'
}).min(3, {
	error: 'validator.login-minimal'
}).max(39, {
	error: 'validator.login-maximal'
}).regex( /^[A-Za-z\d](?:[A-Za-z\d]|-(?=[A-Za-z\d])){2,38}$/, {
	error: 'validator.login-regex'
})

export const registerValidator = z.object({
	email: zodEmail,
	password: zodPassword,
	login: zodLogin,
	avatar: z.url().optional(),
})

export  const loginValidator = z.object({
	email: zodEmail,
	password: zodPassword,
})

export const noteCreateValidator = z.object({
	title: z.string().max(255).optional(),
	description: z.string().min(1),
	isCheckList: z.boolean().optional(),
	tags: z.array(z.number()).optional(),
	image: z.array(z.url()).optional(),
})
