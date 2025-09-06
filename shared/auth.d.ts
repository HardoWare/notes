
declare module '#auth-utils' {
	interface UserSession {
		loggedInAt: number
	}
	
	interface User {
		uuid: string
		provider: string
		login: string
		avatar?: string
	}
	
	interface SecureSessionData {
		userId: number
		providerId?: string
		email?: string
	}
}

export {}