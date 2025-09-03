import {loginValidator} from '#shared/validators'
import bcrypt from 'bcrypt'

export default eventHandler(async (event) => {
	const { success, data, error } = loginValidator.safeParse(await readBody(event))
	
	if (!success) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Invalid request data',
			data: error
		})
	}
	
	const user = await useDrizzle()
		.select()
		.from(tables.users)
		.where(eq(tables.users.email, data.email))
		.get()
	
	if (!user) {
		throw createError({
			statusCode: 400,
			statusMessage: 'User dose not exist',
		})
	}
	
	if (!await bcrypt.compare(data.password, user.password)) {
		throw  createError({
			statusCode: 400,
			statusMessage: 'Invalid email or password',
		})
	}
	
	await setUserSession(event, {
		user: {
			id: user.id,
			uuid: user.uuid,
			username: user.username,
			email: user.email,
			avatar: user.avatar || undefined
		}
	})
	
	return {}
})