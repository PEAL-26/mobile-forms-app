PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_data_collection` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`formField_id` integer NOT NULL,
	`field` text NOT NULL,
	`type` text DEFAULT 'text',
	`value` text NOT NULL,
	FOREIGN KEY (`formField_id`) REFERENCES `forms_fields`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_data_collection`("id", "formField_id", "field", "type", "value") SELECT "id", "formField_id", "field", "type", "value" FROM `data_collection`;--> statement-breakpoint
DROP TABLE `data_collection`;--> statement-breakpoint
ALTER TABLE `__new_data_collection` RENAME TO `data_collection`;--> statement-breakpoint
PRAGMA foreign_keys=ON;