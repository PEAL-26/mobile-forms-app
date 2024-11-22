PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_forms_fields` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`form_id` integer,
	`required` integer DEFAULT false,
	`section_id` integer NOT NULL,
	`display` text NOT NULL,
	`type` text DEFAULT 'text' NOT NULL,
	`identifier` text NOT NULL,
	`data` text,
	`data_fields` text,
	`data_where` text,
	`extra_field` text,
	`description` text,
	FOREIGN KEY (`form_id`) REFERENCES `forms`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`section_id`) REFERENCES `sections`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_forms_fields`("id", "form_id", "required", "section_id", "display", "type", "identifier", "data", "data_fields", "data_where", "extra_field", "description") SELECT "id", "form_id", "required", "section_id", "display", "type", "identifier", "data", "data_fields", "data_where", "extra_field", "description" FROM `forms_fields`;--> statement-breakpoint
DROP TABLE `forms_fields`;--> statement-breakpoint
ALTER TABLE `__new_forms_fields` RENAME TO `forms_fields`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
ALTER TABLE `data_collection` ADD `identifier` text NOT NULL;