import type { DefaultSession } from 'next-auth'

declare module 'next-auth' {
	interface Session {
		userId: string
		username?: string
		email?: string
		role?: string
		[key: string]: string
	}
}
