PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_data_collection` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`identifier` text NOT NULL,
	`form_field_id` integer NOT NULL,
	`field` text NOT NULL,
	`type` text DEFAULT 'text',
	`value` text NOT NULL,
	`created_at` integer DEFAULT current_timestamp,
	`updated_at` integer DEFAULT current_timestamp,
	FOREIGN KEY (`form_field_id`) REFERENCES `forms_fields`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_data_collection`("id", "identifier", "form_field_id", "field", "type", "value", "created_at", "updated_at") SELECT "id", "identifier", "form_field_id", "field", "type", "value", "created_at", "updated_at" FROM `data_collection`;--> statement-breakpoint
DROP TABLE `data_collection`;--> statement-breakpoint
ALTER TABLE `__new_data_collection` RENAME TO `data_collection`;--> statement-breakpoint
PRAGMA foreign_keys=ON;