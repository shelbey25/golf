CREATE TABLE `Community` (
  `id` int NOT NULL AUTO_INCREMENT,
  `weeklyReveal` datetime(3) NOT NULL,
  `domain` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `maxArrows` int NOT NULL DEFAULT '3',
  `boyCount` int NOT NULL DEFAULT '0',
  `girlCount` int NOT NULL DEFAULT '0',
  `locked` tinyint(1) NOT NULL DEFAULT '0',
  `releaseDate` datetime(3) NOT NULL DEFAULT '2012-09-12 00:00:00.000',
  PRIMARY KEY (`id`),
  UNIQUE KEY `Community_domain_key` (`domain`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
