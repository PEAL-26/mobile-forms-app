PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_forms_fields` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`form_id` integer,
	`required` integer DEFAULT false,
	`section_id` integer,
	`display` text NOT NULL,
	`type` text DEFAULT 'text' NOT NULL,
	`identifier` text NOT NULL,
	`data` text,
	`data_where` text,
	`extra_field` text,
	`description` text,
	`created_at` integer DEFAULT current_timestamp,
	`updated_at` integer DEFAULT current_timestamp,
	FOREIGN KEY (`form_id`) REFERENCES `forms`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`section_id`) REFERENCES `sections`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_forms_fields`("id", "form_id", "required", "section_id", "display", "type", "identifier", "data", "data_where", "extra_field", "description", "created_at", "updated_at") SELECT "id", "form_id", "required", "section_id", "display", "type", "identifier", "data", "data_where", "extra_field", "description", "created_at", "updated_at" FROM `forms_fields`;--> statement-breakpoint
DROP TABLE `forms_fields`;--> statement-breakpoint
ALTER TABLE `__new_forms_fields` RENAME TO `forms_fields`;--> statement-breakpoint
PRAGMA foreign_keys=ON;