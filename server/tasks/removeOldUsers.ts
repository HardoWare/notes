export default defineTask({
	meta: {
		name: 'db:rm-old-users',
		description: 'Deleting old users from DB with all their data'
	},
	async run() {
		console.log('Deleting old users from DB...')
		
		await useDrizzle()
			.delete(tables.users)
			.where(
				lt(tables.users.createdAt, new Date(Date.now() - 24 * 60 * 60 * 1000))
			) // older than 1 day
		
		return { result: 'success' }
	}
})
