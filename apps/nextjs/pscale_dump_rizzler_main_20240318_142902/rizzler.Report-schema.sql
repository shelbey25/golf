CREATE TABLE `Report` (
  `id` int NOT NULL AUTO_INCREMENT,
  `information` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `userId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId2` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
