ALTER TABLE `city` RENAME TO `cities`;--> statement-breakpoint
ALTER TABLE `needs_forms` RENAME TO `data_collection`;--> statement-breakpoint
ALTER TABLE `province` RENAME TO `provinces`;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_cities` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`section_id` integer NOT NULL,
	`name` text NOT NULL,
	FOREIGN KEY (`section_id`) REFERENCES `provinces`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_cities`("id", "section_id", "name") SELECT "id", "section_id", "name" FROM `cities`;--> statement-breakpoint
DROP TABLE `cities`;--> statement-breakpoint
ALTER TABLE `__new_cities` RENAME TO `cities`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_data_collection` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`formField_id` integer NOT NULL,
	`section_id` integer NOT NULL,
	`field` text NOT NULL,
	`type` text DEFAULT 'text',
	`identifier` text NOT NULL,
	`value` text NOT NULL,
	`extra_field_display` text,
	`extra_field_value` text,
	FOREIGN KEY (`formField_id`) REFERENCES `forms_fields`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`section_id`) REFERENCES `sections`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_data_collection`("id", "formField_id", "section_id", "field", "type", "identifier", "value", "extra_field_display", "extra_field_value") SELECT "id", "formField_id", "section_id", "field", "type", "identifier", "value", "extra_field_display", "extra_field_value" FROM `data_collection`;--> statement-breakpoint
DROP TABLE `data_collection`;--> statement-breakpoint
ALTER TABLE `__new_data_collection` RENAME TO `data_collection`;