CREATE TABLE `email_verification_codes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`code` varchar(6) NOT NULL,
	`expiresAt` timestamp NOT NULL,
	`used` enum('yes','no') NOT NULL DEFAULT 'no',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `email_verification_codes_id` PRIMARY KEY(`id`)
);
