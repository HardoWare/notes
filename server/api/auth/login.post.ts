import {loginValidator} from '#shared/validators'
import bcrypt from 'bcrypt'
import {mapZodErrorsToForm} from '#shared/utils'

export default eventHandler(async (event) => {
	const { success, data, error } = loginValidator.safeParse(await readBody(event))
	
	// const t = await useTranslation(event)
	
	if (!success) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Invalid request data',
			data: mapZodErrorsToForm(error?.issues)
		})
	}
	
	const user = await useDrizzle()
		.select()
		.from(tables.users)
		.where(and(
			eq(tables.users.email, data.email),
			eq(tables.users.provider, 'local'),
		))
		.get()
	
	if (!user || (!user.password) || !await bcrypt.compare(data.password, user.password)) {
		throw  createError({
			statusCode: 400,
			statusMessage: 'Invalid email or password',
			data: mapZodErrorsToForm([
				{ code: 'custom', path: ['email'], message: 'validator.email-or-password-incorrect' },
				{ code: 'custom', path: ['password'], message: 'validator.email-or-password-incorrect' },
			])
		})
	}
	
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