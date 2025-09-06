
declare module '#auth-utils' {
	interface UserSession {
		loggedInAt: number
	}
	
	interface User {
		id: number
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