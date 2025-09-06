import { sql } from 'drizzle-orm'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { v4 as uuid } from 'uuid'

export const users = sqliteTable('users', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	uuid: text('uuid').notNull().unique().default(uuid()),
	provider: text('provider').notNull().default('local'),
	providerId: text('provider_id'),
	login: text('login').notNull(),
	email: text('email').unique(),
	password: text('password'),
	avatar: text('avatar'),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
	editedAt: integer('edited_at', { mode: 'timestamp' }),
})

export const notes = sqliteTable('notes', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	uuid: text('uuid').notNull().unique().default(uuid()),
	title: text('title'),
	description: text('description').notNull(),
	image: text('images', { mode: 'json' })
		.$type<string[]>()
		.default(sql`'[]'`),
	ownerId: integer('owner_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
	editedAt: integer('created_at', { mode: 'timestamp' }),
})