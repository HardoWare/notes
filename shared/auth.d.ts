
declare module '#auth-utils' {
	interface UserSession {
		loggedInAt: number
	}
	
	interface User {
		id: string
		provider: string
		login: string
		email?: string
		avatar?: string
	}
	
	interface SecureSessionData {
		providerId?: string
	}
}

export {}