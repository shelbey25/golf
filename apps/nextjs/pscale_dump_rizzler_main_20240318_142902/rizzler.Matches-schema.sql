CREATE TABLE `Matches` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dateRevealed` datetime(3) NOT NULL DEFAULT '2012-09-12 00:00:00.000',
  `aUserID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `aUserRegistered` tinyint(1) NOT NULL DEFAULT '0',
  `aUserShow` tinyint(1) NOT NULL DEFAULT '0',
  `bUserID` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `bUserRegistered` tinyint(1) NOT NULL DEFAULT '0',
  `bUserShow` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
