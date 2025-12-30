CREATE TABLE `achievements` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`achievementType` varchar(100) NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`icon` varchar(50),
	`sourceApp` enum('nil_portal','diamond_grind','messenger','transfer_portal','faith','warriors_playbook','platform') NOT NULL DEFAULT 'platform',
	`xpReward` int NOT NULL DEFAULT 0,
	`isRare` enum('yes','no') NOT NULL DEFAULT 'no',
	`unlockedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `achievements_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `activity_feed` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`activityType` enum('post_created','post_liked','post_commented','workout_completed','achievement_unlocked','message_received','follow_new','nil_deal','transfer_update','milestone') NOT NULL,
	`sourceApp` enum('nil_portal','diamond_grind','messenger','transfer_portal','faith','warriors_playbook','platform') NOT NULL DEFAULT 'platform',
	`referenceId` int,
	`referenceType` varchar(50),
	`title` varchar(255) NOT NULL,
	`description` text,
	`metadata` json,
	`isRead` enum('yes','no') NOT NULL DEFAULT 'no',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `activity_feed_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `conversation_participants` (
	`id` int AUTO_INCREMENT NOT NULL,
	`conversationId` int NOT NULL,
	`userId` int NOT NULL,
	`role` enum('member','admin') NOT NULL DEFAULT 'member',
	`lastReadAt` timestamp,
	`unreadCount` int NOT NULL DEFAULT 0,
	`joinedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `conversation_participants_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `conversations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`type` enum('direct','group') NOT NULL DEFAULT 'direct',
	`name` varchar(255),
	`createdBy` int NOT NULL,
	`lastMessageAt` timestamp,
	`lastMessagePreview` varchar(255),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `conversations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `email_verification_codes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`code` varchar(6) NOT NULL,
	`expiresAt` timestamp NOT NULL,
	`used` enum('yes','no') NOT NULL DEFAULT 'no',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `email_verification_codes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `follows` (
	`id` int AUTO_INCREMENT NOT NULL,
	`followerId` int NOT NULL,
	`followingId` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `follows_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `messages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`conversationId` int NOT NULL,
	`senderId` int NOT NULL,
	`content` text NOT NULL,
	`messageType` enum('text','image','video','file','workout','achievement','system') NOT NULL DEFAULT 'text',
	`mediaUrl` text,
	`metadata` json,
	`isEdited` enum('yes','no') NOT NULL DEFAULT 'no',
	`isDeleted` enum('yes','no') NOT NULL DEFAULT 'no',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `messages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
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
CREATE TABLE `post_comments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`postId` int NOT NULL,
	`userId` int NOT NULL,
	`content` text NOT NULL,
	`parentCommentId` int,
	`likesCount` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `post_comments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `post_likes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`postId` int NOT NULL,
	`userId` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `post_likes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `posts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`content` text NOT NULL,
	`mediaUrls` json,
	`mediaType` enum('none','image','video','gallery') NOT NULL DEFAULT 'none',
	`postType` enum('status','achievement','workout','nil_deal','announcement','milestone') NOT NULL DEFAULT 'status',
	`sourceApp` enum('nil_portal','diamond_grind','messenger','transfer_portal','faith','warriors_playbook') NOT NULL DEFAULT 'nil_portal',
	`visibility` enum('public','followers','private') NOT NULL DEFAULT 'public',
	`likesCount` int NOT NULL DEFAULT 0,
	`commentsCount` int NOT NULL DEFAULT 0,
	`sharesCount` int NOT NULL DEFAULT 0,
	`isPinned` enum('yes','no') NOT NULL DEFAULT 'no',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `posts_id` PRIMARY KEY(`id`)
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
CREATE TABLE `training_stats` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`sport` varchar(100) NOT NULL,
	`totalWorkouts` int NOT NULL DEFAULT 0,
	`totalMinutes` int NOT NULL DEFAULT 0,
	`totalCalories` int NOT NULL DEFAULT 0,
	`currentStreak` int NOT NULL DEFAULT 0,
	`longestStreak` int NOT NULL DEFAULT 0,
	`weeklyGoal` int NOT NULL DEFAULT 5,
	`weeklyProgress` int NOT NULL DEFAULT 0,
	`level` int NOT NULL DEFAULT 1,
	`xp` int NOT NULL DEFAULT 0,
	`lastWorkoutAt` timestamp,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `training_stats_id` PRIMARY KEY(`id`)
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
CREATE TABLE `user_stats_summary` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`postsCount` int NOT NULL DEFAULT 0,
	`followersCount` int NOT NULL DEFAULT 0,
	`followingCount` int NOT NULL DEFAULT 0,
	`likesReceived` int NOT NULL DEFAULT 0,
	`conversationsCount` int NOT NULL DEFAULT 0,
	`messagesSent` int NOT NULL DEFAULT 0,
	`totalWorkouts` int NOT NULL DEFAULT 0,
	`totalTrainingMinutes` int NOT NULL DEFAULT 0,
	`achievementsCount` int NOT NULL DEFAULT 0,
	`totalXp` int NOT NULL DEFAULT 0,
	`level` int NOT NULL DEFAULT 1,
	`daysActive` int NOT NULL DEFAULT 0,
	`lastActiveAt` timestamp,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `user_stats_summary_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `workouts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`sport` varchar(100) NOT NULL,
	`workoutType` enum('strength','cardio','skill','recovery','game','practice','custom') NOT NULL DEFAULT 'custom',
	`duration` int,
	`intensity` enum('low','medium','high','max') NOT NULL DEFAULT 'medium',
	`caloriesBurned` int,
	`exercises` json,
	`notes` text,
	`isPublic` enum('yes','no') NOT NULL DEFAULT 'no',
	`completedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `workouts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `achievements` ADD CONSTRAINT `achievements_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `activity_feed` ADD CONSTRAINT `activity_feed_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `conversation_participants` ADD CONSTRAINT `conversation_participants_conversationId_conversations_id_fk` FOREIGN KEY (`conversationId`) REFERENCES `conversations`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `conversation_participants` ADD CONSTRAINT `conversation_participants_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `conversations` ADD CONSTRAINT `conversations_createdBy_users_id_fk` FOREIGN KEY (`createdBy`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `follows` ADD CONSTRAINT `follows_followerId_users_id_fk` FOREIGN KEY (`followerId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `follows` ADD CONSTRAINT `follows_followingId_users_id_fk` FOREIGN KEY (`followingId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `messages` ADD CONSTRAINT `messages_conversationId_conversations_id_fk` FOREIGN KEY (`conversationId`) REFERENCES `conversations`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `messages` ADD CONSTRAINT `messages_senderId_users_id_fk` FOREIGN KEY (`senderId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `partner_rewards` ADD CONSTRAINT `partner_rewards_partnerId_partners_id_fk` FOREIGN KEY (`partnerId`) REFERENCES `partners`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `partner_rewards` ADD CONSTRAINT `partner_rewards_transactionId_transactions_id_fk` FOREIGN KEY (`transactionId`) REFERENCES `transactions`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `partners` ADD CONSTRAINT `partners_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `partners` ADD CONSTRAINT `partners_tierId_partner_tiers_id_fk` FOREIGN KEY (`tierId`) REFERENCES `partner_tiers`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `post_comments` ADD CONSTRAINT `post_comments_postId_posts_id_fk` FOREIGN KEY (`postId`) REFERENCES `posts`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `post_comments` ADD CONSTRAINT `post_comments_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `post_likes` ADD CONSTRAINT `post_likes_postId_posts_id_fk` FOREIGN KEY (`postId`) REFERENCES `posts`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `post_likes` ADD CONSTRAINT `post_likes_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `posts` ADD CONSTRAINT `posts_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `revenue_share_payouts` ADD CONSTRAINT `revenue_share_payouts_partnerId_partners_id_fk` FOREIGN KEY (`partnerId`) REFERENCES `partners`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `revenue_share_payouts` ADD CONSTRAINT `revenue_share_payouts_transactionId_transactions_id_fk` FOREIGN KEY (`transactionId`) REFERENCES `transactions`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `training_stats` ADD CONSTRAINT `training_stats_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_partnerId_partners_id_fk` FOREIGN KEY (`partnerId`) REFERENCES `partners`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_referredBy_users_id_fk` FOREIGN KEY (`referredBy`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_stats_summary` ADD CONSTRAINT `user_stats_summary_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `workouts` ADD CONSTRAINT `workouts_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;