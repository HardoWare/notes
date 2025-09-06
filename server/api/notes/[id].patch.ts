import {noteCreateValidator} from '#shared/validators'

export default eventHandler(async (event) => {
	const { user } = await requireUserSession(event)
	
	const { id: _id } = getRouterParams(event)
	
	if (!_id) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Note ID is required'
		})
	}
	
	const {success, data, error} = noteCreateValidator.safeParse(await readBody(event))
	
	if (!success) {
		throw createError({
			statusCode: 422,
			statusMessage: 'Invalid request data',
			data: mapZodErrorsToForm(error?.issues)
		})
	}
	
	const updatedNote = await useDrizzle()
		.update(tables.notes)
		.set({
			...data,
			editedAt: new Date(),
		})
		.where(and(
			eq(tables.notes.id, Number(_id)),
			eq(tables.notes.ownerId, user.id),
		))
		.returning()
		.get()
		
	return updatedNote
})