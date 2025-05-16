CREATE TABLE `JuniorGames` (
  `id` int NOT NULL AUTO_INCREMENT,
  `personCaught` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `killer` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `timeCaught` datetime(3) NOT NULL DEFAULT '2012-09-12 00:00:00.000',
  `active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=364 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
