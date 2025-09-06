import bcrypt from 'bcrypt'

export default defineTask({
	meta: {
		name: 'db:seed',
		description: 'Run database seed task'
	},
	async run() {
		console.log('Running DB seed task...')
		
		const users = [
			{
				login: 'John-Doe',
				email: 'john@example.com',
				password: await bcrypt.hash('Pa$$w0rd', 10),
			}
		]
		await useDrizzle().insert(tables.users).values(users)
		
		return { result: 'success' }
	}
})
