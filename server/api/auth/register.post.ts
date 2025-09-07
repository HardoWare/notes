import {registerValidator} from '#shared/validators'
import bcrypt from 'bcrypt'
import {mapZodErrorsToForm} from '#shared/utils'

export default eventHandler(async (event) => {
	const { success, data, error } = registerValidator.safeParse(await readBody(event))
	
	if (!success) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Invalid request data',
			data: mapZodErrorsToForm(error?.issues),
		})
	}
	
	const userCount = await useDrizzle()
		.select()
		.from(tables.users)
		.where(and(
			eq(tables.users.email, data.email),
			eq(tables.users.provider, 'local'),
		))
		.get()

	if (userCount) {
		throw createError({
			statusCode: 400,
			statusMessage: 'User with this email already exists',
			data: mapZodErrorsToForm([
				{ code: 'custom', path: ['email'], message: 'User with this email already exists' }
			]),
		})
	}
	
	const hash = await bcrypt.hash(data.password, 10)
	
	const user = await useDrizzle()
		.insert(tables.users)
		.values({
			...data,
			password: hash,
		})
		.returning()
		.get()
	
	await setUserSession(event, {
		user: {
			id: user.id,
			provider: user.provider,
			login: user.login,
			email: user.email,
			avatar: user.avatar ?? undefined,
		},
		loggedInAt: Date.now(),
	})
	
	return {}
})