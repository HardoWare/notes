PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_notes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`uuid` text DEFAULT 'c6de36e7-07b7-4248-9179-3d0cf21de158' NOT NULL,
	`title` text,
	`description` text NOT NULL,
	`images` text DEFAULT '[]',
	`owner_id` integer NOT NULL,
	`created_at` integer,
	FOREIGN KEY (`owner_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_notes`("id", "uuid", "title", "description", "images", "owner_id", "created_at") SELECT "id", "uuid", "title", "description", "images", "owner_id", "created_at" FROM `notes`;--> statement-breakpoint
DROP TABLE `notes`;--> statement-breakpoint
ALTER TABLE `__new_notes` RENAME TO `notes`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `notes_uuid_unique` ON `notes` (`uuid`);--> statement-breakpoint
ALTER TABLE `users` ADD `uuid` text DEFAULT '5e5fb73d-9489-4b34-ad57-725e95d0a315' NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `users_uuid_unique` ON `users` (`uuid`);