CREATE TABLE `Complaint` (
  `id` int NOT NULL AUTO_INCREMENT,
  `information` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `archived` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
