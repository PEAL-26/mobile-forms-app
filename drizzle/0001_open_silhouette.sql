PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_city` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`section_id` integer NOT NULL,
	`name` text NOT NULL,
	FOREIGN KEY (`section_id`) REFERENCES `province`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_city`("id", "section_id", "name") SELECT "id", "section_id", "name" FROM `city`;--> statement-breakpoint
DROP TABLE `city`;--> statement-breakpoint
ALTER TABLE `__new_city` RENAME TO `city`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_forms_fields` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`form_id` integer,
	`field_id` integer,
	`section_id` integer,
	`name` text,
	FOREIGN KEY (`form_id`) REFERENCES `forms`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`field_id`) REFERENCES `fields`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`section_id`) REFERENCES `sections`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_forms_fields`("id", "form_id", "field_id", "section_id", "name") SELECT "id", "form_id", "field_id", "section_id", "name" FROM `forms_fields`;--> statement-breakpoint
DROP TABLE `forms_fields`;--> statement-breakpoint
ALTER TABLE `__new_forms_fields` RENAME TO `forms_fields`;--> statement-breakpoint
CREATE TABLE `__new_needs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`form_id` integer NOT NULL,
	`province_id` integer NOT NULL,
	`city_id` integer NOT NULL,
	`category` text NOT NULL,
	FOREIGN KEY (`form_id`) REFERENCES `forms`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`province_id`) REFERENCES `province`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`city_id`) REFERENCES `city`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_needs`("id", "form_id", "province_id", "city_id", "category") SELECT "id", "form_id", "province_id", "city_id", "category" FROM `needs`;--> statement-breakpoint
DROP TABLE `needs`;--> statement-breakpoint
ALTER TABLE `__new_needs` RENAME TO `needs`;--> statement-breakpoint
CREATE TABLE `__new_needs_forms` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`need_id` integer NOT NULL,
	`formField_id` integer NOT NULL,
	`section_id` integer NOT NULL,
	`field` text NOT NULL,
	`type` text DEFAULT 'text',
	`value` text NOT NULL,
	FOREIGN KEY (`need_id`) REFERENCES `needs`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`formField_id`) REFERENCES `forms_fields`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`section_id`) REFERENCES `sections`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_needs_forms`("id", "need_id", "formField_id", "section_id", "field", "type", "value") SELECT "id", "need_id", "formField_id", "section_id", "field", "type", "value" FROM `needs_forms`;--> statement-breakpoint
DROP TABLE `needs_forms`;--> statement-breakpoint
ALTER TABLE `__new_needs_forms` RENAME TO `needs_forms`;