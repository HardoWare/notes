CREATE TABLE `notes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`uuid` text DEFAULT '0f73cfd2-e5d6-4561-87a5-cd12a6683b2a' NOT NULL,
	`title` text,
	`description` text NOT NULL,
	`images` text DEFAULT '[]',
	`owner_id` integer NOT NULL,
	`created_at` integer,
	FOREIGN KEY (`owner_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `notes_uuid_unique` ON `notes` (`uuid`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`uuid` text DEFAULT '71e5a208-6930-4522-b5f6-4ca7b4ff79b9' NOT NULL,
	`provider` text DEFAULT 'local' NOT NULL,
	`provider_id` text,
	`login` text NOT NULL,
	`email` text,
	`password` text,
	`avatar` text,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`edited_at` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_uuid_unique` ON `users` (`uuid`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);