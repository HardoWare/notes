import { sql } from 'drizzle-orm'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { v4 as uuid } from 'uuid'

export const users = sqliteTable('users', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	uuid: text('uuid').notNull().unique().default(uuid()),
	username: text('name').notNull(),
	email: text('email').notNull().unique(),
	password: text('password').notNull(),
	avatar: text('avatar'),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(unixepoch())`),
	editedAt: integer('created_at', { mode: 'timestamp' }),
})

export const notes = sqliteTable('notes', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	uuid: text('uuid').notNull().unique().default(uuid()),
	title: text('title'),
	description: text('description').notNull(),
	image: text('images', { mode: 'json' })
		.$type<string[]>()
		.default(sql`'[]'`),
	ownerId: integer('owner_id').references(() => users.id).notNull(),
	createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
	editedAt: integer('created_at', { mode: 'timestamp' }),
})