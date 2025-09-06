export default eventHandler(async (event) => {
	const { user } = await requireUserSession(event)
	
	const notes = await useDrizzle()
		.select()
		.from(tables.notes)
		.where(
			eq(tables.notes.ownerId, user.id)
		)
		.all()
	
	return notes ?? []
})