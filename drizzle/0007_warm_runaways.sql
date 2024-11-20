PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_cities` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`province_id` integer NOT NULL,
	`name` text NOT NULL,
	FOREIGN KEY (`province_id`) REFERENCES `provinces`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_cities`("id", "province_id", "name") SELECT "id", "province_id", "name" FROM `cities`;--> statement-breakpoint
DROP TABLE `cities`;--> statement-breakpoint
ALTER TABLE `__new_cities` RENAME TO `cities`;--> statement-breakpoint
PRAGMA foreign_keys=ON;