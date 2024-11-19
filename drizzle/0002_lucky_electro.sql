DROP TABLE `fields`;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_forms_fields` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`form_id` integer,
	`section_id` integer,
	`display` text NOT NULL,
	`type` text DEFAULT 'text' NOT NULL,
	`data` text,
	`filters` text,
	`description` text,
	FOREIGN KEY (`form_id`) REFERENCES `forms`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`section_id`) REFERENCES `sections`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_forms_fields`("id", "form_id", "section_id", "display", "type", "data", "filters", "description") SELECT "id", "form_id", "section_id", "display", "type", "data", "filters", "description" FROM `forms_fields`;--> statement-breakpoint
DROP TABLE `forms_fields`;--> statement-breakpoint
ALTER TABLE `__new_forms_fields` RENAME TO `forms_fields`;--> statement-breakpoint
PRAGMA foreign_keys=ON;