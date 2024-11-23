CREATE TABLE `data_tables` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`created_at` integer DEFAULT current_timestamp,
	`updated_at` integer DEFAULT current_timestamp
);
