CREATE TABLE `partner_rewards` (
	`id` int AUTO_INCREMENT NOT NULL,
	`partnerId` int NOT NULL,
	`rewardType` varchar(100) NOT NULL,
	`rewardValue` text NOT NULL,
	`description` text,
	`grantedAt` timestamp NOT NULL DEFAULT (now()),
	`grantedBy` varchar(255) DEFAULT 'Chad A. Dozier',
	`transactionId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `partner_rewards_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `partner_tiers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`description` text,
	`level` int NOT NULL,
	`monthlyPrice` int DEFAULT 0,
	`benefits` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `partner_tiers_id` PRIMARY KEY(`id`),
	CONSTRAINT `partner_tiers_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `partners` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`name` varchar(255) NOT NULL,
	`email` varchar(320),
	`phone` varchar(50),
	`tierId` int,
	`role` varchar(100),
	`equityPercentage` varchar(20),
	`revenueSharePercentage` varchar(20),
	`customWelcomeMessage` text,
	`lifetimeAccess` enum('yes','no') DEFAULT 'no',
	`whiteLabelRights` enum('yes','no') DEFAULT 'no',
	`boardAdvisoryRights` enum('yes','no') DEFAULT 'no',
	`grantedAt` timestamp NOT NULL DEFAULT (now()),
	`grantedBy` varchar(255) DEFAULT 'Chad A. Dozier',
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `partners_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `revenue_share_payouts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`partnerId` int NOT NULL,
	`periodStart` timestamp NOT NULL,
	`periodEnd` timestamp NOT NULL,
	`totalRevenue` int NOT NULL,
	`partnerShare` int NOT NULL,
	`sharePercentage` varchar(20) NOT NULL,
	`status` enum('pending','paid','cancelled') DEFAULT 'pending',
	`paidAt` timestamp,
	`paymentMethod` varchar(100),
	`transactionId` int,
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `revenue_share_payouts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `transactions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`transactionId` varchar(50) NOT NULL,
	`userId` int,
	`partnerId` int,
	`type` enum('PARTNER_GRANT','VIP_SIGNUP','SUBSCRIPTION','STORE_PURCHASE','REFERRAL_BONUS','REVENUE_SHARE','EQUITY_DISTRIBUTION','AI_CREDIT_PURCHASE','REFUND','OTHER') NOT NULL,
	`amount` int DEFAULT 0,
	`currency` varchar(10) DEFAULT 'USD',
	`description` text NOT NULL,
	`status` enum('pending','completed','failed','refunded') DEFAULT 'pending',
	`referredBy` int,
	`metadata` text,
	`stripePaymentId` varchar(255),
	`timestamp` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `transactions_id` PRIMARY KEY(`id`),
	CONSTRAINT `transactions_transactionId_unique` UNIQUE(`transactionId`)
);
--> statement-breakpoint
ALTER TABLE `partner_rewards` ADD CONSTRAINT `partner_rewards_partnerId_partners_id_fk` FOREIGN KEY (`partnerId`) REFERENCES `partners`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `partner_rewards` ADD CONSTRAINT `partner_rewards_transactionId_transactions_id_fk` FOREIGN KEY (`transactionId`) REFERENCES `transactions`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `partners` ADD CONSTRAINT `partners_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `partners` ADD CONSTRAINT `partners_tierId_partner_tiers_id_fk` FOREIGN KEY (`tierId`) REFERENCES `partner_tiers`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `revenue_share_payouts` ADD CONSTRAINT `revenue_share_payouts_partnerId_partners_id_fk` FOREIGN KEY (`partnerId`) REFERENCES `partners`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `revenue_share_payouts` ADD CONSTRAINT `revenue_share_payouts_transactionId_transactions_id_fk` FOREIGN KEY (`transactionId`) REFERENCES `transactions`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_partnerId_partners_id_fk` FOREIGN KEY (`partnerId`) REFERENCES `partners`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_referredBy_users_id_fk` FOREIGN KEY (`referredBy`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;