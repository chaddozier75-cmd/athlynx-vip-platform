CREATE TABLE `email_notifications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`toEmail` varchar(320) NOT NULL,
	`type` enum('welcome','vip_confirmation','vip_approved','password_reset','account_update','newsletter','promotion','custom','system_alert') NOT NULL,
	`subject` varchar(255) NOT NULL,
	`body` text NOT NULL,
	`templateId` varchar(100),
	`status` enum('pending','sent','delivered','failed','bounced') NOT NULL DEFAULT 'pending',
	`sentAt` timestamp,
	`deliveredAt` timestamp,
	`openedAt` timestamp,
	`clickedAt` timestamp,
	`errorMessage` text,
	`metadata` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `email_notifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `email_templates` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`subject` varchar(255) NOT NULL,
	`htmlBody` text NOT NULL,
	`textBody` text,
	`variables` json,
	`category` enum('welcome','transactional','marketing','system') NOT NULL DEFAULT 'transactional',
	`isActive` enum('yes','no') NOT NULL DEFAULT 'yes',
	`createdBy` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `email_templates_id` PRIMARY KEY(`id`),
	CONSTRAINT `email_templates_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `notification_preferences` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`emailWelcome` enum('yes','no') NOT NULL DEFAULT 'yes',
	`emailPromotions` enum('yes','no') NOT NULL DEFAULT 'yes',
	`emailNewsletter` enum('yes','no') NOT NULL DEFAULT 'yes',
	`emailSystemAlerts` enum('yes','no') NOT NULL DEFAULT 'yes',
	`emailAccountUpdates` enum('yes','no') NOT NULL DEFAULT 'yes',
	`pushEnabled` enum('yes','no') NOT NULL DEFAULT 'yes',
	`pushPromotions` enum('yes','no') NOT NULL DEFAULT 'yes',
	`pushSystemAlerts` enum('yes','no') NOT NULL DEFAULT 'yes',
	`pushMessages` enum('yes','no') NOT NULL DEFAULT 'yes',
	`inAppEnabled` enum('yes','no') NOT NULL DEFAULT 'yes',
	`quietHoursStart` varchar(5),
	`quietHoursEnd` varchar(5),
	`timezone` varchar(50) DEFAULT 'America/Chicago',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `notification_preferences_id` PRIMARY KEY(`id`),
	CONSTRAINT `notification_preferences_userId_unique` UNIQUE(`userId`)
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`type` enum('welcome','vip_approved','system_announcement','custom','credit_added','new_feature','promotion','reminder','achievement','message') NOT NULL,
	`title` varchar(255) NOT NULL,
	`message` text NOT NULL,
	`link` varchar(500),
	`imageUrl` varchar(500),
	`priority` enum('low','normal','high','urgent') NOT NULL DEFAULT 'normal',
	`isRead` enum('yes','no') NOT NULL DEFAULT 'no',
	`isDismissed` enum('yes','no') NOT NULL DEFAULT 'no',
	`isBroadcast` enum('yes','no') NOT NULL DEFAULT 'no',
	`expiresAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`readAt` timestamp,
	CONSTRAINT `notifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `push_notifications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`subscriptionId` int,
	`userId` int,
	`title` varchar(255) NOT NULL,
	`body` text NOT NULL,
	`icon` varchar(500),
	`badge` varchar(500),
	`link` varchar(500),
	`status` enum('pending','sent','delivered','failed') NOT NULL DEFAULT 'pending',
	`sentAt` timestamp,
	`deliveredAt` timestamp,
	`clickedAt` timestamp,
	`errorMessage` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `push_notifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `push_subscriptions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`endpoint` text NOT NULL,
	`p256dhKey` text NOT NULL,
	`authKey` text NOT NULL,
	`deviceType` enum('web','ios','android') NOT NULL DEFAULT 'web',
	`deviceName` varchar(255),
	`isActive` enum('yes','no') NOT NULL DEFAULT 'yes',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`lastUsedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `push_subscriptions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `system_announcements` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`message` text NOT NULL,
	`type` enum('info','warning','success','error','promotion') NOT NULL DEFAULT 'info',
	`priority` enum('low','normal','high','urgent') NOT NULL DEFAULT 'normal',
	`targetAudience` enum('all','athletes','parents','coaches','brands','vip') NOT NULL DEFAULT 'all',
	`link` varchar(500),
	`imageUrl` varchar(500),
	`isActive` enum('yes','no') NOT NULL DEFAULT 'yes',
	`showBanner` enum('yes','no') NOT NULL DEFAULT 'no',
	`startDate` timestamp NOT NULL DEFAULT (now()),
	`endDate` timestamp,
	`createdBy` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `system_announcements_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `email_notifications` ADD CONSTRAINT `email_notifications_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `email_templates` ADD CONSTRAINT `email_templates_createdBy_users_id_fk` FOREIGN KEY (`createdBy`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `notification_preferences` ADD CONSTRAINT `notification_preferences_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `notifications` ADD CONSTRAINT `notifications_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `push_notifications` ADD CONSTRAINT `push_notifications_subscriptionId_push_subscriptions_id_fk` FOREIGN KEY (`subscriptionId`) REFERENCES `push_subscriptions`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `push_notifications` ADD CONSTRAINT `push_notifications_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `push_subscriptions` ADD CONSTRAINT `push_subscriptions_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `system_announcements` ADD CONSTRAINT `system_announcements_createdBy_users_id_fk` FOREIGN KEY (`createdBy`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;