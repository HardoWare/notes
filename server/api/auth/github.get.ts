export default defineOAuthGitHubEventHandler({
	async onSuccess(event, { user }) {
		
		let userGithub = await useDrizzle()
			.select()
			.from(tables.users)
			.where(and(
				eq(tables.users.providerId, user.id.toString()),
				eq(tables.users.provider, 'github'),
			))
			.get()
		
		if (!userGithub) {
			userGithub = await useDrizzle()
				.insert(tables.users)
				.values({
					provider: 'github',
					providerId: user.id.toString(),
					login: user.login,
					email: user.email,
					avatar: user.avatar_url,
				})
				.returning()
				.get()
		}
		
		await setUserSession(event, {
			user: {
				id: userGithub.id,
				provider: userGithub.provider,
				login: userGithub.login,
				email: userGithub.email,
				avatar: userGithub.avatar,
			},
			secure: {
				providerId: userGithub.providerId,
			},
			loggedInAt: Date.now(),
		})
		
		return sendRedirect(event, '/')
	},
	async onError(event, error) {
		console.error('OAuth error:', error)
		return sendRedirect(event, '/login?error=github-oauth')
	}
})