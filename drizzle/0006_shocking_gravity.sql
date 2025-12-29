CREATE TABLE `access_control` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`resource` varchar(100) NOT NULL,
	`resourceId` int,
	`permission` enum('read','write','delete','admin') NOT NULL,
	`grantedBy` int,
	`reason` text,
	`expiresAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `access_control_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `audit_logs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`action` varchar(100) NOT NULL,
	`resource` varchar(100) NOT NULL,
	`resourceId` int,
	`ipAddress` varchar(45),
	`userAgent` text,
	`details` json,
	`timestamp` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `audit_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `consent_records` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`consentType` enum('parental_consent','medical_data','mental_health','injury_tracking','data_sharing','aoc_medical_referral','marketing','research') NOT NULL,
	`granted` enum('yes','no') NOT NULL,
	`grantedBy` varchar(255),
	`grantedByEmail` varchar(320),
	`grantedByRelation` varchar(50),
	`ipAddress` varchar(45),
	`consentDocument` text,
	`expiresAt` timestamp,
	`revokedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `consent_records_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `employee_access_logs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`employeeId` int NOT NULL,
	`action` varchar(100) NOT NULL,
	`resource` varchar(100) NOT NULL,
	`resourceId` int,
	`justification` text,
	`approved` enum('yes','no','pending') NOT NULL DEFAULT 'pending',
	`approvedBy` int,
	`flagged` enum('yes','no') NOT NULL DEFAULT 'no',
	`flagReason` text,
	`ipAddress` varchar(45),
	`timestamp` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `employee_access_logs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `medical_records` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`recordType` enum('injury','mental_health','physical_assessment','treatment_plan','medical_clearance','orthopedic_evaluation') NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`severity` enum('low','medium','high','critical'),
	`status` enum('active','resolved','ongoing','cleared') NOT NULL DEFAULT 'active',
	`diagnosisDate` date,
	`resolvedDate` date,
	`providerId` int,
	`providerName` varchar(255),
	`providerNotes` text,
	`attachments` json,
	`metadata` json,
	`isConfidential` enum('yes','no') NOT NULL DEFAULT 'yes',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `medical_records_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `ncaa_compliance` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`complianceType` enum('recruiting_contact','nil_deal','transfer_portal','amateurism_status','eligibility_check') NOT NULL,
	`status` enum('compliant','pending_review','violation','cleared') NOT NULL DEFAULT 'pending_review',
	`details` json,
	`reviewedBy` int,
	`reviewedAt` timestamp,
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `ncaa_compliance_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `nil_contracts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`brandName` varchar(255) NOT NULL,
	`brandContact` varchar(255),
	`contractValue` decimal(10,2) NOT NULL,
	`contractType` enum('social_media','appearance','endorsement','merchandise','content_creation','other') NOT NULL,
	`startDate` date NOT NULL,
	`endDate` date,
	`status` enum('pending','active','completed','terminated') NOT NULL DEFAULT 'pending',
	`contractDocument` text,
	`taxReported` enum('yes','no') NOT NULL DEFAULT 'no',
	`taxYear` int,
	`complianceApproved` enum('yes','no','pending') NOT NULL DEFAULT 'pending',
	`schoolApproved` enum('yes','no','pending','not_required') NOT NULL DEFAULT 'pending',
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `nil_contracts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `security_incidents` (
	`id` int AUTO_INCREMENT NOT NULL,
	`incidentType` enum('unauthorized_access','data_breach','phishing_attempt','malware','insider_threat','policy_violation','other') NOT NULL,
	`severity` enum('low','medium','high','critical') NOT NULL,
	`description` text NOT NULL,
	`affectedUsers` json,
	`detectedBy` int,
	`detectedAt` timestamp NOT NULL DEFAULT (now()),
	`resolvedBy` int,
	`resolvedAt` timestamp,
	`status` enum('open','investigating','resolved','false_alarm') NOT NULL DEFAULT 'open',
	`actionsTaken` text,
	`notificationsSent` enum('yes','no') NOT NULL DEFAULT 'no',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `security_incidents_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `access_control` ADD CONSTRAINT `access_control_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `access_control` ADD CONSTRAINT `access_control_grantedBy_users_id_fk` FOREIGN KEY (`grantedBy`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `audit_logs` ADD CONSTRAINT `audit_logs_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `consent_records` ADD CONSTRAINT `consent_records_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `employee_access_logs` ADD CONSTRAINT `employee_access_logs_employeeId_users_id_fk` FOREIGN KEY (`employeeId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `employee_access_logs` ADD CONSTRAINT `employee_access_logs_approvedBy_users_id_fk` FOREIGN KEY (`approvedBy`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `medical_records` ADD CONSTRAINT `medical_records_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `ncaa_compliance` ADD CONSTRAINT `ncaa_compliance_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `ncaa_compliance` ADD CONSTRAINT `ncaa_compliance_reviewedBy_users_id_fk` FOREIGN KEY (`reviewedBy`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `nil_contracts` ADD CONSTRAINT `nil_contracts_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `security_incidents` ADD CONSTRAINT `security_incidents_detectedBy_users_id_fk` FOREIGN KEY (`detectedBy`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `security_incidents` ADD CONSTRAINT `security_incidents_resolvedBy_users_id_fk` FOREIGN KEY (`resolvedBy`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;