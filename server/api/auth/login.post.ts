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
	
	if (!user) {
		throw createError({
			statusCode: 400,
			statusMessage: 'User dose not exist',
			data: mapZodErrorsToForm([
				{ code: 'custom', path: ['email'], message: 'User dose not exist' }
			])
		})
	}
	
	if (!user.password || !await bcrypt.compare(data.password, user.password)) {
		throw  createError({
			statusCode: 400,
			statusMessage: 'Invalid email or password',
			data: mapZodErrorsToForm([
				{ code: 'custom', path: ['email'], message: 'Invalid email or password' }
			])
		})
	}
	
	await setUserSession(event, {
		user: {
			uuid: user.uuid,
			provider: user.provider,
			login: user.login,
			avatar: user.avatar ?? undefined,
		},
		secure: {
			userId: user.id,
			providerId: user.providerId,
			email: user.email,
		},
		loggedInAt: Date.now(),
	})
	
	return {}
})