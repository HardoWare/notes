
declare module '#auth-utils' {
	interface User {
		id: number
		uuid: string
		username: string
		email: string
		avatar: string | undefined
	}
	
	// interface UserSession {
	// 	// Add your own fields
	// }
	
	// interface SecureSessionData {
	// 	// Add your own fields
	// }
}

export {}