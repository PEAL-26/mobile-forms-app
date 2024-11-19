DROP TABLE `needs`;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_needs_forms` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`formField_id` integer NOT NULL,
	`section_id` integer NOT NULL,
	`field` text NOT NULL,
	`type` text DEFAULT 'text',
	`value` text NOT NULL,
	FOREIGN KEY (`formField_id`) REFERENCES `forms_fields`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`section_id`) REFERENCES `sections`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_needs_forms`("id", "formField_id", "section_id", "field", "type", "value") SELECT "id", "formField_id", "section_id", "field", "type", "value" FROM `needs_forms`;--> statement-breakpoint
DROP TABLE `needs_forms`;--> statement-breakpoint
ALTER TABLE `__new_needs_forms` RENAME TO `needs_forms`;--> statement-breakpoint
PRAGMA foreign_keys=ON;