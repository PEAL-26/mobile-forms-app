CREATE TABLE `city` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`section_id` integer NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `fields` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`display` text NOT NULL,
	`type` text DEFAULT 'text'
);
--> statement-breakpoint
CREATE TABLE `forms` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `forms_fields` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`form_id` integer,
	`field_id` integer,
	`section_id` integer,
	`name` text
);
--> statement-breakpoint
CREATE TABLE `formations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`level` text NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `needs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`form_id` integer NOT NULL,
	`province_id` integer NOT NULL,
	`city_id` integer NOT NULL,
	`category` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `needs_forms` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`need_id` integer NOT NULL,
	`formField_id` integer NOT NULL,
	`section_id` integer NOT NULL,
	`field` text NOT NULL,
	`type` text DEFAULT 'text',
	`value` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `province` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `sections` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL
);
