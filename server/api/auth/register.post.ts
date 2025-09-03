import {registerValidator} from '#shared/validators'
import bcrypt from 'bcrypt'
import {count} from 'drizzle-orm'

export default eventHandler(async (event) => {
	const { success, data, error } = registerValidator.safeParse(await readBody(event))
	
	if (!success) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Invalid request data',
			data: error
		})
	}
	
	const userCount = await useDrizzle()
		.select({ count: count() })
		.from(tables.users)
		.where(eq(tables.users.email, data.email))
		.get()

	if (userCount) {
		throw createError({
			statusCode: 400,
			statusMessage: 'User with this email already exists'
		})
	}
	
	const hash = await bcrypt.hash(data.password, 10)
	
	const user = await useDrizzle()
		.insert(tables.users)
		.values({
			...data,
			password: hash,
		}).returning().get()
	
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