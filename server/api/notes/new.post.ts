

export default eventHandler(async (event) => {
	const { user } = await requireUserSession(event)
	
	const data = await readBody(event)
	
	const notes = await useDrizzle()
		.insert(tables.notes)
		.values({
			...data,
			ownerId: user.id,
		}).returning().get()
		
	return notes ?? []
})