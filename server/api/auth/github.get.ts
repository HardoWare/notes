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
				uuid: userGithub.uuid,
				provider: userGithub.provider,
				login: userGithub.uuid,
				avatar: userGithub.avatar,
			},
			secure: {
				userId: userGithub.id,
				providerId: userGithub.providerId,
				email: userGithub.email ?? undefined,
			},
			loggedInAt: Date.now(),
		})
		
		return sendRedirect(event, '/')
	},
	async onError(event, error) {
		console.error('OAuth error:', error)
		return sendRedirect(event, '/login?error=oauth')
	}
})