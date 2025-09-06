import { noteCreateValidator } from '#shared/validators'

export default eventHandler(async (event) => {
	const { user } = await requireUserSession(event)
	
	const { success, data, error } = noteCreateValidator.safeParse(await readBody(event))
	
	if (!success) {
		throw createError({
			statusCode: 422,
			statusMessage: 'Invalid request data',
			data: mapZodErrorsToForm(error?.issues)
		})
	}
	
	const notes = await useDrizzle()
		.insert(tables.notes)
		.values({
			...data,
			ownerId: user.id,
		})
		.returning()
		.get()
		
	return notes
})