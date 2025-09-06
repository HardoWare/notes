
export default eventHandler(async (event) => {
	const { user } = await requireUserSession(event)
	
	const { id: _id } = getRouterParams(event)
	
	if (!_id) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Note ID is required',
		})
	}
	
	const deletedNote = await useDrizzle()
		.delete(tables.notes)
		.where(and(
			eq(tables.notes.id, Number(_id)),
			eq(tables.notes.ownerId, user.id),
		))
		.returning()
		.get()
		
	return {
		deleted: true,
		id: deletedNote?.id,
	}
})